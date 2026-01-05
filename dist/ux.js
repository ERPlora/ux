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
      /* Primary */
      --ux-primary: #3880ff;
      --ux-primary-rgb: 56, 128, 255;
      --ux-primary-contrast: #ffffff;
      --ux-primary-shade: #3171e0;
      --ux-primary-tint: #4c8dff;

      /* Secondary */
      --ux-secondary: #3dc2ff;
      --ux-secondary-rgb: 61, 194, 255;
      --ux-secondary-contrast: #ffffff;
      --ux-secondary-shade: #36abe0;
      --ux-secondary-tint: #50c8ff;

      /* Tertiary */
      --ux-tertiary: #5260ff;
      --ux-tertiary-rgb: 82, 96, 255;
      --ux-tertiary-contrast: #ffffff;
      --ux-tertiary-shade: #4854e0;
      --ux-tertiary-tint: #6370ff;

      /* Success */
      --ux-success: #2dd36f;
      --ux-success-rgb: 45, 211, 111;
      --ux-success-contrast: #ffffff;
      --ux-success-shade: #28ba62;
      --ux-success-tint: #42d77d;

      /* Warning */
      --ux-warning: #ffc409;
      --ux-warning-rgb: 255, 196, 9;
      --ux-warning-contrast: #000000;
      --ux-warning-shade: #e0ac08;
      --ux-warning-tint: #ffca22;

      /* Danger */
      --ux-danger: #eb445a;
      --ux-danger-rgb: 235, 68, 90;
      --ux-danger-contrast: #ffffff;
      --ux-danger-shade: #cf3c4f;
      --ux-danger-tint: #ed576b;

      /* Dark */
      --ux-dark: #222428;
      --ux-dark-rgb: 34, 36, 40;
      --ux-dark-contrast: #ffffff;
      --ux-dark-shade: #1e2023;
      --ux-dark-tint: #383a3e;

      /* Medium */
      --ux-medium: #92949c;
      --ux-medium-rgb: 146, 148, 156;
      --ux-medium-contrast: #ffffff;
      --ux-medium-shade: #808289;
      --ux-medium-tint: #9d9fa6;

      /* Light */
      --ux-light: #f4f5f8;
      --ux-light-rgb: 244, 245, 248;
      --ux-light-contrast: #000000;
      --ux-light-shade: #d7d8da;
      --ux-light-tint: #f5f6f9;

      /* Background & Text */
      --ux-background: #ffffff;
      --ux-background-rgb: 255, 255, 255;
      --ux-text: #000000;
      --ux-text-rgb: 0, 0, 0;
      --ux-text-secondary: #666666;
      --ux-text-tertiary: #999999;

      /* Surface */
      --ux-surface: #ffffff;
      --ux-surface-rgb: 255, 255, 255;
      --ux-surface-secondary: #f4f5f8;

      /* Borders */
      --ux-border-color: rgba(0, 0, 0, 0.13);
      --ux-border-radius: 8px;
      --ux-border-radius-sm: 4px;
      --ux-border-radius-lg: 12px;
      --ux-border-radius-xl: 16px;

      /* Typography */
      --ux-font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Roboto", sans-serif;
      --ux-font-size-xs: 10px;
      --ux-font-size-sm: 12px;
      --ux-font-size-base: 14px;
      --ux-font-size-md: 16px;
      --ux-font-size-lg: 18px;
      --ux-font-size-xl: 20px;
      --ux-font-size-2xl: 24px;
      --ux-font-size-3xl: 30px;
      --ux-font-size-4xl: 36px;

      /* Spacing */
      --ux-space-xs: 4px;
      --ux-space-sm: 8px;
      --ux-space-md: 12px;
      --ux-space-lg: 16px;
      --ux-space-xl: 24px;
      --ux-space-2xl: 32px;
      --ux-space-3xl: 48px;

      /* Touch */
      --ux-touch-target: 44px;
      --ux-touch-target-sm: 36px;

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

    /* Dark Mode - System preference */
    @media (prefers-color-scheme: dark) {
      :root:not(.ux-light) {
        --ux-background: #000000;
        --ux-background-rgb: 0, 0, 0;
        --ux-text: #ffffff;
        --ux-text-rgb: 255, 255, 255;
        --ux-text-secondary: rgba(235, 235, 245, 0.8);
        --ux-text-tertiary: rgba(235, 235, 245, 0.5);
        --ux-text-muted: rgba(235, 235, 245, 0.3);
        --ux-surface: #1c1c1e;
        --ux-surface-rgb: 28, 28, 30;
        --ux-surface-secondary: #2c2c2e;
        --ux-surface-tertiary: #3a3a3c;
        --ux-border-color: rgba(255, 255, 255, 0.15);
        --ux-divider-color: rgba(255, 255, 255, 0.1);
        --ux-shadow-color: rgba(0, 0, 0, 0.5);

        /* Invert light/dark for dark mode */
        --ux-light: #2c2c2e;
        --ux-light-rgb: 44, 44, 46;
        --ux-light-contrast: #ffffff;
        --ux-light-shade: #1c1c1e;
        --ux-light-tint: #3a3a3c;

        --ux-dark: #ffffff;
        --ux-dark-rgb: 255, 255, 255;
        --ux-dark-contrast: #1a1a1a;
        --ux-dark-shade: #e5e5e5;
        --ux-dark-tint: #ffffff;
      }
    }

    /* Force Light Mode - overrides system dark preference */
    html.ux-light,
    body.ux-light,
    .ux-light {
      --ux-background: #ffffff;
      --ux-background-rgb: 255, 255, 255;
      --ux-text: #000000;
      --ux-text-rgb: 0, 0, 0;
      --ux-text-secondary: #666666;
      --ux-text-tertiary: #999999;
      --ux-text-muted: #b3b3b3;
      --ux-surface: #ffffff;
      --ux-surface-rgb: 255, 255, 255;
      --ux-surface-secondary: #f4f5f8;
      --ux-surface-tertiary: #e8e9ed;
      --ux-border-color: rgba(0, 0, 0, 0.13);
      --ux-divider-color: rgba(0, 0, 0, 0.08);
      --ux-shadow-color: rgba(0, 0, 0, 0.1);

      --ux-light: #f4f5f8;
      --ux-light-rgb: 244, 245, 248;
      --ux-light-contrast: #000000;
      --ux-light-shade: #d7d8da;
      --ux-light-tint: #f5f6f9;

      --ux-dark: #222428;
      --ux-dark-rgb: 34, 36, 40;
      --ux-dark-contrast: #ffffff;
      --ux-dark-shade: #1e2023;
      --ux-dark-tint: #383a3e;
    }

    /* Manual Dark Mode Class - applied to html or body */
    html.ux-dark,
    body.ux-dark,
    .ux-dark {
      --ux-background: #000000;
      --ux-background-rgb: 0, 0, 0;
      --ux-text: #ffffff;
      --ux-text-rgb: 255, 255, 255;
      --ux-text-secondary: rgba(235, 235, 245, 0.8);
      --ux-text-tertiary: rgba(235, 235, 245, 0.5);
      --ux-text-muted: rgba(235, 235, 245, 0.3);
      --ux-surface: #1c1c1e;
      --ux-surface-rgb: 28, 28, 30;
      --ux-surface-secondary: #2c2c2e;
      --ux-surface-tertiary: #3a3a3c;
      --ux-border-color: rgba(255, 255, 255, 0.15);
      --ux-divider-color: rgba(255, 255, 255, 0.1);
      --ux-shadow-color: rgba(0, 0, 0, 0.5);

      /* Invert light/dark for dark mode */
      --ux-light: #2c2c2e;
      --ux-light-rgb: 44, 44, 46;
      --ux-light-contrast: #ffffff;
      --ux-light-shade: #1c1c1e;
      --ux-light-tint: #3a3a3c;

      --ux-dark: #ffffff;
      --ux-dark-rgb: 255, 255, 255;
      --ux-dark-contrast: #1a1a1a;
      --ux-dark-shade: #e5e5e5;
      --ux-dark-tint: #ffffff;
    }

    /* ========================================
       Color Themes
       Apply to body or any container
    ======================================== */

    /* Ocean Blue (default) */
    .ux-theme-ocean {
      --ux-primary: #3880ff;
      --ux-primary-rgb: 56, 128, 255;
      --ux-primary-contrast: #ffffff;
      --ux-primary-shade: #3171e0;
      --ux-primary-tint: #4c8dff;
    }

    /* Emerald Green */
    .ux-theme-emerald {
      --ux-primary: #10b981;
      --ux-primary-rgb: 16, 185, 129;
      --ux-primary-contrast: #ffffff;
      --ux-primary-shade: #059669;
      --ux-primary-tint: #34d399;
    }

    /* Royal Purple */
    .ux-theme-purple {
      --ux-primary: #8b5cf6;
      --ux-primary-rgb: 139, 92, 246;
      --ux-primary-contrast: #ffffff;
      --ux-primary-shade: #7c3aed;
      --ux-primary-tint: #a78bfa;
    }

    /* Sunset Orange */
    .ux-theme-sunset {
      --ux-primary: #f97316;
      --ux-primary-rgb: 249, 115, 22;
      --ux-primary-contrast: #ffffff;
      --ux-primary-shade: #ea580c;
      --ux-primary-tint: #fb923c;
    }

    /* Rose Pink */
    .ux-theme-rose {
      --ux-primary: #f43f5e;
      --ux-primary-rgb: 244, 63, 94;
      --ux-primary-contrast: #ffffff;
      --ux-primary-shade: #e11d48;
      --ux-primary-tint: #fb7185;
    }

    /* Teal Cyan */
    .ux-theme-teal {
      --ux-primary: #14b8a6;
      --ux-primary-rgb: 20, 184, 166;
      --ux-primary-contrast: #ffffff;
      --ux-primary-shade: #0d9488;
      --ux-primary-tint: #2dd4bf;
    }

    /* Amber Gold */
    .ux-theme-amber {
      --ux-primary: #f59e0b;
      --ux-primary-rgb: 245, 158, 11;
      --ux-primary-contrast: #000000;
      --ux-primary-shade: #d97706;
      --ux-primary-tint: #fbbf24;
    }

    /* Slate Gray */
    .ux-theme-slate {
      --ux-primary: #64748b;
      --ux-primary-rgb: 100, 116, 139;
      --ux-primary-contrast: #ffffff;
      --ux-primary-shade: #475569;
      --ux-primary-tint: #94a3b8;
    }

    /* Indigo */
    .ux-theme-indigo {
      --ux-primary: #6366f1;
      --ux-primary-rgb: 99, 102, 241;
      --ux-primary-contrast: #ffffff;
      --ux-primary-shade: #4f46e5;
      --ux-primary-tint: #818cf8;
    }

    /* Cyan */
    .ux-theme-cyan {
      --ux-primary: #06b6d4;
      --ux-primary-rgb: 6, 182, 212;
      --ux-primary-contrast: #ffffff;
      --ux-primary-shade: #0891b2;
      --ux-primary-tint: #22d3ee;
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
      margin-top: 16px;
      margin-bottom: 10px;
      font-weight: 500;
      line-height: 1.2;
      color: var(--ux-text);
    }

    h1 {
      margin-top: 20px;
      font-size: 26px;
    }

    h2 {
      margin-top: 18px;
      font-size: 24px;
    }

    h3 {
      font-size: 22px;
    }

    h4 {
      font-size: 20px;
    }

    h5 {
      font-size: 18px;
    }

    h6 {
      font-size: 16px;
    }

    /* Paragraphs */
    p {
      margin-top: 0;
      margin-bottom: 16px;
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
      padding: 2px 6px;
      background-color: var(--ux-surface-secondary);
      border-radius: var(--ux-border-radius-sm);
      color: var(--ux-danger);
    }

    pre {
      display: block;
      padding: var(--ux-space-md);
      margin-top: 0;
      margin-bottom: 16px;
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
      margin: 0 0 16px;
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
      padding: 2px 4px;
      background-color: rgba(var(--ux-warning-rgb), 0.3);
      border-radius: 2px;
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
      margin-bottom: 16px;
      padding-left: 24px;
    }

    ul ul, ul ol, ol ul, ol ol {
      margin-bottom: 0;
    }

    li {
      margin-bottom: 4px;
    }

    /* Definition List */
    dl {
      margin-top: 0;
      margin-bottom: 16px;
    }

    dt {
      font-weight: 600;
    }

    dd {
      margin-left: 0;
      margin-bottom: 8px;
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

    /* Overflow */
    .ux-overflow-hidden { overflow: hidden; }
    .ux-overflow-auto { overflow: auto; }
    .ux-overflow-scroll { overflow: scroll; }

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
      padding: 16px;
    }

    .ux-padding-top {
      padding-top: 16px;
    }

    .ux-padding-bottom {
      padding-bottom: 16px;
    }

    .ux-padding-start,
    .ux-padding-left {
      padding-left: 16px;
    }

    .ux-padding-end,
    .ux-padding-right {
      padding-right: 16px;
    }

    .ux-padding-horizontal {
      padding-left: 16px;
      padding-right: 16px;
    }

    .ux-padding-vertical {
      padding-top: 16px;
      padding-bottom: 16px;
    }

    .ux-no-padding {
      padding: 0 !important;
    }

    /* Margin - all sides */
    .ux-margin {
      margin: 16px;
    }

    .ux-margin-top {
      margin-top: 16px;
    }

    .ux-margin-bottom {
      margin-bottom: 16px;
    }

    .ux-margin-start,
    .ux-margin-left {
      margin-left: 16px;
    }

    .ux-margin-end,
    .ux-margin-right {
      margin-right: 16px;
    }

    .ux-margin-horizontal {
      margin-left: 16px;
      margin-right: 16px;
    }

    .ux-margin-vertical {
      margin-top: 16px;
      margin-bottom: 16px;
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
      .ux-padding-sm { padding: 16px; }
      .ux-padding-horizontal-sm { padding-left: 16px; padding-right: 16px; }
      .ux-padding-vertical-sm { padding-top: 16px; padding-bottom: 16px; }
      .ux-margin-sm { margin: 16px; }
      .ux-margin-horizontal-sm { margin-left: 16px; margin-right: 16px; }
      .ux-margin-vertical-sm { margin-top: 16px; margin-bottom: 16px; }
      .ux-hidden-sm { display: none; }
      .ux-block-sm { display: block; }
      .ux-flex-sm { display: flex; }
    }

    /* Medium screens and up (768px+) */
    @media (min-width: 768px) {
      .ux-padding { padding: 24px; }
      .ux-padding-horizontal { padding-left: 24px; padding-right: 24px; }
      .ux-padding-vertical { padding-top: 24px; padding-bottom: 24px; }
      .ux-padding-top { padding-top: 24px; }
      .ux-padding-bottom { padding-bottom: 24px; }
      .ux-padding-start, .ux-padding-left { padding-left: 24px; }
      .ux-padding-end, .ux-padding-right { padding-right: 24px; }

      .ux-margin { margin: 24px; }
      .ux-margin-horizontal { margin-left: 24px; margin-right: 24px; }
      .ux-margin-vertical { margin-top: 24px; margin-bottom: 24px; }
      .ux-margin-top { margin-top: 24px; }
      .ux-margin-bottom { margin-bottom: 24px; }
      .ux-margin-start, .ux-margin-left { margin-left: 24px; }
      .ux-margin-end, .ux-margin-right { margin-right: 24px; }

      .ux-padding-md { padding: 24px; }
      .ux-padding-horizontal-md { padding-left: 24px; padding-right: 24px; }
      .ux-padding-vertical-md { padding-top: 24px; padding-bottom: 24px; }
      .ux-margin-md { margin: 24px; }
      .ux-margin-horizontal-md { margin-left: 24px; margin-right: 24px; }
      .ux-margin-vertical-md { margin-top: 24px; margin-bottom: 24px; }
      .ux-hidden-md { display: none; }
      .ux-block-md { display: block; }
      .ux-flex-md { display: flex; }
    }

    /* Large screens and up (992px+) */
    @media (min-width: 992px) {
      .ux-padding { padding: 32px; }
      .ux-padding-horizontal { padding-left: 32px; padding-right: 32px; }
      .ux-padding-vertical { padding-top: 32px; padding-bottom: 32px; }
      .ux-padding-top { padding-top: 32px; }
      .ux-padding-bottom { padding-bottom: 32px; }
      .ux-padding-start, .ux-padding-left { padding-left: 32px; }
      .ux-padding-end, .ux-padding-right { padding-right: 32px; }

      .ux-margin { margin: 32px; }
      .ux-margin-horizontal { margin-left: 32px; margin-right: 32px; }
      .ux-margin-vertical { margin-top: 32px; margin-bottom: 32px; }
      .ux-margin-top { margin-top: 32px; }
      .ux-margin-bottom { margin-bottom: 32px; }
      .ux-margin-start, .ux-margin-left { margin-left: 32px; }
      .ux-margin-end, .ux-margin-right { margin-right: 32px; }

      .ux-padding-lg { padding: 32px; }
      .ux-padding-horizontal-lg { padding-left: 32px; padding-right: 32px; }
      .ux-padding-vertical-lg { padding-top: 32px; padding-bottom: 32px; }
      .ux-margin-lg { margin: 32px; }
      .ux-margin-horizontal-lg { margin-left: 32px; margin-right: 32px; }
      .ux-margin-vertical-lg { margin-top: 32px; margin-bottom: 32px; }
      .ux-hidden-lg { display: none; }
      .ux-block-lg { display: block; }
      .ux-flex-lg { display: flex; }
    }

    /* Extra large screens (1200px+) */
    @media (min-width: 1200px) {
      .ux-padding-xl { padding: 48px; }
      .ux-padding-horizontal-xl { padding-left: 48px; padding-right: 48px; }
      .ux-padding-vertical-xl { padding-top: 48px; padding-bottom: 48px; }
      .ux-margin-xl { margin: 48px; }
      .ux-margin-horizontal-xl { margin-left: 48px; margin-right: 48px; }
      .ux-margin-vertical-xl { margin-top: 48px; margin-bottom: 48px; }
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
      max-width: 1200px;
      margin-left: auto;
      margin-right: auto;
      padding-left: 16px;
      padding-right: 16px;
    }

    @media (min-width: 768px) {
      .ux-container {
        padding-left: 24px;
        padding-right: 24px;
      }
    }

    @media (min-width: 992px) {
      .ux-container {
        padding-left: 32px;
        padding-right: 32px;
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
/**
 * UX Button Component
 * Botones estilo Ionic con variantes, tamaños y estados
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Button
    ======================================== */

    .ux-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--ux-space-sm);
      min-height: var(--ux-touch-target);
      padding: 0 var(--ux-space-lg);
      font-family: var(--ux-font-family);
      font-size: var(--ux-font-size-md);
      font-weight: 500;
      line-height: 1;
      text-align: center;
      text-decoration: none;
      white-space: nowrap;
      border: none;
      border-radius: var(--ux-border-radius);
      cursor: pointer;
      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;
      transition:
        background-color var(--ux-transition-fast) var(--ux-ease),
        color var(--ux-transition-fast) var(--ux-ease),
        border-color var(--ux-transition-fast) var(--ux-ease),
        transform var(--ux-transition-fast) var(--ux-ease),
        box-shadow var(--ux-transition-fast) var(--ux-ease);
      position: relative;
      overflow: hidden;
    }

    /* Ripple effect */
    .ux-button::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      background: rgba(255, 255, 255, 0.25);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      transition: width 0.4s ease, height 0.4s ease, opacity 0.4s ease;
      opacity: 0;
      pointer-events: none;
    }

    .ux-button:active::before {
      width: 300%;
      height: 300%;
      opacity: 1;
      transition: 0s;
    }

    /* Press effect */
    .ux-button:active {
      transform: scale(0.97);
    }

    /* Focus state */
    .ux-button:focus-visible {
      outline: 2px solid var(--ux-primary);
      outline-offset: 2px;
    }

    /* ========================================
       Variants - Filled (default)
    ======================================== */

    .ux-button--primary,
    .ux-button:not([class*="--"]) {
      background-color: var(--ux-primary);
      color: var(--ux-primary-contrast);
    }

    .ux-button--primary:hover,
    .ux-button:not([class*="--"]):hover {
      background-color: var(--ux-primary-shade);
    }

    .ux-button--secondary {
      background-color: var(--ux-secondary);
      color: var(--ux-secondary-contrast);
    }

    .ux-button--secondary:hover {
      background-color: var(--ux-secondary-shade);
    }

    .ux-button--tertiary {
      background-color: var(--ux-tertiary);
      color: var(--ux-tertiary-contrast);
    }

    .ux-button--tertiary:hover {
      background-color: var(--ux-tertiary-shade);
    }

    .ux-button--success {
      background-color: var(--ux-success);
      color: var(--ux-success-contrast);
    }

    .ux-button--success:hover {
      background-color: var(--ux-success-shade);
    }

    .ux-button--warning {
      background-color: var(--ux-warning);
      color: var(--ux-warning-contrast);
    }

    .ux-button--warning:hover {
      background-color: var(--ux-warning-shade);
    }

    .ux-button--danger {
      background-color: var(--ux-danger);
      color: var(--ux-danger-contrast);
    }

    .ux-button--danger:hover {
      background-color: var(--ux-danger-shade);
    }

    .ux-button--dark {
      background-color: var(--ux-dark);
      color: var(--ux-dark-contrast);
    }

    .ux-button--dark:hover {
      background-color: var(--ux-dark-shade);
    }

    .ux-button--medium {
      background-color: var(--ux-medium);
      color: var(--ux-medium-contrast);
    }

    .ux-button--medium:hover {
      background-color: var(--ux-medium-shade);
    }

    .ux-button--light {
      background-color: var(--ux-light);
      color: var(--ux-light-contrast);
    }

    .ux-button--light:hover {
      background-color: var(--ux-light-shade);
    }

    /* ========================================
       Outline Variant
    ======================================== */

    .ux-button--outline {
      background-color: transparent;
      border: 2px solid currentColor;
    }

    .ux-button--outline.ux-button--primary,
    .ux-button--outline:not([class*="--primary"]):not([class*="--secondary"]):not([class*="--tertiary"]):not([class*="--success"]):not([class*="--warning"]):not([class*="--danger"]):not([class*="--dark"]):not([class*="--medium"]):not([class*="--light"]) {
      color: var(--ux-primary);
      border-color: var(--ux-primary);
      background-color: transparent;
    }

    .ux-button--outline.ux-button--primary:hover {
      background-color: rgba(var(--ux-primary-rgb), 0.1);
    }

    .ux-button--outline.ux-button--secondary {
      color: var(--ux-secondary);
      border-color: var(--ux-secondary);
    }

    .ux-button--outline.ux-button--secondary:hover {
      background-color: rgba(var(--ux-secondary-rgb), 0.1);
    }

    .ux-button--outline.ux-button--success {
      color: var(--ux-success);
      border-color: var(--ux-success);
    }

    .ux-button--outline.ux-button--success:hover {
      background-color: rgba(var(--ux-success-rgb), 0.1);
    }

    .ux-button--outline.ux-button--warning {
      color: var(--ux-warning);
      border-color: var(--ux-warning);
    }

    .ux-button--outline.ux-button--warning:hover {
      background-color: rgba(var(--ux-warning-rgb), 0.1);
    }

    .ux-button--outline.ux-button--danger {
      color: var(--ux-danger);
      border-color: var(--ux-danger);
    }

    .ux-button--outline.ux-button--danger:hover {
      background-color: rgba(var(--ux-danger-rgb), 0.1);
    }

    .ux-button--outline.ux-button--dark {
      color: var(--ux-dark);
      border-color: var(--ux-dark);
    }

    .ux-button--outline.ux-button--dark:hover {
      background-color: rgba(var(--ux-dark-rgb), 0.1);
    }

    /* ========================================
       Clear Variant (text only)
    ======================================== */

    .ux-button--clear {
      background-color: transparent;
      border: none;
    }

    .ux-button--clear.ux-button--primary,
    .ux-button--clear:not([class*="--secondary"]):not([class*="--tertiary"]):not([class*="--success"]):not([class*="--warning"]):not([class*="--danger"]):not([class*="--dark"]) {
      color: var(--ux-primary);
    }

    .ux-button--clear:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }

    .ux-button--clear.ux-button--danger {
      color: var(--ux-danger);
    }

    .ux-button--clear.ux-button--success {
      color: var(--ux-success);
    }

    /* ========================================
       Sizes
    ======================================== */

    .ux-button--sm {
      min-height: var(--ux-touch-target-sm);
      padding: 0 var(--ux-space-md);
      font-size: var(--ux-font-size-sm);
      border-radius: var(--ux-border-radius-sm);
    }

    .ux-button--lg {
      min-height: 52px;
      padding: 0 var(--ux-space-xl);
      font-size: var(--ux-font-size-lg);
      border-radius: var(--ux-border-radius-lg);
    }

    /* ========================================
       Full Width
    ======================================== */

    .ux-button--block {
      display: flex;
      width: 100%;
    }

    /* ========================================
       Round
    ======================================== */

    .ux-button--round {
      border-radius: 9999px;
    }

    /* ========================================
       Icon Only
    ======================================== */

    .ux-button--icon {
      width: var(--ux-touch-target);
      min-width: var(--ux-touch-target);
      padding: 0;
      border-radius: 50%;
    }

    .ux-button--icon.ux-button--sm {
      width: var(--ux-touch-target-sm);
      min-width: var(--ux-touch-target-sm);
    }

    .ux-button--icon.ux-button--lg {
      width: 52px;
      min-width: 52px;
    }

    /* ========================================
       Loading State
    ======================================== */

    .ux-button--loading {
      pointer-events: none;
      position: relative;
      color: transparent !important;
    }

    .ux-button--loading::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 20px;
      height: 20px;
      margin: -10px 0 0 -10px;
      border: 2px solid currentColor;
      border-right-color: transparent;
      border-radius: 50%;
      animation: ux-button-spin 0.6s linear infinite;
    }

    .ux-button--loading.ux-button--primary::after,
    .ux-button--loading:not([class*="--outline"]):not([class*="--clear"])::after {
      border-color: rgba(255, 255, 255, 0.8);
      border-right-color: transparent;
    }

    @keyframes ux-button-spin {
      to { transform: rotate(360deg); }
    }

    /* ========================================
       Disabled State
    ======================================== */

    .ux-button:disabled,
    .ux-button[disabled],
    .ux-button--disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    /* ========================================
       Button Group
    ======================================== */

    .ux-button-group {
      display: inline-flex;
    }

    .ux-button-group .ux-button {
      border-radius: 0;
    }

    .ux-button-group .ux-button:first-child {
      border-radius: var(--ux-border-radius) 0 0 var(--ux-border-radius);
    }

    .ux-button-group .ux-button:last-child {
      border-radius: 0 var(--ux-border-radius) var(--ux-border-radius) 0;
    }

    .ux-button-group .ux-button:not(:last-child) {
      border-right: 1px solid rgba(255, 255, 255, 0.2);
    }

    /* ========================================
       Button Icon
    ======================================== */

    .ux-button__icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      flex-shrink: 0;
    }

    .ux-button__icon svg {
      width: 100%;
      height: 100%;
    }

    .ux-button--sm .ux-button__icon {
      width: 16px;
      height: 16px;
    }

    .ux-button--lg .ux-button__icon {
      width: 24px;
      height: 24px;
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-button-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-button-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Register Alpine component for button with loading state
  const buttonComponent = () => ({
    loading: false,

    setLoading(state) {
      this.loading = state;
    },

    async click(callback) {
      if (this.loading) return;
      this.loading = true;
      try {
        await callback();
      } finally {
        this.loading = false;
      }
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxButton', buttonComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxButton', buttonComponent);
    });
  }
})();
/**
 * UX Badge Component
 * Badges para mostrar contadores y estados
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Badge
    ======================================== */

    .ux-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 20px;
      height: 20px;
      padding: 0 6px;
      font-family: var(--ux-font-family);
      font-size: var(--ux-font-size-xs);
      font-weight: 600;
      line-height: 1;
      text-align: center;
      white-space: nowrap;
      vertical-align: middle;
      border-radius: 10px;
      background-color: var(--ux-primary);
      color: var(--ux-primary-contrast);
    }

    /* ========================================
       Color Variants
    ======================================== */

    .ux-badge--primary {
      background-color: var(--ux-primary);
      color: var(--ux-primary-contrast);
    }

    .ux-badge--secondary {
      background-color: var(--ux-secondary);
      color: var(--ux-secondary-contrast);
    }

    .ux-badge--tertiary {
      background-color: var(--ux-tertiary);
      color: var(--ux-tertiary-contrast);
    }

    .ux-badge--success {
      background-color: var(--ux-success);
      color: var(--ux-success-contrast);
    }

    .ux-badge--warning {
      background-color: var(--ux-warning);
      color: var(--ux-warning-contrast);
    }

    .ux-badge--danger {
      background-color: var(--ux-danger);
      color: var(--ux-danger-contrast);
    }

    .ux-badge--dark {
      background-color: var(--ux-dark);
      color: var(--ux-dark-contrast);
    }

    .ux-badge--medium {
      background-color: var(--ux-medium);
      color: var(--ux-medium-contrast);
    }

    .ux-badge--light {
      background-color: var(--ux-light);
      color: var(--ux-light-contrast);
    }

    /* ========================================
       Sizes
    ======================================== */

    .ux-badge--xs {
      min-width: 14px;
      height: 14px;
      padding: 0 3px;
      font-size: 8px;
      border-radius: 7px;
    }

    .ux-badge--sm {
      min-width: 16px;
      height: 16px;
      padding: 0 4px;
      font-size: 9px;
      border-radius: 8px;
    }

    /* Default is md (20px) */

    .ux-badge--lg {
      min-width: 24px;
      height: 24px;
      padding: 0 8px;
      font-size: var(--ux-font-size-sm);
      border-radius: 12px;
    }

    .ux-badge--xl {
      min-width: 28px;
      height: 28px;
      padding: 0 10px;
      font-size: var(--ux-font-size-md);
      border-radius: 14px;
    }

    .ux-badge--xxl {
      min-width: 32px;
      height: 32px;
      padding: 0 12px;
      font-size: var(--ux-font-size-lg);
      border-radius: 16px;
    }

    /* ========================================
       Dot (no text)
    ======================================== */

    .ux-badge--dot {
      min-width: 8px;
      width: 8px;
      height: 8px;
      padding: 0;
      font-size: 0;
    }

    .ux-badge--dot.ux-badge--sm {
      min-width: 6px;
      width: 6px;
      height: 6px;
    }

    .ux-badge--dot.ux-badge--lg {
      min-width: 10px;
      width: 10px;
      height: 10px;
    }

    /* ========================================
       Outline Variant
    ======================================== */

    .ux-badge--outline {
      background-color: transparent;
      border: 1px solid currentColor;
    }

    .ux-badge--outline.ux-badge--primary {
      color: var(--ux-primary);
      border-color: var(--ux-primary);
    }

    .ux-badge--outline.ux-badge--secondary {
      color: var(--ux-secondary);
      border-color: var(--ux-secondary);
    }

    .ux-badge--outline.ux-badge--success {
      color: var(--ux-success);
      border-color: var(--ux-success);
    }

    .ux-badge--outline.ux-badge--warning {
      color: var(--ux-warning);
      border-color: var(--ux-warning);
    }

    .ux-badge--outline.ux-badge--danger {
      color: var(--ux-danger);
      border-color: var(--ux-danger);
    }

    .ux-badge--outline.ux-badge--dark {
      color: var(--ux-dark);
      border-color: var(--ux-dark);
    }

    /* ========================================
       Soft Variant (tinted background)
    ======================================== */

    .ux-badge--soft.ux-badge--primary {
      background-color: rgba(var(--ux-primary-rgb), 0.15);
      color: var(--ux-primary-shade);
    }

    .ux-badge--soft.ux-badge--secondary {
      background-color: rgba(var(--ux-secondary-rgb), 0.15);
      color: var(--ux-secondary-shade);
    }

    .ux-badge--soft.ux-badge--tertiary {
      background-color: rgba(var(--ux-tertiary-rgb), 0.15);
      color: var(--ux-tertiary-shade);
    }

    .ux-badge--soft.ux-badge--success {
      background-color: rgba(var(--ux-success-rgb), 0.15);
      color: var(--ux-success-shade);
    }

    .ux-badge--soft.ux-badge--warning {
      background-color: rgba(var(--ux-warning-rgb), 0.15);
      color: var(--ux-warning-shade);
    }

    .ux-badge--soft.ux-badge--danger {
      background-color: rgba(var(--ux-danger-rgb), 0.15);
      color: var(--ux-danger-shade);
    }

    .ux-badge--soft.ux-badge--dark {
      background-color: rgba(var(--ux-dark-rgb), 0.1);
      color: var(--ux-dark);
    }

    /* ========================================
       Badge Container (for positioning)
    ======================================== */

    .ux-badge-container {
      position: relative;
      display: inline-flex;
    }

    .ux-badge-container .ux-badge {
      position: absolute;
      top: -4px;
      right: -4px;
      z-index: 1;
    }

    .ux-badge-container .ux-badge--dot {
      top: 0;
      right: 0;
    }

    /* Position variants */
    .ux-badge-container--top-left .ux-badge {
      top: -4px;
      right: auto;
      left: -4px;
    }

    .ux-badge-container--bottom-right .ux-badge {
      top: auto;
      bottom: -4px;
      right: -4px;
    }

    .ux-badge-container--bottom-left .ux-badge {
      top: auto;
      bottom: -4px;
      right: auto;
      left: -4px;
    }

    /* ========================================
       Animation (for updates)
    ======================================== */

    .ux-badge--pulse {
      animation: ux-badge-pulse 1.5s ease-in-out infinite;
    }

    @keyframes ux-badge-pulse {
      0%, 100% {
        transform: scale(1);
        opacity: 1;
      }
      50% {
        transform: scale(1.1);
        opacity: 0.8;
      }
    }

    .ux-badge--bounce {
      animation: ux-badge-bounce 0.5s ease;
    }

    @keyframes ux-badge-bounce {
      0% { transform: scale(0); }
      50% { transform: scale(1.2); }
      100% { transform: scale(1); }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-badge-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-badge-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }
})();
/**
 * UX Chip Component
 * Chips para etiquetas, filtros y selección
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Chip
    ======================================== */

    .ux-chip {
      display: inline-flex;
      align-items: center;
      gap: var(--ux-space-xs);
      height: 32px;
      padding: 0 var(--ux-space-md);
      font-family: var(--ux-font-family);
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      line-height: 1;
      white-space: nowrap;
      border-radius: 16px;
      background-color: var(--ux-light);
      color: var(--ux-text);
      border: none;
      cursor: default;
      user-select: none;
      -webkit-user-select: none;
      transition:
        background-color var(--ux-transition-fast) var(--ux-ease),
        color var(--ux-transition-fast) var(--ux-ease),
        transform var(--ux-transition-fast) var(--ux-ease);
    }

    /* ========================================
       Interactive Chips
    ======================================== */

    .ux-chip--interactive {
      cursor: pointer;
    }

    .ux-chip--interactive:hover {
      background-color: var(--ux-light-shade);
    }

    .ux-chip--interactive:active {
      transform: scale(0.96);
    }

    /* ========================================
       Color Variants
    ======================================== */

    .ux-chip--primary {
      background-color: rgba(var(--ux-primary-rgb), 0.15);
      color: var(--ux-primary);
    }

    .ux-chip--primary:hover {
      background-color: rgba(var(--ux-primary-rgb), 0.25);
    }

    .ux-chip--secondary {
      background-color: rgba(var(--ux-secondary-rgb), 0.15);
      color: var(--ux-secondary-shade);
    }

    .ux-chip--tertiary {
      background-color: rgba(var(--ux-tertiary-rgb), 0.15);
      color: var(--ux-tertiary);
    }

    .ux-chip--success {
      background-color: rgba(var(--ux-success-rgb), 0.15);
      color: var(--ux-success-shade);
    }

    .ux-chip--warning {
      background-color: rgba(var(--ux-warning-rgb), 0.15);
      color: var(--ux-warning-shade);
    }

    .ux-chip--danger {
      background-color: rgba(var(--ux-danger-rgb), 0.15);
      color: var(--ux-danger);
    }

    .ux-chip--dark {
      background-color: var(--ux-dark);
      color: var(--ux-dark-contrast);
    }

    /* ========================================
       Filled Variants
    ======================================== */

    .ux-chip--filled {
      background-color: var(--ux-primary);
      color: var(--ux-primary-contrast);
    }

    .ux-chip--filled.ux-chip--secondary {
      background-color: var(--ux-secondary);
      color: var(--ux-secondary-contrast);
    }

    .ux-chip--filled.ux-chip--success {
      background-color: var(--ux-success);
      color: var(--ux-success-contrast);
    }

    .ux-chip--filled.ux-chip--warning {
      background-color: var(--ux-warning);
      color: var(--ux-warning-contrast);
    }

    .ux-chip--filled.ux-chip--danger {
      background-color: var(--ux-danger);
      color: var(--ux-danger-contrast);
    }

    /* ========================================
       Outline Variants
    ======================================== */

    .ux-chip--outline {
      background-color: transparent;
      border: 1px solid var(--ux-border-color);
      color: var(--ux-text);
    }

    .ux-chip--outline.ux-chip--primary {
      border-color: var(--ux-primary);
      color: var(--ux-primary);
    }

    .ux-chip--outline.ux-chip--secondary {
      border-color: var(--ux-secondary);
      color: var(--ux-secondary);
    }

    .ux-chip--outline.ux-chip--success {
      border-color: var(--ux-success);
      color: var(--ux-success);
    }

    .ux-chip--outline.ux-chip--warning {
      border-color: var(--ux-warning);
      color: var(--ux-warning);
    }

    .ux-chip--outline.ux-chip--danger {
      border-color: var(--ux-danger);
      color: var(--ux-danger);
    }

    /* ========================================
       Sizes
    ======================================== */

    .ux-chip--sm {
      height: 24px;
      padding: 0 var(--ux-space-sm);
      font-size: var(--ux-font-size-xs);
      border-radius: 12px;
    }

    .ux-chip--lg {
      height: 40px;
      padding: 0 var(--ux-space-lg);
      font-size: var(--ux-font-size-base);
      border-radius: 20px;
    }

    /* ========================================
       Selected State
    ======================================== */

    .ux-chip--selected {
      background-color: var(--ux-primary);
      color: var(--ux-primary-contrast);
    }

    .ux-chip--selected.ux-chip--outline {
      background-color: var(--ux-primary);
      border-color: var(--ux-primary);
      color: var(--ux-primary-contrast);
    }

    /* ========================================
       Disabled State
    ======================================== */

    .ux-chip--disabled,
    .ux-chip:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    /* ========================================
       Chip Avatar
    ======================================== */

    .ux-chip__avatar {
      width: 24px;
      height: 24px;
      margin-left: -8px;
      border-radius: 50%;
      object-fit: cover;
    }

    .ux-chip--sm .ux-chip__avatar {
      width: 18px;
      height: 18px;
      margin-left: -4px;
    }

    .ux-chip--lg .ux-chip__avatar {
      width: 32px;
      height: 32px;
      margin-left: -12px;
    }

    /* ========================================
       Chip Icon
    ======================================== */

    .ux-chip__icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      flex-shrink: 0;
    }

    .ux-chip__icon svg {
      width: 100%;
      height: 100%;
    }

    .ux-chip--sm .ux-chip__icon {
      width: 14px;
      height: 14px;
    }

    .ux-chip--lg .ux-chip__icon {
      width: 20px;
      height: 20px;
    }

    /* ========================================
       Chip Close Button
    ======================================== */

    .ux-chip__close {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      margin-right: -6px;
      margin-left: 2px;
      padding: 0;
      border: none;
      background: rgba(0, 0, 0, 0.1);
      border-radius: 50%;
      cursor: pointer;
      transition: background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-chip__close:hover {
      background: rgba(0, 0, 0, 0.2);
    }

    .ux-chip__close svg {
      width: 12px;
      height: 12px;
    }

    .ux-chip--filled .ux-chip__close,
    .ux-chip--selected .ux-chip__close {
      background: rgba(255, 255, 255, 0.2);
    }

    .ux-chip--filled .ux-chip__close:hover,
    .ux-chip--selected .ux-chip__close:hover {
      background: rgba(255, 255, 255, 0.3);
    }

    /* ========================================
       Chip Group
    ======================================== */

    .ux-chip-group {
      display: flex;
      flex-wrap: wrap;
      gap: var(--ux-space-sm);
    }

    .ux-chip-group--scroll {
      flex-wrap: nowrap;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      -ms-overflow-style: none;
      padding-bottom: var(--ux-space-xs);
    }

    .ux-chip-group--scroll::-webkit-scrollbar {
      display: none;
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-chip-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-chip-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for selectable chips
  const chipComponent = () => ({
    selected: false,

    toggle() {
      this.selected = !this.selected;
    },

    select() {
      this.selected = true;
    },

    deselect() {
      this.selected = false;
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxChip', chipComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxChip', chipComponent);
    });
  }

  // Alpine component for chip group (single/multi select)
  const chipGroupComponent = (config = {}) => ({
    multiple: config.multiple || false,
    selected: config.multiple ? [] : null,

    isSelected(value) {
      if (this.multiple) {
        return this.selected.includes(value);
      }
      return this.selected === value;
    },

    toggle(value) {
      if (this.multiple) {
        const index = this.selected.indexOf(value);
        if (index === -1) {
          this.selected.push(value);
        } else {
          this.selected.splice(index, 1);
        }
      } else {
        this.selected = this.selected === value ? null : value;
      }
    },

    select(value) {
      if (this.multiple) {
        if (!this.selected.includes(value)) {
          this.selected.push(value);
        }
      } else {
        this.selected = value;
      }
    },

    clear() {
      this.selected = this.multiple ? [] : null;
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxChipGroup', chipGroupComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxChipGroup', chipGroupComponent);
    });
  }
})();
/**
 * UX Spinner Component
 * Indicadores de carga animados
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Spinner
    ======================================== */

    .ux-spinner {
      display: inline-block;
      width: 28px;
      height: 28px;
      border: 3px solid rgba(var(--ux-primary-rgb), 0.2);
      border-top-color: var(--ux-primary);
      border-radius: 50%;
      animation: ux-spinner-rotate 0.8s linear infinite;
    }

    @keyframes ux-spinner-rotate {
      to {
        transform: rotate(360deg);
      }
    }

    /* ========================================
       Sizes
    ======================================== */

    .ux-spinner--xs {
      width: 16px;
      height: 16px;
      border-width: 2px;
    }

    .ux-spinner--sm {
      width: 20px;
      height: 20px;
      border-width: 2px;
    }

    .ux-spinner--lg {
      width: 40px;
      height: 40px;
      border-width: 4px;
    }

    .ux-spinner--xl {
      width: 56px;
      height: 56px;
      border-width: 5px;
    }

    /* ========================================
       Color Variants
    ======================================== */

    .ux-spinner--primary {
      border-color: rgba(var(--ux-primary-rgb), 0.2);
      border-top-color: var(--ux-primary);
    }

    .ux-spinner--secondary {
      border-color: rgba(var(--ux-secondary-rgb), 0.2);
      border-top-color: var(--ux-secondary);
    }

    .ux-spinner--tertiary {
      border-color: rgba(var(--ux-tertiary-rgb), 0.2);
      border-top-color: var(--ux-tertiary);
    }

    .ux-spinner--success {
      border-color: rgba(var(--ux-success-rgb), 0.2);
      border-top-color: var(--ux-success);
    }

    .ux-spinner--warning {
      border-color: rgba(var(--ux-warning-rgb), 0.2);
      border-top-color: var(--ux-warning);
    }

    .ux-spinner--danger {
      border-color: rgba(var(--ux-danger-rgb), 0.2);
      border-top-color: var(--ux-danger);
    }

    .ux-spinner--dark {
      border-color: rgba(var(--ux-dark-rgb), 0.2);
      border-top-color: var(--ux-dark);
    }

    .ux-spinner--light {
      border-color: rgba(255, 255, 255, 0.2);
      border-top-color: #ffffff;
    }

    .ux-spinner--white {
      border-color: rgba(255, 255, 255, 0.3);
      border-top-color: #ffffff;
    }

    /* ========================================
       Dots Spinner
    ======================================== */

    .ux-spinner--dots {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      width: auto;
      height: auto;
      border: none;
      animation: none;
    }

    .ux-spinner--dots span {
      width: 8px;
      height: 8px;
      background-color: var(--ux-primary);
      border-radius: 50%;
      animation: ux-spinner-dots 1.4s ease-in-out infinite both;
    }

    .ux-spinner--dots span:nth-child(1) {
      animation-delay: -0.32s;
    }

    .ux-spinner--dots span:nth-child(2) {
      animation-delay: -0.16s;
    }

    @keyframes ux-spinner-dots {
      0%, 80%, 100% {
        transform: scale(0);
        opacity: 0.5;
      }
      40% {
        transform: scale(1);
        opacity: 1;
      }
    }

    .ux-spinner--dots.ux-spinner--sm span {
      width: 6px;
      height: 6px;
    }

    .ux-spinner--dots.ux-spinner--lg span {
      width: 12px;
      height: 12px;
    }

    /* ========================================
       Bars Spinner
    ======================================== */

    .ux-spinner--bars {
      display: inline-flex;
      align-items: center;
      gap: 3px;
      width: auto;
      height: 28px;
      border: none;
      animation: none;
    }

    .ux-spinner--bars span {
      width: 4px;
      height: 100%;
      background-color: var(--ux-primary);
      border-radius: 2px;
      animation: ux-spinner-bars 1.2s ease-in-out infinite;
    }

    .ux-spinner--bars span:nth-child(1) { animation-delay: -1.2s; }
    .ux-spinner--bars span:nth-child(2) { animation-delay: -1.1s; }
    .ux-spinner--bars span:nth-child(3) { animation-delay: -1.0s; }
    .ux-spinner--bars span:nth-child(4) { animation-delay: -0.9s; }

    @keyframes ux-spinner-bars {
      0%, 40%, 100% {
        transform: scaleY(0.4);
      }
      20% {
        transform: scaleY(1);
      }
    }

    /* ========================================
       Circular Progress (iOS style)
    ======================================== */

    .ux-spinner--ios {
      width: 20px;
      height: 20px;
      border: none;
      animation: none;
    }

    .ux-spinner--ios svg {
      width: 100%;
      height: 100%;
      animation: ux-spinner-ios 1s steps(12) infinite;
    }

    @keyframes ux-spinner-ios {
      to {
        transform: rotate(360deg);
      }
    }

    /* ========================================
       Spinner Container
    ======================================== */

    .ux-spinner-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--ux-space-md);
      padding: var(--ux-space-xl);
    }

    .ux-spinner-container__text {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
    }

    /* ========================================
       Full Page Spinner
    ======================================== */

    .ux-spinner-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(var(--ux-background-rgb), 0.8);
      z-index: var(--ux-z-modal);
      backdrop-filter: blur(2px);
      -webkit-backdrop-filter: blur(2px);
    }

    /* ========================================
       Inline Spinner (for buttons, inputs)
    ======================================== */

    .ux-spinner--inline {
      vertical-align: middle;
      margin-right: var(--ux-space-sm);
    }

    /* ========================================
       Paused State
    ======================================== */

    .ux-spinner--paused,
    .ux-spinner--paused span {
      animation-play-state: paused;
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-spinner-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-spinner-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for spinner with loading state
  const spinnerComponent = (config = {}) => ({
    visible: config.visible !== undefined ? config.visible : true,
    text: config.text || '',

    show(text = '') {
      this.text = text;
      this.visible = true;
    },

    hide() {
      this.visible = false;
    },

    toggle() {
      this.visible = !this.visible;
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxSpinner', spinnerComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxSpinner', spinnerComponent);
    });
  }
})();
/**
 * UX Progress Component
 * Barras de progreso y indicadores
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Progress Bar
    ======================================== */

    .ux-progress {
      width: 100%;
      height: 4px;
      background-color: var(--ux-light);
      border-radius: 2px;
      overflow: hidden;
    }

    .ux-progress__bar {
      height: 100%;
      background-color: var(--ux-primary);
      border-radius: 2px;
      transition: width var(--ux-transition-base) var(--ux-ease);
    }

    /* ========================================
       Sizes
    ======================================== */

    .ux-progress--sm {
      height: 2px;
    }

    .ux-progress--md {
      height: 8px;
      border-radius: 4px;
    }

    .ux-progress--md .ux-progress__bar {
      border-radius: 4px;
    }

    .ux-progress--lg {
      height: 12px;
      border-radius: 6px;
    }

    .ux-progress--lg .ux-progress__bar {
      border-radius: 6px;
    }

    /* ========================================
       Color Variants
    ======================================== */

    .ux-progress--primary .ux-progress__bar {
      background-color: var(--ux-primary);
    }

    .ux-progress--secondary .ux-progress__bar {
      background-color: var(--ux-secondary);
    }

    .ux-progress--tertiary .ux-progress__bar {
      background-color: var(--ux-tertiary);
    }

    .ux-progress--success .ux-progress__bar {
      background-color: var(--ux-success);
    }

    .ux-progress--warning .ux-progress__bar {
      background-color: var(--ux-warning);
    }

    .ux-progress--danger .ux-progress__bar {
      background-color: var(--ux-danger);
    }

    /* ========================================
       Indeterminate Animation
    ======================================== */

    .ux-progress--indeterminate .ux-progress__bar {
      width: 30% !important;
      animation: ux-progress-indeterminate 1.5s ease-in-out infinite;
    }

    @keyframes ux-progress-indeterminate {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(400%);
      }
    }

    /* ========================================
       Striped Animation
    ======================================== */

    .ux-progress--striped .ux-progress__bar {
      background-image: linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.15) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.15) 50%,
        rgba(255, 255, 255, 0.15) 75%,
        transparent 75%,
        transparent
      );
      background-size: 1rem 1rem;
    }

    .ux-progress--animated .ux-progress__bar {
      animation: ux-progress-striped 1s linear infinite;
    }

    @keyframes ux-progress-striped {
      0% {
        background-position: 1rem 0;
      }
      100% {
        background-position: 0 0;
      }
    }

    /* ========================================
       With Label
    ======================================== */

    .ux-progress-container {
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-xs);
    }

    .ux-progress-container__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .ux-progress-container__label {
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      color: var(--ux-text);
    }

    .ux-progress-container__value {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
    }

    /* ========================================
       Buffer (for video players)
    ======================================== */

    .ux-progress--buffer {
      position: relative;
    }

    .ux-progress--buffer .ux-progress__buffer {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      background-color: rgba(var(--ux-primary-rgb), 0.3);
      border-radius: 2px;
    }

    .ux-progress--buffer .ux-progress__bar {
      position: relative;
      z-index: 1;
    }

    /* ========================================
       Circular Progress
    ======================================== */

    .ux-progress-circular {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .ux-progress-circular svg {
      transform: rotate(-90deg);
    }

    .ux-progress-circular__track {
      fill: none;
      stroke: var(--ux-light);
    }

    .ux-progress-circular__bar {
      fill: none;
      stroke: var(--ux-primary);
      stroke-linecap: round;
      transition: stroke-dashoffset var(--ux-transition-slow) var(--ux-ease);
    }

    .ux-progress-circular__value {
      position: absolute;
      font-size: var(--ux-font-size-sm);
      font-weight: 600;
      color: var(--ux-text);
    }

    /* Circular Sizes */
    .ux-progress-circular--sm {
      width: 32px;
      height: 32px;
    }

    .ux-progress-circular--sm .ux-progress-circular__value {
      font-size: var(--ux-font-size-xs);
    }

    .ux-progress-circular--md {
      width: 48px;
      height: 48px;
    }

    .ux-progress-circular--lg {
      width: 64px;
      height: 64px;
    }

    .ux-progress-circular--lg .ux-progress-circular__value {
      font-size: var(--ux-font-size-md);
    }

    .ux-progress-circular--xl {
      width: 96px;
      height: 96px;
    }

    .ux-progress-circular--xl .ux-progress-circular__value {
      font-size: var(--ux-font-size-xl);
    }

    /* Circular Indeterminate */
    .ux-progress-circular--indeterminate svg {
      animation: ux-progress-circular-rotate 2s linear infinite;
    }

    .ux-progress-circular--indeterminate .ux-progress-circular__bar {
      animation: ux-progress-circular-dash 1.5s ease-in-out infinite;
      stroke-dasharray: 90, 150;
      stroke-dashoffset: 0;
    }

    @keyframes ux-progress-circular-rotate {
      100% {
        transform: rotate(270deg);
      }
    }

    @keyframes ux-progress-circular-dash {
      0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
      }
      50% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -40;
      }
      100% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -120;
      }
    }

    /* Circular Colors */
    .ux-progress-circular--success .ux-progress-circular__bar {
      stroke: var(--ux-success);
    }

    .ux-progress-circular--warning .ux-progress-circular__bar {
      stroke: var(--ux-warning);
    }

    .ux-progress-circular--danger .ux-progress-circular__bar {
      stroke: var(--ux-danger);
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-progress-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-progress-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for progress
  const progressComponent = (config = {}) => ({
    value: config.value || 0,
    max: config.max || 100,
    buffer: config.buffer || 0,

    get percent() {
      return Math.min(100, Math.max(0, (this.value / this.max) * 100));
    },

    get bufferPercent() {
      return Math.min(100, Math.max(0, (this.buffer / this.max) * 100));
    },

    set(value) {
      this.value = Math.min(this.max, Math.max(0, value));
    },

    increment(amount = 1) {
      this.set(this.value + amount);
    },

    decrement(amount = 1) {
      this.set(this.value - amount);
    },

    reset() {
      this.value = 0;
    },

    complete() {
      this.value = this.max;
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxProgress', progressComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxProgress', progressComponent);
    });
  }
})();
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
      width: 40px;
      height: 40px;
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
      width: 24px;
      height: 24px;
      font-size: var(--ux-font-size-xs);
    }

    .ux-avatar--sm {
      width: 32px;
      height: 32px;
      font-size: var(--ux-font-size-sm);
    }

    .ux-avatar--md {
      width: 48px;
      height: 48px;
      font-size: var(--ux-font-size-lg);
    }

    .ux-avatar--lg {
      width: 64px;
      height: 64px;
      font-size: var(--ux-font-size-xl);
    }

    .ux-avatar--xl {
      width: 96px;
      height: 96px;
      font-size: var(--ux-font-size-3xl);
    }

    .ux-avatar--2xl {
      width: 128px;
      height: 128px;
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
    }

    .ux-avatar-group .ux-avatar {
      margin-left: -12px;
      border: 2px solid var(--ux-background);
      transition: transform var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-avatar-group .ux-avatar:last-child {
      margin-left: 0;
    }

    .ux-avatar-group .ux-avatar:hover {
      transform: translateY(-4px);
      z-index: 1;
    }

    .ux-avatar-group--sm .ux-avatar {
      margin-left: -8px;
    }

    .ux-avatar-group--lg .ux-avatar {
      margin-left: -16px;
    }

    /* Avatar Group Counter */
    .ux-avatar-group__more {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      margin-left: -12px;
      border-radius: 50%;
      background-color: var(--ux-light);
      color: var(--ux-text);
      font-size: var(--ux-font-size-sm);
      font-weight: 600;
      border: 2px solid var(--ux-background);
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
/**
 * UX Img Component
 * Componente de imagen con lazy loading, skeleton y manejo de errores estilo iOS
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Img Container
    ======================================== */

    .ux-img {
      position: relative;
      display: block;
      overflow: hidden;
      background-color: var(--ux-img-bg, var(--ux-light));
    }

    .ux-img--rounded {
      border-radius: var(--ux-border-radius);
    }

    .ux-img--circle {
      border-radius: 50%;
    }

    /* ========================================
       Image Element
    ======================================== */

    .ux-img__image {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: var(--ux-img-object-fit, cover);
      object-position: var(--ux-img-object-position, center);
      opacity: 0;
      transition: opacity var(--ux-transition-base) var(--ux-ease);
    }

    .ux-img--loaded .ux-img__image {
      opacity: 1;
    }

    /* Object fit variants */
    .ux-img--contain .ux-img__image {
      object-fit: contain;
    }

    .ux-img--cover .ux-img__image {
      object-fit: cover;
    }

    .ux-img--fill .ux-img__image {
      object-fit: fill;
    }

    .ux-img--none .ux-img__image {
      object-fit: none;
    }

    .ux-img--scale-down .ux-img__image {
      object-fit: scale-down;
    }

    /* ========================================
       Skeleton / Placeholder
    ======================================== */

    .ux-img__skeleton {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: var(--ux-img-skeleton-bg, var(--ux-light));
      overflow: hidden;
    }

    .ux-img__skeleton::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(255, 255, 255, 0.4) 50%,
        transparent 100%
      );
      transform: translateX(-100%);
      animation: ux-img-shimmer 1.5s infinite;
    }

    @keyframes ux-img-shimmer {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(100%);
      }
    }

    .ux-img--loaded .ux-img__skeleton,
    .ux-img--error .ux-img__skeleton {
      opacity: 0;
      pointer-events: none;
      transition: opacity var(--ux-transition-base) var(--ux-ease);
    }

    /* Placeholder icon */
    .ux-img__placeholder {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: var(--ux-text-tertiary);
      opacity: 0.5;
    }

    .ux-img__placeholder svg {
      width: 48px;
      height: 48px;
    }

    .ux-img--sm .ux-img__placeholder svg {
      width: 24px;
      height: 24px;
    }

    .ux-img--lg .ux-img__placeholder svg {
      width: 64px;
      height: 64px;
    }

    .ux-img--loaded .ux-img__placeholder {
      display: none;
    }

    /* ========================================
       Error State
    ======================================== */

    .ux-img__error {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: none;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--ux-space-sm);
      background-color: var(--ux-surface-alt);
      color: var(--ux-text-tertiary);
    }

    .ux-img--error .ux-img__error {
      display: flex;
    }

    .ux-img__error-icon {
      width: 32px;
      height: 32px;
      opacity: 0.5;
    }

    .ux-img--sm .ux-img__error-icon {
      width: 20px;
      height: 20px;
    }

    .ux-img--lg .ux-img__error-icon {
      width: 48px;
      height: 48px;
    }

    .ux-img__error-text {
      font-size: var(--ux-font-size-xs);
      text-align: center;
      max-width: 80%;
    }

    .ux-img--sm .ux-img__error-text {
      display: none;
    }

    /* ========================================
       Aspect Ratios
    ======================================== */

    .ux-img--square {
      aspect-ratio: 1 / 1;
    }

    .ux-img--video {
      aspect-ratio: 16 / 9;
    }

    .ux-img--portrait {
      aspect-ratio: 3 / 4;
    }

    .ux-img--landscape {
      aspect-ratio: 4 / 3;
    }

    .ux-img--wide {
      aspect-ratio: 21 / 9;
    }

    /* ========================================
       Sizes
    ======================================== */

    .ux-img--xs {
      width: 32px;
      height: 32px;
    }

    .ux-img--sm {
      width: 48px;
      height: 48px;
    }

    .ux-img--md {
      width: 80px;
      height: 80px;
    }

    .ux-img--lg {
      width: 120px;
      height: 120px;
    }

    .ux-img--xl {
      width: 200px;
      height: 200px;
    }

    /* ========================================
       Dark Mode
    ======================================== */

    @media (prefers-color-scheme: dark) {
      .ux-img {
        --ux-img-bg: rgba(255, 255, 255, 0.1);
        --ux-img-skeleton-bg: rgba(255, 255, 255, 0.1);
      }

      .ux-img__skeleton::after {
        background: linear-gradient(
          90deg,
          transparent 0%,
          rgba(255, 255, 255, 0.15) 50%,
          transparent 100%
        );
      }
    }

    .ux-dark .ux-img {
      --ux-img-bg: rgba(255, 255, 255, 0.1);
      --ux-img-skeleton-bg: rgba(255, 255, 255, 0.1);
    }

    .ux-dark .ux-img__skeleton::after {
      background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(255, 255, 255, 0.15) 50%,
        transparent 100%
      );
    }

    /* ========================================
       Blur-up / LQIP (Low Quality Image Placeholder)
    ======================================== */

    .ux-img__lqip {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-size: cover;
      background-position: center;
      filter: blur(20px);
      transform: scale(1.1);
      transition: opacity var(--ux-transition-base) var(--ux-ease);
    }

    .ux-img--loaded .ux-img__lqip {
      opacity: 0;
      pointer-events: none;
    }

    /* ========================================
       Fade-in Animation
    ======================================== */

    .ux-img--fade .ux-img__image {
      transition: opacity 0.5s var(--ux-ease);
    }

    .ux-img--zoom .ux-img__image {
      transform: scale(1.05);
      transition: opacity 0.5s var(--ux-ease), transform 0.5s var(--ux-ease);
    }

    .ux-img--zoom.ux-img--loaded .ux-img__image {
      transform: scale(1);
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-img-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-img-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Intersection Observer for lazy loading
  let observer = null;

  function getObserver() {
    if (observer) return observer;

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const event = new CustomEvent('ux-img:visible', { bubbles: true });
            img.dispatchEvent(event);
            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.01
      });
    }

    return observer;
  }

  // Alpine component
  const imgComponent = (config = {}) => ({
    src: config.src || '',
    alt: config.alt || '',
    lqip: config.lqip || '', // Low quality image placeholder URL
    lazy: config.lazy !== false, // Lazy load by default
    state: 'loading', // loading | loaded | error

    get isLoading() { return this.state === 'loading'; },
    get isLoaded() { return this.state === 'loaded'; },
    get isError() { return this.state === 'error'; },

    get containerClass() {
      return {
        'ux-img--loaded': this.isLoaded,
        'ux-img--error': this.isError
      };
    },

    init() {
      if (this.lazy) {
        const obs = getObserver();
        if (obs) {
          obs.observe(this.$el);
          this.$el.addEventListener('ux-img:visible', () => {
            this.loadImage();
          }, { once: true });
        } else {
          // Fallback: load immediately if IntersectionObserver not available
          this.loadImage();
        }
      } else {
        this.loadImage();
      }
    },

    loadImage() {
      if (!this.src) {
        this.state = 'error';
        return;
      }

      const img = new Image();

      img.onload = () => {
        this.state = 'loaded';
        this.$dispatch('ux-img:load', { src: this.src });
      };

      img.onerror = () => {
        this.state = 'error';
        this.$dispatch('ux-img:error', { src: this.src });
      };

      img.src = this.src;
    },

    reload() {
      this.state = 'loading';
      this.loadImage();
    },

    setSrc(newSrc) {
      this.src = newSrc;
      this.state = 'loading';
      this.loadImage();
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxImg', imgComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxImg', imgComponent);
    });
  }

  // Directive for simpler usage
  document.addEventListener('alpine:init', () => {
    Alpine.directive('img', (el, { expression, modifiers }, { evaluate, effect }) => {
      const src = expression ? evaluate(expression) : el.dataset.src;
      const lazy = !modifiers.includes('eager');

      if (!src) return;

      el.classList.add('ux-img');

      // Create skeleton
      const skeleton = document.createElement('div');
      skeleton.className = 'ux-img__skeleton';
      el.appendChild(skeleton);

      // Create image
      const img = document.createElement('img');
      img.className = 'ux-img__image';
      img.alt = el.dataset.alt || '';
      el.appendChild(img);

      // Create error state
      const error = document.createElement('div');
      error.className = 'ux-img__error';
      error.innerHTML = `
        <svg class="ux-img__error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
        </svg>
      `;
      el.appendChild(error);

      function loadImage() {
        img.onload = () => {
          el.classList.add('ux-img--loaded');
          el.classList.remove('ux-img--error');
        };

        img.onerror = () => {
          el.classList.add('ux-img--error');
          el.classList.remove('ux-img--loaded');
        };

        img.src = src;
      }

      if (lazy && 'IntersectionObserver' in window) {
        const obs = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              loadImage();
              obs.unobserve(el);
            }
          });
        }, { rootMargin: '50px 0px', threshold: 0.01 });
        obs.observe(el);
      } else {
        loadImage();
      }
    });
  });
})();
/**
 * UX Input Component
 * Campos de texto estilo Ionic con labels flotantes
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Input - Base Styles (direct on input)
    ======================================== */

    input.ux-input,
    textarea.ux-input,
    select.ux-input {
      width: 100%;
      min-height: var(--ux-touch-target);
      padding: var(--ux-space-md) var(--ux-space-lg);
      font-family: var(--ux-font-family);
      font-size: 16px;
      line-height: 1.5;
      color: var(--ux-text);
      background-color: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius);
      outline: none;
      transition:
        border-color var(--ux-transition-fast) var(--ux-ease),
        box-shadow var(--ux-transition-fast) var(--ux-ease),
        background-color var(--ux-transition-fast) var(--ux-ease);
      -webkit-appearance: none;
      appearance: none;
    }

    input.ux-input::placeholder,
    textarea.ux-input::placeholder {
      color: var(--ux-text-tertiary);
    }

    input.ux-input:hover,
    textarea.ux-input:hover,
    select.ux-input:hover {
      border-color: var(--ux-medium);
    }

    input.ux-input:focus,
    textarea.ux-input:focus,
    select.ux-input:focus {
      border-color: var(--ux-primary);
      box-shadow: 0 0 0 3px rgba(var(--ux-primary-rgb), 0.15);
    }

    input.ux-input:disabled,
    textarea.ux-input:disabled,
    select.ux-input:disabled {
      background-color: var(--ux-light);
      color: var(--ux-text-tertiary);
      cursor: not-allowed;
      opacity: 0.6;
    }

    input.ux-input[readonly],
    textarea.ux-input[readonly] {
      background-color: var(--ux-light);
      cursor: default;
    }

    /* Size variants for direct input */
    input.ux-input--sm,
    textarea.ux-input--sm {
      min-height: var(--ux-touch-target-sm);
      padding: var(--ux-space-sm) var(--ux-space-md);
      font-size: var(--ux-font-size-sm);
    }

    input.ux-input--lg,
    textarea.ux-input--lg {
      min-height: 52px;
      padding: var(--ux-space-lg) var(--ux-space-xl);
      font-size: var(--ux-font-size-lg);
    }

    /* Variant styles for direct input */
    input.ux-input--filled,
    textarea.ux-input--filled {
      background-color: var(--ux-surface-secondary);
      border-color: transparent;
      border-radius: var(--ux-border-radius) var(--ux-border-radius) 0 0;
      border-bottom: 2px solid var(--ux-border-color);
    }

    input.ux-input--filled:focus,
    textarea.ux-input--filled:focus {
      border-bottom-color: var(--ux-primary);
      box-shadow: none;
    }

    input.ux-input--outline,
    textarea.ux-input--outline {
      background-color: transparent;
    }

    input.ux-input--underline,
    textarea.ux-input--underline {
      background-color: transparent;
      border: none;
      border-bottom: 1px solid var(--ux-border-color);
      border-radius: 0;
      padding-left: 0;
      padding-right: 0;
    }

    input.ux-input--underline:focus,
    textarea.ux-input--underline:focus {
      border-bottom-color: var(--ux-primary);
      border-bottom-width: 2px;
      box-shadow: none;
    }

    /* Textarea specific */
    textarea.ux-input {
      min-height: 100px;
      resize: vertical;
    }

    /* ========================================
       UX Input Group (wrapper structure)
    ======================================== */

    .ux-input-group {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    .ux-input-group--horizontal {
      flex-direction: row;
      align-items: stretch;
    }

    /* ========================================
       Label
    ======================================== */

    .ux-input__label {
      display: block;
      margin-bottom: var(--ux-space-xs);
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      color: var(--ux-text-secondary);
    }

    .ux-input__label--required::after {
      content: ' *';
      color: var(--ux-danger);
    }

    /* ========================================
       Helper & Error Text
    ======================================== */

    .ux-input__helper {
      margin-top: var(--ux-space-xs);
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
    }

    .ux-input__error {
      margin-top: var(--ux-space-xs);
      font-size: var(--ux-font-size-sm);
      color: var(--ux-danger);
    }

    .ux-input__counter {
      margin-top: var(--ux-space-xs);
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-tertiary);
      text-align: right;
    }

    /* ========================================
       Validation States
    ======================================== */

    .ux-input-group--error .ux-input,
    .ux-input-group--error input.ux-input {
      border-color: var(--ux-danger);
    }

    .ux-input-group--error .ux-input:focus,
    .ux-input-group--error input.ux-input:focus {
      box-shadow: 0 0 0 3px rgba(var(--ux-danger-rgb), 0.15);
    }

    .ux-input-group--error .ux-input__label {
      color: var(--ux-danger);
    }

    .ux-input-group--success .ux-input,
    .ux-input-group--success input.ux-input {
      border-color: var(--ux-success);
    }

    .ux-input-group--success .ux-input:focus,
    .ux-input-group--success input.ux-input:focus {
      box-shadow: 0 0 0 3px rgba(var(--ux-success-rgb), 0.15);
    }

    .ux-input-group--warning .ux-input,
    .ux-input-group--warning input.ux-input {
      border-color: var(--ux-warning);
    }

    /* ========================================
       Floating Label
    ======================================== */

    .ux-input-group--floating {
      position: relative;
    }

    .ux-input-group--floating .ux-input {
      padding-top: 24px;
      padding-bottom: 8px;
    }

    .ux-input-group--floating .ux-input__label {
      position: absolute;
      top: 50%;
      left: var(--ux-space-lg);
      transform: translateY(-50%);
      margin: 0;
      font-size: var(--ux-font-size-md);
      color: var(--ux-text-tertiary);
      pointer-events: none;
      transition:
        top var(--ux-transition-fast) var(--ux-ease),
        font-size var(--ux-transition-fast) var(--ux-ease),
        color var(--ux-transition-fast) var(--ux-ease),
        transform var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-input-group--floating .ux-input:focus ~ .ux-input__label,
    .ux-input-group--floating .ux-input:not(:placeholder-shown) ~ .ux-input__label {
      top: 12px;
      transform: translateY(0);
      font-size: var(--ux-font-size-xs);
      color: var(--ux-primary);
    }

    /* ========================================
       Input Wrapper (for icons, password toggle)
    ======================================== */

    .ux-input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
    }

    .ux-input-wrapper .ux-input {
      width: 100%;
    }

    .ux-input__icon {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      color: var(--ux-text-tertiary);
      pointer-events: none;
    }

    .ux-input__icon svg {
      width: 100%;
      height: 100%;
    }

    .ux-input-wrapper--icon-start .ux-input__icon {
      left: var(--ux-space-md);
    }

    .ux-input-wrapper--icon-start .ux-input {
      padding-left: calc(var(--ux-space-lg) + 24px);
    }

    .ux-input-wrapper--icon-end .ux-input__icon {
      right: var(--ux-space-md);
    }

    .ux-input-wrapper--icon-end .ux-input {
      padding-right: calc(var(--ux-space-lg) + 24px);
    }

    /* ========================================
       Password Toggle
    ======================================== */

    .ux-input-password {
      position: relative;
      width: 100%;
    }

    .ux-input-password .ux-input {
      padding-right: calc(var(--ux-space-lg) + 32px);
    }

    .ux-input-password__toggle {
      position: absolute;
      top: 50%;
      right: var(--ux-space-md);
      transform: translateY(-50%);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      padding: 0;
      border: none;
      background: transparent;
      color: var(--ux-text-tertiary);
      cursor: pointer;
      border-radius: var(--ux-border-radius-sm);
      transition: color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-input-password__toggle:hover {
      color: var(--ux-text-secondary);
    }

    .ux-input-password__toggle svg {
      width: 20px;
      height: 20px;
    }

    /* ========================================
       Clearable
    ======================================== */

    .ux-input__clear {
      position: absolute;
      top: 50%;
      right: var(--ux-space-md);
      transform: translateY(-50%);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      padding: 0;
      border: none;
      background: var(--ux-medium);
      border-radius: 50%;
      color: white;
      cursor: pointer;
      opacity: 0;
      transition: opacity var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-input__clear svg {
      width: 12px;
      height: 12px;
    }

    .ux-input:not(:placeholder-shown) ~ .ux-input__clear {
      opacity: 1;
    }

    .ux-input-wrapper--clearable .ux-input {
      padding-right: calc(var(--ux-space-lg) + 28px);
    }

    /* ========================================
       Addon (prefixes/suffixes)
    ======================================== */

    .ux-input-group--horizontal .ux-input {
      flex: 1;
      border-radius: 0;
    }

    .ux-input-group--horizontal .ux-input:first-child,
    .ux-input-group--horizontal .ux-input-wrapper:first-child .ux-input {
      border-radius: var(--ux-border-radius) 0 0 var(--ux-border-radius);
    }

    .ux-input-group--horizontal .ux-input:last-child,
    .ux-input-group--horizontal .ux-input-wrapper:last-child .ux-input {
      border-radius: 0 var(--ux-border-radius) var(--ux-border-radius) 0;
    }

    .ux-input-group__addon {
      display: flex;
      align-items: center;
      padding: 0 var(--ux-space-md);
      background-color: var(--ux-surface-secondary);
      border: 1px solid var(--ux-border-color);
      color: var(--ux-text-secondary);
      font-size: var(--ux-font-size-sm);
      white-space: nowrap;
    }

    .ux-input-group__addon:first-child {
      border-right: none;
      border-radius: var(--ux-border-radius) 0 0 var(--ux-border-radius);
    }

    .ux-input-group__addon:last-child {
      border-left: none;
      border-radius: 0 var(--ux-border-radius) var(--ux-border-radius) 0;
    }

    /* ========================================
       Date/Time Input Icons (Native Browser)
    ======================================== */

    /* Webkit browsers (Chrome, Safari, Edge) */
    input.ux-input[type="date"]::-webkit-calendar-picker-indicator,
    input.ux-input[type="time"]::-webkit-calendar-picker-indicator,
    input.ux-input[type="datetime-local"]::-webkit-calendar-picker-indicator,
    input.ux-input[type="month"]::-webkit-calendar-picker-indicator,
    input.ux-input[type="week"]::-webkit-calendar-picker-indicator {
      cursor: pointer;
      opacity: 0.6;
      filter: var(--ux-icon-filter, none);
      transition: opacity var(--ux-transition-fast) var(--ux-ease);
    }

    input.ux-input[type="date"]::-webkit-calendar-picker-indicator:hover,
    input.ux-input[type="time"]::-webkit-calendar-picker-indicator:hover,
    input.ux-input[type="datetime-local"]::-webkit-calendar-picker-indicator:hover,
    input.ux-input[type="month"]::-webkit-calendar-picker-indicator:hover,
    input.ux-input[type="week"]::-webkit-calendar-picker-indicator:hover {
      opacity: 1;
    }

    /* Dark mode support for date/time icons */
    .ux-dark input.ux-input[type="date"]::-webkit-calendar-picker-indicator,
    .ux-dark input.ux-input[type="time"]::-webkit-calendar-picker-indicator,
    .ux-dark input.ux-input[type="datetime-local"]::-webkit-calendar-picker-indicator,
    .ux-dark input.ux-input[type="month"]::-webkit-calendar-picker-indicator,
    .ux-dark input.ux-input[type="week"]::-webkit-calendar-picker-indicator {
      filter: invert(1);
    }

    /* Also support data-theme dark */
    [data-theme="dark"] input.ux-input[type="date"]::-webkit-calendar-picker-indicator,
    [data-theme="dark"] input.ux-input[type="time"]::-webkit-calendar-picker-indicator,
    [data-theme="dark"] input.ux-input[type="datetime-local"]::-webkit-calendar-picker-indicator,
    [data-theme="dark"] input.ux-input[type="month"]::-webkit-calendar-picker-indicator,
    [data-theme="dark"] input.ux-input[type="week"]::-webkit-calendar-picker-indicator {
      filter: invert(1);
    }

    /* Match color with text-tertiary using CSS filters */
    input.ux-input[type="date"]::-webkit-calendar-picker-indicator,
    input.ux-input[type="time"]::-webkit-calendar-picker-indicator,
    input.ux-input[type="datetime-local"]::-webkit-calendar-picker-indicator,
    input.ux-input[type="month"]::-webkit-calendar-picker-indicator,
    input.ux-input[type="week"]::-webkit-calendar-picker-indicator {
      /* Subtle gray filter to match text-tertiary color */
      filter: opacity(0.5);
    }

    .ux-dark input.ux-input[type="date"]::-webkit-calendar-picker-indicator,
    .ux-dark input.ux-input[type="time"]::-webkit-calendar-picker-indicator,
    .ux-dark input.ux-input[type="datetime-local"]::-webkit-calendar-picker-indicator,
    .ux-dark input.ux-input[type="month"]::-webkit-calendar-picker-indicator,
    .ux-dark input.ux-input[type="week"]::-webkit-calendar-picker-indicator,
    [data-theme="dark"] input.ux-input[type="date"]::-webkit-calendar-picker-indicator,
    [data-theme="dark"] input.ux-input[type="time"]::-webkit-calendar-picker-indicator,
    [data-theme="dark"] input.ux-input[type="datetime-local"]::-webkit-calendar-picker-indicator,
    [data-theme="dark"] input.ux-input[type="month"]::-webkit-calendar-picker-indicator,
    [data-theme="dark"] input.ux-input[type="week"]::-webkit-calendar-picker-indicator {
      filter: invert(1) opacity(0.6);
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-input-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-input-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for input with validation
  const inputComponent = (config = {}) => ({
    value: config.value || '',
    error: '',
    touched: false,
    maxLength: config.maxLength || null,

    get hasValue() {
      return this.value && this.value.length > 0;
    },

    get charCount() {
      return this.value ? this.value.length : 0;
    },

    get isValid() {
      return !this.error;
    },

    clear() {
      this.value = '';
      this.error = '';
    },

    validate(rules = []) {
      this.touched = true;
      for (const rule of rules) {
        const result = rule(this.value);
        if (result !== true) {
          this.error = result;
          return false;
        }
      }
      this.error = '';
      return true;
    },

    // Common validators
    required(message = 'This field is required') {
      return (value) => !!value && value.trim() !== '' ? true : message;
    },

    email(message = 'Please enter a valid email') {
      return (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? true : message;
    },

    minLength(min, message) {
      return (value) => value.length >= min ? true : (message || `Minimum ${min} characters`);
    },

    maxLengthValidator(max, message) {
      return (value) => value.length <= max ? true : (message || `Maximum ${max} characters`);
    }
  });

  // Alpine component for password input with toggle
  const passwordComponent = (config = {}) => ({
    value: config.value || '',
    showPassword: false,
    error: '',

    get inputType() {
      return this.showPassword ? 'text' : 'password';
    },

    toggle() {
      this.showPassword = !this.showPassword;
    },

    clear() {
      this.value = '';
      this.error = '';
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxInput', inputComponent);
    window.UX.registerComponent('uxPassword', passwordComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxInput', inputComponent);
      Alpine.data('uxPassword', passwordComponent);
    });
  }
})();
/**
 * UX Toggle Component
 * Toggle switches estilo iOS
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Toggle
    ======================================== */

    .ux-toggle {
      display: inline-flex;
      align-items: center;
      gap: var(--ux-space-md);
      cursor: pointer;
      user-select: none;
      -webkit-user-select: none;
    }

    .ux-toggle input[type="checkbox"] {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
      pointer-events: none;
    }

    .ux-toggle__track {
      position: relative;
      width: 51px;
      height: 31px;
      background-color: var(--ux-light-shade);
      border-radius: 31px;
      transition:
        background-color var(--ux-transition-base) var(--ux-ease);
      flex-shrink: 0;
    }

    .ux-toggle__thumb {
      position: absolute;
      top: 2px;
      left: 2px;
      width: 27px;
      height: 27px;
      background-color: white;
      border-radius: 50%;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      transition:
        transform var(--ux-transition-base) var(--ux-ease-spring),
        width var(--ux-transition-fast) var(--ux-ease);
    }

    /* Checked State */
    .ux-toggle input[type="checkbox"]:checked + .ux-toggle__track {
      background-color: var(--ux-success);
    }

    .ux-toggle input[type="checkbox"]:checked + .ux-toggle__track .ux-toggle__thumb {
      transform: translateX(20px);
    }

    /* Active State (press effect) */
    .ux-toggle input[type="checkbox"]:active + .ux-toggle__track .ux-toggle__thumb,
    .ux-toggle:active .ux-toggle__thumb {
      width: 31px;
    }

    .ux-toggle input[type="checkbox"]:checked:active + .ux-toggle__track .ux-toggle__thumb {
      transform: translateX(16px);
    }

    /* Focus State */
    .ux-toggle input[type="checkbox"]:focus-visible + .ux-toggle__track {
      outline: 2px solid var(--ux-primary);
      outline-offset: 2px;
    }

    /* Disabled State */
    .ux-toggle--disabled,
    .ux-toggle input[type="checkbox"]:disabled + .ux-toggle__track {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .ux-toggle input[type="checkbox"]:disabled + .ux-toggle__track .ux-toggle__thumb {
      box-shadow: none;
    }

    /* ========================================
       Color Variants
    ======================================== */

    .ux-toggle--primary input[type="checkbox"]:checked + .ux-toggle__track {
      background-color: var(--ux-primary);
    }

    .ux-toggle--secondary input[type="checkbox"]:checked + .ux-toggle__track {
      background-color: var(--ux-secondary);
    }

    .ux-toggle--tertiary input[type="checkbox"]:checked + .ux-toggle__track {
      background-color: var(--ux-tertiary);
    }

    .ux-toggle--success input[type="checkbox"]:checked + .ux-toggle__track {
      background-color: var(--ux-success);
    }

    .ux-toggle--warning input[type="checkbox"]:checked + .ux-toggle__track {
      background-color: var(--ux-warning);
    }

    .ux-toggle--danger input[type="checkbox"]:checked + .ux-toggle__track {
      background-color: var(--ux-danger);
    }

    /* ========================================
       Sizes
    ======================================== */

    .ux-toggle--sm .ux-toggle__track {
      width: 40px;
      height: 24px;
    }

    .ux-toggle--sm .ux-toggle__thumb {
      width: 20px;
      height: 20px;
    }

    .ux-toggle--sm input[type="checkbox"]:checked + .ux-toggle__track .ux-toggle__thumb {
      transform: translateX(16px);
    }

    .ux-toggle--sm input[type="checkbox"]:active + .ux-toggle__track .ux-toggle__thumb {
      width: 24px;
    }

    .ux-toggle--sm input[type="checkbox"]:checked:active + .ux-toggle__track .ux-toggle__thumb {
      transform: translateX(12px);
    }

    .ux-toggle--lg .ux-toggle__track {
      width: 64px;
      height: 38px;
    }

    .ux-toggle--lg .ux-toggle__thumb {
      width: 34px;
      height: 34px;
    }

    .ux-toggle--lg input[type="checkbox"]:checked + .ux-toggle__track .ux-toggle__thumb {
      transform: translateX(26px);
    }

    .ux-toggle--lg input[type="checkbox"]:active + .ux-toggle__track .ux-toggle__thumb {
      width: 38px;
    }

    /* ========================================
       Label
    ======================================== */

    .ux-toggle__label {
      font-size: var(--ux-font-size-md);
      color: var(--ux-text);
    }

    .ux-toggle__label--left {
      order: -1;
    }

    .ux-toggle__description {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin-top: var(--ux-space-xs);
    }

    /* ========================================
       With Icons
    ======================================== */

    .ux-toggle__track--icons {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 8px;
    }

    .ux-toggle__icon {
      width: 14px;
      height: 14px;
      color: white;
      opacity: 0.8;
      z-index: 0;
    }

    .ux-toggle__icon svg {
      width: 100%;
      height: 100%;
    }

    /* ========================================
       Toggle List Item
    ======================================== */

    .ux-toggle-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--ux-space-md) var(--ux-space-lg);
      background-color: var(--ux-surface);
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-toggle-item:last-child {
      border-bottom: none;
    }

    .ux-toggle-item__content {
      flex: 1;
      margin-right: var(--ux-space-md);
    }

    .ux-toggle-item__title {
      font-size: var(--ux-font-size-md);
      font-weight: 500;
      color: var(--ux-text);
    }

    .ux-toggle-item__subtitle {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin-top: var(--ux-space-xs);
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-toggle-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-toggle-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for toggle
  // ARIA: role="switch", aria-checked for toggle state
  const toggleComponent = (config = {}) => ({
    checked: config.checked || false,
    disabled: config.disabled || false,

    // ARIA attributes for toggle (when used without native checkbox)
    get ariaAttrs() {
      return {
        'role': 'switch',
        'aria-checked': this.checked ? 'true' : 'false',
        'aria-disabled': this.disabled ? 'true' : 'false'
      };
    },

    toggle() {
      if (!this.disabled) {
        this.checked = !this.checked;
      }
    },

    on() {
      if (!this.disabled) {
        this.checked = true;
      }
    },

    off() {
      if (!this.disabled) {
        this.checked = false;
      }
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxToggle', toggleComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxToggle', toggleComponent);
    });
  }
})();
/**
 * UX Checkbox Component
 * Checkboxes estilo Ionic
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Checkbox
    ======================================== */

    .ux-checkbox {
      display: inline-flex;
      align-items: flex-start;
      gap: var(--ux-space-md);
      cursor: pointer;
      user-select: none;
      -webkit-user-select: none;
      min-height: var(--ux-touch-target);
      padding: var(--ux-space-sm) 0;
    }

    .ux-checkbox__input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
    }

    .ux-checkbox__box {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      background-color: transparent;
      border: 2px solid var(--ux-medium);
      border-radius: var(--ux-border-radius-sm);
      transition:
        background-color var(--ux-transition-fast) var(--ux-ease),
        border-color var(--ux-transition-fast) var(--ux-ease),
        transform var(--ux-transition-fast) var(--ux-ease-spring);
      flex-shrink: 0;
    }

    .ux-checkbox__checkmark {
      display: none;
      width: 14px;
      height: 14px;
      color: white;
    }

    .ux-checkbox__checkmark svg {
      width: 100%;
      height: 100%;
    }

    /* Checked State */
    .ux-checkbox__input:checked + .ux-checkbox__box {
      background-color: var(--ux-primary);
      border-color: var(--ux-primary);
    }

    .ux-checkbox__input:checked + .ux-checkbox__box .ux-checkbox__checkmark {
      display: block;
      animation: ux-checkbox-check 0.2s var(--ux-ease-spring);
    }

    @keyframes ux-checkbox-check {
      0% {
        transform: scale(0);
        opacity: 0;
      }
      50% {
        transform: scale(1.2);
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }

    /* Hover State */
    .ux-checkbox:hover .ux-checkbox__box {
      border-color: var(--ux-primary);
    }

    /* Active State */
    .ux-checkbox:active .ux-checkbox__box {
      transform: scale(0.9);
    }

    /* Focus State */
    .ux-checkbox__input:focus-visible + .ux-checkbox__box {
      outline: 2px solid var(--ux-primary);
      outline-offset: 2px;
    }

    /* Disabled State */
    .ux-checkbox--disabled,
    .ux-checkbox__input:disabled + .ux-checkbox__box {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* Indeterminate State */
    .ux-checkbox__input:indeterminate + .ux-checkbox__box {
      background-color: var(--ux-primary);
      border-color: var(--ux-primary);
    }

    .ux-checkbox__input:indeterminate + .ux-checkbox__box .ux-checkbox__checkmark {
      display: none;
    }

    .ux-checkbox__input:indeterminate + .ux-checkbox__box::after {
      content: '';
      width: 12px;
      height: 2px;
      background-color: white;
      border-radius: 1px;
    }

    /* ========================================
       Color Variants
    ======================================== */

    .ux-checkbox--primary .ux-checkbox__input:checked + .ux-checkbox__box {
      background-color: var(--ux-primary);
      border-color: var(--ux-primary);
    }

    .ux-checkbox--secondary .ux-checkbox__input:checked + .ux-checkbox__box {
      background-color: var(--ux-secondary);
      border-color: var(--ux-secondary);
    }

    .ux-checkbox--tertiary .ux-checkbox__input:checked + .ux-checkbox__box {
      background-color: var(--ux-tertiary);
      border-color: var(--ux-tertiary);
    }

    .ux-checkbox--success .ux-checkbox__input:checked + .ux-checkbox__box {
      background-color: var(--ux-success);
      border-color: var(--ux-success);
    }

    .ux-checkbox--warning .ux-checkbox__input:checked + .ux-checkbox__box {
      background-color: var(--ux-warning);
      border-color: var(--ux-warning);
    }

    .ux-checkbox--danger .ux-checkbox__input:checked + .ux-checkbox__box {
      background-color: var(--ux-danger);
      border-color: var(--ux-danger);
    }

    /* ========================================
       Sizes
    ======================================== */

    .ux-checkbox--sm .ux-checkbox__box {
      width: 18px;
      height: 18px;
    }

    .ux-checkbox--sm .ux-checkbox__checkmark {
      width: 10px;
      height: 10px;
    }

    .ux-checkbox--lg .ux-checkbox__box {
      width: 28px;
      height: 28px;
    }

    .ux-checkbox--lg .ux-checkbox__checkmark {
      width: 18px;
      height: 18px;
    }

    /* ========================================
       Label
    ======================================== */

    .ux-checkbox__label {
      font-size: var(--ux-font-size-md);
      color: var(--ux-text);
      line-height: 1.4;
      padding-top: 2px;
    }

    .ux-checkbox__description {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin-top: var(--ux-space-xs);
    }

    /* ========================================
       Checkbox Group
    ======================================== */

    .ux-checkbox-group {
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-sm);
    }

    .ux-checkbox-group--horizontal {
      flex-direction: row;
      flex-wrap: wrap;
      gap: var(--ux-space-lg);
    }

    .ux-checkbox-group__label {
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      color: var(--ux-text-secondary);
      margin-bottom: var(--ux-space-sm);
    }

    /* ========================================
       Checkbox List Item
    ======================================== */

    .ux-checkbox-item {
      display: flex;
      align-items: center;
      padding: var(--ux-space-md) var(--ux-space-lg);
      background-color: var(--ux-surface);
      border-bottom: 1px solid var(--ux-border-color);
      cursor: pointer;
    }

    .ux-checkbox-item:last-child {
      border-bottom: none;
    }

    .ux-checkbox-item:active {
      background-color: var(--ux-surface-secondary);
    }

    .ux-checkbox-item__content {
      flex: 1;
      margin-left: var(--ux-space-md);
    }

    .ux-checkbox-item__title {
      font-size: var(--ux-font-size-md);
      color: var(--ux-text);
    }

    .ux-checkbox-item__subtitle {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin-top: var(--ux-space-xs);
    }

    /* ========================================
       Round Variant
    ======================================== */

    .ux-checkbox--round .ux-checkbox__box {
      border-radius: 50%;
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-checkbox-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-checkbox-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for checkbox
  const checkboxComponent = (config = {}) => ({
    checked: config.checked || false,
    indeterminate: config.indeterminate || false,
    disabled: config.disabled || false,

    toggle() {
      if (!this.disabled) {
        this.indeterminate = false;
        this.checked = !this.checked;
      }
    },

    check() {
      if (!this.disabled) {
        this.indeterminate = false;
        this.checked = true;
      }
    },

    uncheck() {
      if (!this.disabled) {
        this.indeterminate = false;
        this.checked = false;
      }
    },

    setIndeterminate() {
      this.indeterminate = true;
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxCheckbox', checkboxComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxCheckbox', checkboxComponent);
    });
  }

  // Alpine component for checkbox group
  const checkboxGroupComponent = (config = {}) => ({
    values: config.values || [],
    disabled: config.disabled || false,

    isChecked(value) {
      return this.values.includes(value);
    },

    toggle(value) {
      if (this.disabled) return;
      const index = this.values.indexOf(value);
      if (index === -1) {
        this.values.push(value);
      } else {
        this.values.splice(index, 1);
      }
    },

    checkAll(allValues) {
      if (!this.disabled) {
        this.values = [...allValues];
      }
    },

    uncheckAll() {
      if (!this.disabled) {
        this.values = [];
      }
    },

    get allChecked() {
      return this.values.length > 0;
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxCheckboxGroup', checkboxGroupComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxCheckboxGroup', checkboxGroupComponent);
    });
  }
})();
/**
 * UX Radio Component
 * Radio buttons estilo Ionic
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Radio
    ======================================== */

    .ux-radio {
      display: inline-flex;
      align-items: flex-start;
      gap: var(--ux-space-md);
      cursor: pointer;
      user-select: none;
      -webkit-user-select: none;
      min-height: var(--ux-touch-target);
      padding: var(--ux-space-sm) 0;
    }

    .ux-radio__input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
    }

    .ux-radio__circle {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      background-color: transparent;
      border: 2px solid var(--ux-medium);
      border-radius: 50%;
      transition:
        border-color var(--ux-transition-fast) var(--ux-ease),
        transform var(--ux-transition-fast) var(--ux-ease-spring);
      flex-shrink: 0;
    }

    .ux-radio__dot {
      width: 12px;
      height: 12px;
      background-color: var(--ux-primary);
      border-radius: 50%;
      transform: scale(0);
      transition: transform var(--ux-transition-fast) var(--ux-ease-spring);
    }

    /* Checked State */
    .ux-radio__input:checked + .ux-radio__circle {
      border-color: var(--ux-primary);
    }

    .ux-radio__input:checked + .ux-radio__circle .ux-radio__dot {
      transform: scale(1);
    }

    /* Hover State */
    .ux-radio:hover .ux-radio__circle {
      border-color: var(--ux-primary);
    }

    /* Active State */
    .ux-radio:active .ux-radio__circle {
      transform: scale(0.9);
    }

    /* Focus State */
    .ux-radio__input:focus-visible + .ux-radio__circle {
      outline: 2px solid var(--ux-primary);
      outline-offset: 2px;
    }

    /* Disabled State */
    .ux-radio--disabled,
    .ux-radio__input:disabled + .ux-radio__circle {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* ========================================
       Color Variants
    ======================================== */

    .ux-radio--primary .ux-radio__input:checked + .ux-radio__circle {
      border-color: var(--ux-primary);
    }

    .ux-radio--primary .ux-radio__dot {
      background-color: var(--ux-primary);
    }

    .ux-radio--secondary .ux-radio__input:checked + .ux-radio__circle {
      border-color: var(--ux-secondary);
    }

    .ux-radio--secondary .ux-radio__dot {
      background-color: var(--ux-secondary);
    }

    .ux-radio--tertiary .ux-radio__input:checked + .ux-radio__circle {
      border-color: var(--ux-tertiary);
    }

    .ux-radio--tertiary .ux-radio__dot {
      background-color: var(--ux-tertiary);
    }

    .ux-radio--success .ux-radio__input:checked + .ux-radio__circle {
      border-color: var(--ux-success);
    }

    .ux-radio--success .ux-radio__dot {
      background-color: var(--ux-success);
    }

    .ux-radio--warning .ux-radio__input:checked + .ux-radio__circle {
      border-color: var(--ux-warning);
    }

    .ux-radio--warning .ux-radio__dot {
      background-color: var(--ux-warning);
    }

    .ux-radio--danger .ux-radio__input:checked + .ux-radio__circle {
      border-color: var(--ux-danger);
    }

    .ux-radio--danger .ux-radio__dot {
      background-color: var(--ux-danger);
    }

    /* ========================================
       Sizes
    ======================================== */

    .ux-radio--sm .ux-radio__circle {
      width: 18px;
      height: 18px;
    }

    .ux-radio--sm .ux-radio__dot {
      width: 8px;
      height: 8px;
    }

    .ux-radio--lg .ux-radio__circle {
      width: 28px;
      height: 28px;
    }

    .ux-radio--lg .ux-radio__dot {
      width: 16px;
      height: 16px;
    }

    /* ========================================
       Label
    ======================================== */

    .ux-radio__label {
      font-size: var(--ux-font-size-md);
      color: var(--ux-text);
      line-height: 1.4;
      padding-top: 2px;
    }

    .ux-radio__description {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin-top: var(--ux-space-xs);
    }

    /* ========================================
       Radio Group
    ======================================== */

    .ux-radio-group {
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-sm);
    }

    .ux-radio-group--horizontal {
      flex-direction: row;
      flex-wrap: wrap;
      gap: var(--ux-space-lg);
    }

    .ux-radio-group__label {
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      color: var(--ux-text-secondary);
      margin-bottom: var(--ux-space-sm);
    }

    .ux-radio-group__error {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-danger);
      margin-top: var(--ux-space-xs);
    }

    /* ========================================
       Radio List Item
    ======================================== */

    .ux-radio-item {
      display: flex;
      align-items: center;
      padding: var(--ux-space-md) var(--ux-space-lg);
      background-color: var(--ux-surface);
      border-bottom: 1px solid var(--ux-border-color);
      cursor: pointer;
    }

    .ux-radio-item:last-child {
      border-bottom: none;
    }

    .ux-radio-item:active {
      background-color: var(--ux-surface-secondary);
    }

    .ux-radio-item--selected {
      background-color: rgba(var(--ux-primary-rgb), 0.08);
    }

    .ux-radio-item__content {
      flex: 1;
      margin-left: var(--ux-space-md);
    }

    .ux-radio-item__title {
      font-size: var(--ux-font-size-md);
      color: var(--ux-text);
    }

    .ux-radio-item__subtitle {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin-top: var(--ux-space-xs);
    }

    /* ========================================
       Radio Card (selectable cards)
    ======================================== */

    .ux-radio-card {
      position: relative;
      padding: var(--ux-space-lg);
      background-color: var(--ux-surface);
      border: 2px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius-lg);
      cursor: pointer;
      transition:
        border-color var(--ux-transition-fast) var(--ux-ease),
        background-color var(--ux-transition-fast) var(--ux-ease),
        transform var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-radio-card:hover {
      border-color: var(--ux-primary);
    }

    .ux-radio-card:active {
      transform: scale(0.98);
    }

    .ux-radio-card--selected {
      border-color: var(--ux-primary);
      background-color: rgba(var(--ux-primary-rgb), 0.05);
    }

    .ux-radio-card__check {
      position: absolute;
      top: var(--ux-space-md);
      right: var(--ux-space-md);
      width: 24px;
      height: 24px;
      background-color: var(--ux-primary);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      opacity: 0;
      transform: scale(0);
      transition:
        opacity var(--ux-transition-fast) var(--ux-ease),
        transform var(--ux-transition-fast) var(--ux-ease-spring);
    }

    .ux-radio-card--selected .ux-radio-card__check {
      opacity: 1;
      transform: scale(1);
    }

    .ux-radio-card__check svg {
      width: 14px;
      height: 14px;
    }

    .ux-radio-card__title {
      font-size: var(--ux-font-size-md);
      font-weight: 500;
      color: var(--ux-text);
      margin-bottom: var(--ux-space-xs);
    }

    .ux-radio-card__description {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
    }

    /* Radio Card Grid */
    .ux-radio-card-group {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: var(--ux-space-md);
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-radio-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-radio-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for radio group
  const radioGroupComponent = (config = {}) => ({
    value: config.value || null,
    disabled: config.disabled || false,
    error: '',

    select(newValue) {
      if (!this.disabled) {
        this.value = newValue;
        this.error = '';
      }
    },

    isSelected(checkValue) {
      return this.value === checkValue;
    },

    validate(required = false, message = 'Please select an option') {
      if (required && !this.value) {
        this.error = message;
        return false;
      }
      this.error = '';
      return true;
    },

    reset() {
      this.value = null;
      this.error = '';
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxRadioGroup', radioGroupComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxRadioGroup', radioGroupComponent);
    });
  }
})();
/**
 * UX Range Component
 * Sliders estilo iOS/Ionic
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Range
    ======================================== */

    .ux-range {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: var(--ux-space-sm) 0;
    }

    .ux-range__wrapper {
      position: relative;
      display: flex;
      align-items: center;
      gap: var(--ux-space-md);
      min-height: var(--ux-touch-target);
    }

    .ux-range__track-container {
      position: relative;
      flex: 1;
      height: 44px;
      display: flex;
      align-items: center;
    }

    .ux-range__track {
      position: absolute;
      width: 100%;
      height: 4px;
      background-color: var(--ux-light-shade);
      border-radius: 2px;
      overflow: hidden;
    }

    .ux-range__fill {
      position: absolute;
      height: 100%;
      background-color: var(--ux-primary);
      border-radius: 2px;
      transition: width 0.05s ease-out;
    }

    .ux-range__input {
      position: absolute;
      width: 100%;
      height: 44px;
      margin: 0;
      opacity: 0;
      cursor: pointer;
      z-index: 2;
      -webkit-tap-highlight-color: transparent;
    }

    .ux-range__thumb {
      position: absolute;
      width: 28px;
      height: 28px;
      background-color: white;
      border-radius: 50%;
      box-shadow:
        0 2px 4px rgba(0, 0, 0, 0.1),
        0 4px 8px rgba(0, 0, 0, 0.1);
      pointer-events: none;
      transition:
        transform var(--ux-transition-fast) var(--ux-ease-spring),
        box-shadow var(--ux-transition-fast) var(--ux-ease);
      transform: translateX(-50%);
      z-index: 1;
    }

    /* Active State */
    .ux-range__input:active ~ .ux-range__thumb {
      transform: translateX(-50%) scale(1.1);
      box-shadow:
        0 4px 8px rgba(0, 0, 0, 0.15),
        0 8px 16px rgba(0, 0, 0, 0.1);
    }

    /* Focus State */
    .ux-range__input:focus-visible ~ .ux-range__thumb {
      outline: 2px solid var(--ux-primary);
      outline-offset: 2px;
    }

    /* Disabled State */
    .ux-range--disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    .ux-range--disabled .ux-range__input {
      cursor: not-allowed;
    }

    /* ========================================
       Color Variants
    ======================================== */

    .ux-range--primary .ux-range__fill {
      background-color: var(--ux-primary);
    }

    .ux-range--secondary .ux-range__fill {
      background-color: var(--ux-secondary);
    }

    .ux-range--tertiary .ux-range__fill {
      background-color: var(--ux-tertiary);
    }

    .ux-range--success .ux-range__fill {
      background-color: var(--ux-success);
    }

    .ux-range--warning .ux-range__fill {
      background-color: var(--ux-warning);
    }

    .ux-range--danger .ux-range__fill {
      background-color: var(--ux-danger);
    }

    /* ========================================
       Sizes
    ======================================== */

    .ux-range--sm .ux-range__track {
      height: 2px;
    }

    .ux-range--sm .ux-range__thumb {
      width: 20px;
      height: 20px;
    }

    .ux-range--lg .ux-range__track {
      height: 6px;
      border-radius: 3px;
    }

    .ux-range--lg .ux-range__fill {
      border-radius: 3px;
    }

    .ux-range--lg .ux-range__thumb {
      width: 34px;
      height: 34px;
    }

    /* ========================================
       With Ticks
    ======================================== */

    .ux-range__ticks {
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      display: flex;
      justify-content: space-between;
      transform: translateY(-50%);
      pointer-events: none;
    }

    .ux-range__tick {
      width: 2px;
      height: 8px;
      background-color: var(--ux-medium);
      border-radius: 1px;
    }

    .ux-range__tick--active {
      background-color: var(--ux-primary);
    }

    /* ========================================
       Labels
    ======================================== */

    .ux-range__label {
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      color: var(--ux-text-secondary);
      margin-bottom: var(--ux-space-xs);
    }

    .ux-range__value {
      font-size: var(--ux-font-size-sm);
      font-weight: 600;
      color: var(--ux-text);
      min-width: 36px;
      text-align: center;
    }

    .ux-range__value--start {
      text-align: left;
    }

    .ux-range__value--end {
      text-align: right;
    }

    .ux-range__min-max {
      display: flex;
      justify-content: space-between;
      margin-top: var(--ux-space-xs);
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-tertiary);
    }

    /* ========================================
       Pin (tooltip on drag)
    ======================================== */

    .ux-range--pin .ux-range__pin {
      position: absolute;
      bottom: calc(100% + 8px);
      left: 50%;
      transform: translateX(-50%) scale(0);
      padding: var(--ux-space-xs) var(--ux-space-sm);
      background-color: var(--ux-dark);
      color: white;
      font-size: var(--ux-font-size-xs);
      font-weight: 600;
      border-radius: var(--ux-border-radius-sm);
      white-space: nowrap;
      opacity: 0;
      transition:
        transform var(--ux-transition-fast) var(--ux-ease-spring),
        opacity var(--ux-transition-fast) var(--ux-ease);
      pointer-events: none;
    }

    .ux-range--pin .ux-range__pin::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border: 6px solid transparent;
      border-top-color: var(--ux-dark);
    }

    .ux-range--pin .ux-range__input:active ~ .ux-range__thumb .ux-range__pin,
    .ux-range--pin .ux-range__input:focus ~ .ux-range__thumb .ux-range__pin {
      opacity: 1;
      transform: translateX(-50%) scale(1);
    }

    /* ========================================
       Dual Range (two thumbs)
    ======================================== */

    .ux-range--dual .ux-range__fill {
      left: 0;
      right: 0;
    }

    .ux-range--dual .ux-range__input--min,
    .ux-range--dual .ux-range__input--max {
      pointer-events: none;
    }

    .ux-range--dual .ux-range__input--min::-webkit-slider-thumb,
    .ux-range--dual .ux-range__input--max::-webkit-slider-thumb {
      pointer-events: auto;
    }

    /* ========================================
       Icons
    ======================================== */

    .ux-range__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      color: var(--ux-text-secondary);
      flex-shrink: 0;
    }

    .ux-range__icon svg {
      width: 100%;
      height: 100%;
    }

    /* ========================================
       Snapping
    ======================================== */

    .ux-range--snapping .ux-range__thumb {
      transition:
        transform var(--ux-transition-fast) var(--ux-ease-spring),
        left var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-range--snapping .ux-range__fill {
      transition: width var(--ux-transition-fast) var(--ux-ease);
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-range-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-range-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for range
  const rangeComponent = (config = {}) => ({
    value: config.value ?? 50,
    min: config.min ?? 0,
    max: config.max ?? 100,
    step: config.step ?? 1,
    disabled: config.disabled || false,

    get percent() {
      return ((this.value - this.min) / (this.max - this.min)) * 100;
    },

    get thumbPosition() {
      return `calc(${this.percent}% - ${14 * (this.percent / 100)}px + ${14 * ((100 - this.percent) / 100)}px)`;
    },

    updateValue(newValue) {
      const num = parseFloat(newValue);
      this.value = Math.min(this.max, Math.max(this.min, num));
    },

    increment(amount) {
      const step = amount || this.step;
      this.updateValue(this.value + step);
    },

    decrement(amount) {
      const step = amount || this.step;
      this.updateValue(this.value - step);
    },

    setMin() {
      this.value = this.min;
    },

    setMax() {
      this.value = this.max;
    },

    reset() {
      this.value = config.value ?? 50;
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxRange', rangeComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxRange', rangeComponent);
    });
  }

  // Alpine component for dual range
  const dualRangeComponent = (config = {}) => ({
    minValue: config.minValue ?? 20,
    maxValue: config.maxValue ?? 80,
    min: config.min ?? 0,
    max: config.max ?? 100,
    step: config.step ?? 1,
    minGap: config.minGap ?? 10,
    disabled: config.disabled || false,

    get minPercent() {
      return ((this.minValue - this.min) / (this.max - this.min)) * 100;
    },

    get maxPercent() {
      return ((this.maxValue - this.min) / (this.max - this.min)) * 100;
    },

    get fillStyle() {
      return {
        left: this.minPercent + '%',
        width: (this.maxPercent - this.minPercent) + '%'
      };
    },

    updateMin(value) {
      const num = parseFloat(value);
      const maxAllowed = this.maxValue - this.minGap;
      this.minValue = Math.min(maxAllowed, Math.max(this.min, num));
    },

    updateMax(value) {
      const num = parseFloat(value);
      const minAllowed = this.minValue + this.minGap;
      this.maxValue = Math.max(minAllowed, Math.min(this.max, num));
    },

    get range() {
      return [this.minValue, this.maxValue];
    },

    reset() {
      this.minValue = config.minValue ?? 20;
      this.maxValue = config.maxValue ?? 80;
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxDualRange', dualRangeComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxDualRange', dualRangeComponent);
    });
  }
})();
/**
 * UX Select Component
 * Selectores y dropdowns estilo Ionic
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Select
    ======================================== */

    .ux-select {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    .ux-select__trigger {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      min-height: var(--ux-touch-target);
      padding: var(--ux-space-md) var(--ux-space-lg);
      font-family: var(--ux-font-family);
      font-size: var(--ux-font-size-md);
      color: var(--ux-text);
      background-color: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius);
      cursor: pointer;
      transition:
        border-color var(--ux-transition-fast) var(--ux-ease),
        box-shadow var(--ux-transition-fast) var(--ux-ease);
      -webkit-tap-highlight-color: transparent;
    }

    .ux-select__trigger:hover {
      border-color: var(--ux-medium);
    }

    .ux-select--open .ux-select__trigger {
      border-color: var(--ux-primary);
      box-shadow: 0 0 0 3px rgba(var(--ux-primary-rgb), 0.15);
    }

    .ux-select__value {
      flex: 1;
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .ux-select__placeholder {
      color: var(--ux-text-tertiary);
    }

    .ux-select__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      margin-left: var(--ux-space-sm);
      color: var(--ux-text-secondary);
      transition: transform var(--ux-transition-fast) var(--ux-ease);
      flex-shrink: 0;
    }

    .ux-select--open .ux-select__icon {
      transform: rotate(180deg);
    }

    .ux-select__icon svg {
      width: 100%;
      height: 100%;
    }

    /* ========================================
       Dropdown
    ======================================== */

    .ux-select__dropdown {
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      right: 0;
      max-height: 300px;
      background-color: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius);
      box-shadow: var(--ux-shadow-lg);
      overflow-y: auto;
      z-index: 100;
      -webkit-overflow-scrolling: touch;
    }

    .ux-select__dropdown--top {
      top: auto;
      bottom: calc(100% + 4px);
    }

    /* ========================================
       Options
    ======================================== */

    .ux-select__option {
      display: flex;
      align-items: center;
      padding: var(--ux-space-md) var(--ux-space-lg);
      font-size: var(--ux-font-size-md);
      color: var(--ux-text);
      cursor: pointer;
      transition: background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-select__option:hover {
      background-color: var(--ux-surface-secondary);
    }

    .ux-select__option:active {
      background-color: rgba(var(--ux-primary-rgb), 0.1);
    }

    .ux-select__option--selected {
      color: var(--ux-primary);
      font-weight: 500;
    }

    .ux-select__option--disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .ux-select__option-check {
      width: 20px;
      height: 20px;
      margin-left: auto;
      color: var(--ux-primary);
      opacity: 0;
    }

    .ux-select__option--selected .ux-select__option-check {
      opacity: 1;
    }

    .ux-select__option-check svg {
      width: 100%;
      height: 100%;
    }

    /* Option with icon */
    .ux-select__option-icon {
      width: 24px;
      height: 24px;
      margin-right: var(--ux-space-md);
      color: var(--ux-text-secondary);
    }

    .ux-select__option--selected .ux-select__option-icon {
      color: var(--ux-primary);
    }

    /* ========================================
       Option Group
    ======================================== */

    .ux-select__group {
      padding-top: var(--ux-space-sm);
    }

    .ux-select__group:first-child {
      padding-top: 0;
    }

    .ux-select__group-label {
      padding: var(--ux-space-sm) var(--ux-space-lg);
      font-size: var(--ux-font-size-xs);
      font-weight: 600;
      color: var(--ux-text-tertiary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .ux-select__divider {
      height: 1px;
      margin: var(--ux-space-sm) 0;
      background-color: var(--ux-border-color);
    }

    /* ========================================
       Label
    ======================================== */

    .ux-select__label {
      display: block;
      margin-bottom: var(--ux-space-xs);
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      color: var(--ux-text-secondary);
    }

    .ux-select__label--required::after {
      content: ' *';
      color: var(--ux-danger);
    }

    /* ========================================
       Helper & Error
    ======================================== */

    .ux-select__helper {
      margin-top: var(--ux-space-xs);
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
    }

    .ux-select__error {
      margin-top: var(--ux-space-xs);
      font-size: var(--ux-font-size-sm);
      color: var(--ux-danger);
    }

    .ux-select--error .ux-select__trigger {
      border-color: var(--ux-danger);
    }

    /* ========================================
       Disabled State
    ======================================== */

    .ux-select--disabled .ux-select__trigger {
      background-color: var(--ux-light);
      color: var(--ux-text-tertiary);
      cursor: not-allowed;
      opacity: 0.6;
    }

    /* ========================================
       Variants
    ======================================== */

    /* Filled */
    .ux-select--filled .ux-select__trigger {
      background-color: var(--ux-surface-secondary);
      border-color: transparent;
      border-bottom: 2px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius) var(--ux-border-radius) 0 0;
    }

    .ux-select--filled.ux-select--open .ux-select__trigger {
      border-bottom-color: var(--ux-primary);
      box-shadow: none;
    }

    /* Outline */
    .ux-select--outline .ux-select__trigger {
      background-color: transparent;
    }

    /* ========================================
       Sizes
    ======================================== */

    .ux-select--sm .ux-select__trigger {
      min-height: var(--ux-touch-target-sm);
      padding: var(--ux-space-sm) var(--ux-space-md);
      font-size: var(--ux-font-size-sm);
    }

    .ux-select--sm .ux-select__option {
      padding: var(--ux-space-sm) var(--ux-space-md);
      font-size: var(--ux-font-size-sm);
    }

    .ux-select--lg .ux-select__trigger {
      min-height: 52px;
      padding: var(--ux-space-lg) var(--ux-space-xl);
      font-size: var(--ux-font-size-lg);
    }

    .ux-select--lg .ux-select__option {
      padding: var(--ux-space-lg) var(--ux-space-xl);
      font-size: var(--ux-font-size-lg);
    }

    /* ========================================
       Multi Select
    ======================================== */

    .ux-select--multi .ux-select__value {
      display: flex;
      flex-wrap: wrap;
      gap: var(--ux-space-xs);
    }

    .ux-select__chip {
      display: inline-flex;
      align-items: center;
      gap: var(--ux-space-xs);
      padding: 2px 8px;
      background-color: rgba(var(--ux-primary-rgb), 0.15);
      color: var(--ux-primary);
      border-radius: var(--ux-border-radius-sm);
      font-size: var(--ux-font-size-sm);
    }

    .ux-select__chip-remove {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 14px;
      height: 14px;
      padding: 0;
      border: none;
      background: none;
      color: var(--ux-primary);
      cursor: pointer;
      opacity: 0.7;
      transition: opacity var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-select__chip-remove:hover {
      opacity: 1;
    }

    .ux-select__chip-remove svg {
      width: 10px;
      height: 10px;
    }

    /* ========================================
       Searchable
    ======================================== */

    .ux-select__search {
      padding: var(--ux-space-sm) var(--ux-space-md);
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-select__search-input {
      width: 100%;
      padding: var(--ux-space-sm) var(--ux-space-md);
      font-size: var(--ux-font-size-md);
      color: var(--ux-text);
      background-color: var(--ux-surface-secondary);
      border: none;
      border-radius: var(--ux-border-radius-sm);
      outline: none;
    }

    .ux-select__search-input::placeholder {
      color: var(--ux-text-tertiary);
    }

    .ux-select__no-results {
      padding: var(--ux-space-lg);
      text-align: center;
      color: var(--ux-text-tertiary);
      font-size: var(--ux-font-size-sm);
    }

    /* ========================================
       Action Sheet Style (mobile)
    ======================================== */

    @media (max-width: 767px) {
      .ux-select--action-sheet .ux-select__dropdown {
        position: fixed;
        top: auto;
        left: 0;
        right: 0;
        bottom: 0;
        max-height: 60vh;
        border-radius: var(--ux-border-radius-xl) var(--ux-border-radius-xl) 0 0;
        border: none;
        padding-bottom: env(safe-area-inset-bottom);
      }

      .ux-select--action-sheet .ux-select__dropdown::before {
        content: '';
        display: block;
        width: 36px;
        height: 4px;
        margin: var(--ux-space-sm) auto var(--ux-space-md);
        background-color: var(--ux-light-shade);
        border-radius: 2px;
      }
    }

    /* ========================================
       Native Select (for forms)
    ======================================== */

    .ux-native-select {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    .ux-native-select__field {
      width: 100%;
      min-height: var(--ux-touch-target);
      padding: var(--ux-space-md) var(--ux-space-lg);
      padding-right: calc(var(--ux-space-lg) + 24px);
      font-family: var(--ux-font-family);
      font-size: 16px;
      color: var(--ux-text);
      background-color: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius);
      outline: none;
      appearance: none;
      -webkit-appearance: none;
      cursor: pointer;
      transition:
        border-color var(--ux-transition-fast) var(--ux-ease),
        box-shadow var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-native-select__field:hover {
      border-color: var(--ux-medium);
    }

    .ux-native-select__field:focus {
      border-color: var(--ux-primary);
      box-shadow: 0 0 0 3px rgba(var(--ux-primary-rgb), 0.15);
    }

    .ux-native-select__icon {
      position: absolute;
      right: var(--ux-space-md);
      bottom: calc(50% - 10px);
      width: 20px;
      height: 20px;
      color: var(--ux-text-secondary);
      pointer-events: none;
    }

    .ux-native-select__icon svg {
      width: 100%;
      height: 100%;
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-select-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-select-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for select
  // ARIA: role="listbox" on dropdown, role="option" on options, aria-expanded on trigger
  const selectComponent = (config = {}) => ({
    isOpen: false,
    value: config.value || null,
    options: config.options || [],
    placeholder: config.placeholder || 'Select...',
    disabled: config.disabled || false,
    searchable: config.searchable || false,
    searchQuery: '',
    error: '',
    highlightedIndex: -1,
    selectId: config.id || 'ux-select-' + Math.random().toString(36).substr(2, 9),

    // ARIA attributes for the trigger button
    get triggerAriaAttrs() {
      return {
        'role': 'combobox',
        'aria-haspopup': 'listbox',
        'aria-expanded': this.isOpen ? 'true' : 'false',
        'aria-controls': this.selectId + '-listbox',
        'aria-activedescendant': this.highlightedIndex >= 0 ? this.selectId + '-option-' + this.highlightedIndex : '',
        'aria-disabled': this.disabled ? 'true' : 'false'
      };
    },

    // ARIA attributes for the listbox
    get listboxAriaAttrs() {
      return {
        'role': 'listbox',
        'id': this.selectId + '-listbox',
        'aria-label': config.ariaLabel || 'Options'
      };
    },

    // ARIA attributes for each option
    getOptionAriaAttrs(option, index) {
      return {
        'role': 'option',
        'id': this.selectId + '-option-' + index,
        'aria-selected': this.isSelected(option) ? 'true' : 'false',
        'aria-disabled': option.disabled ? 'true' : 'false'
      };
    },

    get selectedOption() {
      return this.options.find(opt => opt.value === this.value);
    },

    get displayValue() {
      return this.selectedOption ? this.selectedOption.label : '';
    },

    get filteredOptions() {
      if (!this.searchQuery) return this.options;
      const query = this.searchQuery.toLowerCase();
      return this.options.filter(opt =>
        opt.label.toLowerCase().includes(query)
      );
    },

    toggle() {
      if (this.disabled) return;
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.searchQuery = '';
        this.highlightedIndex = -1;
      }
    },

    open() {
      if (!this.disabled) {
        this.isOpen = true;
        this.searchQuery = '';
        this.highlightedIndex = -1;
      }
    },

    close() {
      this.isOpen = false;
      this.searchQuery = '';
    },

    select(option) {
      if (option.disabled) return;
      this.value = option.value;
      this.error = '';
      this.close();
    },

    isSelected(option) {
      return this.value === option.value;
    },

    handleKeydown(event) {
      if (!this.isOpen) {
        if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
          event.preventDefault();
          this.open();
        }
        return;
      }

      switch (event.key) {
        case 'Escape':
          event.preventDefault();
          this.close();
          break;
        case 'ArrowDown':
          event.preventDefault();
          this.highlightedIndex = Math.min(
            this.highlightedIndex + 1,
            this.filteredOptions.length - 1
          );
          break;
        case 'ArrowUp':
          event.preventDefault();
          this.highlightedIndex = Math.max(this.highlightedIndex - 1, 0);
          break;
        case 'Enter':
          event.preventDefault();
          if (this.highlightedIndex >= 0) {
            this.select(this.filteredOptions[this.highlightedIndex]);
          }
          break;
      }
    },

    validate(required = false, message = 'Please select an option') {
      if (required && !this.value) {
        this.error = message;
        return false;
      }
      this.error = '';
      return true;
    },

    reset() {
      this.value = null;
      this.error = '';
      this.searchQuery = '';
      this.close();
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxSelect', selectComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxSelect', selectComponent);
    });
  }

  // Alpine component for multi-select
  // ARIA: role="listbox" with aria-multiselectable="true"
  const multiSelectComponent = (config = {}) => ({
    isOpen: false,
    values: config.values || [],
    options: config.options || [],
    placeholder: config.placeholder || 'Select...',
    disabled: config.disabled || false,
    searchable: config.searchable || false,
    searchQuery: '',
    error: '',
    maxSelections: config.maxSelections || null,
    multiSelectId: config.id || 'ux-multi-select-' + Math.random().toString(36).substr(2, 9),

    // ARIA attributes for the trigger button
    get triggerAriaAttrs() {
      return {
        'role': 'combobox',
        'aria-haspopup': 'listbox',
        'aria-expanded': this.isOpen ? 'true' : 'false',
        'aria-controls': this.multiSelectId + '-listbox',
        'aria-disabled': this.disabled ? 'true' : 'false'
      };
    },

    // ARIA attributes for the listbox
    get listboxAriaAttrs() {
      return {
        'role': 'listbox',
        'id': this.multiSelectId + '-listbox',
        'aria-label': config.ariaLabel || 'Options',
        'aria-multiselectable': 'true'
      };
    },

    // ARIA attributes for each option
    getOptionAriaAttrs(option, index) {
      return {
        'role': 'option',
        'id': this.multiSelectId + '-option-' + index,
        'aria-selected': this.isSelected(option) ? 'true' : 'false',
        'aria-disabled': option.disabled ? 'true' : 'false'
      };
    },

    get selectedOptions() {
      return this.options.filter(opt => this.values.includes(opt.value));
    },

    get filteredOptions() {
      if (!this.searchQuery) return this.options;
      const query = this.searchQuery.toLowerCase();
      return this.options.filter(opt =>
        opt.label.toLowerCase().includes(query)
      );
    },

    get canSelectMore() {
      return !this.maxSelections || this.values.length < this.maxSelections;
    },

    toggle() {
      if (this.disabled) return;
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.searchQuery = '';
      }
    },

    open() {
      if (!this.disabled) {
        this.isOpen = true;
        this.searchQuery = '';
      }
    },

    close() {
      this.isOpen = false;
      this.searchQuery = '';
    },

    toggleOption(option) {
      if (option.disabled) return;

      const index = this.values.indexOf(option.value);
      if (index === -1) {
        if (this.canSelectMore) {
          this.values.push(option.value);
        }
      } else {
        this.values.splice(index, 1);
      }
      this.error = '';
    },

    removeValue(value) {
      const index = this.values.indexOf(value);
      if (index !== -1) {
        this.values.splice(index, 1);
      }
    },

    isSelected(option) {
      return this.values.includes(option.value);
    },

    selectAll() {
      this.values = this.options
        .filter(opt => !opt.disabled)
        .map(opt => opt.value);
    },

    clearAll() {
      this.values = [];
    },

    validate(required = false, message = 'Please select at least one option') {
      if (required && this.values.length === 0) {
        this.error = message;
        return false;
      }
      this.error = '';
      return true;
    },

    reset() {
      this.values = [];
      this.error = '';
      this.searchQuery = '';
      this.close();
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxMultiSelect', multiSelectComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxMultiSelect', multiSelectComponent);
    });
  }
})();
/**
 * UX Searchbar Component
 * Barra de búsqueda estilo iOS
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Searchbar
    ======================================== */

    .ux-searchbar {
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
      padding: var(--ux-space-sm);
    }

    .ux-searchbar__container {
      position: relative;
      display: flex;
      align-items: center;
      flex: 1;
      min-height: 36px;
      padding: 0 var(--ux-space-md);
      background-color: var(--ux-surface-secondary);
      border-radius: var(--ux-border-radius);
      transition:
        background-color var(--ux-transition-fast) var(--ux-ease),
        box-shadow var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-searchbar--focused .ux-searchbar__container {
      background-color: var(--ux-surface);
      box-shadow: 0 0 0 2px var(--ux-primary);
    }

    .ux-searchbar__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      color: var(--ux-text-tertiary);
      flex-shrink: 0;
    }

    .ux-searchbar__icon svg {
      width: 100%;
      height: 100%;
    }

    .ux-searchbar__input {
      flex: 1;
      width: 100%;
      height: 36px;
      padding: 0 var(--ux-space-sm);
      font-family: var(--ux-font-family);
      font-size: 16px; /* Prevent zoom on iOS */
      color: var(--ux-text);
      background: transparent;
      border: none;
      outline: none;
      -webkit-appearance: none;
      appearance: none;
    }

    .ux-searchbar__input::placeholder {
      color: var(--ux-text-tertiary);
    }

    /* Hide default search cancel button */
    .ux-searchbar__input::-webkit-search-cancel-button,
    .ux-searchbar__input::-webkit-search-decoration {
      -webkit-appearance: none;
      appearance: none;
    }

    .ux-searchbar__clear {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      padding: 0;
      border: none;
      background: var(--ux-medium);
      border-radius: 50%;
      color: white;
      cursor: pointer;
      opacity: 0;
      transform: scale(0.8);
      transition:
        opacity var(--ux-transition-fast) var(--ux-ease),
        transform var(--ux-transition-fast) var(--ux-ease);
      flex-shrink: 0;
    }

    .ux-searchbar__clear svg {
      width: 12px;
      height: 12px;
    }

    .ux-searchbar--has-value .ux-searchbar__clear {
      opacity: 1;
      transform: scale(1);
    }

    .ux-searchbar__clear:hover {
      background: var(--ux-medium-shade);
    }

    .ux-searchbar__clear:active {
      transform: scale(0.9);
    }

    /* ========================================
       Cancel Button (iOS style)
    ======================================== */

    .ux-searchbar__cancel {
      padding: 0 var(--ux-space-md);
      font-size: var(--ux-font-size-md);
      color: var(--ux-primary);
      background: none;
      border: none;
      cursor: pointer;
      white-space: nowrap;
      opacity: 0;
      max-width: 0;
      overflow: hidden;
      transition:
        opacity var(--ux-transition-base) var(--ux-ease),
        max-width var(--ux-transition-base) var(--ux-ease),
        padding var(--ux-transition-base) var(--ux-ease);
    }

    .ux-searchbar--focused .ux-searchbar__cancel,
    .ux-searchbar--show-cancel .ux-searchbar__cancel {
      opacity: 1;
      max-width: 100px;
    }

    .ux-searchbar__cancel:hover {
      color: var(--ux-primary-shade);
    }

    .ux-searchbar__cancel:active {
      opacity: 0.7;
    }

    /* ========================================
       Variants
    ======================================== */

    /* Rounded */
    .ux-searchbar--rounded .ux-searchbar__container {
      border-radius: 18px;
    }

    /* Outline */
    .ux-searchbar--outline .ux-searchbar__container {
      background-color: transparent;
      border: 1px solid var(--ux-border-color);
    }

    .ux-searchbar--outline.ux-searchbar--focused .ux-searchbar__container {
      border-color: var(--ux-primary);
      box-shadow: 0 0 0 2px rgba(var(--ux-primary-rgb), 0.15);
    }

    /* Filled */
    .ux-searchbar--filled .ux-searchbar__container {
      background-color: var(--ux-light);
    }

    /* ========================================
       Sizes
    ======================================== */

    .ux-searchbar--sm .ux-searchbar__container {
      min-height: 32px;
    }

    .ux-searchbar--sm .ux-searchbar__input {
      height: 32px;
      font-size: var(--ux-font-size-sm);
    }

    .ux-searchbar--lg .ux-searchbar__container {
      min-height: 48px;
      padding: 0 var(--ux-space-lg);
    }

    .ux-searchbar--lg .ux-searchbar__input {
      height: 48px;
      font-size: var(--ux-font-size-lg);
    }

    .ux-searchbar--lg .ux-searchbar__icon {
      width: 24px;
      height: 24px;
    }

    /* ========================================
       With Results Dropdown
    ======================================== */

    .ux-searchbar__results {
      position: absolute;
      top: calc(100% + 4px);
      left: var(--ux-space-sm);
      right: var(--ux-space-sm);
      max-height: 300px;
      background-color: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius);
      box-shadow: var(--ux-shadow-lg);
      overflow-y: auto;
      z-index: 100;
      -webkit-overflow-scrolling: touch;
    }

    .ux-searchbar__result {
      display: flex;
      align-items: center;
      padding: var(--ux-space-md) var(--ux-space-lg);
      cursor: pointer;
      transition: background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-searchbar__result:hover {
      background-color: var(--ux-surface-secondary);
    }

    .ux-searchbar__result:active {
      background-color: rgba(var(--ux-primary-rgb), 0.1);
    }

    .ux-searchbar__result-icon {
      width: 20px;
      height: 20px;
      margin-right: var(--ux-space-md);
      color: var(--ux-text-secondary);
    }

    .ux-searchbar__result-icon svg {
      width: 100%;
      height: 100%;
    }

    .ux-searchbar__result-content {
      flex: 1;
      min-width: 0;
    }

    .ux-searchbar__result-title {
      font-size: var(--ux-font-size-md);
      color: var(--ux-text);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .ux-searchbar__result-subtitle {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin-top: 2px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* Highlight matching text */
    .ux-searchbar__highlight {
      background-color: rgba(var(--ux-warning-rgb), 0.3);
      border-radius: 2px;
    }

    /* No results */
    .ux-searchbar__no-results {
      padding: var(--ux-space-lg);
      text-align: center;
      color: var(--ux-text-tertiary);
      font-size: var(--ux-font-size-sm);
    }

    /* Loading */
    .ux-searchbar__loading {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--ux-space-lg);
    }

    /* ========================================
       Recent Searches
    ======================================== */

    .ux-searchbar__recent {
      padding: var(--ux-space-sm) 0;
    }

    .ux-searchbar__recent-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--ux-space-sm) var(--ux-space-lg);
    }

    .ux-searchbar__recent-title {
      font-size: var(--ux-font-size-xs);
      font-weight: 600;
      color: var(--ux-text-tertiary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .ux-searchbar__recent-clear {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-primary);
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
    }

    .ux-searchbar__recent-item {
      display: flex;
      align-items: center;
      padding: var(--ux-space-sm) var(--ux-space-lg);
      cursor: pointer;
      transition: background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-searchbar__recent-item:hover {
      background-color: var(--ux-surface-secondary);
    }

    .ux-searchbar__recent-item-icon {
      width: 16px;
      height: 16px;
      margin-right: var(--ux-space-md);
      color: var(--ux-text-tertiary);
    }

    .ux-searchbar__recent-item-text {
      flex: 1;
      font-size: var(--ux-font-size-md);
      color: var(--ux-text);
    }

    .ux-searchbar__recent-item-remove {
      width: 20px;
      height: 20px;
      padding: 0;
      border: none;
      background: none;
      color: var(--ux-text-tertiary);
      cursor: pointer;
      opacity: 0;
      transition: opacity var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-searchbar__recent-item:hover .ux-searchbar__recent-item-remove {
      opacity: 1;
    }

    /* ========================================
       Disabled State
    ======================================== */

    .ux-searchbar--disabled .ux-searchbar__container {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .ux-searchbar--disabled .ux-searchbar__input {
      cursor: not-allowed;
    }

    /* ========================================
       In Toolbar
    ======================================== */

    .ux-toolbar .ux-searchbar {
      padding: 0;
    }

    .ux-toolbar .ux-searchbar__container {
      background-color: rgba(var(--ux-primary-rgb), 0.1);
    }

    .ux-toolbar .ux-searchbar--focused .ux-searchbar__container {
      background-color: var(--ux-surface);
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-searchbar-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-searchbar-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for searchbar
  // ARIA: role="searchbox", aria-label, aria-autocomplete for autocomplete behavior
  const searchbarComponent = (config = {}) => ({
    query: config.query || '',
    isFocused: false,
    isLoading: false,
    showResults: false,
    results: [],
    recentSearches: config.recentSearches || [],
    maxRecent: config.maxRecent || 5,
    debounceTime: config.debounceTime || 300,
    minChars: config.minChars || 1,
    _debounceTimer: null,
    searchbarId: config.id || 'ux-searchbar-' + Math.random().toString(36).substr(2, 9),

    // ARIA attributes for the search input
    get inputAriaAttrs() {
      return {
        'role': 'searchbox',
        'aria-label': config.ariaLabel || 'Search',
        'aria-autocomplete': 'list',
        'aria-controls': this.searchbarId + '-results',
        'aria-expanded': this.shouldShowDropdown ? 'true' : 'false'
      };
    },

    // ARIA attributes for the results container
    get resultsAriaAttrs() {
      return {
        'role': 'listbox',
        'id': this.searchbarId + '-results',
        'aria-label': 'Search results'
      };
    },

    // ARIA attributes for each result option
    getResultAriaAttrs(index) {
      return {
        'role': 'option',
        'id': this.searchbarId + '-result-' + index
      };
    },

    get hasValue() {
      return this.query.length > 0;
    },

    get shouldShowDropdown() {
      return this.isFocused && (this.showResults || this.recentSearches.length > 0);
    },

    focus() {
      this.isFocused = true;
    },

    blur() {
      // Delay to allow click on results
      setTimeout(() => {
        this.isFocused = false;
        this.showResults = false;
      }, 200);
    },

    clear() {
      this.query = '';
      this.results = [];
      this.showResults = false;
    },

    cancel() {
      this.clear();
      this.isFocused = false;
    },

    onInput() {
      clearTimeout(this._debounceTimer);

      if (this.query.length < this.minChars) {
        this.results = [];
        this.showResults = false;
        return;
      }

      this._debounceTimer = setTimeout(() => {
        this.search();
      }, this.debounceTime);
    },

    async search() {
      // Override this method or use @search event
      this.showResults = true;
    },

    selectResult(result) {
      this.query = result.title || result.label || result;
      this.addToRecent(this.query);
      this.showResults = false;
    },

    addToRecent(term) {
      if (!term) return;

      // Remove if already exists
      const index = this.recentSearches.indexOf(term);
      if (index !== -1) {
        this.recentSearches.splice(index, 1);
      }

      // Add to beginning
      this.recentSearches.unshift(term);

      // Keep max items
      if (this.recentSearches.length > this.maxRecent) {
        this.recentSearches = this.recentSearches.slice(0, this.maxRecent);
      }
    },

    selectRecent(term) {
      this.query = term;
      this.search();
    },

    removeRecent(term) {
      const index = this.recentSearches.indexOf(term);
      if (index !== -1) {
        this.recentSearches.splice(index, 1);
      }
    },

    clearRecent() {
      this.recentSearches = [];
    },

    submit() {
      if (this.query) {
        this.addToRecent(this.query);
      }
    },

    handleKeydown(event) {
      if (event.key === 'Escape') {
        this.cancel();
      } else if (event.key === 'Enter') {
        this.submit();
      }
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxSearchbar', searchbarComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxSearchbar', searchbarComponent);
    });
  }

  // Helper to highlight matching text
  window.UX = window.UX || {};
  window.UX.highlightMatch = function(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<span class="ux-searchbar__highlight">$1</span>');
  };
})();
/**
 * UX Textarea Component
 * Áreas de texto estilo Ionic
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Textarea Container
    ======================================== */

    .ux-textarea {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    /* ========================================
       Textarea Field
    ======================================== */

    .ux-textarea__field {
      width: 100%;
      min-height: 100px;
      padding: var(--ux-space-md) var(--ux-space-lg);
      font-family: var(--ux-font-family);
      font-size: 16px; /* Prevent zoom on iOS */
      line-height: 1.5;
      color: var(--ux-text);
      background-color: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius);
      outline: none;
      resize: vertical;
      transition:
        border-color var(--ux-transition-fast) var(--ux-ease),
        box-shadow var(--ux-transition-fast) var(--ux-ease),
        background-color var(--ux-transition-fast) var(--ux-ease);
      -webkit-appearance: none;
      appearance: none;
    }

    .ux-textarea__field::placeholder {
      color: var(--ux-text-tertiary);
    }

    .ux-textarea__field:hover {
      border-color: var(--ux-medium);
    }

    .ux-textarea__field:focus {
      border-color: var(--ux-primary);
      box-shadow: 0 0 0 3px rgba(var(--ux-primary-rgb), 0.15);
    }

    /* ========================================
       Auto Resize
    ======================================== */

    .ux-textarea--auto-resize .ux-textarea__field {
      resize: none;
      overflow: hidden;
    }

    /* ========================================
       Label
    ======================================== */

    .ux-textarea__label {
      display: block;
      margin-bottom: var(--ux-space-xs);
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      color: var(--ux-text-secondary);
    }

    .ux-textarea__label--required::after {
      content: ' *';
      color: var(--ux-danger);
    }

    /* ========================================
       Floating Label
    ======================================== */

    .ux-textarea--floating {
      position: relative;
    }

    .ux-textarea--floating .ux-textarea__field {
      padding-top: 28px;
    }

    .ux-textarea--floating .ux-textarea__label {
      position: absolute;
      top: var(--ux-space-md);
      left: var(--ux-space-lg);
      margin: 0;
      font-size: var(--ux-font-size-md);
      color: var(--ux-text-tertiary);
      pointer-events: none;
      transition:
        top var(--ux-transition-fast) var(--ux-ease),
        font-size var(--ux-transition-fast) var(--ux-ease),
        color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-textarea--floating .ux-textarea__field:focus ~ .ux-textarea__label,
    .ux-textarea--floating .ux-textarea__field:not(:placeholder-shown) ~ .ux-textarea__label,
    .ux-textarea--floating .ux-textarea__field.has-value ~ .ux-textarea__label {
      top: 8px;
      font-size: var(--ux-font-size-xs);
      color: var(--ux-primary);
    }

    /* ========================================
       Helper Text & Counter
    ======================================== */

    .ux-textarea__footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: var(--ux-space-xs);
      gap: var(--ux-space-md);
    }

    .ux-textarea__helper {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
    }

    .ux-textarea__counter {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-tertiary);
      flex-shrink: 0;
    }

    .ux-textarea__counter--warning {
      color: var(--ux-warning);
    }

    .ux-textarea__counter--danger {
      color: var(--ux-danger);
    }

    /* ========================================
       Error State
    ======================================== */

    .ux-textarea--error .ux-textarea__field {
      border-color: var(--ux-danger);
    }

    .ux-textarea--error .ux-textarea__field:focus {
      box-shadow: 0 0 0 3px rgba(var(--ux-danger-rgb), 0.15);
    }

    .ux-textarea--error .ux-textarea__label {
      color: var(--ux-danger);
    }

    .ux-textarea__error {
      margin-top: var(--ux-space-xs);
      font-size: var(--ux-font-size-sm);
      color: var(--ux-danger);
    }

    /* ========================================
       Success State
    ======================================== */

    .ux-textarea--success .ux-textarea__field {
      border-color: var(--ux-success);
    }

    .ux-textarea--success .ux-textarea__field:focus {
      box-shadow: 0 0 0 3px rgba(var(--ux-success-rgb), 0.15);
    }

    /* ========================================
       Disabled State
    ======================================== */

    .ux-textarea--disabled .ux-textarea__field,
    .ux-textarea__field:disabled {
      background-color: var(--ux-light);
      color: var(--ux-text-tertiary);
      cursor: not-allowed;
      opacity: 0.6;
      resize: none;
    }

    /* ========================================
       Readonly State
    ======================================== */

    .ux-textarea__field[readonly] {
      background-color: var(--ux-light);
      cursor: default;
    }

    /* ========================================
       Sizes
    ======================================== */

    .ux-textarea--sm .ux-textarea__field {
      min-height: 60px;
      padding: var(--ux-space-sm) var(--ux-space-md);
      font-size: var(--ux-font-size-sm);
    }

    .ux-textarea--lg .ux-textarea__field {
      min-height: 150px;
      padding: var(--ux-space-lg) var(--ux-space-xl);
      font-size: var(--ux-font-size-lg);
    }

    /* ========================================
       Variants
    ======================================== */

    /* Filled */
    .ux-textarea--filled .ux-textarea__field {
      background-color: var(--ux-surface-secondary);
      border-color: transparent;
      border-radius: var(--ux-border-radius) var(--ux-border-radius) 0 0;
      border-bottom: 2px solid var(--ux-border-color);
    }

    .ux-textarea--filled .ux-textarea__field:focus {
      border-bottom-color: var(--ux-primary);
      box-shadow: none;
    }

    /* Outline */
    .ux-textarea--outline .ux-textarea__field {
      background-color: transparent;
    }

    /* Borderless */
    .ux-textarea--borderless .ux-textarea__field {
      border: none;
      background-color: transparent;
      padding-left: 0;
      padding-right: 0;
    }

    .ux-textarea--borderless .ux-textarea__field:focus {
      box-shadow: none;
    }

    /* ========================================
       Resize Options
    ======================================== */

    .ux-textarea--no-resize .ux-textarea__field {
      resize: none;
    }

    .ux-textarea--resize-horizontal .ux-textarea__field {
      resize: horizontal;
    }

    .ux-textarea--resize-both .ux-textarea__field {
      resize: both;
    }

    /* ========================================
       With Toolbar (formatting)
    ======================================== */

    .ux-textarea--with-toolbar {
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius);
      overflow: hidden;
    }

    .ux-textarea--with-toolbar .ux-textarea__field {
      border: none;
      border-radius: 0;
    }

    .ux-textarea--with-toolbar .ux-textarea__field:focus {
      box-shadow: none;
    }

    .ux-textarea__toolbar {
      display: flex;
      align-items: center;
      gap: var(--ux-space-xs);
      padding: var(--ux-space-sm) var(--ux-space-md);
      background-color: var(--ux-surface-secondary);
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-textarea__toolbar-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      padding: 0;
      border: none;
      background: transparent;
      border-radius: var(--ux-border-radius-sm);
      color: var(--ux-text-secondary);
      cursor: pointer;
      transition:
        background-color var(--ux-transition-fast) var(--ux-ease),
        color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-textarea__toolbar-btn:hover {
      background-color: var(--ux-light);
      color: var(--ux-text);
    }

    .ux-textarea__toolbar-btn:active {
      background-color: var(--ux-light-shade);
    }

    .ux-textarea__toolbar-btn--active {
      background-color: rgba(var(--ux-primary-rgb), 0.15);
      color: var(--ux-primary);
    }

    .ux-textarea__toolbar-btn svg {
      width: 18px;
      height: 18px;
    }

    .ux-textarea__toolbar-divider {
      width: 1px;
      height: 24px;
      background-color: var(--ux-border-color);
      margin: 0 var(--ux-space-xs);
    }

    /* Focus state for toolbar variant */
    .ux-textarea--with-toolbar:focus-within {
      border-color: var(--ux-primary);
      box-shadow: 0 0 0 3px rgba(var(--ux-primary-rgb), 0.15);
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-textarea-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-textarea-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for textarea with validation
  const textareaComponent = (config = {}) => ({
    value: config.value || '',
    error: '',
    touched: false,
    maxLength: config.maxLength || null,
    minLength: config.minLength || null,
    autoResize: config.autoResize || false,

    get hasValue() {
      return this.value && this.value.length > 0;
    },

    get charCount() {
      return this.value ? this.value.length : 0;
    },

    get charRemaining() {
      return this.maxLength ? this.maxLength - this.charCount : null;
    },

    get isOverLimit() {
      return this.maxLength && this.charCount > this.maxLength;
    },

    get isNearLimit() {
      return this.maxLength && this.charRemaining <= this.maxLength * 0.1;
    },

    get isValid() {
      return !this.error;
    },

    get counterClass() {
      if (this.isOverLimit) return 'ux-textarea__counter--danger';
      if (this.isNearLimit) return 'ux-textarea__counter--warning';
      return '';
    },

    clear() {
      this.value = '';
      this.error = '';
    },

    resize(el) {
      if (!this.autoResize) return;
      el.style.height = 'auto';
      el.style.height = el.scrollHeight + 'px';
    },

    validate(rules = []) {
      this.touched = true;
      for (const rule of rules) {
        const result = rule(this.value);
        if (result !== true) {
          this.error = result;
          return false;
        }
      }
      this.error = '';
      return true;
    },

    // Common validators
    required(message = 'This field is required') {
      return (value) => !!value && value.trim() !== '' ? true : message;
    },

    minLengthValidator(min, message) {
      return (value) => value.length >= min ? true : (message || `Minimum ${min} characters`);
    },

    maxLengthValidator(max, message) {
      return (value) => value.length <= max ? true : (message || `Maximum ${max} characters`);
    },

    pattern(regex, message = 'Invalid format') {
      return (value) => regex.test(value) ? true : message;
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxTextarea', textareaComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxTextarea', textareaComponent);
    });
  }
})();
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

    .ux-card__header-content,
    .ux-card__header-text {
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
      margin-left: auto;
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
       Card Body (optional wrapper for padding)
    ======================================== */

    .ux-card__body {
      padding: var(--ux-space-lg);
    }

    .ux-card__body .ux-card__header,
    .ux-card__body .ux-card__content,
    .ux-card__body .ux-card__footer {
      padding-left: 0;
      padding-right: 0;
    }

    .ux-card__body .ux-card__header:first-child {
      padding-top: 0;
    }

    .ux-card__body .ux-card__footer:last-child {
      padding-bottom: 0;
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
       Card Content - Centered variant (Ionic style)
       Use for icon cards with avatar/icon + name + badge
    ======================================== */

    .ux-card__content--centered {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    /* Avatar inside centered content */
    .ux-card__content--centered .ux-avatar {
      margin-bottom: var(--ux-space-md);
    }

    /* Name text */
    .ux-card__content--centered .ux-card__name {
      font-weight: 500;
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text);
      line-height: 1.3;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 100%;
    }

    /* Badge/chip container */
    .ux-card__content--centered .ux-badge,
    .ux-card__content--centered .ux-chip {
      margin-top: var(--ux-space-sm);
    }

    /* ========================================
       Icon Card (component/feature card style)
       Supports icons, avatars, or any element
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

    /* Generic slot for icon, avatar, or any element */
    .ux-card__slot {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: var(--ux-space-md);
      flex-shrink: 0;
    }

    /* Legacy .ux-card__icon support + default icon styling */
    .ux-card__icon,
    .ux-card__slot--icon {
      width: 48px;
      height: 48px;
      margin-bottom: var(--ux-space-md);
      color: var(--ux-primary);
      flex-shrink: 0;
    }

    .ux-card__icon svg,
    .ux-card__slot--icon svg {
      width: 100%;
      height: 100%;
    }

    .ux-card__name {
      font-weight: 500;
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text);
      line-height: 1.3;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* Description - now supports any content (text, badges, etc.) */
    .ux-card__description {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--ux-space-xs);
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-secondary);
      margin-top: var(--ux-space-sm);
    }

    /* When description contains only text */
    .ux-card__description--text {
      display: block;
    }

    /* Icon card sizes */
    .ux-card--icon.ux-card--sm {
      padding: var(--ux-space-md);
    }

    .ux-card--icon.ux-card--sm .ux-card__icon,
    .ux-card--icon.ux-card--sm .ux-card__slot--icon {
      width: 32px;
      height: 32px;
      margin-bottom: var(--ux-space-sm);
    }

    .ux-card--icon.ux-card--sm .ux-card__slot {
      margin-bottom: var(--ux-space-sm);
    }

    .ux-card--icon.ux-card--sm .ux-card__name {
      font-size: var(--ux-font-size-xs);
    }

    .ux-card--icon.ux-card--sm .ux-card__description {
      margin-top: var(--ux-space-xs);
    }

    .ux-card--icon.ux-card--lg {
      padding: var(--ux-space-xl);
    }

    .ux-card--icon.ux-card--lg .ux-card__icon,
    .ux-card--icon.ux-card--lg .ux-card__slot--icon {
      width: 64px;
      height: 64px;
      margin-bottom: var(--ux-space-lg);
    }

    .ux-card--icon.ux-card--lg .ux-card__slot {
      margin-bottom: var(--ux-space-lg);
    }

    .ux-card--icon.ux-card--lg .ux-card__name {
      font-size: var(--ux-font-size-md);
    }

    .ux-card--icon.ux-card--lg .ux-card__description {
      margin-top: var(--ux-space-md);
    }

    /* Icon card color variants (icon-only, not background) */
    .ux-card--icon.ux-card--icon-success .ux-card__icon,
    .ux-card--icon.ux-card--icon-success .ux-card__slot--icon {
      color: var(--ux-success);
    }

    .ux-card--icon.ux-card--icon-success:hover {
      border-color: var(--ux-success);
    }

    .ux-card--icon.ux-card--icon-warning .ux-card__icon,
    .ux-card--icon.ux-card--icon-warning .ux-card__slot--icon {
      color: var(--ux-warning);
    }

    .ux-card--icon.ux-card--icon-warning:hover {
      border-color: var(--ux-warning);
    }

    .ux-card--icon.ux-card--icon-danger .ux-card__icon,
    .ux-card--icon.ux-card--icon-danger .ux-card__slot--icon {
      color: var(--ux-danger);
    }

    .ux-card--icon.ux-card--icon-danger:hover {
      border-color: var(--ux-danger);
    }

    .ux-card--icon.ux-card--icon-secondary .ux-card__icon,
    .ux-card--icon.ux-card--icon-secondary .ux-card__slot--icon {
      color: var(--ux-secondary);
    }

    .ux-card--icon.ux-card--icon-secondary:hover {
      border-color: var(--ux-secondary);
    }

    .ux-card--icon.ux-card--icon-tertiary .ux-card__icon,
    .ux-card--icon.ux-card--icon-tertiary .ux-card__slot--icon {
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
/**
 * UX List Component
 * Listas estilo iOS/Ionic
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX List
    ======================================== */

    .ux-list {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin: 0;
      padding: 0;
      list-style: none;
      background-color: var(--ux-surface);
    }

    /* ========================================
       List Variants
    ======================================== */

    /* Inset (iOS grouped style) */
    .ux-list--inset {
      margin: var(--ux-space-lg);
      border-radius: var(--ux-border-radius-lg);
      overflow: hidden;
    }

    /* Lines */
    .ux-list--lines-full .ux-item {
      --item-border-start: 0;
    }

    .ux-list--lines-inset .ux-item {
      --item-border-start: var(--ux-space-lg);
    }

    .ux-list--lines-none .ux-item {
      border-bottom: none;
    }

    /* ========================================
       List Header
    ======================================== */

    .ux-list-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--ux-space-lg) var(--ux-space-lg) var(--ux-space-sm);
      font-size: var(--ux-font-size-sm);
      font-weight: 600;
      color: var(--ux-text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      background-color: var(--ux-background);
    }

    .ux-list-header__action {
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      color: var(--ux-primary);
      text-transform: none;
      letter-spacing: 0;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
    }

    .ux-list-header__action:hover {
      color: var(--ux-primary-shade);
    }

    /* Sticky Header */
    .ux-list-header--sticky {
      position: sticky;
      top: 0;
      z-index: 10;
    }

    /* ========================================
       List Note (footer)
    ======================================== */

    .ux-list-note {
      padding: var(--ux-space-sm) var(--ux-space-lg) var(--ux-space-lg);
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-tertiary);
      line-height: 1.4;
      background-color: var(--ux-background);
    }

    /* ========================================
       UX Item
    ======================================== */

    .ux-item {
      --item-border-start: var(--ux-space-lg);

      position: relative;
      display: flex;
      align-items: center;
      min-height: var(--ux-touch-target);
      padding: var(--ux-space-md) var(--ux-space-lg);
      background-color: var(--ux-surface);
      color: var(--ux-text);
      text-decoration: none;
      border-bottom: 1px solid var(--ux-border-color);
      transition: background-color var(--ux-transition-fast) var(--ux-ease);
      -webkit-tap-highlight-color: transparent;
    }

    .ux-item::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: var(--item-border-start);
      right: 0;
      height: 1px;
      background-color: var(--ux-border-color);
    }

    .ux-item:last-child::after {
      display: none;
    }

    .ux-item:last-child {
      border-bottom: none;
    }

    /* Clickable Item */
    .ux-item--clickable {
      cursor: pointer;
    }

    .ux-item--clickable:hover {
      background-color: var(--ux-surface-secondary);
    }

    .ux-item--clickable:active {
      background-color: var(--ux-light);
    }

    /* ========================================
       Item Start/End Slots
    ======================================== */

    .ux-item__start {
      display: flex;
      align-items: center;
      margin-right: var(--ux-space-md);
      flex-shrink: 0;
    }

    .ux-item__end {
      display: flex;
      align-items: center;
      margin-left: auto;
      padding-left: var(--ux-space-md);
      flex-shrink: 0;
    }

    /* ========================================
       Item Content
    ======================================== */

    .ux-item__content {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .ux-item__label {
      font-size: var(--ux-font-size-md);
      color: var(--ux-text);
      line-height: 1.4;
    }

    .ux-item__label--stacked {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-secondary);
      margin-bottom: var(--ux-space-xs);
    }

    .ux-item__note {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin-top: 2px;
      line-height: 1.4;
    }

    .ux-item__value {
      font-size: var(--ux-font-size-md);
      color: var(--ux-text-secondary);
    }

    /* ========================================
       Item Icon
    ======================================== */

    .ux-item__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      color: var(--ux-text-secondary);
    }

    .ux-item__icon svg {
      width: 100%;
      height: 100%;
    }

    .ux-item__icon--colored {
      color: var(--ux-primary);
    }

    /* Chevron (disclosure indicator) */
    .ux-item__chevron {
      width: 16px;
      height: 16px;
      color: var(--ux-text-tertiary);
    }

    .ux-item__chevron svg {
      width: 100%;
      height: 100%;
    }

    /* ========================================
       Item Avatar
    ======================================== */

    .ux-item__avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      flex-shrink: 0;
    }

    .ux-item__avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .ux-item__avatar--sm {
      width: 32px;
      height: 32px;
    }

    .ux-item__avatar--lg {
      width: 56px;
      height: 56px;
    }

    /* ========================================
       Item Thumbnail
    ======================================== */

    .ux-item__thumbnail {
      width: 56px;
      height: 56px;
      border-radius: var(--ux-border-radius-sm);
      overflow: hidden;
      flex-shrink: 0;
    }

    .ux-item__thumbnail img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    /* ========================================
       Item Variants
    ======================================== */

    /* Detail Item */
    .ux-item--detail {
      padding-right: var(--ux-space-md);
    }

    .ux-item--detail::before {
      content: '';
      position: absolute;
      right: var(--ux-space-lg);
      top: 50%;
      transform: translateY(-50%);
      width: 8px;
      height: 8px;
      border-right: 2px solid var(--ux-text-tertiary);
      border-bottom: 2px solid var(--ux-text-tertiary);
      transform: translateY(-50%) rotate(-45deg);
    }

    /* Multiline Item */
    .ux-item--multiline {
      align-items: flex-start;
      padding-top: var(--ux-space-md);
      padding-bottom: var(--ux-space-md);
    }

    .ux-item--multiline .ux-item__start {
      margin-top: 2px;
    }

    /* Disabled Item */
    .ux-item--disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    /* Selected Item */
    .ux-item--selected {
      background-color: rgba(var(--ux-primary-rgb), 0.08);
    }

    .ux-item--selected::after {
      background-color: var(--ux-primary);
    }

    /* ========================================
       Item Colors
    ======================================== */

    .ux-item--primary {
      background-color: rgba(var(--ux-primary-rgb), 0.1);
    }

    .ux-item--success {
      background-color: rgba(var(--ux-success-rgb), 0.1);
    }

    .ux-item--warning {
      background-color: rgba(var(--ux-warning-rgb), 0.1);
    }

    .ux-item--danger {
      background-color: rgba(var(--ux-danger-rgb), 0.1);
    }

    /* ========================================
       Item Sizes
    ======================================== */

    .ux-item--sm {
      min-height: 40px;
      padding: var(--ux-space-sm) var(--ux-space-lg);
    }

    .ux-item--sm .ux-item__label {
      font-size: var(--ux-font-size-sm);
    }

    .ux-item--lg {
      min-height: 60px;
      padding: var(--ux-space-lg);
    }

    .ux-item--lg .ux-item__label {
      font-size: var(--ux-font-size-lg);
    }

    /* ========================================
       Swipeable Item
    ======================================== */

    .ux-item-sliding {
      position: relative;
      overflow: hidden;
    }

    .ux-item-sliding__content {
      position: relative;
      z-index: 1;
      background-color: var(--ux-surface);
      transition: transform var(--ux-transition-base) var(--ux-ease);
    }

    .ux-item-sliding__options {
      position: absolute;
      top: 0;
      bottom: 0;
      display: flex;
      align-items: stretch;
    }

    .ux-item-sliding__options--start {
      left: 0;
    }

    .ux-item-sliding__options--end {
      right: 0;
    }

    .ux-item-sliding__option {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 72px;
      padding: 0 var(--ux-space-lg);
      color: white;
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      border: none;
      cursor: pointer;
    }

    .ux-item-sliding__option--primary {
      background-color: var(--ux-primary);
    }

    .ux-item-sliding__option--secondary {
      background-color: var(--ux-secondary);
    }

    .ux-item-sliding__option--success {
      background-color: var(--ux-success);
    }

    .ux-item-sliding__option--warning {
      background-color: var(--ux-warning);
    }

    .ux-item-sliding__option--danger {
      background-color: var(--ux-danger);
    }

    .ux-item-sliding__option-icon {
      width: 24px;
      height: 24px;
    }

    .ux-item-sliding__option-icon svg {
      width: 100%;
      height: 100%;
    }

    /* ========================================
       Item Divider
    ======================================== */

    .ux-item-divider {
      display: flex;
      align-items: center;
      padding: var(--ux-space-sm) var(--ux-space-lg);
      font-size: var(--ux-font-size-sm);
      font-weight: 600;
      color: var(--ux-text-secondary);
      background-color: var(--ux-surface-secondary);
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-item-divider--sticky {
      position: sticky;
      top: 0;
      z-index: 10;
    }

    /* ========================================
       Virtual List Container
    ======================================== */

    .ux-virtual-list {
      position: relative;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }

    .ux-virtual-list__spacer {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      pointer-events: none;
    }

    .ux-virtual-list__content {
      position: relative;
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-list-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-list-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for item sliding (swipe actions)
  const itemSlidingComponent = (config = {}) => ({
    isOpen: false,
    side: null, // 'start' or 'end'
    offset: 0,
    startX: 0,
    threshold: config.threshold || 50,

    close() {
      this.isOpen = false;
      this.offset = 0;
      this.side = null;
    },

    open(side = 'end') {
      this.side = side;
      this.isOpen = true;
    },

    handleTouchStart(event) {
      this.startX = event.touches[0].clientX;
    },

    handleTouchMove(event) {
      const currentX = event.touches[0].clientX;
      const diff = currentX - this.startX;

      if (Math.abs(diff) > 10) {
        this.offset = diff;
        this.side = diff > 0 ? 'start' : 'end';
      }
    },

    handleTouchEnd() {
      if (Math.abs(this.offset) > this.threshold) {
        this.isOpen = true;
        this.offset = this.side === 'end' ? -72 : 72;
      } else {
        this.close();
      }
    },

    getStyle() {
      return {
        transform: `translateX(${this.offset}px)`
      };
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxItemSliding', itemSlidingComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxItemSliding', itemSlidingComponent);
    });
  }

  // Alpine component for selectable list
  const selectableListComponent = (config = {}) => ({
    selected: config.selected || [],
    multiple: config.multiple || false,
    items: config.items || [],

    isSelected(item) {
      if (this.multiple) {
        return this.selected.includes(item);
      }
      return this.selected === item;
    },

    toggle(item) {
      if (this.multiple) {
        const index = this.selected.indexOf(item);
        if (index === -1) {
          this.selected.push(item);
        } else {
          this.selected.splice(index, 1);
        }
      } else {
        this.selected = this.selected === item ? null : item;
      }
    },

    selectAll() {
      if (this.multiple) {
        this.selected = [...this.items];
      }
    },

    clearSelection() {
      this.selected = this.multiple ? [] : null;
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxSelectableList', selectableListComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxSelectableList', selectableListComponent);
    });
  }
})();
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
/**
 * UX Content Component
 * Contenedor principal de contenido estilo Ionic
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX App Container
    ======================================== */

    .ux-app {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      min-height: 100dvh;
      background-color: var(--ux-background);
    }

    /* ========================================
       UX Page
    ======================================== */

    .ux-page {
      position: relative;
      display: flex;
      flex-direction: column;
      flex: 1;
      width: 100%;
      contain: layout size style;
    }

    /* ========================================
       UX Header
    ======================================== */

    .ux-header {
      position: relative;
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      z-index: 10;
    }

    .ux-header--fixed {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
    }

    .ux-header--translucent {
      background-color: rgba(var(--ux-surface-rgb, 255, 255, 255), 0.8);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
    }

    .ux-header--collapse {
      transition: transform var(--ux-transition-base) var(--ux-ease);
    }

    .ux-header--collapsed {
      transform: translateY(-100%);
    }

    /* ========================================
       UX Content
    ======================================== */

    .ux-content {
      position: relative;
      display: flex;
      flex-direction: column;
      flex: 1;
      width: 100%;
      overflow-y: auto;
      overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
      overscroll-behavior-y: contain;
    }

    .ux-content--fullscreen {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }

    .ux-content--scroll-y {
      overflow-y: scroll;
    }

    .ux-content--no-scroll {
      overflow: hidden;
    }

    /* Header offset */
    .ux-content--has-header {
      padding-top: var(--ux-header-height, 56px);
    }

    .ux-content--has-footer {
      padding-bottom: var(--ux-footer-height, 56px);
    }

    /* Safe area padding */
    .ux-content--safe-area {
      padding-top: env(safe-area-inset-top);
      padding-bottom: env(safe-area-inset-bottom);
      padding-left: env(safe-area-inset-left);
      padding-right: env(safe-area-inset-right);
    }

    /* Content inner wrapper */
    .ux-content__inner {
      display: flex;
      flex-direction: column;
      flex: 1;
      padding: var(--ux-content-padding, var(--ux-space-lg));
    }

    .ux-content__inner--centered {
      align-items: center;
      justify-content: center;
    }

    /* ========================================
       UX Footer
    ======================================== */

    .ux-footer {
      position: relative;
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      z-index: 10;
      background-color: var(--ux-surface);
      border-top: 1px solid var(--ux-border-color);
    }

    .ux-footer--fixed {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
    }

    .ux-footer--translucent {
      background-color: rgba(var(--ux-surface-rgb, 255, 255, 255), 0.8);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-top: none;
    }

    .ux-footer--safe-area {
      padding-bottom: env(safe-area-inset-bottom);
    }

    /* ========================================
       UX Split Pane (iPad layout)
    ======================================== */

    .ux-split-pane {
      display: flex;
      width: 100%;
      height: 100%;
    }

    .ux-split-pane__side {
      display: none;
      flex-shrink: 0;
      width: var(--ux-split-pane-width, 270px);
      border-right: 1px solid var(--ux-border-color);
      background-color: var(--ux-surface);
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }

    .ux-split-pane__main {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    @media (min-width: 992px) {
      .ux-split-pane__side {
        display: flex;
        flex-direction: column;
      }
    }

    /* ========================================
       Scroll Utilities
    ======================================== */

    .ux-scroll {
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      overscroll-behavior-y: contain;
    }

    .ux-scroll--x {
      overflow-x: auto;
      overflow-y: hidden;
      -webkit-overflow-scrolling: touch;
    }

    .ux-scroll--hidden {
      scrollbar-width: none;
      -ms-overflow-style: none;
    }

    .ux-scroll--hidden::-webkit-scrollbar {
      display: none;
    }

    /* Snap scrolling */
    .ux-scroll--snap-x {
      scroll-snap-type: x mandatory;
    }

    .ux-scroll--snap-y {
      scroll-snap-type: y mandatory;
    }

    .ux-scroll__item--snap {
      scroll-snap-align: start;
    }

    .ux-scroll__item--snap-center {
      scroll-snap-align: center;
    }

    /* ========================================
       Container Utilities
    ======================================== */

    .ux-container {
      width: 100%;
      max-width: var(--ux-container-max-width, 1200px);
      margin-left: auto;
      margin-right: auto;
      padding-left: var(--ux-space-lg);
      padding-right: var(--ux-space-lg);
    }

    .ux-container--fluid {
      max-width: none;
    }

    .ux-container--narrow {
      max-width: 680px;
    }

    .ux-container--wide {
      max-width: 1400px;
    }

    /* ========================================
       Section
    ======================================== */

    .ux-section {
      padding: var(--ux-space-xl) 0;
    }

    .ux-section--sm {
      padding: var(--ux-space-lg) 0;
    }

    .ux-section--lg {
      padding: var(--ux-space-2xl) 0;
    }

    .ux-section__header {
      margin-bottom: var(--ux-space-lg);
    }

    .ux-section__title {
      font-size: var(--ux-font-size-xl);
      font-weight: 700;
      color: var(--ux-text);
      margin: 0 0 var(--ux-space-sm);
    }

    .ux-section__subtitle {
      font-size: var(--ux-font-size-md);
      color: var(--ux-text-secondary);
      margin: 0;
    }

    /* ========================================
       Divider
    ======================================== */

    .ux-divider {
      height: 1px;
      background-color: var(--ux-border-color);
      margin: var(--ux-space-md) 0;
    }

    .ux-divider--inset {
      margin-left: var(--ux-space-lg);
      margin-right: var(--ux-space-lg);
    }

    .ux-divider--thick {
      height: 8px;
      background-color: var(--ux-surface-secondary);
    }

    .ux-divider--with-text {
      display: flex;
      align-items: center;
      height: auto;
      background: none;
    }

    .ux-divider--with-text::before,
    .ux-divider--with-text::after {
      content: '';
      flex: 1;
      height: 1px;
      background-color: var(--ux-border-color);
    }

    .ux-divider__text {
      padding: 0 var(--ux-space-md);
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-tertiary);
    }

    /* ========================================
       Spacer Utilities
    ======================================== */

    .ux-spacer { flex: 1; }
    .ux-spacer-xs { height: var(--ux-space-xs); }
    .ux-spacer-sm { height: var(--ux-space-sm); }
    .ux-spacer-md { height: var(--ux-space-md); }
    .ux-spacer-lg { height: var(--ux-space-lg); }
    .ux-spacer-xl { height: var(--ux-space-xl); }
    .ux-spacer-2xl { height: var(--ux-space-2xl); }

    /* ========================================
       Padding Utilities
    ======================================== */

    .ux-p-0 { padding: 0 !important; }
    .ux-p-xs { padding: var(--ux-space-xs) !important; }
    .ux-p-sm { padding: var(--ux-space-sm) !important; }
    .ux-p-md { padding: var(--ux-space-md) !important; }
    .ux-p-lg { padding: var(--ux-space-lg) !important; }
    .ux-p-xl { padding: var(--ux-space-xl) !important; }

    .ux-px-0 { padding-left: 0 !important; padding-right: 0 !important; }
    .ux-px-xs { padding-left: var(--ux-space-xs) !important; padding-right: var(--ux-space-xs) !important; }
    .ux-px-sm { padding-left: var(--ux-space-sm) !important; padding-right: var(--ux-space-sm) !important; }
    .ux-px-md { padding-left: var(--ux-space-md) !important; padding-right: var(--ux-space-md) !important; }
    .ux-px-lg { padding-left: var(--ux-space-lg) !important; padding-right: var(--ux-space-lg) !important; }
    .ux-px-xl { padding-left: var(--ux-space-xl) !important; padding-right: var(--ux-space-xl) !important; }

    .ux-py-0 { padding-top: 0 !important; padding-bottom: 0 !important; }
    .ux-py-xs { padding-top: var(--ux-space-xs) !important; padding-bottom: var(--ux-space-xs) !important; }
    .ux-py-sm { padding-top: var(--ux-space-sm) !important; padding-bottom: var(--ux-space-sm) !important; }
    .ux-py-md { padding-top: var(--ux-space-md) !important; padding-bottom: var(--ux-space-md) !important; }
    .ux-py-lg { padding-top: var(--ux-space-lg) !important; padding-bottom: var(--ux-space-lg) !important; }
    .ux-py-xl { padding-top: var(--ux-space-xl) !important; padding-bottom: var(--ux-space-xl) !important; }

    /* ========================================
       Margin Utilities
    ======================================== */

    .ux-m-0 { margin: 0 !important; }
    .ux-m-auto { margin: auto !important; }
    .ux-m-xs { margin: var(--ux-space-xs) !important; }
    .ux-m-sm { margin: var(--ux-space-sm) !important; }
    .ux-m-md { margin: var(--ux-space-md) !important; }
    .ux-m-lg { margin: var(--ux-space-lg) !important; }
    .ux-m-xl { margin: var(--ux-space-xl) !important; }

    .ux-mx-auto { margin-left: auto !important; margin-right: auto !important; }
    .ux-my-auto { margin-top: auto !important; margin-bottom: auto !important; }

    .ux-mt-0 { margin-top: 0 !important; }
    .ux-mt-xs { margin-top: var(--ux-space-xs) !important; }
    .ux-mt-sm { margin-top: var(--ux-space-sm) !important; }
    .ux-mt-md { margin-top: var(--ux-space-md) !important; }
    .ux-mt-lg { margin-top: var(--ux-space-lg) !important; }
    .ux-mt-xl { margin-top: var(--ux-space-xl) !important; }

    .ux-mb-0 { margin-bottom: 0 !important; }
    .ux-mb-xs { margin-bottom: var(--ux-space-xs) !important; }
    .ux-mb-sm { margin-bottom: var(--ux-space-sm) !important; }
    .ux-mb-md { margin-bottom: var(--ux-space-md) !important; }
    .ux-mb-lg { margin-bottom: var(--ux-space-lg) !important; }
    .ux-mb-xl { margin-bottom: var(--ux-space-xl) !important; }

    /* ========================================
       Pull to Refresh Target
    ======================================== */

    .ux-content__refresher {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
      transform: translateY(-100%);
      transition: transform var(--ux-transition-base) var(--ux-ease);
    }

    .ux-content--refreshing .ux-content__refresher {
      transform: translateY(0);
    }

    /* ========================================
       Scroll to Top Button
    ======================================== */

    .ux-scroll-top {
      position: fixed;
      bottom: calc(var(--ux-space-lg) + env(safe-area-inset-bottom));
      right: var(--ux-space-lg);
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: 50%;
      box-shadow: var(--ux-shadow-md);
      cursor: pointer;
      opacity: 0;
      visibility: hidden;
      transform: translateY(20px);
      transition:
        opacity var(--ux-transition-base) var(--ux-ease),
        visibility var(--ux-transition-base) var(--ux-ease),
        transform var(--ux-transition-base) var(--ux-ease);
      z-index: 100;
      -webkit-tap-highlight-color: transparent;
    }

    .ux-scroll-top--visible {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .ux-scroll-top:hover {
      background-color: var(--ux-surface-secondary);
    }

    .ux-scroll-top:active {
      transform: scale(0.95);
    }

    .ux-scroll-top__icon {
      width: 24px;
      height: 24px;
      color: var(--ux-text);
    }

    .ux-scroll-top__icon svg {
      width: 100%;
      height: 100%;
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-content-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-content-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for scroll-to-top
  const scrollTopComponent = (config = {}) => ({
    visible: false,
    threshold: config.threshold || 300,

    init() {
      this.checkScroll = this.checkScroll.bind(this);
    },

    checkScroll(scrollTop) {
      this.visible = scrollTop > this.threshold;
    },

    scrollToTop() {
      const content = document.querySelector('.ux-content');
      if (content) {
        content.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      } else {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxScrollTop', scrollTopComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxScrollTop', scrollTopComponent);
    });
  }

  // Alpine component for collapsible header
  const collapsibleHeaderComponent = (config = {}) => ({
    collapsed: false,
    lastScrollTop: 0,
    threshold: config.threshold || 50,

    handleScroll(scrollTop) {
      if (scrollTop > this.lastScrollTop && scrollTop > this.threshold) {
        this.collapsed = true;
      } else {
        this.collapsed = false;
      }
      this.lastScrollTop = scrollTop;
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxCollapsibleHeader', collapsibleHeaderComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxCollapsibleHeader', collapsibleHeaderComponent);
    });
  }
})();
/**
 * UX Navbar Component
 * Barra de navegación estilo iOS
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Navbar
    ======================================== */

    .ux-navbar {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 56px;
      padding: 0 var(--ux-space-sm);
      background-color: var(--ux-surface);
      border-bottom: 1px solid var(--ux-border-color);
      z-index: 10;
    }

    /* Safe area support */
    .ux-navbar--safe-area {
      padding-top: env(safe-area-inset-top);
    }

    /* ========================================
       Navbar Variants
    ======================================== */

    /* Translucent (iOS style) */
    .ux-navbar--translucent {
      background-color: rgba(var(--ux-surface-rgb, 255, 255, 255), 0.8);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
    }

    /* Transparent */
    .ux-navbar--transparent {
      background-color: transparent;
      border-bottom: none;
    }

    /* Colored */
    .ux-navbar--primary {
      background-color: var(--ux-primary);
      color: var(--ux-primary-contrast);
      border-bottom-color: rgba(0, 0, 0, 0.1);
    }

    .ux-navbar--primary .ux-navbar__title,
    .ux-navbar--primary .ux-navbar__button {
      color: var(--ux-primary-contrast);
    }

    .ux-navbar--dark {
      background-color: var(--ux-dark);
      color: var(--ux-dark-contrast);
      border-bottom-color: rgba(255, 255, 255, 0.1);
    }

    .ux-navbar--dark .ux-navbar__title,
    .ux-navbar--dark .ux-navbar__button {
      color: var(--ux-dark-contrast);
    }

    /* ========================================
       Navbar Content Wrapper
    ======================================== */

    .ux-navbar__content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      min-height: inherit;
      position: relative;
    }

    /* ========================================
       Navbar Slots (3-slot layout like Ionic)
    ======================================== */

    .ux-navbar__start {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      min-width: 60px;
      z-index: 1;
    }

    .ux-navbar__center {
      position: absolute;
      left: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
    }

    .ux-navbar__center > * {
      pointer-events: auto;
    }

    .ux-navbar__end {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      flex-shrink: 0;
      min-width: 60px;
      z-index: 1;
    }

    /* Empty slots still take space */
    .ux-navbar__start:empty,
    .ux-navbar__end:empty {
      min-width: 60px;
    }

    /* Alternative layout (no absolute center, title left-aligned) */
    .ux-navbar--stacked .ux-navbar__center {
      position: static;
      flex: 1;
      justify-content: flex-start;
      padding: 0 var(--ux-space-md);
      pointer-events: auto;
    }

    /* ========================================
       Navbar Title
    ======================================== */

    .ux-navbar__title {
      font-size: var(--ux-font-size-lg);
      font-weight: 600;
      color: var(--ux-text);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin: 0;
    }

    .ux-navbar__title--large {
      font-size: var(--ux-font-size-2xl);
    }

    .ux-navbar__subtitle {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-secondary);
      margin-top: 2px;
    }

    /* ========================================
       Navbar Buttons
    ======================================== */

    .ux-navbar__button {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: var(--ux-touch-target);
      min-height: var(--ux-touch-target);
      padding: var(--ux-space-sm);
      background: none;
      border: none;
      color: var(--ux-primary);
      font-size: var(--ux-font-size-md);
      font-weight: 500;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      border-radius: var(--ux-border-radius);
      transition:
        background-color var(--ux-transition-fast) var(--ux-ease),
        opacity var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-navbar__button:hover {
      background-color: rgba(var(--ux-primary-rgb), 0.1);
    }

    .ux-navbar__button:active {
      opacity: 0.7;
    }

    .ux-navbar__button--icon {
      padding: var(--ux-space-xs);
    }

    .ux-navbar__button-icon {
      width: 24px;
      height: 24px;
    }

    .ux-navbar__button-icon svg {
      width: 100%;
      height: 100%;
    }

    .ux-navbar__button-text {
      padding: 0 var(--ux-space-xs);
    }

    /* Back button */
    .ux-navbar__back {
      display: flex;
      align-items: center;
      gap: 2px;
    }

    .ux-navbar__back-icon {
      width: 24px;
      height: 24px;
    }

    .ux-navbar__back-icon svg {
      width: 100%;
      height: 100%;
    }

    .ux-navbar__back-text {
      font-size: var(--ux-font-size-md);
    }

    /* ========================================
       Large Title (iOS style)
    ======================================== */

    .ux-navbar--large-title {
      flex-direction: column;
      align-items: stretch;
      min-height: auto;
    }

    .ux-navbar--large-title .ux-navbar__row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 44px;
      padding: var(--ux-space-sm);
    }

    .ux-navbar--large-title .ux-navbar__large-title {
      padding: 0 var(--ux-space-lg) var(--ux-space-md);
    }

    .ux-navbar__large-title h1 {
      font-size: 34px;
      font-weight: 700;
      color: var(--ux-text);
      margin: 0;
      line-height: 1.2;
    }

    /* Collapsible large title */
    .ux-navbar--collapsible .ux-navbar__large-title {
      transition:
        opacity var(--ux-transition-fast) var(--ux-ease),
        transform var(--ux-transition-fast) var(--ux-ease),
        height var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-navbar--collapsed .ux-navbar__large-title {
      opacity: 0;
      height: 0;
      padding: 0;
      overflow: hidden;
    }

    .ux-navbar--collapsed .ux-navbar__center {
      opacity: 1;
    }

    .ux-navbar--collapsible .ux-navbar__center {
      opacity: 0;
      transition: opacity var(--ux-transition-fast) var(--ux-ease);
    }

    /* ========================================
       Searchbar in Navbar
    ======================================== */

    .ux-navbar__searchbar {
      padding: 0 var(--ux-space-md) var(--ux-space-sm);
    }

    .ux-navbar--large-title .ux-navbar__searchbar {
      padding-top: 0;
    }

    /* ========================================
       Navbar Progress
    ======================================== */

    .ux-navbar__progress {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background-color: var(--ux-light);
    }

    .ux-navbar__progress-bar {
      height: 100%;
      background-color: var(--ux-primary);
      transition: width var(--ux-transition-base) var(--ux-ease);
    }

    /* ========================================
       Navbar with Tabs
    ======================================== */

    .ux-navbar__tabs {
      display: flex;
      padding: 0 var(--ux-space-md);
      border-top: 1px solid var(--ux-border-color);
    }

    /* ========================================
       Fixed/Sticky Navbar
    ======================================== */

    .ux-navbar--fixed {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
    }

    .ux-navbar--sticky {
      position: sticky;
      top: 0;
    }

    /* ========================================
       Navbar Shadow (on scroll)
    ======================================== */

    .ux-navbar--shadow {
      box-shadow: var(--ux-shadow-sm);
      border-bottom-color: transparent;
    }

    /* ========================================
       Sizes
    ======================================== */

    .ux-navbar--sm {
      min-height: 44px;
    }

    .ux-navbar--sm .ux-navbar__title {
      font-size: var(--ux-font-size-md);
    }

    .ux-navbar--lg {
      min-height: 64px;
    }

    .ux-navbar--lg .ux-navbar__title {
      font-size: var(--ux-font-size-xl);
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-navbar-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-navbar-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for collapsible navbar
  const navbarComponent = (config = {}) => ({
    collapsed: false,
    showShadow: false,
    scrollThreshold: config.scrollThreshold || 100,

    handleScroll(scrollTop) {
      this.collapsed = scrollTop > this.scrollThreshold;
      this.showShadow = scrollTop > 0;
    },

    goBack() {
      window.history.back();
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxNavbar', navbarComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxNavbar', navbarComponent);
    });
  }
})();
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
      min-height: 44px;
      padding: var(--ux-space-sm) var(--ux-space-md);
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
/**
 * UX Tabs Component
 * Sistema de tabs estilo iOS/Ionic
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Tabs
    ======================================== */

    .ux-tabs {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    /* ========================================
       Tab Bar
    ======================================== */

    .ux-tab-bar {
      display: flex;
      align-items: stretch;
      background-color: var(--ux-surface);
      border-bottom: 1px solid var(--ux-border-color);
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      -ms-overflow-style: none;
    }

    .ux-tab-bar::-webkit-scrollbar {
      display: none;
    }

    /* Tab Bar Variants */
    .ux-tab-bar--translucent {
      background-color: rgba(var(--ux-surface-rgb, 255, 255, 255), 0.8);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
    }

    .ux-tab-bar--primary {
      background-color: var(--ux-primary);
      border-bottom-color: rgba(0, 0, 0, 0.1);
    }

    .ux-tab-bar--dark {
      background-color: var(--ux-dark);
      border-bottom-color: rgba(255, 255, 255, 0.1);
    }

    /* ========================================
       Tab Button
    ======================================== */

    .ux-tab-button {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      min-width: 0;
      min-height: 48px;
      padding: var(--ux-space-sm) var(--ux-space-md);
      background: none;
      border: none;
      color: var(--ux-text-secondary);
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      white-space: nowrap;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition:
        color var(--ux-transition-fast) var(--ux-ease),
        background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-tab-button:hover {
      color: var(--ux-text);
      background-color: var(--ux-surface-secondary);
    }

    .ux-tab-button:active {
      background-color: var(--ux-light);
    }

    .ux-tab-button--selected {
      color: var(--ux-primary);
    }

    .ux-tab-button--disabled {
      opacity: 0.4;
      pointer-events: none;
    }

    /* Tab Button Layout */
    .ux-tab-button--layout-icon-top {
      flex-direction: column;
      gap: 2px;
    }

    .ux-tab-button--layout-icon-start {
      flex-direction: row;
      gap: var(--ux-space-xs);
    }

    .ux-tab-button--layout-icon-end {
      flex-direction: row-reverse;
      gap: var(--ux-space-xs);
    }

    .ux-tab-button--layout-icon-only .ux-tab-button__label {
      display: none;
    }

    .ux-tab-button--layout-label-only .ux-tab-button__icon {
      display: none;
    }

    /* Tab Button Icon */
    .ux-tab-button__icon {
      width: 24px;
      height: 24px;
      flex-shrink: 0;
    }

    .ux-tab-button__icon svg {
      width: 100%;
      height: 100%;
    }

    /* Tab Button Label */
    .ux-tab-button__label {
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* Tab Button Badge */
    .ux-tab-button__badge {
      position: absolute;
      top: 4px;
      right: calc(50% - 20px);
      min-width: 18px;
      height: 18px;
      padding: 0 5px;
      background-color: var(--ux-danger);
      color: white;
      font-size: 10px;
      font-weight: 600;
      border-radius: 9px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .ux-tab-button__badge--dot {
      min-width: 8px;
      width: 8px;
      height: 8px;
      padding: 0;
      right: calc(50% - 16px);
    }

    /* Colored Tab Bar Button Colors */
    .ux-tab-bar--primary .ux-tab-button {
      color: rgba(255, 255, 255, 0.7);
    }

    .ux-tab-bar--primary .ux-tab-button:hover {
      color: white;
      background-color: rgba(255, 255, 255, 0.1);
    }

    .ux-tab-bar--primary .ux-tab-button--selected {
      color: white;
    }

    .ux-tab-bar--dark .ux-tab-button {
      color: rgba(255, 255, 255, 0.6);
    }

    .ux-tab-bar--dark .ux-tab-button:hover {
      color: white;
      background-color: rgba(255, 255, 255, 0.1);
    }

    .ux-tab-bar--dark .ux-tab-button--selected {
      color: white;
    }

    /* ========================================
       Tab Indicator
    ======================================== */

    .ux-tab-bar--indicator {
      position: relative;
    }

    .ux-tab-bar__indicator {
      position: absolute;
      bottom: 0;
      height: 2px;
      background-color: var(--ux-primary);
      transition:
        left var(--ux-transition-base) var(--ux-ease),
        width var(--ux-transition-base) var(--ux-ease);
    }

    .ux-tab-bar--primary .ux-tab-bar__indicator {
      background-color: white;
    }

    /* ========================================
       Tab Content
    ======================================== */

    .ux-tab-content {
      flex: 1;
      overflow: hidden;
    }

    .ux-tab-panel {
      display: none;
      height: 100%;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }

    .ux-tab-panel--active {
      display: block;
    }

    /* Animated tab panels */
    .ux-tab-content--animated {
      position: relative;
    }

    .ux-tab-content--animated .ux-tab-panel {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      opacity: 0;
      transform: translateX(20px);
      transition:
        opacity var(--ux-transition-base) var(--ux-ease),
        transform var(--ux-transition-base) var(--ux-ease);
    }

    .ux-tab-content--animated .ux-tab-panel--active {
      position: relative;
      opacity: 1;
      transform: translateX(0);
    }

    /* ========================================
       Bottom Tab Bar (iOS style)
    ======================================== */

    .ux-tab-bar--bottom {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      min-height: 49px;
      border-bottom: none;
      border-top: 1px solid var(--ux-border-color);
      padding-bottom: env(safe-area-inset-bottom);
      z-index: 100;
    }

    .ux-tab-bar--bottom .ux-tab-button {
      min-height: 49px;
      padding: var(--ux-space-xs) var(--ux-space-sm);
    }

    .ux-tab-bar--bottom .ux-tab-button__icon {
      width: 28px;
      height: 28px;
    }

    .ux-tab-bar--bottom .ux-tab-button__label {
      font-size: 10px;
    }

    /* ========================================
       Scrollable Tab Bar
    ======================================== */

    .ux-tab-bar--scrollable .ux-tab-button {
      flex: 0 0 auto;
      min-width: auto;
      padding: var(--ux-space-sm) var(--ux-space-lg);
    }

    /* ========================================
       Pill Style Tab Bar
    ======================================== */

    .ux-tab-bar--pills {
      gap: var(--ux-space-xs);
      padding: var(--ux-space-sm);
      background-color: var(--ux-surface-secondary);
      border-bottom: none;
      border-radius: var(--ux-border-radius-lg);
      margin: var(--ux-space-sm);
    }

    .ux-tab-bar--pills .ux-tab-button {
      border-radius: var(--ux-border-radius);
      min-height: 36px;
    }

    .ux-tab-bar--pills .ux-tab-button--selected {
      background-color: var(--ux-surface);
      box-shadow: var(--ux-shadow-sm);
      color: var(--ux-text);
    }

    /* ========================================
       Sizes
    ======================================== */

    .ux-tab-bar--sm .ux-tab-button {
      min-height: 40px;
      padding: var(--ux-space-xs) var(--ux-space-md);
      font-size: var(--ux-font-size-xs);
    }

    .ux-tab-bar--sm .ux-tab-button__icon {
      width: 20px;
      height: 20px;
    }

    .ux-tab-bar--lg .ux-tab-button {
      min-height: 56px;
      padding: var(--ux-space-md) var(--ux-space-lg);
      font-size: var(--ux-font-size-md);
    }

    .ux-tab-bar--lg .ux-tab-button__icon {
      width: 28px;
      height: 28px;
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-tabs-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-tabs-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for tabs
  // ARIA: role="tablist" on bar, role="tab" on buttons, role="tabpanel" on panels
  const tabsComponent = (config = {}) => ({
    activeTab: config.activeTab || 0,
    tabs: config.tabs || [],
    animated: config.animated || false,
    indicatorStyle: {},
    tabsId: config.id || 'ux-tabs-' + Math.random().toString(36).substr(2, 9),

    // ARIA attributes for the tab bar (tablist)
    get tablistAriaAttrs() {
      return {
        'role': 'tablist',
        'aria-label': config.ariaLabel || 'Tabs'
      };
    },

    // ARIA attributes for each tab button
    getTabAriaAttrs(index) {
      return {
        'role': 'tab',
        'aria-selected': this.activeTab === index ? 'true' : 'false',
        'aria-controls': this.tabsId + '-panel-' + index,
        'id': this.tabsId + '-tab-' + index,
        'tabindex': this.activeTab === index ? '0' : '-1'
      };
    },

    // ARIA attributes for each tab panel
    getPanelAriaAttrs(index) {
      return {
        'role': 'tabpanel',
        'aria-labelledby': this.tabsId + '-tab-' + index,
        'id': this.tabsId + '-panel-' + index,
        'tabindex': '0'
      };
    },

    init() {
      this.$nextTick(() => {
        this.updateIndicator();
      });
    },

    select(index) {
      if (index === this.activeTab) return;
      if (this.tabs[index]?.disabled) return;

      this.activeTab = index;
      this.updateIndicator();
    },

    selectByValue(value) {
      const index = this.tabs.findIndex(tab => tab.value === value);
      if (index !== -1) {
        this.select(index);
      }
    },

    next() {
      const nextIndex = (this.activeTab + 1) % this.tabs.length;
      this.select(nextIndex);
    },

    prev() {
      const prevIndex = (this.activeTab - 1 + this.tabs.length) % this.tabs.length;
      this.select(prevIndex);
    },

    isActive(index) {
      return this.activeTab === index;
    },

    updateIndicator() {
      const tabBar = this.$refs.tabBar;
      if (!tabBar) return;

      const buttons = tabBar.querySelectorAll('.ux-tab-button');
      const activeButton = buttons[this.activeTab];

      if (activeButton) {
        this.indicatorStyle = {
          left: activeButton.offsetLeft + 'px',
          width: activeButton.offsetWidth + 'px'
        };
      }
    },

    get activeTabData() {
      return this.tabs[this.activeTab];
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxTabs', tabsComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxTabs', tabsComponent);
    });
  }
})();
/**
 * UX Segment Component
 * Control segmentado estilo iOS
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Segment
    ======================================== */

    .ux-segment {
      display: inline-flex;
      align-items: stretch;
      background-color: var(--ux-surface-secondary);
      border-radius: var(--ux-border-radius);
      padding: 2px;
      position: relative;
    }

    .ux-segment--block {
      display: flex;
      width: 100%;
    }

    /* ========================================
       Segment Button
    ======================================== */

    .ux-segment-button {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      min-width: 0;
      min-height: 32px;
      padding: var(--ux-space-sm) var(--ux-space-md);
      background: transparent;
      border: none;
      color: var(--ux-text-secondary);
      font-family: var(--ux-font-family);
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      white-space: nowrap;
      cursor: pointer;
      border-radius: calc(var(--ux-border-radius) - 2px);
      -webkit-tap-highlight-color: transparent;
      z-index: 1;
    }

    .ux-segment-button:hover:not(.ux-segment-button--selected) {
      color: var(--ux-text);
    }

    .ux-segment-button--selected {
      color: var(--ux-text);
    }

    .ux-segment-button--disabled {
      opacity: 0.4;
      pointer-events: none;
    }

    /* ========================================
       Segment Indicator (sliding background)
       Ionic-style animation with squish effect
    ======================================== */

    .ux-segment__indicator {
      position: absolute;
      top: 2px;
      bottom: 2px;
      background-color: var(--ux-surface);
      border-radius: calc(var(--ux-border-radius) - 2px);
      box-shadow: var(--ux-shadow-sm);
      transition:
        left 300ms cubic-bezier(0.4, 0.0, 0.2, 1),
        width 300ms cubic-bezier(0.4, 0.0, 0.2, 1),
        transform 300ms cubic-bezier(0.4, 0.0, 0.2, 1);
      z-index: 0;
      will-change: left, width, transform;
    }

    /* Squish animation during transition */
    .ux-segment__indicator--animating {
      animation: ux-segment-squish 300ms cubic-bezier(0.4, 0.0, 0.2, 1);
    }

    @keyframes ux-segment-squish {
      0% {
        transform: scaleX(1) scaleY(1);
      }
      30% {
        transform: scaleX(1.08) scaleY(0.92);
      }
      60% {
        transform: scaleX(0.96) scaleY(1.02);
      }
      100% {
        transform: scaleX(1) scaleY(1);
      }
    }

    /* Subtle press effect on buttons */
    .ux-segment-button:active:not(.ux-segment-button--selected) {
      transform: scale(0.96);
    }

    .ux-segment-button {
      transition:
        color var(--ux-transition-fast) var(--ux-ease),
        transform 150ms var(--ux-ease);
    }

    /* ========================================
       Segment Button Content
    ======================================== */

    .ux-segment-button__icon {
      width: 18px;
      height: 18px;
      flex-shrink: 0;
    }

    .ux-segment-button__icon svg {
      width: 100%;
      height: 100%;
    }

    .ux-segment-button__label {
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .ux-segment-button__icon + .ux-segment-button__label {
      margin-left: var(--ux-space-xs);
    }

    /* Icon only */
    .ux-segment-button--icon-only {
      padding: var(--ux-space-sm);
    }

    .ux-segment-button--icon-only .ux-segment-button__icon {
      width: 20px;
      height: 20px;
    }

    /* ========================================
       Segment Variants
    ======================================== */

    /* Primary */
    .ux-segment--primary {
      background-color: rgba(var(--ux-primary-rgb), 0.15);
    }

    .ux-segment--primary .ux-segment__indicator {
      background-color: var(--ux-primary);
    }

    .ux-segment--primary .ux-segment-button--selected {
      color: white;
    }

    /* Outline */
    .ux-segment--outline {
      background-color: transparent;
      border: 1px solid var(--ux-border-color);
      padding: 0;
    }

    .ux-segment--outline .ux-segment-button {
      border-radius: 0;
      border-right: 1px solid var(--ux-border-color);
    }

    .ux-segment--outline .ux-segment-button:first-child {
      border-radius: calc(var(--ux-border-radius) - 1px) 0 0 calc(var(--ux-border-radius) - 1px);
    }

    .ux-segment--outline .ux-segment-button:last-child {
      border-radius: 0 calc(var(--ux-border-radius) - 1px) calc(var(--ux-border-radius) - 1px) 0;
      border-right: none;
    }

    .ux-segment--outline .ux-segment__indicator {
      top: 0;
      bottom: 0;
      border-radius: calc(var(--ux-border-radius) - 1px);
      box-shadow: none;
      background-color: var(--ux-primary);
    }

    .ux-segment--outline .ux-segment-button--selected {
      color: white;
    }

    /* Rounded Pill */
    .ux-segment--rounded {
      border-radius: 100px;
      padding: 3px;
    }

    .ux-segment--rounded .ux-segment-button {
      border-radius: 100px;
    }

    .ux-segment--rounded .ux-segment__indicator {
      border-radius: 100px;
    }

    /* ========================================
       Color Variants
    ======================================== */

    .ux-segment--secondary .ux-segment__indicator {
      background-color: var(--ux-secondary);
    }

    .ux-segment--secondary .ux-segment-button--selected {
      color: var(--ux-secondary-contrast);
    }

    .ux-segment--success .ux-segment__indicator {
      background-color: var(--ux-success);
    }

    .ux-segment--success .ux-segment-button--selected {
      color: var(--ux-success-contrast);
    }

    .ux-segment--danger .ux-segment__indicator {
      background-color: var(--ux-danger);
    }

    .ux-segment--danger .ux-segment-button--selected {
      color: var(--ux-danger-contrast);
    }

    /* ========================================
       Sizes
    ======================================== */

    .ux-segment--sm {
      padding: 2px;
    }

    .ux-segment--sm .ux-segment-button {
      min-height: 28px;
      padding: var(--ux-space-xs) var(--ux-space-sm);
      font-size: var(--ux-font-size-xs);
    }

    .ux-segment--sm .ux-segment-button__icon {
      width: 14px;
      height: 14px;
    }

    .ux-segment--lg {
      padding: 3px;
    }

    .ux-segment--lg .ux-segment-button {
      min-height: 44px;
      padding: var(--ux-space-md) var(--ux-space-lg);
      font-size: var(--ux-font-size-md);
    }

    .ux-segment--lg .ux-segment-button__icon {
      width: 22px;
      height: 22px;
    }

    /* ========================================
       Disabled State
    ======================================== */

    .ux-segment--disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    /* ========================================
       In Toolbar
    ======================================== */

    .ux-toolbar .ux-segment {
      flex: 1;
      max-width: 400px;
    }

    .ux-navbar .ux-segment {
      flex: 0 1 auto;
    }

    /* ========================================
       Scrollable Segment
    ======================================== */

    .ux-segment--scrollable {
      display: flex;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
    }

    .ux-segment--scrollable::-webkit-scrollbar {
      display: none;
    }

    .ux-segment--scrollable .ux-segment-button {
      flex: 0 0 auto;
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-segment-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-segment-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for segment
  const segmentComponent = (config = {}) => ({
    value: config.value || null,
    options: config.options || [],
    disabled: config.disabled || false,
    indicatorStyle: {},
    isAnimating: false,

    init() {
      // Set first option as default if no value
      if (this.value === null && this.options.length > 0) {
        this.value = this.options[0].value;
      }
      this.$nextTick(() => {
        this.updateIndicator(false);
      });
    },

    select(optionValue) {
      if (this.disabled) return;
      const option = this.options.find(o => o.value === optionValue);
      if (option?.disabled) return;
      if (this.value === optionValue) return;

      this.value = optionValue;
      this.updateIndicator(true);
    },

    isSelected(optionValue) {
      return this.value === optionValue;
    },

    updateIndicator(animate = true) {
      const container = this.$refs.segment;
      if (!container) return;

      const buttons = container.querySelectorAll('.ux-segment-button');
      const selectedIndex = this.options.findIndex(o => o.value === this.value);
      const selectedButton = buttons[selectedIndex];

      if (selectedButton) {
        // Trigger squish animation
        if (animate) {
          this.isAnimating = true;
          setTimeout(() => {
            this.isAnimating = false;
          }, 300);
        }

        this.indicatorStyle = {
          left: selectedButton.offsetLeft + 'px',
          width: selectedButton.offsetWidth + 'px'
        };
      }
    },

    get selectedOption() {
      return this.options.find(o => o.value === this.value);
    },

    get selectedIndex() {
      return this.options.findIndex(o => o.value === this.value);
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxSegment', segmentComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxSegment', segmentComponent);
    });
  }
})();
/**
 * UX Breadcrumbs Component
 * Migas de pan para navegación
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Breadcrumbs
    ======================================== */

    .ux-breadcrumbs {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: var(--ux-space-xs);
      padding: var(--ux-space-sm) 0;
      font-size: var(--ux-font-size-sm);
    }

    /* ========================================
       Breadcrumb Item
    ======================================== */

    .ux-breadcrumb {
      display: inline-flex;
      align-items: center;
      gap: var(--ux-space-xs);
    }

    .ux-breadcrumb__link {
      display: inline-flex;
      align-items: center;
      gap: var(--ux-space-xs);
      color: var(--ux-primary);
      text-decoration: none;
      padding: var(--ux-space-xs) var(--ux-space-sm);
      border-radius: var(--ux-border-radius-sm);
      transition:
        background-color var(--ux-transition-fast) var(--ux-ease),
        color var(--ux-transition-fast) var(--ux-ease);
      -webkit-tap-highlight-color: transparent;
    }

    .ux-breadcrumb__link:hover {
      background-color: rgba(var(--ux-primary-rgb), 0.1);
    }

    .ux-breadcrumb__link:active {
      background-color: rgba(var(--ux-primary-rgb), 0.2);
    }

    .ux-breadcrumb--current .ux-breadcrumb__link {
      color: var(--ux-text);
      pointer-events: none;
    }

    .ux-breadcrumb--disabled .ux-breadcrumb__link {
      color: var(--ux-text-tertiary);
      pointer-events: none;
    }

    /* ========================================
       Breadcrumb Icon
    ======================================== */

    .ux-breadcrumb__icon {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
    }

    .ux-breadcrumb__icon svg {
      width: 100%;
      height: 100%;
    }

    /* ========================================
       Separator
    ======================================== */

    .ux-breadcrumb__separator {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      color: var(--ux-text-tertiary);
      flex-shrink: 0;
    }

    .ux-breadcrumb__separator svg {
      width: 100%;
      height: 100%;
    }

    /* Different separator styles */
    .ux-breadcrumbs--slash .ux-breadcrumb__separator::before {
      content: '/';
    }

    .ux-breadcrumbs--arrow .ux-breadcrumb__separator::before {
      content: '›';
      font-size: var(--ux-font-size-lg);
    }

    .ux-breadcrumbs--dot .ux-breadcrumb__separator::before {
      content: '•';
    }

    /* ========================================
       Collapsed Breadcrumbs
    ======================================== */

    .ux-breadcrumb--collapsed {
      display: inline-flex;
    }

    .ux-breadcrumb__ellipsis {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: var(--ux-space-xs) var(--ux-space-sm);
      color: var(--ux-text-secondary);
      cursor: pointer;
      border-radius: var(--ux-border-radius-sm);
      transition: background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-breadcrumb__ellipsis:hover {
      background-color: var(--ux-surface-secondary);
    }

    /* Dropdown for collapsed items */
    .ux-breadcrumb__dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      min-width: 160px;
      background-color: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius);
      box-shadow: var(--ux-shadow-lg);
      padding: var(--ux-space-xs) 0;
      z-index: 100;
    }

    .ux-breadcrumb__dropdown-item {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
      padding: var(--ux-space-sm) var(--ux-space-md);
      color: var(--ux-text);
      text-decoration: none;
      transition: background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-breadcrumb__dropdown-item:hover {
      background-color: var(--ux-surface-secondary);
    }

    /* ========================================
       Variants
    ======================================== */

    /* Contained */
    .ux-breadcrumbs--contained {
      background-color: var(--ux-surface-secondary);
      border-radius: var(--ux-border-radius);
      padding: var(--ux-space-sm) var(--ux-space-md);
    }

    /* Outlined */
    .ux-breadcrumbs--outlined {
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius);
      padding: var(--ux-space-sm) var(--ux-space-md);
    }

    /* ========================================
       Sizes
    ======================================== */

    .ux-breadcrumbs--sm {
      font-size: var(--ux-font-size-xs);
      gap: 2px;
    }

    .ux-breadcrumbs--sm .ux-breadcrumb__link {
      padding: 2px var(--ux-space-xs);
    }

    .ux-breadcrumbs--sm .ux-breadcrumb__icon,
    .ux-breadcrumbs--sm .ux-breadcrumb__separator {
      width: 12px;
      height: 12px;
    }

    .ux-breadcrumbs--lg {
      font-size: var(--ux-font-size-md);
    }

    .ux-breadcrumbs--lg .ux-breadcrumb__link {
      padding: var(--ux-space-sm) var(--ux-space-md);
    }

    .ux-breadcrumbs--lg .ux-breadcrumb__icon,
    .ux-breadcrumbs--lg .ux-breadcrumb__separator {
      width: 20px;
      height: 20px;
    }

    /* ========================================
       Responsive
    ======================================== */

    @media (max-width: 767px) {
      .ux-breadcrumbs--responsive .ux-breadcrumb:not(:last-child):not(:first-child) {
        display: none;
      }

      .ux-breadcrumbs--responsive .ux-breadcrumb--show-mobile {
        display: inline-flex;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-breadcrumbs-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-breadcrumbs-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for collapsible breadcrumbs
  const breadcrumbsComponent = (config = {}) => ({
    items: config.items || [],
    maxItems: config.maxItems || 4,
    collapsed: true,
    dropdownOpen: false,

    get visibleItems() {
      if (!this.collapsed || this.items.length <= this.maxItems) {
        return this.items;
      }

      // Show first, ellipsis, and last two
      return [
        this.items[0],
        { type: 'ellipsis' },
        ...this.items.slice(-2)
      ];
    },

    get collapsedItems() {
      if (this.items.length <= this.maxItems) return [];
      return this.items.slice(1, -2);
    },

    expand() {
      this.collapsed = false;
    },

    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },

    closeDropdown() {
      this.dropdownOpen = false;
    },

    isLast(index) {
      return index === this.visibleItems.length - 1;
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxBreadcrumbs', breadcrumbsComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxBreadcrumbs', breadcrumbsComponent);
    });
  }
})();
/**
 * UX Menu Component
 * Menús desplegables y contextuales
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Menu Container
    ======================================== */

    .ux-menu {
      position: relative;
      display: inline-block;
    }

    /* ========================================
       Menu Content (Dropdown)
    ======================================== */

    .ux-menu__content {
      position: absolute;
      min-width: 180px;
      max-width: 320px;
      max-height: 400px;
      background-color: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius-lg);
      box-shadow: var(--ux-shadow-xl);
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      z-index: 1000;
      opacity: 0;
      visibility: hidden;
      transform: scale(0.95) translateY(-8px);
      transform-origin: top left;
      transition:
        opacity var(--ux-transition-fast) var(--ux-ease),
        visibility var(--ux-transition-fast) var(--ux-ease),
        transform var(--ux-transition-fast) var(--ux-ease-spring);
    }

    .ux-menu--open .ux-menu__content {
      opacity: 1;
      visibility: visible;
      transform: scale(1) translateY(0);
    }

    /* Positioning */
    .ux-menu__content--top {
      bottom: 100%;
      margin-bottom: var(--ux-space-xs);
      transform-origin: bottom left;
    }

    .ux-menu__content--right {
      right: 0;
      left: auto;
      transform-origin: top right;
    }

    .ux-menu__content--top.ux-menu__content--right {
      transform-origin: bottom right;
    }

    .ux-menu__content--bottom {
      top: 100%;
      margin-top: var(--ux-space-xs);
    }

    .ux-menu__content--left {
      left: 0;
    }

    /* Full width on mobile */
    @media (max-width: 480px) {
      .ux-menu--full-mobile .ux-menu__content {
        position: fixed;
        left: var(--ux-space-md);
        right: var(--ux-space-md);
        min-width: auto;
        max-width: none;
      }
    }

    /* ========================================
       Menu List
    ======================================== */

    .ux-menu__list {
      list-style: none;
      margin: 0;
      padding: var(--ux-space-xs) 0;
    }

    /* ========================================
       Menu Item
    ======================================== */

    .ux-menu__item {
      display: flex;
      align-items: center;
      padding: var(--ux-space-sm) var(--ux-space-lg);
      color: var(--ux-text);
      font-size: var(--ux-font-size-md);
      text-decoration: none;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition: background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-menu__item:hover {
      background-color: var(--ux-surface-secondary);
    }

    .ux-menu__item:active {
      background-color: var(--ux-light);
    }

    .ux-menu__item--selected {
      color: var(--ux-primary);
      background-color: rgba(var(--ux-primary-rgb), 0.08);
    }

    .ux-menu__item--disabled {
      opacity: 0.4;
      pointer-events: none;
    }

    .ux-menu__item--danger {
      color: var(--ux-danger);
    }

    .ux-menu__item--danger:hover {
      background-color: rgba(var(--ux-danger-rgb), 0.1);
    }

    /* ========================================
       Menu Item Content
    ======================================== */

    .ux-menu__item-icon {
      width: 20px;
      height: 20px;
      margin-right: var(--ux-space-md);
      color: var(--ux-text-secondary);
      flex-shrink: 0;
    }

    .ux-menu__item--selected .ux-menu__item-icon,
    .ux-menu__item--danger .ux-menu__item-icon {
      color: inherit;
    }

    .ux-menu__item-icon svg {
      width: 100%;
      height: 100%;
    }

    .ux-menu__item-content {
      flex: 1;
      min-width: 0;
    }

    .ux-menu__item-label {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .ux-menu__item-description {
      display: block;
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin-top: 2px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .ux-menu__item-end {
      margin-left: auto;
      padding-left: var(--ux-space-md);
      display: flex;
      align-items: center;
      flex-shrink: 0;
    }

    .ux-menu__item-shortcut {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-tertiary);
    }

    .ux-menu__item-check {
      width: 16px;
      height: 16px;
      color: var(--ux-primary);
    }

    .ux-menu__item-check svg {
      width: 100%;
      height: 100%;
    }

    .ux-menu__item-arrow {
      width: 16px;
      height: 16px;
      color: var(--ux-text-tertiary);
    }

    .ux-menu__item-arrow svg {
      width: 100%;
      height: 100%;
    }

    /* ========================================
       Menu Divider
    ======================================== */

    .ux-menu__divider {
      height: 1px;
      margin: var(--ux-space-xs) 0;
      background-color: var(--ux-border-color);
    }

    /* ========================================
       Menu Header
    ======================================== */

    .ux-menu__header {
      padding: var(--ux-space-sm) var(--ux-space-lg);
      font-size: var(--ux-font-size-xs);
      font-weight: 600;
      color: var(--ux-text-tertiary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    /* ========================================
       Submenu
    ======================================== */

    .ux-menu__item--submenu {
      position: relative;
    }

    .ux-menu__submenu {
      position: absolute;
      left: 100%;
      top: 0;
      margin-left: var(--ux-space-xs);
    }

    .ux-menu__submenu--left {
      left: auto;
      right: 100%;
      margin-left: 0;
      margin-right: var(--ux-space-xs);
    }

    /* ========================================
       Sizes
    ======================================== */

    .ux-menu__content--sm {
      min-width: 140px;
    }

    .ux-menu__content--sm .ux-menu__item {
      padding: var(--ux-space-xs) var(--ux-space-md);
      font-size: var(--ux-font-size-sm);
    }

    .ux-menu__content--sm .ux-menu__item-icon {
      width: 16px;
      height: 16px;
    }

    .ux-menu__content--lg {
      min-width: 240px;
    }

    .ux-menu__content--lg .ux-menu__item {
      padding: var(--ux-space-md) var(--ux-space-lg);
    }

    /* ========================================
       Context Menu
    ======================================== */

    .ux-context-menu {
      position: fixed;
      z-index: 1001;
    }

    .ux-context-menu .ux-menu__content {
      position: static;
      opacity: 1;
      visibility: visible;
      transform: scale(1);
    }

    /* ========================================
       Action Menu (Bottom Sheet style on mobile)
    ======================================== */

    @media (max-width: 767px) {
      .ux-menu--action-sheet .ux-menu__content {
        position: fixed;
        top: auto;
        left: 0;
        right: 0;
        bottom: 0;
        max-height: 60vh;
        min-width: auto;
        max-width: none;
        border-radius: var(--ux-border-radius-xl) var(--ux-border-radius-xl) 0 0;
        border: none;
        transform: translateY(100%);
        transform-origin: bottom center;
        padding-bottom: env(safe-area-inset-bottom);
      }

      .ux-menu--action-sheet.ux-menu--open .ux-menu__content {
        transform: translateY(0);
      }

      .ux-menu--action-sheet .ux-menu__content::before {
        content: '';
        display: block;
        width: 36px;
        height: 4px;
        margin: var(--ux-space-sm) auto var(--ux-space-md);
        background-color: var(--ux-light-shade);
        border-radius: 2px;
      }

      .ux-menu--action-sheet .ux-menu__item {
        padding: var(--ux-space-md) var(--ux-space-xl);
        font-size: var(--ux-font-size-lg);
      }
    }

    /* ========================================
       Backdrop for mobile menu
    ======================================== */

    .ux-menu__backdrop {
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.4);
      z-index: 999;
      opacity: 0;
      visibility: hidden;
      transition:
        opacity var(--ux-transition-base) var(--ux-ease),
        visibility var(--ux-transition-base) var(--ux-ease);
    }

    .ux-menu--open .ux-menu__backdrop {
      opacity: 1;
      visibility: visible;
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-menu-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-menu-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for menu
  // ARIA: role="menu", aria-expanded on trigger, role="menuitem" on items
  const menuComponent = (config = {}) => ({
    isOpen: false,
    position: config.position || 'bottom-left',
    items: config.items || [],
    selectedValue: config.selectedValue || null,
    menuId: config.id || 'ux-menu-' + Math.random().toString(36).substr(2, 9),

    // ARIA attributes for the trigger button
    get triggerAriaAttrs() {
      return {
        'aria-haspopup': 'menu',
        'aria-expanded': this.isOpen ? 'true' : 'false',
        'aria-controls': this.menuId + '-content'
      };
    },

    // ARIA attributes for the menu content
    get menuAriaAttrs() {
      return {
        'role': 'menu',
        'id': this.menuId + '-content',
        'aria-orientation': 'vertical'
      };
    },

    // ARIA attributes for each menu item
    getItemAriaAttrs(item, index) {
      return {
        'role': 'menuitem',
        'tabindex': index === 0 ? '0' : '-1',
        'aria-disabled': item.disabled ? 'true' : 'false'
      };
    },

    open() {
      this.isOpen = true;
      document.body.style.overflow = 'hidden';
      // Focus first menu item
      this.$nextTick(() => {
        const firstItem = this.$refs.content?.querySelector('.ux-menu__item:not(.ux-menu__item--disabled)');
        if (firstItem) firstItem.focus();
      });
    },

    close() {
      this.isOpen = false;
      document.body.style.overflow = '';
    },

    toggle() {
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    },

    select(item) {
      if (item.disabled) return;

      this.selectedValue = item.value;

      if (item.action && typeof item.action === 'function') {
        item.action();
      }

      if (!item.keepOpen) {
        this.close();
      }
    },

    isSelected(item) {
      return this.selectedValue === item.value;
    },

    handleKeydown(event) {
      switch (event.key) {
        case 'Escape':
          this.close();
          break;
        case 'ArrowDown':
          event.preventDefault();
          this.focusNext();
          break;
        case 'ArrowUp':
          event.preventDefault();
          this.focusPrev();
          break;
      }
    },

    focusNext() {
      const items = this.$refs.content?.querySelectorAll('.ux-menu__item:not(.ux-menu__item--disabled)');
      if (!items) return;

      const current = document.activeElement;
      const currentIndex = Array.from(items).indexOf(current);
      const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
      items[nextIndex]?.focus();
    },

    focusPrev() {
      const items = this.$refs.content?.querySelectorAll('.ux-menu__item:not(.ux-menu__item--disabled)');
      if (!items) return;

      const current = document.activeElement;
      const currentIndex = Array.from(items).indexOf(current);
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
      items[prevIndex]?.focus();
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxMenu', menuComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxMenu', menuComponent);
    });
  }

  // Alpine component for context menu
  // ARIA: role="menu" for context menus
  const contextMenuComponent = (config = {}) => ({
    isOpen: false,
    x: 0,
    y: 0,
    items: config.items || [],
    contextMenuId: config.id || 'ux-context-menu-' + Math.random().toString(36).substr(2, 9),

    // ARIA attributes for context menu
    get menuAriaAttrs() {
      return {
        'role': 'menu',
        'id': this.contextMenuId,
        'aria-orientation': 'vertical'
      };
    },

    // ARIA attributes for each menu item
    getItemAriaAttrs(item, index) {
      return {
        'role': 'menuitem',
        'tabindex': index === 0 ? '0' : '-1',
        'aria-disabled': item.disabled ? 'true' : 'false'
      };
    },

    show(event) {
      event.preventDefault();

      // Position the menu
      this.x = event.clientX;
      this.y = event.clientY;

      // Adjust if menu would go off screen
      this.$nextTick(() => {
        const menu = this.$refs.menu;
        if (!menu) return;

        const rect = menu.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        if (this.x + rect.width > viewportWidth) {
          this.x = viewportWidth - rect.width - 8;
        }

        if (this.y + rect.height > viewportHeight) {
          this.y = viewportHeight - rect.height - 8;
        }
      });

      this.isOpen = true;
    },

    hide() {
      this.isOpen = false;
    },

    select(item) {
      if (item.disabled) return;

      if (item.action && typeof item.action === 'function') {
        item.action();
      }

      this.hide();
    },

    getStyle() {
      return {
        left: this.x + 'px',
        top: this.y + 'px'
      };
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxContextMenu', contextMenuComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxContextMenu', contextMenuComponent);
    });
  }
})();
/**
 * UX Back Button Component
 * iOS-style back button with arrow and text
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Back Button
    ======================================== */

    .ux-back-button {
      display: inline-flex;
      align-items: center;
      gap: var(--ux-space-xs);
      min-height: var(--ux-touch-target);
      padding: var(--ux-space-xs) var(--ux-space-sm);
      padding-left: 0;
      background: none;
      border: none;
      color: var(--ux-primary);
      font-family: var(--ux-font-family);
      font-size: var(--ux-font-size-md);
      font-weight: 400;
      text-decoration: none;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition:
        opacity var(--ux-transition-fast) var(--ux-ease),
        transform var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-back-button:hover {
      opacity: 0.7;
    }

    .ux-back-button:active {
      opacity: 0.5;
      transform: scale(0.97);
    }

    /* ========================================
       Back Button Icon
    ======================================== */

    .ux-back-button__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      flex-shrink: 0;
      transition: transform var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-back-button__icon svg {
      width: 100%;
      height: 100%;
    }

    /* Hover animation - slide left */
    .ux-back-button:hover .ux-back-button__icon {
      transform: translateX(-2px);
    }

    /* ========================================
       Back Button Text
    ======================================== */

    .ux-back-button__text {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 120px;
    }

    /* Icon only */
    .ux-back-button--icon-only .ux-back-button__text {
      display: none;
    }

    .ux-back-button--icon-only {
      padding: var(--ux-space-xs);
    }

    /* ========================================
       Back Button Sizes
    ======================================== */

    .ux-back-button--sm {
      min-height: var(--ux-touch-target-sm);
      font-size: var(--ux-font-size-sm);
    }

    .ux-back-button--sm .ux-back-button__icon {
      width: 20px;
      height: 20px;
    }

    .ux-back-button--sm .ux-back-button__text {
      max-width: 100px;
    }

    .ux-back-button--lg {
      font-size: var(--ux-font-size-lg);
    }

    .ux-back-button--lg .ux-back-button__icon {
      width: 28px;
      height: 28px;
    }

    .ux-back-button--lg .ux-back-button__text {
      max-width: 160px;
    }

    /* ========================================
       Back Button Colors
    ======================================== */

    .ux-back-button--light {
      color: white;
    }

    .ux-back-button--dark {
      color: var(--ux-text);
    }

    .ux-back-button--secondary {
      color: var(--ux-text-secondary);
    }

    /* ========================================
       Back Button in Navbar
    ======================================== */

    .ux-navbar .ux-back-button {
      margin-left: calc(-1 * var(--ux-space-sm));
    }

    .ux-navbar--primary .ux-back-button,
    .ux-navbar--dark .ux-back-button {
      color: white;
    }

    /* ========================================
       Back Button in Toolbar
    ======================================== */

    .ux-toolbar .ux-back-button {
      margin-left: calc(-1 * var(--ux-space-xs));
    }

    /* ========================================
       Back Button in Modal
    ======================================== */

    .ux-modal__header .ux-back-button {
      margin-left: calc(-1 * var(--ux-space-sm));
    }

    /* ========================================
       Disabled State
    ======================================== */

    .ux-back-button:disabled,
    .ux-back-button--disabled {
      opacity: 0.4;
      pointer-events: none;
    }

    /* ========================================
       Custom Icon Positions
    ======================================== */

    .ux-back-button--icon-end {
      flex-direction: row-reverse;
    }

    .ux-back-button--icon-end .ux-back-button__icon {
      transform: rotate(180deg);
    }

    .ux-back-button--icon-end:hover .ux-back-button__icon {
      transform: rotate(180deg) translateX(-2px);
    }

    /* ========================================
       Animated Entrance (for page transitions)
    ======================================== */

    @keyframes ux-back-button-enter {
      from {
        opacity: 0;
        transform: translateX(-10px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    .ux-back-button--animate-in {
      animation: ux-back-button-enter 300ms var(--ux-ease-spring) forwards;
    }

    /* ========================================
       Collapse/Expand Animation (iOS-style)
    ======================================== */

    .ux-back-button--collapsible .ux-back-button__text {
      transition:
        max-width 200ms var(--ux-ease),
        opacity 200ms var(--ux-ease);
    }

    .ux-back-button--collapsed .ux-back-button__text {
      max-width: 0;
      opacity: 0;
      padding: 0;
    }
  `;

  // Default back arrow SVG
  const backArrowSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>`;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-back-button-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-back-button-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for back button with routing
  // ARIA: aria-label for accessibility
  const backButtonComponent = (config = {}) => ({
    text: config.text || 'Back',
    href: config.href || null,
    defaultHref: config.defaultHref || '/',
    showIcon: config.showIcon !== false,
    showText: config.showText !== false,
    disabled: config.disabled || false,
    collapsed: config.collapsed || false,

    // ARIA attributes
    get ariaAttrs() {
      return {
        'aria-label': this.text || 'Go back',
        'role': this.href ? 'link' : 'button'
      };
    },

    // Get the back arrow SVG
    get iconSvg() {
      return backArrowSvg;
    },

    // Navigate back
    goBack() {
      if (this.disabled) return;

      // If href is provided, navigate to it
      if (this.href) {
        window.location.href = this.href;
        return;
      }

      // Check if there's history to go back to
      if (window.history.length > 1) {
        window.history.back();
      } else if (this.defaultHref) {
        // Fallback to default href
        window.location.href = this.defaultHref;
      }

      // Dispatch event for custom handling
      this.$dispatch('back-button-click');
    },

    // Handle click
    handleClick(event) {
      // If it's a link and href is set, let it navigate normally
      if (this.href && event.currentTarget.tagName === 'A') {
        return;
      }

      event.preventDefault();
      this.goBack();
    },

    // Collapse/expand text (iOS scroll behavior)
    collapse() {
      this.collapsed = true;
    },

    expand() {
      this.collapsed = false;
    },

    toggle() {
      this.collapsed = !this.collapsed;
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxBackButton', backButtonComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxBackButton', backButtonComponent);
    });
  }

  // Export SVG for use in templates
  window.UX = window.UX || {};
  window.UX.backArrowSvg = backArrowSvg;
})();
/**
 * UX Modal Component
 * Modales estilo iOS
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Modal Backdrop
    ======================================== */

    .ux-modal-backdrop {
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.4);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--ux-space-lg);
      opacity: 0;
      visibility: hidden;
      transition:
        opacity var(--ux-transition-base) var(--ux-ease),
        visibility var(--ux-transition-base) var(--ux-ease);
    }

    .ux-modal-backdrop--open {
      opacity: 1;
      visibility: visible;
    }

    /* Mobile: align to bottom */
    @media (max-width: 767px) {
      .ux-modal-backdrop {
        align-items: flex-end;
        padding: 0;
      }
    }

    /* ========================================
       UX Modal
    ======================================== */

    .ux-modal {
      position: relative;
      width: 100%;
      max-width: 500px;
      max-height: calc(100vh - var(--ux-space-2xl) * 2);
      background-color: var(--ux-surface);
      border-radius: var(--ux-border-radius-xl);
      box-shadow: var(--ux-shadow-xl);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transform: scale(0.95) translateY(20px);
      opacity: 0;
      transition:
        transform var(--ux-transition-base) var(--ux-ease-spring),
        opacity var(--ux-transition-base) var(--ux-ease);
    }

    .ux-modal-backdrop--open .ux-modal {
      transform: scale(1) translateY(0);
      opacity: 1;
    }

    /* Mobile: sheet style */
    @media (max-width: 767px) {
      .ux-modal {
        max-width: none;
        max-height: 90vh;
        border-radius: var(--ux-border-radius-xl) var(--ux-border-radius-xl) 0 0;
        transform: translateY(100%);
      }

      .ux-modal-backdrop--open .ux-modal {
        transform: translateY(0);
      }
    }

    /* ========================================
       Modal Sizes
    ======================================== */

    .ux-modal--sm {
      max-width: 360px;
    }

    .ux-modal--lg {
      max-width: 680px;
    }

    .ux-modal--xl {
      max-width: 900px;
    }

    .ux-modal--full {
      max-width: none;
      max-height: none;
      width: 100vw;
      height: 100vh;
      border-radius: 0;
    }

    @media (max-width: 767px) {
      .ux-modal--full {
        max-height: 100vh;
        border-radius: 0;
      }
    }

    /* ========================================
       Modal Header
    ======================================== */

    .ux-modal__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 56px;
      padding: var(--ux-space-md) var(--ux-space-lg);
      border-bottom: 1px solid var(--ux-border-color);
      flex-shrink: 0;
    }

    .ux-modal__header--no-border {
      border-bottom: none;
    }

    .ux-modal__header-start {
      display: flex;
      align-items: center;
      min-width: 60px;
    }

    .ux-modal__header-center {
      flex: 1;
      text-align: center;
    }

    .ux-modal__header-end {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      min-width: 60px;
    }

    .ux-modal__title {
      font-size: var(--ux-font-size-lg);
      font-weight: 600;
      color: var(--ux-text);
      margin: 0;
    }

    .ux-modal__subtitle {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin-top: 2px;
    }

    /* Header buttons */
    .ux-modal__button {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 44px;
      min-height: 44px;
      padding: var(--ux-space-xs);
      background: none;
      border: none;
      color: var(--ux-primary);
      font-size: var(--ux-font-size-md);
      font-weight: 500;
      cursor: pointer;
      border-radius: var(--ux-border-radius);
      -webkit-tap-highlight-color: transparent;
      transition:
        background-color var(--ux-transition-fast) var(--ux-ease),
        opacity var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-modal__button:hover {
      background-color: rgba(var(--ux-primary-rgb), 0.1);
    }

    .ux-modal__button:active {
      opacity: 0.7;
    }

    .ux-modal__button-icon {
      width: 24px;
      height: 24px;
    }

    .ux-modal__button-icon svg {
      width: 100%;
      height: 100%;
    }

    /* Close X button */
    .ux-modal__close {
      color: var(--ux-text-secondary);
    }

    /* ========================================
       Modal Handle (mobile drag indicator)
    ======================================== */

    .ux-modal__handle {
      display: none;
      width: 36px;
      height: 4px;
      margin: var(--ux-space-sm) auto;
      background-color: var(--ux-light-shade);
      border-radius: 2px;
      flex-shrink: 0;
    }

    @media (max-width: 767px) {
      .ux-modal__handle {
        display: block;
      }
    }

    /* ========================================
       Modal Content
    ======================================== */

    .ux-modal__content {
      flex: 1;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      padding: var(--ux-space-lg);
    }

    .ux-modal__content--no-padding {
      padding: 0;
    }

    /* ========================================
       Modal Footer
    ======================================== */

    .ux-modal__footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: var(--ux-space-sm);
      padding: var(--ux-space-md) var(--ux-space-lg);
      border-top: 1px solid var(--ux-border-color);
      flex-shrink: 0;
    }

    .ux-modal__footer--no-border {
      border-top: none;
    }

    .ux-modal__footer--stacked {
      flex-direction: column;
    }

    .ux-modal__footer--stacked .ux-button {
      width: 100%;
    }

    .ux-modal__footer--safe-area {
      padding-bottom: calc(var(--ux-space-md) + env(safe-area-inset-bottom));
    }

    /* ========================================
       Card Modal (iOS style)
    ======================================== */

    .ux-modal--card {
      margin: var(--ux-space-md);
    }

    @media (max-width: 767px) {
      .ux-modal--card {
        margin: var(--ux-space-sm);
        margin-bottom: 0;
        max-height: calc(100vh - var(--ux-space-sm));
        border-radius: var(--ux-border-radius-xl);
      }

      .ux-modal-backdrop--open .ux-modal--card {
        transform: translateY(0);
      }
    }

    /* ========================================
       Fullscreen Modal
    ======================================== */

    .ux-modal--fullscreen {
      max-width: 100%;
      max-height: 100%;
      width: 100%;
      height: 100%;
      border-radius: 0;
      transform: translateY(100%);
    }

    .ux-modal-backdrop--open .ux-modal--fullscreen {
      transform: translateY(0);
    }

    /* ========================================
       Centered Content Modal (for alerts)
    ======================================== */

    .ux-modal--centered .ux-modal__content {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    /* ========================================
       Modal with Image
    ======================================== */

    .ux-modal__image {
      width: 100%;
      max-height: 200px;
      object-fit: cover;
    }

    /* ========================================
       Stacked Modals
    ======================================== */

    .ux-modal-backdrop + .ux-modal-backdrop {
      background-color: rgba(0, 0, 0, 0.2);
    }

    /* ========================================
       CSS-Only Modal (Checkbox Hack)
    ======================================== */

    .ux-modal-toggle {
      display: none;
    }

    .ux-modal-toggle:checked + label + .ux-modal-backdrop {
      opacity: 1;
      visibility: visible;
    }

    .ux-modal-toggle:checked + label + .ux-modal-backdrop .ux-modal {
      transform: scale(1) translateY(0);
      opacity: 1;
    }

    @media (max-width: 767px) {
      .ux-modal-toggle:checked + label + .ux-modal-backdrop .ux-modal {
        transform: translateY(0);
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-modal-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-modal-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for modal
  // ARIA: role="dialog", aria-modal="true", aria-labelledby, aria-describedby
  const modalComponent = (config = {}) => ({
    isOpen: config.isOpen || false,
    closeOnBackdrop: config.closeOnBackdrop !== false,
    closeOnEscape: config.closeOnEscape !== false,
    modalId: config.id || 'ux-modal-' + Math.random().toString(36).substr(2, 9),
    _previousActiveElement: null,

    // ARIA attributes for the modal
    get ariaAttrs() {
      return {
        'role': 'dialog',
        'aria-modal': 'true',
        'aria-labelledby': this.modalId + '-title',
        'aria-describedby': this.modalId + '-content'
      };
    },

    get titleId() {
      return this.modalId + '-title';
    },

    get contentId() {
      return this.modalId + '-content';
    },

    // Get all focusable elements within modal
    _getFocusableElements() {
      const modal = this.$refs.modal || this.$el.querySelector('.ux-modal');
      if (!modal) return [];
      const selector = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])';
      return Array.from(modal.querySelectorAll(selector)).filter(el => el.offsetParent !== null);
    },

    open() {
      // Store current focused element to restore on close
      this._previousActiveElement = document.activeElement;
      this.isOpen = true;
      document.body.style.overflow = 'hidden';

      // Focus first focusable element
      this.$nextTick(() => {
        const focusable = this._getFocusableElements();
        if (focusable.length > 0) {
          focusable[0].focus();
        }
      });
    },

    close() {
      this.isOpen = false;
      document.body.style.overflow = '';

      // Restore focus to previous element
      if (this._previousActiveElement && this._previousActiveElement.focus) {
        this._previousActiveElement.focus();
      }
    },

    toggle() {
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    },

    handleBackdropClick(event) {
      if (this.closeOnBackdrop && event.target === event.currentTarget) {
        this.close();
      }
    },

    handleKeydown(event) {
      if (this.closeOnEscape && event.key === 'Escape') {
        this.close();
        return;
      }

      // Focus trap: Tab key cycles within modal
      if (event.key === 'Tab') {
        const focusable = this._getFocusableElements();
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
      }
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxModal', modalComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxModal', modalComponent);
    });
  }
})();
/**
 * UX Sheet Component
 * Bottom sheets y side sheets estilo iOS
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Sheet Backdrop
    ======================================== */

    .ux-sheet-backdrop {
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.4);
      z-index: 1000;
      opacity: 0;
      visibility: hidden;
      transition:
        opacity 350ms cubic-bezier(0.32, 0.72, 0, 1),
        visibility 350ms cubic-bezier(0.32, 0.72, 0, 1);
    }

    .ux-sheet-backdrop--open {
      opacity: 1;
      visibility: visible;
      transition:
        opacity 300ms cubic-bezier(0.32, 0.72, 0, 1),
        visibility 300ms cubic-bezier(0.32, 0.72, 0, 1);
    }

    /* ========================================
       UX Bottom Sheet
    ======================================== */

    .ux-sheet {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      max-height: 90vh;
      background-color: var(--ux-surface);
      border-radius: var(--ux-border-radius-xl) var(--ux-border-radius-xl) 0 0;
      box-shadow: var(--ux-shadow-xl);
      display: flex;
      flex-direction: column;
      z-index: 1001;
      transform: translateY(100%);
      /* iOS-style smooth spring transition for closing */
      transition: transform 350ms cubic-bezier(0.32, 0.72, 0, 1);
      padding-bottom: env(safe-area-inset-bottom);
      will-change: transform;
    }

    .ux-sheet-backdrop--open .ux-sheet {
      transform: translateY(0);
      /* Faster, snappier spring for opening */
      transition: transform 400ms cubic-bezier(0.32, 0.72, 0, 1);
    }

    /* ========================================
       Sheet Handle
    ======================================== */

    .ux-sheet__handle {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--ux-space-sm) 0;
      cursor: grab;
      flex-shrink: 0;
    }

    .ux-sheet__handle:active {
      cursor: grabbing;
    }

    .ux-sheet__handle-bar {
      width: 36px;
      height: 4px;
      background-color: var(--ux-light-shade);
      border-radius: 2px;
    }

    /* ========================================
       Sheet Header
    ======================================== */

    .ux-sheet__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--ux-space-sm) var(--ux-space-lg);
      border-bottom: 1px solid var(--ux-border-color);
      flex-shrink: 0;
    }

    .ux-sheet__header--no-border {
      border-bottom: none;
    }

    .ux-sheet__title {
      font-size: var(--ux-font-size-lg);
      font-weight: 600;
      color: var(--ux-text);
      margin: 0;
    }

    .ux-sheet__close {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      padding: 0;
      background-color: var(--ux-surface-secondary);
      border: none;
      border-radius: 50%;
      color: var(--ux-text-secondary);
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition: background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-sheet__close:hover {
      background-color: var(--ux-light);
    }

    .ux-sheet__close:active {
      background-color: var(--ux-light-shade);
    }

    .ux-sheet__close-icon {
      width: 18px;
      height: 18px;
    }

    .ux-sheet__close-icon svg {
      width: 100%;
      height: 100%;
    }

    /* ========================================
       Sheet Content
    ======================================== */

    .ux-sheet__content {
      flex: 1;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      padding: var(--ux-space-lg);
    }

    .ux-sheet__content--no-padding {
      padding: 0;
    }

    /* ========================================
       Sheet Footer
    ======================================== */

    .ux-sheet__footer {
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-sm);
      padding: var(--ux-space-md) var(--ux-space-lg);
      border-top: 1px solid var(--ux-border-color);
      flex-shrink: 0;
    }

    .ux-sheet__footer--row {
      flex-direction: row;
      justify-content: flex-end;
    }

    .ux-sheet__footer .ux-button {
      width: 100%;
    }

    .ux-sheet__footer--row .ux-button {
      width: auto;
      flex: 1;
    }

    /* ========================================
       Sheet Sizes
    ======================================== */

    .ux-sheet--sm {
      height: 40vh;
      max-height: 40vh;
    }

    .ux-sheet--md {
      height: 60vh;
      max-height: 60vh;
    }

    .ux-sheet--lg {
      height: 80vh;
      max-height: 80vh;
    }

    .ux-sheet--full {
      height: 100vh;
      max-height: 100vh;
      border-radius: 0;
    }

    /* Auto height based on content */
    .ux-sheet--auto {
      height: auto;
      max-height: 90vh;
    }

    /* ========================================
       Sheet Detents (snap points)
    ======================================== */

    .ux-sheet--detent-small {
      max-height: 25vh;
    }

    .ux-sheet--detent-medium {
      max-height: 50vh;
    }

    .ux-sheet--detent-large {
      max-height: 90vh;
    }

    /* ========================================
       Side Sheet
    ======================================== */

    .ux-side-sheet {
      position: fixed;
      top: 0;
      bottom: 0;
      width: 320px;
      max-width: 85vw;
      background-color: var(--ux-surface);
      box-shadow: var(--ux-shadow-xl);
      display: flex;
      flex-direction: column;
      z-index: 1001;
      /* iOS-style smooth transition for closing */
      transition: transform 350ms cubic-bezier(0.32, 0.72, 0, 1);
      will-change: transform;
    }

    .ux-side-sheet--left {
      left: 0;
      border-radius: 0 var(--ux-border-radius-xl) var(--ux-border-radius-xl) 0;
      transform: translateX(-100%);
    }

    .ux-side-sheet--right {
      right: 0;
      border-radius: var(--ux-border-radius-xl) 0 0 var(--ux-border-radius-xl);
      transform: translateX(100%);
    }

    .ux-sheet-backdrop--open .ux-side-sheet--left,
    .ux-sheet-backdrop--open .ux-side-sheet--right {
      transform: translateX(0);
      /* Smooth spring for opening */
      transition: transform 400ms cubic-bezier(0.32, 0.72, 0, 1);
    }

    /* Side Sheet Header */
    .ux-side-sheet__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 56px;
      padding: var(--ux-space-md) var(--ux-space-lg);
      padding-top: calc(var(--ux-space-md) + env(safe-area-inset-top));
      border-bottom: 1px solid var(--ux-border-color);
      flex-shrink: 0;
    }

    .ux-side-sheet__content {
      flex: 1;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }

    .ux-side-sheet__footer {
      padding: var(--ux-space-md) var(--ux-space-lg);
      padding-bottom: calc(var(--ux-space-md) + env(safe-area-inset-bottom));
      border-top: 1px solid var(--ux-border-color);
      flex-shrink: 0;
    }

    /* ========================================
       Action Sheet
    ======================================== */

    .ux-action-sheet {
      position: fixed;
      left: var(--ux-space-sm);
      right: var(--ux-space-sm);
      bottom: var(--ux-space-sm);
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-sm);
      z-index: 1001;
      transform: translateY(calc(100% + var(--ux-space-lg)));
      /* iOS-style smooth transition for closing */
      transition: transform 350ms cubic-bezier(0.32, 0.72, 0, 1);
      padding-bottom: env(safe-area-inset-bottom);
      will-change: transform;
    }

    .ux-sheet-backdrop--open .ux-action-sheet {
      transform: translateY(0);
      /* Smooth spring for opening */
      transition: transform 400ms cubic-bezier(0.32, 0.72, 0, 1);
    }

    .ux-action-sheet__group {
      background-color: var(--ux-surface);
      border-radius: var(--ux-border-radius-lg);
      overflow: hidden;
    }

    .ux-action-sheet__header {
      padding: var(--ux-space-md) var(--ux-space-lg);
      text-align: center;
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-action-sheet__title {
      font-size: var(--ux-font-size-sm);
      font-weight: 600;
      color: var(--ux-text-secondary);
      margin: 0;
    }

    .ux-action-sheet__message {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-tertiary);
      margin: var(--ux-space-xs) 0 0;
    }

    .ux-action-sheet__button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      min-height: 56px;
      padding: var(--ux-space-md) var(--ux-space-lg);
      background: none;
      border: none;
      color: var(--ux-primary);
      font-family: var(--ux-font-family);
      font-size: var(--ux-font-size-lg);
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition: background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-action-sheet__button:not(:last-child) {
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-action-sheet__button:hover {
      background-color: var(--ux-surface-secondary);
    }

    .ux-action-sheet__button:active {
      background-color: var(--ux-light);
    }

    .ux-action-sheet__button--destructive {
      color: var(--ux-danger);
    }

    .ux-action-sheet__button--cancel {
      font-weight: 600;
    }

    .ux-action-sheet__button-icon {
      width: 24px;
      height: 24px;
      margin-right: var(--ux-space-md);
    }

    .ux-action-sheet__button-icon svg {
      width: 100%;
      height: 100%;
    }

    /* ========================================
       Sheet with Scroll Lock Indicator
    ======================================== */

    .ux-sheet--scroll-lock .ux-sheet__content {
      overscroll-behavior-y: contain;
    }

  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-sheet-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-sheet-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for bottom sheet
  // ARIA: role="dialog", aria-modal="true", aria-labelledby
  const sheetComponent = (config = {}) => ({
    isOpen: config.isOpen || false,
    detent: config.detent || 'medium', // small, medium, large
    closeOnBackdrop: config.closeOnBackdrop !== false,
    draggable: config.draggable !== false,
    startY: 0,
    currentY: 0,
    isDragging: false,
    sheetId: config.id || 'ux-sheet-' + Math.random().toString(36).substr(2, 9),

    // ARIA attributes for the sheet
    get ariaAttrs() {
      return {
        'role': 'dialog',
        'aria-modal': 'true',
        'aria-labelledby': this.sheetId + '-title'
      };
    },

    get titleId() {
      return this.sheetId + '-title';
    },

    open(detent) {
      if (detent) this.detent = detent;
      this.isOpen = true;
      document.body.style.overflow = 'hidden';
      // Focus first focusable element
      this.$nextTick(() => {
        const sheet = this.$refs.sheet || this.$el.querySelector('.ux-sheet, .ux-side-sheet');
        if (sheet) {
          const focusable = sheet.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
          if (focusable) focusable.focus();
        }
      });
    },

    close() {
      this.isOpen = false;
      document.body.style.overflow = '';
    },

    toggle() {
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    },

    setDetent(detent) {
      this.detent = detent;
    },

    handleBackdropClick(event) {
      if (this.closeOnBackdrop && event.target === event.currentTarget) {
        this.close();
      }
    },

    handleTouchStart(event) {
      if (!this.draggable) return;
      this.isDragging = true;
      this.startY = event.touches[0].clientY;
    },

    handleTouchMove(event) {
      if (!this.isDragging) return;
      this.currentY = event.touches[0].clientY - this.startY;

      // Only allow dragging down
      if (this.currentY < 0) {
        this.currentY = 0;
      }
    },

    handleTouchEnd() {
      if (!this.isDragging) return;
      this.isDragging = false;

      // Close if dragged more than 100px
      if (this.currentY > 100) {
        this.close();
      }

      this.currentY = 0;
    },

    getSheetStyle() {
      if (this.currentY > 0) {
        return {
          transform: `translateY(${this.currentY}px)`
        };
      }
      return {};
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxSheet', sheetComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxSheet', sheetComponent);
    });
  }

  // Alpine component for action sheet
  // ARIA: role="dialog", aria-modal="true", aria-labelledby
  const actionSheetComponent = (config = {}) => ({
    isOpen: false,
    title: config.title || '',
    message: config.message || '',
    buttons: config.buttons || [],
    cancelText: config.cancelText || 'Cancel',
    actionSheetId: config.id || 'ux-action-sheet-' + Math.random().toString(36).substr(2, 9),

    // ARIA attributes
    get ariaAttrs() {
      return {
        'role': 'dialog',
        'aria-modal': 'true',
        'aria-labelledby': this.actionSheetId + '-title'
      };
    },

    get titleId() {
      return this.actionSheetId + '-title';
    },

    open(options = {}) {
      if (options.title) this.title = options.title;
      if (options.message) this.message = options.message;
      if (options.buttons) this.buttons = options.buttons;
      if (options.cancelText) this.cancelText = options.cancelText;

      this.isOpen = true;
      document.body.style.overflow = 'hidden';
    },

    close() {
      this.isOpen = false;
      document.body.style.overflow = '';
    },

    handleButtonClick(button) {
      if (button.handler && typeof button.handler === 'function') {
        button.handler();
      }
      this.close();
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxActionSheet', actionSheetComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxActionSheet', actionSheetComponent);
    });
  }
})();
/**
 * UX Alert Component
 * Alertas y diálogos estilo iOS
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Alert Backdrop
    ======================================== */

    .ux-alert-backdrop {
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.4);
      z-index: 1100;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--ux-space-xl);
      opacity: 0;
      visibility: hidden;
      transition:
        opacity var(--ux-transition-fast) var(--ux-ease),
        visibility var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-alert-backdrop--open {
      opacity: 1;
      visibility: visible;
    }

    /* ========================================
       UX Alert (iOS style)
    ======================================== */

    .ux-alert {
      width: 100%;
      max-width: 270px;
      background-color: rgba(var(--ux-surface-rgb, 255, 255, 255), 0.95);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-radius: 14px;
      overflow: hidden;
      transform: scale(1.1);
      opacity: 0;
      transition:
        transform var(--ux-transition-fast) var(--ux-ease-spring),
        opacity var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-alert-backdrop--open .ux-alert {
      transform: scale(1);
      opacity: 1;
    }

    /* ========================================
       Alert Content
    ======================================== */

    .ux-alert__content {
      padding: var(--ux-space-lg) var(--ux-space-lg) var(--ux-space-md);
      text-align: center;
    }

    .ux-alert__icon {
      width: 48px;
      height: 48px;
      margin: 0 auto var(--ux-space-md);
    }

    .ux-alert__icon svg {
      width: 100%;
      height: 100%;
    }

    .ux-alert__icon--success {
      color: var(--ux-success);
    }

    .ux-alert__icon--warning {
      color: var(--ux-warning);
    }

    .ux-alert__icon--danger {
      color: var(--ux-danger);
    }

    .ux-alert__icon--info {
      color: var(--ux-primary);
    }

    .ux-alert__title {
      font-size: var(--ux-font-size-lg);
      font-weight: 600;
      color: var(--ux-text);
      margin: 0 0 var(--ux-space-xs);
    }

    .ux-alert__message {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin: 0;
      line-height: 1.4;
    }

    /* ========================================
       Alert Inputs
    ======================================== */

    .ux-alert__inputs {
      padding: var(--ux-space-sm) var(--ux-space-lg);
    }

    .ux-alert__input {
      width: 100%;
      padding: var(--ux-space-sm) var(--ux-space-md);
      font-size: var(--ux-font-size-md);
      color: var(--ux-text);
      background-color: var(--ux-surface-secondary);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius);
      outline: none;
      transition: border-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-alert__input:focus {
      border-color: var(--ux-primary);
    }

    .ux-alert__input + .ux-alert__input {
      margin-top: var(--ux-space-sm);
    }

    /* ========================================
       Alert Buttons
    ======================================== */

    .ux-alert__buttons {
      display: flex;
      border-top: 1px solid var(--ux-border-color);
    }

    .ux-alert__buttons--stacked {
      flex-direction: column;
    }

    .ux-alert__button {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 44px;
      padding: var(--ux-space-sm) var(--ux-space-md);
      background: none;
      border: none;
      color: var(--ux-primary);
      font-family: var(--ux-font-family);
      font-size: var(--ux-font-size-lg);
      font-weight: 400;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition: background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-alert__button:not(:last-child) {
      border-right: 1px solid var(--ux-border-color);
    }

    .ux-alert__buttons--stacked .ux-alert__button:not(:last-child) {
      border-right: none;
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-alert__button:hover {
      background-color: rgba(var(--ux-primary-rgb), 0.05);
    }

    .ux-alert__button:active {
      background-color: rgba(var(--ux-primary-rgb), 0.1);
    }

    .ux-alert__button--primary {
      font-weight: 600;
    }

    .ux-alert__button--destructive {
      color: var(--ux-danger);
    }

    .ux-alert__button--destructive:hover {
      background-color: rgba(var(--ux-danger-rgb), 0.05);
    }

    .ux-alert__button--destructive:active {
      background-color: rgba(var(--ux-danger-rgb), 0.1);
    }

    .ux-alert__button--cancel {
      font-weight: 600;
    }

    /* ========================================
       Alert Variants
    ======================================== */

    /* Wide Alert (Android style) */
    .ux-alert--wide {
      max-width: 320px;
    }

    .ux-alert--wide .ux-alert__content {
      text-align: left;
    }

    .ux-alert--wide .ux-alert__buttons {
      justify-content: flex-end;
      border-top: none;
      padding: var(--ux-space-sm) var(--ux-space-lg);
    }

    .ux-alert--wide .ux-alert__button {
      flex: 0 0 auto;
      padding: var(--ux-space-sm) var(--ux-space-md);
      font-size: var(--ux-font-size-md);
      font-weight: 500;
      border-radius: var(--ux-border-radius);
    }

    .ux-alert--wide .ux-alert__button:not(:last-child) {
      border-right: none;
    }

    /* ========================================
       Inline Alert (Banner)
    ======================================== */

    .ux-alert-banner {
      display: flex;
      align-items: flex-start;
      gap: var(--ux-space-md);
      padding: var(--ux-space-md) var(--ux-space-lg);
      background-color: var(--ux-surface);
      border-radius: var(--ux-border-radius-lg);
      border: 1px solid var(--ux-border-color);
    }

    .ux-alert-banner--success {
      background-color: rgba(var(--ux-success-rgb), 0.1);
      border-color: var(--ux-success);
    }

    .ux-alert-banner--warning {
      background-color: rgba(var(--ux-warning-rgb), 0.1);
      border-color: var(--ux-warning);
    }

    .ux-alert-banner--danger {
      background-color: rgba(var(--ux-danger-rgb), 0.1);
      border-color: var(--ux-danger);
    }

    .ux-alert-banner--info {
      background-color: rgba(var(--ux-primary-rgb), 0.1);
      border-color: var(--ux-primary);
    }

    .ux-alert-banner__icon {
      width: 24px;
      height: 24px;
      flex-shrink: 0;
    }

    .ux-alert-banner--success .ux-alert-banner__icon {
      color: var(--ux-success);
    }

    .ux-alert-banner--warning .ux-alert-banner__icon {
      color: var(--ux-warning);
    }

    .ux-alert-banner--danger .ux-alert-banner__icon {
      color: var(--ux-danger);
    }

    .ux-alert-banner--info .ux-alert-banner__icon {
      color: var(--ux-primary);
    }

    .ux-alert-banner__icon svg {
      width: 100%;
      height: 100%;
    }

    .ux-alert-banner__content {
      flex: 1;
      min-width: 0;
    }

    .ux-alert-banner__title {
      font-size: var(--ux-font-size-md);
      font-weight: 600;
      color: var(--ux-text);
      margin: 0 0 var(--ux-space-xs);
    }

    .ux-alert-banner__message {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin: 0;
      line-height: 1.4;
    }

    .ux-alert-banner__close {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      padding: 0;
      background: none;
      border: none;
      color: var(--ux-text-tertiary);
      cursor: pointer;
      flex-shrink: 0;
    }

    .ux-alert-banner__close:hover {
      color: var(--ux-text);
    }

    .ux-alert-banner__close svg {
      width: 16px;
      height: 16px;
    }

    .ux-alert-banner__actions {
      display: flex;
      gap: var(--ux-space-sm);
      margin-top: var(--ux-space-md);
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-alert-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-alert-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for alert dialog
  // ARIA: role="alertdialog", aria-modal="true", aria-labelledby, aria-describedby
  const alertComponent = (config = {}) => ({
    isOpen: false,
    title: config.title || '',
    message: config.message || '',
    buttons: config.buttons || [],
    inputs: config.inputs || [],
    inputValues: {},
    alertId: config.id || 'ux-alert-' + Math.random().toString(36).substr(2, 9),

    // ARIA attributes for alert dialog
    get ariaAttrs() {
      return {
        'role': 'alertdialog',
        'aria-modal': 'true',
        'aria-labelledby': this.alertId + '-title',
        'aria-describedby': this.alertId + '-message'
      };
    },

    get titleId() {
      return this.alertId + '-title';
    },

    get messageId() {
      return this.alertId + '-message';
    },

    open(options = {}) {
      if (options.title) this.title = options.title;
      if (options.message) this.message = options.message;
      if (options.buttons) this.buttons = options.buttons;
      if (options.inputs) {
        this.inputs = options.inputs;
        this.inputValues = {};
        options.inputs.forEach((input, i) => {
          this.inputValues[input.name || `input${i}`] = input.value || '';
        });
      }

      this.isOpen = true;
      document.body.style.overflow = 'hidden';
    },

    close() {
      this.isOpen = false;
      document.body.style.overflow = '';
    },

    confirm(title, message) {
      return new Promise((resolve) => {
        this.open({
          title,
          message,
          buttons: [
            { text: 'Cancel', role: 'cancel', handler: () => resolve(false) },
            { text: 'OK', role: 'confirm', handler: () => resolve(true) }
          ]
        });
      });
    },

    prompt(title, message, placeholder = '') {
      return new Promise((resolve) => {
        this.open({
          title,
          message,
          inputs: [{ name: 'value', placeholder }],
          buttons: [
            { text: 'Cancel', role: 'cancel', handler: () => resolve(null) },
            { text: 'OK', role: 'confirm', handler: () => resolve(this.inputValues.value) }
          ]
        });
      });
    },

    handleButtonClick(button) {
      if (button.handler && typeof button.handler === 'function') {
        button.handler(this.inputValues);
      }
      this.close();
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxAlert', alertComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxAlert', alertComponent);
    });
  }

  // Alpine component for inline alert banner
  // ARIA: role="alert" for important messages
  const alertBannerComponent = (config = {}) => ({
    visible: config.visible !== false,
    dismissible: config.dismissible !== false,

    // ARIA role for inline alerts
    get ariaAttrs() {
      return {
        'role': 'alert',
        'aria-live': 'polite'
      };
    },

    dismiss() {
      this.visible = false;
    },

    show() {
      this.visible = true;
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxAlertBanner', alertBannerComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxAlertBanner', alertBannerComponent);
    });
  }
})();
/**
 * UX Toast Component
 * Notificaciones toast estilo iOS
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Toast Container
    ======================================== */

    .ux-toast-container {
      position: fixed;
      z-index: 1200;
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-sm);
      pointer-events: none;
      padding: var(--ux-space-md);
    }

    .ux-toast-container--top {
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      padding-top: calc(var(--ux-space-md) + env(safe-area-inset-top));
    }

    .ux-toast-container--bottom {
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      padding-bottom: calc(var(--ux-space-md) + env(safe-area-inset-bottom));
    }

    .ux-toast-container--top-start {
      top: 0;
      left: 0;
    }

    .ux-toast-container--top-end {
      top: 0;
      right: 0;
    }

    .ux-toast-container--bottom-start {
      bottom: 0;
      left: 0;
    }

    .ux-toast-container--bottom-end {
      bottom: 0;
      right: 0;
      padding-bottom: calc(var(--ux-space-md) + env(safe-area-inset-bottom));
    }

    /* Center positions */
    .ux-toast-container--center {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .ux-toast-container--center-start {
      top: 50%;
      left: 0;
      transform: translateY(-50%);
    }

    .ux-toast-container--center-end {
      top: 50%;
      right: 0;
      transform: translateY(-50%);
    }

    /* ========================================
       UX Toast
    ======================================== */

    .ux-toast {
      display: flex;
      align-items: center;
      gap: var(--ux-space-md);
      min-width: 200px;
      max-width: 400px;
      padding: var(--ux-space-md) var(--ux-space-lg);
      background-color: var(--ux-dark);
      color: var(--ux-dark-contrast);
      border-radius: var(--ux-border-radius-lg);
      box-shadow: var(--ux-shadow-lg);
      pointer-events: auto;
      opacity: 0;
      transform: translateY(-20px) scale(0.95);
      transition:
        opacity var(--ux-transition-base) var(--ux-ease),
        transform var(--ux-transition-base) var(--ux-ease-spring);
    }

    .ux-toast-container--bottom .ux-toast,
    .ux-toast-container--bottom-start .ux-toast,
    .ux-toast-container--bottom-end .ux-toast {
      transform: translateY(20px) scale(0.95);
    }

    .ux-toast-container--center .ux-toast {
      transform: scale(0.9);
    }

    .ux-toast-container--center-start .ux-toast,
    .ux-toast-container--top-start .ux-toast,
    .ux-toast-container--bottom-start .ux-toast {
      transform: translateX(-20px) scale(0.95);
    }

    .ux-toast-container--center-end .ux-toast,
    .ux-toast-container--top-end .ux-toast,
    .ux-toast-container--bottom-end .ux-toast {
      transform: translateX(20px) scale(0.95);
    }

    .ux-toast--visible {
      opacity: 1;
      transform: translateY(0) translateX(0) scale(1);
    }

    /* ========================================
       Toast Content
    ======================================== */

    .ux-toast__icon {
      width: 20px;
      height: 20px;
      flex-shrink: 0;
    }

    .ux-toast__icon svg {
      width: 100%;
      height: 100%;
    }

    .ux-toast__content {
      flex: 1;
      min-width: 0;
    }

    .ux-toast__message {
      font-size: var(--ux-font-size-sm);
      line-height: 1.4;
    }

    .ux-toast__title {
      font-weight: 600;
      margin-bottom: 2px;
    }

    .ux-toast__action {
      flex-shrink: 0;
      padding: var(--ux-space-xs) var(--ux-space-sm);
      background: none;
      border: none;
      color: var(--ux-primary-tint);
      font-family: var(--ux-font-family);
      font-size: var(--ux-font-size-sm);
      font-weight: 600;
      cursor: pointer;
      border-radius: var(--ux-border-radius-sm);
      -webkit-tap-highlight-color: transparent;
      transition: background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-toast__action:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    .ux-toast__action:active {
      background-color: rgba(255, 255, 255, 0.2);
    }

    .ux-toast__close {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      padding: 0;
      background: none;
      border: none;
      color: rgba(255, 255, 255, 0.6);
      cursor: pointer;
      flex-shrink: 0;
      -webkit-tap-highlight-color: transparent;
    }

    .ux-toast__close:hover {
      color: white;
    }

    .ux-toast__close svg {
      width: 16px;
      height: 16px;
    }

    /* ========================================
       Toast Colors
    ======================================== */

    .ux-toast--success {
      background-color: var(--ux-success);
      color: var(--ux-success-contrast);
    }

    .ux-toast--success .ux-toast__action {
      color: rgba(255, 255, 255, 0.9);
    }

    .ux-toast--warning {
      background-color: var(--ux-warning);
      color: var(--ux-warning-contrast);
    }

    .ux-toast--warning .ux-toast__action {
      color: rgba(0, 0, 0, 0.7);
    }

    .ux-toast--danger {
      background-color: var(--ux-danger);
      color: var(--ux-danger-contrast);
    }

    .ux-toast--danger .ux-toast__action {
      color: rgba(255, 255, 255, 0.9);
    }

    .ux-toast--light {
      background-color: var(--ux-surface);
      color: var(--ux-text);
      border: 1px solid var(--ux-border-color);
    }

    .ux-toast--light .ux-toast__action {
      color: var(--ux-primary);
    }

    .ux-toast--light .ux-toast__close {
      color: var(--ux-text-tertiary);
    }

    .ux-toast--light .ux-toast__close:hover {
      color: var(--ux-text);
    }

    /* ========================================
       Toast Progress Bar
    ======================================== */

    .ux-toast__progress {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 3px;
      background-color: rgba(255, 255, 255, 0.3);
      border-radius: 0 0 var(--ux-border-radius-lg) var(--ux-border-radius-lg);
      overflow: hidden;
    }

    .ux-toast__progress-bar {
      height: 100%;
      background-color: rgba(255, 255, 255, 0.8);
      transition: width linear;
    }

    .ux-toast--light .ux-toast__progress {
      background-color: var(--ux-light);
    }

    .ux-toast--light .ux-toast__progress-bar {
      background-color: var(--ux-primary);
    }

    /* ========================================
       Toast Sizes
    ======================================== */

    .ux-toast--sm {
      min-width: 150px;
      padding: var(--ux-space-sm) var(--ux-space-md);
    }

    .ux-toast--sm .ux-toast__message {
      font-size: var(--ux-font-size-xs);
    }

    .ux-toast--lg {
      min-width: 300px;
      padding: var(--ux-space-lg);
    }

    /* ========================================
       Toast with Avatar
    ======================================== */

    .ux-toast__avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      overflow: hidden;
      flex-shrink: 0;
    }

    .ux-toast__avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    /* ========================================
       Swipeable Toast
    ======================================== */

    .ux-toast--swipeable {
      cursor: grab;
      user-select: none;
    }

    .ux-toast--swipeable:active {
      cursor: grabbing;
    }

    .ux-toast--swiping {
      transition: none;
    }

    /* ========================================
       Stacked Toasts
    ======================================== */

    .ux-toast-container--stacked {
      align-items: center;
    }

    .ux-toast-container--stacked .ux-toast:nth-child(2) {
      transform: scale(0.95);
      opacity: 0.8;
    }

    .ux-toast-container--stacked .ux-toast:nth-child(3) {
      transform: scale(0.9);
      opacity: 0.6;
    }

    .ux-toast-container--stacked .ux-toast:nth-child(n+4) {
      display: none;
    }

    /* ========================================
       Full Width Toast (mobile)
    ======================================== */

    @media (max-width: 480px) {
      .ux-toast-container--top,
      .ux-toast-container--bottom {
        left: 0;
        right: 0;
        transform: none;
        padding-left: var(--ux-space-sm);
        padding-right: var(--ux-space-sm);
      }

      .ux-toast {
        max-width: none;
        width: 100%;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-toast-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-toast-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for toast
  // ARIA: role="status" or "alert", aria-live for announcements
  const toastComponent = (config = {}) => ({
    visible: false,
    message: config.message || '',
    title: config.title || '',
    color: config.color || '',
    duration: config.duration || 3000,
    showProgress: config.showProgress || false,
    progress: 100,
    _timer: null,
    _progressTimer: null,

    // ARIA attributes - use "alert" for danger/errors, "status" for info
    get ariaAttrs() {
      const isUrgent = this.color === 'danger' || this.color === 'warning';
      return {
        'role': isUrgent ? 'alert' : 'status',
        'aria-live': isUrgent ? 'assertive' : 'polite',
        'aria-atomic': 'true'
      };
    },

    show(options = {}) {
      if (options.message) this.message = options.message;
      if (options.title) this.title = options.title;
      if (options.color) this.color = options.color;
      if (options.duration !== undefined) this.duration = options.duration;
      if (options.showProgress !== undefined) this.showProgress = options.showProgress;

      this.visible = true;
      this.progress = 100;

      // Clear existing timer
      if (this._timer) {
        clearTimeout(this._timer);
      }
      if (this._progressTimer) {
        clearInterval(this._progressTimer);
      }

      // Auto dismiss
      if (this.duration > 0) {
        // Progress bar animation
        if (this.showProgress) {
          const interval = 50;
          const decrement = (100 / this.duration) * interval;
          this._progressTimer = setInterval(() => {
            this.progress -= decrement;
            if (this.progress <= 0) {
              this.progress = 0;
              clearInterval(this._progressTimer);
            }
          }, interval);
        }

        this._timer = setTimeout(() => {
          this.dismiss();
        }, this.duration);
      }
    },

    dismiss() {
      this.visible = false;
      if (this._timer) {
        clearTimeout(this._timer);
        this._timer = null;
      }
      if (this._progressTimer) {
        clearInterval(this._progressTimer);
        this._progressTimer = null;
      }
    },

    pause() {
      if (this._timer) {
        clearTimeout(this._timer);
        this._timer = null;
      }
      if (this._progressTimer) {
        clearInterval(this._progressTimer);
        this._progressTimer = null;
      }
    },

    resume() {
      if (this.visible && this.duration > 0) {
        const remainingTime = (this.progress / 100) * this.duration;

        if (this.showProgress) {
          const interval = 50;
          const decrement = (100 / this.duration) * interval;
          this._progressTimer = setInterval(() => {
            this.progress -= decrement;
            if (this.progress <= 0) {
              this.progress = 0;
              clearInterval(this._progressTimer);
            }
          }, interval);
        }

        this._timer = setTimeout(() => {
          this.dismiss();
        }, remainingTime);
      }
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxToast', toastComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxToast', toastComponent);
    });
  }

  // Toast manager for multiple toasts
  // ARIA: Container with aria-live region for toast announcements
  // Posiciones disponibles: top, bottom, center, top-start, top-end, bottom-start, bottom-end, center-start, center-end
  const toastManagerComponent = (config = {}) => ({
    toasts: [],
    position: config.position || 'bottom',
    maxToasts: config.maxToasts || 5,

    // ARIA attributes for toast container (live region)
    get containerAriaAttrs() {
      return {
        'aria-live': 'polite',
        'aria-atomic': 'false'
      };
    },

    // Computed class for container position
    get containerClass() {
      return `ux-toast-container ux-toast-container--${this.position}`;
    },

    setPosition(newPosition) {
      const validPositions = ['top', 'bottom', 'center', 'top-start', 'top-end', 'bottom-start', 'bottom-end', 'center-start', 'center-end'];
      if (validPositions.includes(newPosition)) {
        this.position = newPosition;
      }
    },

    add(options) {
      const id = Date.now() + Math.random();
      const toast = {
        id,
        message: options.message || '',
        title: options.title || '',
        color: options.color || '',
        duration: options.duration ?? 3000,
        showProgress: options.showProgress || false,
        visible: false,
        progress: 100
      };

      this.toasts.push(toast);

      // Limit max toasts
      if (this.toasts.length > this.maxToasts) {
        this.toasts.shift();
      }

      // Show after next tick
      this.$nextTick(() => {
        const t = this.toasts.find(x => x.id === id);
        if (t) t.visible = true;
      });

      // Auto remove
      if (toast.duration > 0) {
        setTimeout(() => {
          this.remove(id);
        }, toast.duration);
      }

      return id;
    },

    remove(id) {
      const index = this.toasts.findIndex(t => t.id === id);
      if (index !== -1) {
        this.toasts[index].visible = false;
        setTimeout(() => {
          this.toasts = this.toasts.filter(t => t.id !== id);
        }, 300);
      }
    },

    clear() {
      this.toasts.forEach(t => t.visible = false);
      setTimeout(() => {
        this.toasts = [];
      }, 300);
    },

    // Alias for clear
    dismissAll() {
      this.clear();
    },

    success(message, options = {}) {
      return this.add({ ...options, message, color: 'success' });
    },

    warning(message, options = {}) {
      return this.add({ ...options, message, color: 'warning' });
    },

    danger(message, options = {}) {
      return this.add({ ...options, message, color: 'danger' });
    },

    info(message, options = {}) {
      return this.add({ ...options, message, color: '' });
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxToastManager', toastManagerComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxToastManager', toastManagerComponent);
    });
  }
})();
/**
 * UX Popover Component
 * Popovers y tooltips
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Popover
    ======================================== */

    .ux-popover {
      position: absolute;
      z-index: 1000;
      min-width: 150px;
      max-width: 300px;
      background-color: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius-lg);
      box-shadow: var(--ux-shadow-xl);
      opacity: 0;
      visibility: hidden;
      transform: scale(0.95);
      transition:
        opacity var(--ux-transition-fast) var(--ux-ease),
        visibility var(--ux-transition-fast) var(--ux-ease),
        transform var(--ux-transition-fast) var(--ux-ease-spring);
    }

    .ux-popover--open {
      opacity: 1;
      visibility: visible;
      transform: scale(1);
    }

    /* ========================================
       Popover Arrow
    ======================================== */

    .ux-popover__arrow {
      position: absolute;
      width: 12px;
      height: 12px;
      background-color: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      transform: rotate(45deg);
    }

    .ux-popover--top .ux-popover__arrow {
      bottom: -7px;
      left: 50%;
      margin-left: -6px;
      border-top: none;
      border-left: none;
    }

    .ux-popover--bottom .ux-popover__arrow {
      top: -7px;
      left: 50%;
      margin-left: -6px;
      border-bottom: none;
      border-right: none;
    }

    .ux-popover--left .ux-popover__arrow {
      right: -7px;
      top: 50%;
      margin-top: -6px;
      border-bottom: none;
      border-left: none;
    }

    .ux-popover--right .ux-popover__arrow {
      left: -7px;
      top: 50%;
      margin-top: -6px;
      border-top: none;
      border-right: none;
    }

    /* Hide arrow */
    .ux-popover--no-arrow .ux-popover__arrow {
      display: none;
    }

    /* ========================================
       Popover Content
    ======================================== */

    .ux-popover__content {
      padding: var(--ux-space-md);
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text);
      line-height: 1.5;
    }

    .ux-popover__content--no-padding {
      padding: 0;
    }

    /* ========================================
       Popover Header
    ======================================== */

    .ux-popover__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--ux-space-sm) var(--ux-space-md);
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-popover__title {
      font-size: var(--ux-font-size-sm);
      font-weight: 600;
      color: var(--ux-text);
      margin: 0;
    }

    .ux-popover__close {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      padding: 0;
      background: none;
      border: none;
      color: var(--ux-text-tertiary);
      cursor: pointer;
    }

    .ux-popover__close:hover {
      color: var(--ux-text);
    }

    .ux-popover__close svg {
      width: 14px;
      height: 14px;
    }

    /* ========================================
       Popover Sizes
    ======================================== */

    .ux-popover--sm {
      min-width: 100px;
      max-width: 200px;
    }

    .ux-popover--lg {
      min-width: 250px;
      max-width: 400px;
    }

    .ux-popover--auto {
      min-width: auto;
      max-width: none;
    }

    /* ========================================
       Tooltip (Simple Popover)
    ======================================== */

    .ux-tooltip {
      position: absolute;
      z-index: 1100;
      padding: var(--ux-space-xs) var(--ux-space-sm);
      background-color: var(--ux-dark);
      color: var(--ux-dark-contrast);
      font-size: var(--ux-font-size-xs);
      border-radius: var(--ux-border-radius-sm);
      white-space: nowrap;
      pointer-events: none;
      opacity: 0;
      visibility: hidden;
      transform: translateY(4px);
      transition:
        opacity var(--ux-transition-fast) var(--ux-ease),
        visibility var(--ux-transition-fast) var(--ux-ease),
        transform var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-tooltip--visible {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    /* Tooltip positions */
    .ux-tooltip--top {
      transform: translateY(-4px);
    }

    .ux-tooltip--top.ux-tooltip--visible {
      transform: translateY(0);
    }

    /* Tooltip Arrow */
    .ux-tooltip__arrow {
      position: absolute;
      width: 6px;
      height: 6px;
      background-color: var(--ux-dark);
      transform: rotate(45deg);
    }

    .ux-tooltip--bottom .ux-tooltip__arrow {
      top: -3px;
      left: 50%;
      margin-left: -3px;
    }

    .ux-tooltip--top .ux-tooltip__arrow {
      bottom: -3px;
      left: 50%;
      margin-left: -3px;
    }

    .ux-tooltip--left .ux-tooltip__arrow {
      right: -3px;
      top: 50%;
      margin-top: -3px;
    }

    .ux-tooltip--right .ux-tooltip__arrow {
      left: -3px;
      top: 50%;
      margin-top: -3px;
    }

    /* Tooltip colors */
    .ux-tooltip--light {
      background-color: var(--ux-surface);
      color: var(--ux-text);
      border: 1px solid var(--ux-border-color);
      box-shadow: var(--ux-shadow-md);
    }

    .ux-tooltip--light .ux-tooltip__arrow {
      background-color: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
    }

    .ux-tooltip--primary {
      background-color: var(--ux-primary);
      color: var(--ux-primary-contrast);
    }

    .ux-tooltip--primary .ux-tooltip__arrow {
      background-color: var(--ux-primary);
    }

    /* ========================================
       Popover Backdrop (for dismissible)
    ======================================== */

    .ux-popover-backdrop {
      position: fixed;
      inset: 0;
      z-index: 999;
      background: transparent;
    }

    /* ========================================
       Popover Trigger
    ======================================== */

    .ux-popover-trigger {
      display: inline-block;
      position: relative;
    }

    /* ========================================
       Rich Tooltip (with more content)
    ======================================== */

    .ux-rich-tooltip {
      max-width: 280px;
      white-space: normal;
      padding: var(--ux-space-md);
    }

    .ux-rich-tooltip__title {
      font-weight: 600;
      margin-bottom: var(--ux-space-xs);
    }

    .ux-rich-tooltip__content {
      font-size: var(--ux-font-size-xs);
      opacity: 0.9;
      line-height: 1.4;
    }

    /* ========================================
       Dropdown Popover (with list)
    ======================================== */

    .ux-popover--dropdown {
      padding: var(--ux-space-xs) 0;
    }

    .ux-popover--dropdown .ux-popover__content {
      padding: 0;
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-popover-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-popover-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for popover
  // ARIA: aria-expanded, aria-haspopup on trigger; described-by on popover
  const popoverComponent = (config = {}) => ({
    isOpen: false,
    position: config.position || 'bottom',
    trigger: config.trigger || 'click', // click, hover, focus
    dismissOnClickOutside: config.dismissOnClickOutside !== false,
    offset: config.offset || 8,
    popoverStyle: {},
    popoverId: config.id || 'ux-popover-' + Math.random().toString(36).substr(2, 9),

    // ARIA attributes for the trigger element
    get triggerAriaAttrs() {
      return {
        'aria-haspopup': 'dialog',
        'aria-expanded': this.isOpen ? 'true' : 'false',
        'aria-controls': this.popoverId
      };
    },

    // ARIA attributes for the popover
    get popoverAriaAttrs() {
      return {
        'role': 'dialog',
        'id': this.popoverId,
        'aria-modal': 'false'
      };
    },

    open() {
      this.isOpen = true;
      this.$nextTick(() => {
        this.updatePosition();
      });
    },

    close() {
      this.isOpen = false;
    },

    toggle() {
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    },

    updatePosition() {
      const trigger = this.$refs.trigger;
      const popover = this.$refs.popover;
      if (!trigger || !popover) return;

      const triggerRect = trigger.getBoundingClientRect();
      const popoverRect = popover.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let top, left;

      switch (this.position) {
        case 'top':
          top = triggerRect.top - popoverRect.height - this.offset;
          left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
          break;
        case 'bottom':
          top = triggerRect.bottom + this.offset;
          left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
          break;
        case 'left':
          top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
          left = triggerRect.left - popoverRect.width - this.offset;
          break;
        case 'right':
          top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
          left = triggerRect.right + this.offset;
          break;
      }

      // Keep within viewport
      if (left < 8) left = 8;
      if (left + popoverRect.width > viewportWidth - 8) {
        left = viewportWidth - popoverRect.width - 8;
      }
      if (top < 8) top = 8;
      if (top + popoverRect.height > viewportHeight - 8) {
        top = viewportHeight - popoverRect.height - 8;
      }

      this.popoverStyle = {
        position: 'fixed',
        top: top + 'px',
        left: left + 'px'
      };
    },

    handleClickOutside(event) {
      if (this.dismissOnClickOutside && this.isOpen) {
        const popover = this.$refs.popover;
        const trigger = this.$refs.trigger;
        if (popover && !popover.contains(event.target) &&
            trigger && !trigger.contains(event.target)) {
          this.close();
        }
      }
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxPopover', popoverComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxPopover', popoverComponent);
    });
  }

  // Alpine component for tooltip
  // ARIA: role="tooltip", aria-describedby on trigger
  const tooltipComponent = (config = {}) => ({
    isVisible: false,
    text: config.text || '',
    position: config.position || 'top',
    delay: config.delay || 200,
    tooltipStyle: {},
    _showTimer: null,
    tooltipId: config.id || 'ux-tooltip-' + Math.random().toString(36).substr(2, 9),

    // ARIA attributes for the trigger element
    get triggerAriaAttrs() {
      return {
        'aria-describedby': this.isVisible ? this.tooltipId : null
      };
    },

    // ARIA attributes for the tooltip
    get tooltipAriaAttrs() {
      return {
        'role': 'tooltip',
        'id': this.tooltipId
      };
    },

    show() {
      this._showTimer = setTimeout(() => {
        this.isVisible = true;
        this.$nextTick(() => {
          this.updatePosition();
        });
      }, this.delay);
    },

    hide() {
      if (this._showTimer) {
        clearTimeout(this._showTimer);
        this._showTimer = null;
      }
      this.isVisible = false;
    },

    updatePosition() {
      const trigger = this.$refs.trigger;
      const tooltip = this.$refs.tooltip;
      if (!trigger || !tooltip) return;

      const triggerRect = trigger.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();
      const offset = 8;

      let top, left;

      switch (this.position) {
        case 'top':
          top = triggerRect.top - tooltipRect.height - offset;
          left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
          break;
        case 'bottom':
          top = triggerRect.bottom + offset;
          left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
          break;
        case 'left':
          top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
          left = triggerRect.left - tooltipRect.width - offset;
          break;
        case 'right':
          top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
          left = triggerRect.right + offset;
          break;
      }

      this.tooltipStyle = {
        position: 'fixed',
        top: top + 'px',
        left: left + 'px'
      };
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxTooltip', tooltipComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxTooltip', tooltipComponent);
    });
  }
})();
/**
 * UX Loading Component
 * Loading indicator with backdrop (iOS style)
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Loading Backdrop
    ======================================== */

    .ux-loading-backdrop {
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.3);
      z-index: 1200;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      visibility: hidden;
      transition:
        opacity 200ms cubic-bezier(0.32, 0.72, 0, 1),
        visibility 200ms cubic-bezier(0.32, 0.72, 0, 1);
    }

    .ux-loading-backdrop--open {
      opacity: 1;
      visibility: visible;
    }

    .ux-loading-backdrop--transparent {
      background-color: transparent;
    }

    /* ========================================
       UX Loading Container
    ======================================== */

    .ux-loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--ux-space-md);
      min-width: 100px;
      min-height: 100px;
      padding: var(--ux-space-lg);
      background-color: rgba(var(--ux-surface-rgb, 255, 255, 255), 0.95);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-radius: var(--ux-border-radius-lg);
      box-shadow: var(--ux-shadow-lg);
      transform: scale(0.9);
      opacity: 0;
      transition:
        transform 300ms cubic-bezier(0.32, 0.72, 0, 1),
        opacity 200ms cubic-bezier(0.32, 0.72, 0, 1);
    }

    .ux-loading-backdrop--open .ux-loading {
      transform: scale(1);
      opacity: 1;
    }

    /* ========================================
       Loading Spinner
    ======================================== */

    .ux-loading__spinner {
      width: 36px;
      height: 36px;
      border: 3px solid var(--ux-border-color);
      border-top-color: var(--ux-primary);
      border-radius: 50%;
      animation: ux-loading-spin 0.8s linear infinite;
    }

    @keyframes ux-loading-spin {
      to {
        transform: rotate(360deg);
      }
    }

    /* iOS-style spinner (dots) */
    .ux-loading__spinner--ios {
      width: 40px;
      height: 40px;
      border: none;
      background: transparent;
      position: relative;
      animation: none;
    }

    .ux-loading__spinner--ios::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Cg fill='none' stroke='%23999' stroke-width='3' stroke-linecap='round'%3E%3Cline x1='20' y1='4' x2='20' y2='10' opacity='0.125'/%3E%3Cline x1='32.5' y1='7.5' x2='28.5' y2='11.5' opacity='0.25'/%3E%3Cline x1='36' y1='20' x2='30' y2='20' opacity='0.375'/%3E%3Cline x1='32.5' y1='32.5' x2='28.5' y2='28.5' opacity='0.5'/%3E%3Cline x1='20' y1='36' x2='20' y2='30' opacity='0.625'/%3E%3Cline x1='7.5' y1='32.5' x2='11.5' y2='28.5' opacity='0.75'/%3E%3Cline x1='4' y1='20' x2='10' y2='20' opacity='0.875'/%3E%3Cline x1='7.5' y1='7.5' x2='11.5' y2='11.5' opacity='1'/%3E%3C/g%3E%3C/svg%3E");
      animation: ux-loading-ios-spin 0.8s steps(8) infinite;
    }

    @keyframes ux-loading-ios-spin {
      to {
        transform: rotate(360deg);
      }
    }

    /* Dots spinner */
    .ux-loading__spinner--dots {
      width: 60px;
      height: 20px;
      border: none;
      display: flex;
      justify-content: center;
      gap: 8px;
      animation: none;
    }

    .ux-loading__spinner--dots::before,
    .ux-loading__spinner--dots::after,
    .ux-loading__dot {
      content: '';
      width: 12px;
      height: 12px;
      background-color: var(--ux-primary);
      border-radius: 50%;
      animation: ux-loading-bounce 1.4s ease-in-out infinite both;
    }

    .ux-loading__spinner--dots::before {
      animation-delay: -0.32s;
    }

    .ux-loading__dot {
      animation-delay: -0.16s;
    }

    @keyframes ux-loading-bounce {
      0%, 80%, 100% {
        transform: scale(0.6);
        opacity: 0.5;
      }
      40% {
        transform: scale(1);
        opacity: 1;
      }
    }

    /* ========================================
       Loading Message
    ======================================== */

    .ux-loading__message {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      text-align: center;
      max-width: 200px;
    }

    /* ========================================
       Loading Sizes
    ======================================== */

    .ux-loading--sm {
      min-width: 80px;
      min-height: 80px;
      padding: var(--ux-space-md);
    }

    .ux-loading--sm .ux-loading__spinner {
      width: 28px;
      height: 28px;
      border-width: 2px;
    }

    .ux-loading--sm .ux-loading__message {
      font-size: var(--ux-font-size-xs);
    }

    .ux-loading--lg {
      min-width: 140px;
      min-height: 140px;
      padding: var(--ux-space-xl);
    }

    .ux-loading--lg .ux-loading__spinner {
      width: 48px;
      height: 48px;
      border-width: 4px;
    }

    .ux-loading--lg .ux-loading__message {
      font-size: var(--ux-font-size-md);
    }

    /* ========================================
       Loading Colors
    ======================================== */

    .ux-loading--dark {
      background-color: rgba(0, 0, 0, 0.85);
    }

    .ux-loading--dark .ux-loading__spinner {
      border-color: rgba(255, 255, 255, 0.2);
      border-top-color: white;
    }

    .ux-loading--dark .ux-loading__message {
      color: rgba(255, 255, 255, 0.8);
    }

    /* ========================================
       Inline Loading
    ======================================== */

    .ux-loading-inline {
      display: inline-flex;
      align-items: center;
      gap: var(--ux-space-sm);
    }

    .ux-loading-inline__spinner {
      width: 20px;
      height: 20px;
      border: 2px solid var(--ux-border-color);
      border-top-color: var(--ux-primary);
      border-radius: 50%;
      animation: ux-loading-spin 0.8s linear infinite;
    }

    .ux-loading-inline__text {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
    }

    /* Sizes */
    .ux-loading-inline--sm .ux-loading-inline__spinner {
      width: 14px;
      height: 14px;
    }

    .ux-loading-inline--sm .ux-loading-inline__text {
      font-size: var(--ux-font-size-xs);
    }

    .ux-loading-inline--lg .ux-loading-inline__spinner {
      width: 28px;
      height: 28px;
      border-width: 3px;
    }

    /* ========================================
       Full Page Loading
    ======================================== */

    .ux-loading--fullpage {
      position: fixed;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--ux-background);
      z-index: 9999;
    }

    .ux-loading--fullpage .ux-loading {
      background-color: transparent;
      box-shadow: none;
    }

    /* ========================================
       Loading Overlay (for containers)
    ======================================== */

    .ux-loading-overlay {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(var(--ux-background-rgb, 255, 255, 255), 0.8);
      z-index: 10;
      opacity: 0;
      visibility: hidden;
      transition:
        opacity var(--ux-transition-fast) var(--ux-ease),
        visibility var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-loading-overlay--visible {
      opacity: 1;
      visibility: visible;
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-loading-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-loading-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for loading
  // ARIA: role="alert", aria-busy for loading state
  const loadingComponent = (config = {}) => ({
    isOpen: config.isOpen || false,
    message: config.message || '',
    spinner: config.spinner || 'default', // default, ios, dots
    showBackdrop: config.showBackdrop !== false,
    dismissOnBackdrop: config.dismissOnBackdrop || false,
    loadingId: config.id || 'ux-loading-' + Math.random().toString(36).substr(2, 9),

    // ARIA attributes
    get ariaAttrs() {
      return {
        'role': 'alert',
        'aria-live': 'assertive',
        'aria-busy': this.isOpen ? 'true' : 'false',
        'aria-label': this.message || 'Loading'
      };
    },

    show(options = {}) {
      if (options.message !== undefined) this.message = options.message;
      if (options.spinner) this.spinner = options.spinner;

      this.isOpen = true;
      document.body.style.overflow = 'hidden';
    },

    hide() {
      this.isOpen = false;
      document.body.style.overflow = '';
    },

    // Alias methods
    present(options) {
      this.show(options);
    },

    dismiss() {
      this.hide();
    },

    handleBackdropClick(event) {
      if (this.dismissOnBackdrop && event.target === event.currentTarget) {
        this.hide();
      }
    },

    // Show loading with timeout
    showWithTimeout(options = {}, timeout = 30000) {
      this.show(options);

      return new Promise((resolve) => {
        setTimeout(() => {
          this.hide();
          resolve();
        }, timeout);
      });
    },

    // Show loading during async operation
    async during(asyncFn, options = {}) {
      this.show(options);
      try {
        const result = await asyncFn();
        return result;
      } finally {
        this.hide();
      }
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxLoading', loadingComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxLoading', loadingComponent);
    });
  }

  // Global loading controller (singleton)
  const loadingController = {
    _instance: null,
    _queue: [],

    async create(options = {}) {
      return {
        present: () => this.show(options),
        dismiss: () => this.hide()
      };
    },

    show(options = {}) {
      // Create loading element if it doesn't exist
      if (!this._instance) {
        const container = document.createElement('div');
        container.id = 'ux-loading-controller';
        container.innerHTML = `
          <div class="ux-loading-backdrop"
               :class="{ 'ux-loading-backdrop--open': isOpen }"
               @click="handleBackdropClick($event)"
               x-data="uxLoading()">
            <div class="ux-loading" :class="'ux-loading--' + (size || '')" role="alert" aria-live="assertive">
              <div class="ux-loading__spinner" :class="'ux-loading__spinner--' + spinner"></div>
              <div class="ux-loading__message" x-show="message" x-text="message"></div>
            </div>
          </div>
        `;
        document.body.appendChild(container);
      }

      // Show via Alpine
      const el = document.querySelector('#ux-loading-controller [x-data]');
      if (el && el._x_dataStack) {
        const data = el._x_dataStack[0];
        data.show(options);
      }
    },

    hide() {
      const el = document.querySelector('#ux-loading-controller [x-data]');
      if (el && el._x_dataStack) {
        const data = el._x_dataStack[0];
        data.hide();
      }
    }
  };

  // Export to UX namespace
  if (window.UX) {
    window.UX.loading = loadingController;
  }
})();
/**
 * UX Picker Component
 * iOS-style column picker (wheel selector)
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Picker Backdrop
    ======================================== */

    .ux-picker-backdrop {
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.4);
      z-index: 1000;
      opacity: 0;
      visibility: hidden;
      transition:
        opacity 300ms cubic-bezier(0.32, 0.72, 0, 1),
        visibility 300ms cubic-bezier(0.32, 0.72, 0, 1);
    }

    .ux-picker-backdrop--open {
      opacity: 1;
      visibility: visible;
    }

    /* ========================================
       UX Picker Container
    ======================================== */

    .ux-picker {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: var(--ux-surface);
      border-radius: var(--ux-border-radius-xl) var(--ux-border-radius-xl) 0 0;
      z-index: 1001;
      transform: translateY(100%);
      transition: transform 400ms cubic-bezier(0.32, 0.72, 0, 1);
      padding-bottom: env(safe-area-inset-bottom);
      will-change: transform;
    }

    .ux-picker-backdrop--open .ux-picker {
      transform: translateY(0);
    }

    /* ========================================
       Picker Header
    ======================================== */

    .ux-picker__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 44px;
      padding: 0 var(--ux-space-sm);
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-picker__button {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 60px;
      min-height: 44px;
      padding: var(--ux-space-sm) var(--ux-space-md);
      background: none;
      border: none;
      color: var(--ux-primary);
      font-family: var(--ux-font-family);
      font-size: var(--ux-font-size-md);
      font-weight: 400;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition: opacity var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-picker__button:active {
      opacity: 0.5;
    }

    .ux-picker__button--cancel {
      font-weight: 400;
    }

    .ux-picker__button--confirm {
      font-weight: 600;
    }

    .ux-picker__title {
      flex: 1;
      text-align: center;
      font-size: var(--ux-font-size-md);
      font-weight: 600;
      color: var(--ux-text);
      margin: 0;
    }

    /* ========================================
       Picker Columns Container
    ======================================== */

    .ux-picker__columns {
      display: flex;
      height: 216px;
      overflow: hidden;
      position: relative;
    }

    /* Selection highlight */
    .ux-picker__columns::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 36px;
      transform: translateY(-50%);
      background-color: var(--ux-surface-secondary);
      border-top: 1px solid var(--ux-border-color);
      border-bottom: 1px solid var(--ux-border-color);
      pointer-events: none;
      z-index: 0;
    }

    /* Gradient masks */
    .ux-picker__columns::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(
        to bottom,
        var(--ux-surface) 0%,
        transparent 20%,
        transparent 80%,
        var(--ux-surface) 100%
      );
      pointer-events: none;
      z-index: 1;
    }

    /* ========================================
       Picker Column
    ======================================== */

    .ux-picker__column {
      flex: 1;
      height: 100%;
      overflow: hidden;
      position: relative;
    }

    .ux-picker__column-wrapper {
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      transform: translateY(-50%);
      transition: transform 300ms cubic-bezier(0.32, 0.72, 0, 1);
      will-change: transform;
    }

    .ux-picker__column--dragging .ux-picker__column-wrapper {
      transition: none;
    }

    /* ========================================
       Picker Item
    ======================================== */

    .ux-picker__item {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 36px;
      padding: 0 var(--ux-space-md);
      color: var(--ux-text-secondary);
      font-size: var(--ux-font-size-lg);
      font-weight: 400;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;
      transition:
        color var(--ux-transition-fast) var(--ux-ease),
        transform var(--ux-transition-fast) var(--ux-ease);
      -webkit-tap-highlight-color: transparent;
    }

    .ux-picker__item--selected {
      color: var(--ux-text);
      font-weight: 500;
    }

    .ux-picker__item--disabled {
      color: var(--ux-text-tertiary);
      pointer-events: none;
    }

    /* 3D wheel effect */
    .ux-picker--3d .ux-picker__item {
      transform-style: preserve-3d;
      backface-visibility: hidden;
    }

    /* ========================================
       Picker Sizes
    ======================================== */

    .ux-picker--sm .ux-picker__columns {
      height: 180px;
    }

    .ux-picker--sm .ux-picker__item {
      height: 30px;
      font-size: var(--ux-font-size-md);
    }

    .ux-picker--sm .ux-picker__columns::before {
      height: 30px;
    }

    .ux-picker--lg .ux-picker__columns {
      height: 252px;
    }

    .ux-picker--lg .ux-picker__item {
      height: 42px;
      font-size: var(--ux-font-size-xl);
    }

    .ux-picker--lg .ux-picker__columns::before {
      height: 42px;
    }

    /* ========================================
       Inline Picker (not in modal)
    ======================================== */

    .ux-picker--inline {
      position: static;
      transform: none;
      border-radius: var(--ux-border-radius-lg);
      border: 1px solid var(--ux-border-color);
    }

    .ux-picker--inline .ux-picker__header {
      border-bottom: none;
      background-color: var(--ux-surface-secondary);
      border-radius: var(--ux-border-radius-lg) var(--ux-border-radius-lg) 0 0;
    }

    /* ========================================
       Multi-column Dividers
    ======================================== */

    .ux-picker__divider {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 var(--ux-space-xs);
      color: var(--ux-text);
      font-size: var(--ux-font-size-lg);
      font-weight: 500;
    }

    /* ========================================
       Column Labels
    ======================================== */

    .ux-picker__column-label {
      position: absolute;
      top: var(--ux-space-xs);
      left: 0;
      right: 0;
      text-align: center;
      font-size: var(--ux-font-size-xs);
      font-weight: 600;
      color: var(--ux-text-tertiary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      z-index: 2;
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-picker-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-picker-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for picker
  // ARIA: role="listbox" for columns, role="option" for items
  const pickerComponent = (config = {}) => ({
    isOpen: false,
    columns: config.columns || [],
    selectedIndexes: [],
    title: config.title || '',
    cancelText: config.cancelText || 'Cancel',
    confirmText: config.confirmText || 'Done',
    showHeader: config.showHeader !== false,
    itemHeight: config.itemHeight || 36,
    visibleItems: config.visibleItems || 5,
    pickerId: config.id || 'ux-picker-' + Math.random().toString(36).substr(2, 9),
    _columnStates: [],
    _startY: 0,
    _currentY: 0,
    _activeColumn: null,

    // ARIA attributes
    get ariaAttrs() {
      return {
        'role': 'dialog',
        'aria-modal': 'true',
        'aria-labelledby': this.pickerId + '-title'
      };
    },

    get titleId() {
      return this.pickerId + '-title';
    },

    // ARIA for column
    getColumnAriaAttrs(columnIndex) {
      return {
        'role': 'listbox',
        'aria-label': this.columns[columnIndex]?.label || `Column ${columnIndex + 1}`,
        'tabindex': '0'
      };
    },

    // ARIA for item
    getItemAriaAttrs(columnIndex, itemIndex) {
      const isSelected = this.selectedIndexes[columnIndex] === itemIndex;
      return {
        'role': 'option',
        'aria-selected': isSelected ? 'true' : 'false',
        'id': `${this.pickerId}-col${columnIndex}-item${itemIndex}`
      };
    },

    init() {
      // Initialize selected indexes
      this.selectedIndexes = this.columns.map((col, i) => {
        return col.selectedIndex || 0;
      });

      // Initialize column states for drag
      this._columnStates = this.columns.map((col, i) => ({
        offset: -this.selectedIndexes[i] * this.itemHeight,
        isDragging: false
      }));
    },

    open(options = {}) {
      if (options.columns) {
        this.columns = options.columns;
        this.init();
      }
      if (options.title) this.title = options.title;

      this.isOpen = true;
      document.body.style.overflow = 'hidden';

      this.$nextTick(() => {
        // Update column positions
        this.columns.forEach((_, i) => {
          this.scrollToIndex(i, this.selectedIndexes[i], false);
        });
      });
    },

    close() {
      this.isOpen = false;
      document.body.style.overflow = '';
    },

    cancel() {
      this.$dispatch('picker-cancel');
      this.close();
    },

    confirm() {
      const values = this.columns.map((col, i) => {
        const idx = this.selectedIndexes[i];
        return col.options[idx];
      });

      this.$dispatch('picker-confirm', {
        values,
        indexes: [...this.selectedIndexes]
      });

      this.close();
    },

    // Get transform for column
    getColumnTransform(columnIndex) {
      const state = this._columnStates[columnIndex];
      if (!state) return 'translateY(0)';
      return `translateY(${state.offset}px)`;
    },

    // Scroll column to index
    scrollToIndex(columnIndex, itemIndex, animate = true) {
      const column = this.columns[columnIndex];
      if (!column) return;

      // Clamp index
      const maxIndex = column.options.length - 1;
      itemIndex = Math.max(0, Math.min(maxIndex, itemIndex));

      this.selectedIndexes[columnIndex] = itemIndex;
      this._columnStates[columnIndex].offset = -itemIndex * this.itemHeight;

      // Dispatch change event
      this.$dispatch('picker-change', {
        columnIndex,
        itemIndex,
        value: column.options[itemIndex]
      });
    },

    // Select item by click
    selectItem(columnIndex, itemIndex) {
      this.scrollToIndex(columnIndex, itemIndex);
    },

    // Check if item is selected
    isSelected(columnIndex, itemIndex) {
      return this.selectedIndexes[columnIndex] === itemIndex;
    },

    // Touch/drag handlers
    onTouchStart(event, columnIndex) {
      const state = this._columnStates[columnIndex];
      state.isDragging = true;
      this._activeColumn = columnIndex;
      this._startY = event.touches ? event.touches[0].clientY : event.clientY;
      this._startOffset = state.offset;
    },

    onTouchMove(event, columnIndex) {
      const state = this._columnStates[columnIndex];
      if (!state.isDragging) return;

      const clientY = event.touches ? event.touches[0].clientY : event.clientY;
      const deltaY = clientY - this._startY;

      // Apply resistance at boundaries
      const column = this.columns[columnIndex];
      const maxOffset = 0;
      const minOffset = -(column.options.length - 1) * this.itemHeight;

      let newOffset = this._startOffset + deltaY;

      // Rubber band effect
      if (newOffset > maxOffset) {
        newOffset = maxOffset + (newOffset - maxOffset) * 0.3;
      } else if (newOffset < minOffset) {
        newOffset = minOffset + (newOffset - minOffset) * 0.3;
      }

      state.offset = newOffset;

      event.preventDefault();
    },

    onTouchEnd(event, columnIndex) {
      const state = this._columnStates[columnIndex];
      if (!state.isDragging) return;

      state.isDragging = false;

      // Snap to nearest item
      const column = this.columns[columnIndex];
      const nearestIndex = Math.round(-state.offset / this.itemHeight);
      const clampedIndex = Math.max(0, Math.min(column.options.length - 1, nearestIndex));

      this.scrollToIndex(columnIndex, clampedIndex);
    },

    // Keyboard navigation
    handleKeydown(event, columnIndex) {
      const column = this.columns[columnIndex];
      const currentIndex = this.selectedIndexes[columnIndex];

      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          if (currentIndex > 0) {
            this.scrollToIndex(columnIndex, currentIndex - 1);
          }
          break;
        case 'ArrowDown':
          event.preventDefault();
          if (currentIndex < column.options.length - 1) {
            this.scrollToIndex(columnIndex, currentIndex + 1);
          }
          break;
        case 'Home':
          event.preventDefault();
          this.scrollToIndex(columnIndex, 0);
          break;
        case 'End':
          event.preventDefault();
          this.scrollToIndex(columnIndex, column.options.length - 1);
          break;
        case 'Enter':
          event.preventDefault();
          this.confirm();
          break;
        case 'Escape':
          event.preventDefault();
          this.cancel();
          break;
      }
    },

    // Get selected values
    getValues() {
      return this.columns.map((col, i) => {
        const idx = this.selectedIndexes[i];
        return col.options[idx];
      });
    },

    // Set values programmatically
    setValues(values) {
      values.forEach((value, i) => {
        const column = this.columns[i];
        if (!column) return;

        const index = column.options.findIndex(opt => {
          if (typeof opt === 'object') {
            return opt.value === value || opt.text === value;
          }
          return opt === value;
        });

        if (index !== -1) {
          this.scrollToIndex(i, index, false);
        }
      });
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxPicker', pickerComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxPicker', pickerComponent);
    });
  }

  // Helper to format picker option display
  window.UX = window.UX || {};
  window.UX.getPickerOptionText = function(option) {
    if (typeof option === 'object') {
      return option.text || option.label || option.value;
    }
    return option;
  };
})();
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
  const skeletonComponent = (config = {}) => ({
    loading: config.loading !== false,

    setLoading(state) {
      this.loading = state;
    },

    loaded() {
      this.loading = false;
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
/**
 * UX FAB Component
 * Floating Action Buttons estilo Material/iOS
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX FAB (Floating Action Button)
    ======================================== */

    .ux-fab {
      position: fixed;
      z-index: 100;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--ux-space-md);
    }

    /* Positions */
    .ux-fab--bottom-end {
      bottom: var(--ux-space-lg);
      right: var(--ux-space-lg);
      bottom: calc(var(--ux-space-lg) + env(safe-area-inset-bottom));
    }

    .ux-fab--bottom-start {
      bottom: var(--ux-space-lg);
      left: var(--ux-space-lg);
      bottom: calc(var(--ux-space-lg) + env(safe-area-inset-bottom));
    }

    .ux-fab--bottom-center {
      bottom: var(--ux-space-lg);
      left: 50%;
      transform: translateX(-50%);
      bottom: calc(var(--ux-space-lg) + env(safe-area-inset-bottom));
    }

    .ux-fab--top-end {
      top: var(--ux-space-lg);
      right: var(--ux-space-lg);
      top: calc(var(--ux-space-lg) + env(safe-area-inset-top));
    }

    .ux-fab--top-start {
      top: var(--ux-space-lg);
      left: var(--ux-space-lg);
      top: calc(var(--ux-space-lg) + env(safe-area-inset-top));
    }

    .ux-fab--center-end {
      top: 50%;
      right: var(--ux-space-lg);
      transform: translateY(-50%);
    }

    .ux-fab--center-start {
      top: 50%;
      left: var(--ux-space-lg);
      transform: translateY(-50%);
    }

    /* ========================================
       FAB Button
    ======================================== */

    .ux-fab__button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 56px;
      height: 56px;
      padding: 0;
      background-color: var(--ux-primary);
      color: var(--ux-primary-contrast);
      border: none;
      border-radius: 50%;
      box-shadow: var(--ux-shadow-lg);
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition:
        transform var(--ux-transition-fast) var(--ux-ease-spring),
        box-shadow var(--ux-transition-fast) var(--ux-ease),
        background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-fab__button:hover {
      box-shadow: var(--ux-shadow-xl);
      transform: scale(1.05);
    }

    .ux-fab__button:active {
      transform: scale(0.95);
    }

    .ux-fab__button:focus-visible {
      outline: 2px solid var(--ux-primary);
      outline-offset: 2px;
    }

    .ux-fab__button-icon {
      width: 24px;
      height: 24px;
      transition: transform var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-fab__button-icon svg {
      width: 100%;
      height: 100%;
    }

    /* Rotate icon when open */
    .ux-fab--open .ux-fab__button-icon {
      transform: rotate(45deg);
    }

    /* ========================================
       FAB Button Sizes
    ======================================== */

    .ux-fab__button--sm {
      width: 40px;
      height: 40px;
    }

    .ux-fab__button--sm .ux-fab__button-icon {
      width: 20px;
      height: 20px;
    }

    .ux-fab__button--lg {
      width: 72px;
      height: 72px;
    }

    .ux-fab__button--lg .ux-fab__button-icon {
      width: 32px;
      height: 32px;
    }

    /* ========================================
       FAB Button Colors
    ======================================== */

    .ux-fab__button--secondary {
      background-color: var(--ux-secondary);
      color: var(--ux-secondary-contrast);
    }

    .ux-fab__button--tertiary {
      background-color: var(--ux-tertiary);
      color: var(--ux-tertiary-contrast);
    }

    .ux-fab__button--success {
      background-color: var(--ux-success);
      color: var(--ux-success-contrast);
    }

    .ux-fab__button--warning {
      background-color: var(--ux-warning);
      color: var(--ux-warning-contrast);
    }

    .ux-fab__button--danger {
      background-color: var(--ux-danger);
      color: var(--ux-danger-contrast);
    }

    .ux-fab__button--light {
      background-color: var(--ux-surface);
      color: var(--ux-text);
    }

    .ux-fab__button--dark {
      background-color: var(--ux-dark);
      color: var(--ux-dark-contrast);
    }

    /* ========================================
       Extended FAB (with label)
    ======================================== */

    .ux-fab__button--extended {
      width: auto;
      height: 48px;
      padding: 0 var(--ux-space-lg) 0 var(--ux-space-md);
      border-radius: 24px;
      gap: var(--ux-space-sm);
    }

    .ux-fab__button-label {
      font-size: var(--ux-font-size-sm);
      font-weight: 600;
      white-space: nowrap;
    }

    /* ========================================
       FAB List (Speed Dial)
    ======================================== */

    .ux-fab__list {
      display: flex;
      flex-direction: column-reverse;
      align-items: center;
      gap: var(--ux-space-md);
      opacity: 0;
      visibility: hidden;
      transition:
        opacity var(--ux-transition-base) var(--ux-ease),
        visibility var(--ux-transition-base) var(--ux-ease);
    }

    .ux-fab--open .ux-fab__list {
      opacity: 1;
      visibility: visible;
    }

    /* FAB List Items */
    .ux-fab__list-item {
      display: flex;
      align-items: center;
      gap: var(--ux-space-md);
      opacity: 0;
      transform: translateY(20px) scale(0.8);
      transition:
        opacity var(--ux-transition-fast) var(--ux-ease),
        transform var(--ux-transition-fast) var(--ux-ease-spring);
    }

    .ux-fab--open .ux-fab__list-item {
      opacity: 1;
      transform: translateY(0) scale(1);
    }

    /* Stagger animation */
    .ux-fab--open .ux-fab__list-item:nth-child(1) { transition-delay: 0ms; }
    .ux-fab--open .ux-fab__list-item:nth-child(2) { transition-delay: 50ms; }
    .ux-fab--open .ux-fab__list-item:nth-child(3) { transition-delay: 100ms; }
    .ux-fab--open .ux-fab__list-item:nth-child(4) { transition-delay: 150ms; }
    .ux-fab--open .ux-fab__list-item:nth-child(5) { transition-delay: 200ms; }

    /* Mini FAB button */
    .ux-fab__mini-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      padding: 0;
      background-color: var(--ux-surface);
      color: var(--ux-text);
      border: none;
      border-radius: 50%;
      box-shadow: var(--ux-shadow-md);
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition:
        transform var(--ux-transition-fast) var(--ux-ease),
        box-shadow var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-fab__mini-button:hover {
      box-shadow: var(--ux-shadow-lg);
      transform: scale(1.1);
    }

    .ux-fab__mini-button:active {
      transform: scale(0.95);
    }

    .ux-fab__mini-button-icon {
      width: 20px;
      height: 20px;
    }

    .ux-fab__mini-button-icon svg {
      width: 100%;
      height: 100%;
    }

    /* Mini button colors */
    .ux-fab__mini-button--primary {
      background-color: var(--ux-primary);
      color: var(--ux-primary-contrast);
    }

    .ux-fab__mini-button--secondary {
      background-color: var(--ux-secondary);
      color: var(--ux-secondary-contrast);
    }

    .ux-fab__mini-button--success {
      background-color: var(--ux-success);
      color: var(--ux-success-contrast);
    }

    .ux-fab__mini-button--danger {
      background-color: var(--ux-danger);
      color: var(--ux-danger-contrast);
    }

    /* Label */
    .ux-fab__list-label {
      padding: var(--ux-space-xs) var(--ux-space-md);
      background-color: var(--ux-dark);
      color: var(--ux-dark-contrast);
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      border-radius: var(--ux-border-radius);
      white-space: nowrap;
      box-shadow: var(--ux-shadow-sm);
    }

    /* Label position */
    .ux-fab--bottom-end .ux-fab__list-label,
    .ux-fab--center-end .ux-fab__list-label,
    .ux-fab--top-end .ux-fab__list-label {
      order: -1;
    }

    /* ========================================
       Horizontal FAB List
    ======================================== */

    .ux-fab--horizontal .ux-fab__list {
      flex-direction: row;
    }

    .ux-fab--horizontal.ux-fab--bottom-end .ux-fab__list,
    .ux-fab--horizontal.ux-fab--top-end .ux-fab__list {
      flex-direction: row-reverse;
    }

    .ux-fab--horizontal .ux-fab__list-item {
      flex-direction: column;
      transform: translateX(20px) scale(0.8);
    }

    .ux-fab--horizontal.ux-fab--bottom-start .ux-fab__list-item,
    .ux-fab--horizontal.ux-fab--top-start .ux-fab__list-item {
      transform: translateX(-20px) scale(0.8);
    }

    .ux-fab--horizontal.ux-fab--open .ux-fab__list-item {
      transform: translateX(0) scale(1);
    }

    /* ========================================
       FAB Backdrop
    ======================================== */

    .ux-fab__backdrop {
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.3);
      z-index: 99;
      opacity: 0;
      visibility: hidden;
      transition:
        opacity var(--ux-transition-base) var(--ux-ease),
        visibility var(--ux-transition-base) var(--ux-ease);
    }

    .ux-fab--open .ux-fab__backdrop {
      opacity: 1;
      visibility: visible;
    }

    /* ========================================
       FAB Badge
    ======================================== */

    .ux-fab__badge {
      position: absolute;
      top: -4px;
      right: -4px;
      min-width: 20px;
      height: 20px;
      padding: 0 6px;
      background-color: var(--ux-danger);
      color: white;
      font-size: 11px;
      font-weight: 600;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* ========================================
       FAB Scroll Behavior
    ======================================== */

    .ux-fab--hide-on-scroll {
      transition:
        transform var(--ux-transition-base) var(--ux-ease),
        opacity var(--ux-transition-base) var(--ux-ease);
    }

    .ux-fab--hidden {
      transform: translateY(100px);
      opacity: 0;
      pointer-events: none;
    }

    .ux-fab--bottom-center.ux-fab--hidden {
      transform: translateX(-50%) translateY(100px);
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-fab-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-fab-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for FAB with speed dial
  const fabComponent = (config = {}) => ({
    isOpen: false,
    hidden: false,
    lastScrollTop: 0,
    hideOnScroll: config.hideOnScroll || false,
    threshold: config.threshold || 50,

    toggle() {
      this.isOpen = !this.isOpen;
    },

    open() {
      this.isOpen = true;
    },

    close() {
      this.isOpen = false;
    },

    handleScroll(scrollTop) {
      if (!this.hideOnScroll) return;

      if (scrollTop > this.lastScrollTop && scrollTop > this.threshold) {
        this.hidden = true;
        this.close();
      } else {
        this.hidden = false;
      }

      this.lastScrollTop = scrollTop;
    },

    handleAction(action) {
      if (action && typeof action === 'function') {
        action();
      }
      this.close();
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxFab', fabComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxFab', fabComponent);
    });
  }
})();
/**
 * UX Accordion Component
 * Acordeones expandibles estilo iOS
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Accordion
    ======================================== */

    .ux-accordion {
      display: flex;
      flex-direction: column;
      width: 100%;
      background-color: var(--ux-surface);
      border-radius: var(--ux-border-radius-lg);
      overflow: hidden;
    }

    /* ========================================
       Accordion Item
    ======================================== */

    .ux-accordion-item {
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-accordion-item:last-child {
      border-bottom: none;
    }

    /* ========================================
       Accordion Header
    ======================================== */

    .ux-accordion-item__header {
      display: flex;
      align-items: center;
      width: 100%;
      min-height: var(--ux-touch-target);
      padding: var(--ux-space-md) var(--ux-space-lg);
      background: none;
      border: none;
      color: var(--ux-text);
      font-family: var(--ux-font-family);
      font-size: var(--ux-font-size-md);
      text-align: left;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition: background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-accordion-item__header:hover {
      background-color: var(--ux-surface-secondary);
    }

    .ux-accordion-item__header:active {
      background-color: var(--ux-light);
    }

    .ux-accordion-item--disabled .ux-accordion-item__header {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .ux-accordion-item--disabled .ux-accordion-item__header:hover {
      background-color: transparent;
    }

    /* ========================================
       Accordion Header Content
    ======================================== */

    .ux-accordion-item__icon {
      width: 24px;
      height: 24px;
      margin-right: var(--ux-space-md);
      color: var(--ux-text-secondary);
      flex-shrink: 0;
    }

    .ux-accordion-item__icon svg {
      width: 100%;
      height: 100%;
    }

    .ux-accordion-item__content {
      flex: 1;
      min-width: 0;
    }

    .ux-accordion-item__title {
      font-weight: 500;
      color: var(--ux-text);
    }

    .ux-accordion-item__subtitle {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin-top: 2px;
    }

    .ux-accordion-item__chevron {
      width: 20px;
      height: 20px;
      margin-left: var(--ux-space-md);
      color: var(--ux-text-tertiary);
      flex-shrink: 0;
      transition: transform var(--ux-transition-base) var(--ux-ease);
    }

    .ux-accordion-item__chevron svg {
      width: 100%;
      height: 100%;
    }

    .ux-accordion-item--open .ux-accordion-item__chevron {
      transform: rotate(180deg);
    }

    /* ========================================
       Accordion Body
    ======================================== */

    .ux-accordion-item__body {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows var(--ux-transition-base) var(--ux-ease);
    }

    .ux-accordion-item--open .ux-accordion-item__body {
      grid-template-rows: 1fr;
    }

    .ux-accordion-item__body-inner {
      overflow: hidden;
    }

    .ux-accordion-item__body-content {
      padding: 0 var(--ux-space-lg) var(--ux-space-lg);
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      line-height: 1.6;
    }

    /* With left icon offset */
    .ux-accordion-item--with-icon .ux-accordion-item__body-content {
      padding-left: calc(var(--ux-space-lg) + 24px + var(--ux-space-md));
    }

    /* ========================================
       Accordion Variants
    ======================================== */

    /* Inset (iOS grouped style) */
    .ux-accordion--inset {
      margin: var(--ux-space-lg);
    }

    /* Outline */
    .ux-accordion--outline {
      background-color: transparent;
      border: 1px solid var(--ux-border-color);
    }

    .ux-accordion--outline .ux-accordion-item {
      border-bottom-color: var(--ux-border-color);
    }

    /* Flat */
    .ux-accordion--flat {
      border-radius: 0;
      background-color: transparent;
    }

    .ux-accordion--flat .ux-accordion-item {
      background-color: var(--ux-surface);
      margin-bottom: var(--ux-space-sm);
      border-radius: var(--ux-border-radius);
      border-bottom: none;
    }

    /* ========================================
       Sizes
    ======================================== */

    .ux-accordion--sm .ux-accordion-item__header {
      min-height: 40px;
      padding: var(--ux-space-sm) var(--ux-space-md);
      font-size: var(--ux-font-size-sm);
    }

    .ux-accordion--sm .ux-accordion-item__icon {
      width: 20px;
      height: 20px;
    }

    .ux-accordion--sm .ux-accordion-item__body-content {
      padding: 0 var(--ux-space-md) var(--ux-space-md);
      font-size: var(--ux-font-size-xs);
    }

    .ux-accordion--lg .ux-accordion-item__header {
      min-height: 60px;
      padding: var(--ux-space-lg) var(--ux-space-xl);
      font-size: var(--ux-font-size-lg);
    }

    .ux-accordion--lg .ux-accordion-item__body-content {
      padding: 0 var(--ux-space-xl) var(--ux-space-xl);
      font-size: var(--ux-font-size-md);
    }

    /* ========================================
       Accordion List (simpler version)
    ======================================== */

    .ux-accordion-list {
      background-color: var(--ux-surface);
    }

    .ux-accordion-list__item {
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-accordion-list__item:last-child {
      border-bottom: none;
    }

    /* ========================================
       FAQ Style
    ======================================== */

    .ux-accordion--faq .ux-accordion-item__title {
      font-weight: 600;
    }

    .ux-accordion--faq .ux-accordion-item__title::before {
      content: 'Q: ';
      color: var(--ux-primary);
    }

    .ux-accordion--faq .ux-accordion-item__body-content::before {
      content: 'A: ';
      font-weight: 600;
      color: var(--ux-success);
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-accordion-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-accordion-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for accordion
  // ARIA: aria-expanded, aria-controls on headers; region role on panels
  const accordionComponent = (config = {}) => ({
    openItems: config.openItems || [],
    multiple: config.multiple || false,
    disabled: config.disabled || false,
    accordionId: config.id || 'ux-accordion-' + Math.random().toString(36).substr(2, 9),

    isOpen(index) {
      return this.openItems.includes(index);
    },

    // ARIA attributes for accordion header button
    getHeaderAriaAttrs(index) {
      return {
        'aria-expanded': this.isOpen(index) ? 'true' : 'false',
        'aria-controls': this.accordionId + '-panel-' + index,
        'id': this.accordionId + '-header-' + index
      };
    },

    // ARIA attributes for accordion panel
    getPanelAriaAttrs(index) {
      return {
        'role': 'region',
        'aria-labelledby': this.accordionId + '-header-' + index,
        'id': this.accordionId + '-panel-' + index
      };
    },

    toggle(index) {
      if (this.disabled) return;

      if (this.isOpen(index)) {
        this.close(index);
      } else {
        this.open(index);
      }
    },

    open(index) {
      if (!this.multiple) {
        this.openItems = [index];
      } else if (!this.openItems.includes(index)) {
        this.openItems.push(index);
      }
    },

    close(index) {
      const i = this.openItems.indexOf(index);
      if (i !== -1) {
        this.openItems.splice(i, 1);
      }
    },

    openAll(total) {
      this.openItems = Array.from({ length: total }, (_, i) => i);
    },

    closeAll() {
      this.openItems = [];
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxAccordion', accordionComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxAccordion', accordionComponent);
    });
  }

  // Alpine component for single accordion item
  // ARIA: aria-expanded on header
  const accordionItemComponent = (config = {}) => ({
    isOpen: config.isOpen || false,
    disabled: config.disabled || false,
    itemId: config.id || 'ux-accordion-item-' + Math.random().toString(36).substr(2, 9),

    // ARIA attributes for header
    get headerAriaAttrs() {
      return {
        'aria-expanded': this.isOpen ? 'true' : 'false',
        'aria-controls': this.itemId + '-panel',
        'id': this.itemId + '-header'
      };
    },

    // ARIA attributes for panel
    get panelAriaAttrs() {
      return {
        'role': 'region',
        'aria-labelledby': this.itemId + '-header',
        'id': this.itemId + '-panel'
      };
    },

    toggle() {
      if (!this.disabled) {
        this.isOpen = !this.isOpen;
      }
    },

    open() {
      if (!this.disabled) {
        this.isOpen = true;
      }
    },

    close() {
      this.isOpen = false;
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxAccordionItem', accordionItemComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxAccordionItem', accordionItemComponent);
    });
  }
})();
/**
 * UX Datetime Component
 * Selectores de fecha y hora estilo iOS
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Datetime Input
    ======================================== */

    .ux-datetime {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    .ux-datetime__label {
      display: block;
      margin-bottom: var(--ux-space-xs);
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      color: var(--ux-text-secondary);
    }

    .ux-datetime__trigger {
      display: flex;
      align-items: center;
      width: 100%;
      min-height: var(--ux-touch-target);
      padding: var(--ux-space-md) var(--ux-space-lg);
      background-color: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius);
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition:
        border-color var(--ux-transition-fast) var(--ux-ease),
        box-shadow var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-datetime__trigger:hover {
      border-color: var(--ux-medium);
    }

    .ux-datetime--open .ux-datetime__trigger {
      border-color: var(--ux-primary);
      box-shadow: 0 0 0 3px rgba(var(--ux-primary-rgb), 0.15);
    }

    .ux-datetime__value {
      flex: 1;
      font-size: var(--ux-font-size-md);
      color: var(--ux-text);
    }

    .ux-datetime__placeholder {
      color: var(--ux-text-tertiary);
    }

    .ux-datetime__icon {
      width: 20px;
      height: 20px;
      margin-left: var(--ux-space-sm);
      color: var(--ux-text-secondary);
    }

    .ux-datetime__icon svg {
      width: 100%;
      height: 100%;
    }

    /* ========================================
       Native Date/Time Input (styled)
    ======================================== */

    .ux-datetime__native {
      width: 100%;
      min-height: var(--ux-touch-target);
      padding: var(--ux-space-md) var(--ux-space-lg);
      font-family: var(--ux-font-family);
      font-size: 16px;
      color: var(--ux-text);
      background-color: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius);
      outline: none;
      -webkit-appearance: none;
      appearance: none;
      transition:
        border-color var(--ux-transition-fast) var(--ux-ease),
        box-shadow var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-datetime__native:hover {
      border-color: var(--ux-medium);
    }

    .ux-datetime__native:focus {
      border-color: var(--ux-primary);
      box-shadow: 0 0 0 3px rgba(var(--ux-primary-rgb), 0.15);
    }

    .ux-datetime__native::-webkit-calendar-picker-indicator {
      cursor: pointer;
      opacity: 0.6;
    }

    .ux-datetime__native::-webkit-calendar-picker-indicator:hover {
      opacity: 1;
    }

    /* ========================================
       Datetime Picker (Custom)
    ======================================== */

    .ux-datetime-picker {
      position: absolute;
      top: calc(100% + var(--ux-space-xs));
      left: 0;
      min-width: 280px;
      background-color: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius-lg);
      box-shadow: var(--ux-shadow-xl);
      z-index: 100;
      overflow: hidden;
    }

    /* ========================================
       Calendar Header
    ======================================== */

    .ux-calendar__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--ux-space-md);
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-calendar__nav {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      padding: 0;
      background: none;
      border: none;
      color: var(--ux-primary);
      cursor: pointer;
      border-radius: 50%;
      -webkit-tap-highlight-color: transparent;
      transition: background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-calendar__nav:hover {
      background-color: rgba(var(--ux-primary-rgb), 0.1);
    }

    .ux-calendar__nav:active {
      background-color: rgba(var(--ux-primary-rgb), 0.2);
    }

    .ux-calendar__nav:disabled {
      opacity: 0.3;
      pointer-events: none;
    }

    .ux-calendar__nav-icon {
      width: 20px;
      height: 20px;
    }

    .ux-calendar__nav-icon svg {
      width: 100%;
      height: 100%;
    }

    .ux-calendar__title {
      font-size: var(--ux-font-size-md);
      font-weight: 600;
      color: var(--ux-text);
      cursor: pointer;
      padding: var(--ux-space-xs) var(--ux-space-sm);
      border-radius: var(--ux-border-radius-sm);
      transition: background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-calendar__title:hover {
      background-color: var(--ux-surface-secondary);
    }

    /* ========================================
       Calendar Grid
    ======================================== */

    .ux-calendar__weekdays {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      padding: var(--ux-space-xs) var(--ux-space-sm);
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-calendar__weekday {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 32px;
      font-size: var(--ux-font-size-xs);
      font-weight: 600;
      color: var(--ux-text-tertiary);
      text-transform: uppercase;
    }

    .ux-calendar__days {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      padding: var(--ux-space-sm);
      gap: 2px;
    }

    .ux-calendar__day {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      margin: auto;
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text);
      background: none;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition:
        background-color var(--ux-transition-fast) var(--ux-ease),
        color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-calendar__day:hover {
      background-color: var(--ux-surface-secondary);
    }

    .ux-calendar__day--other-month {
      color: var(--ux-text-tertiary);
    }

    .ux-calendar__day--today {
      font-weight: 600;
      color: var(--ux-primary);
    }

    .ux-calendar__day--selected {
      background-color: var(--ux-primary);
      color: var(--ux-primary-contrast);
    }

    .ux-calendar__day--selected:hover {
      background-color: var(--ux-primary-shade);
    }

    .ux-calendar__day--disabled {
      opacity: 0.3;
      pointer-events: none;
    }

    .ux-calendar__day--range-start {
      border-radius: 50% 0 0 50%;
    }

    .ux-calendar__day--range-end {
      border-radius: 0 50% 50% 0;
    }

    .ux-calendar__day--in-range {
      background-color: rgba(var(--ux-primary-rgb), 0.15);
      border-radius: 0;
    }

    /* ========================================
       Month/Year Selector
    ======================================== */

    .ux-calendar__months,
    .ux-calendar__years {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--ux-space-sm);
      padding: var(--ux-space-md);
    }

    .ux-calendar__month,
    .ux-calendar__year {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 40px;
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text);
      background: none;
      border: none;
      border-radius: var(--ux-border-radius);
      cursor: pointer;
      transition: background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-calendar__month:hover,
    .ux-calendar__year:hover {
      background-color: var(--ux-surface-secondary);
    }

    .ux-calendar__month--selected,
    .ux-calendar__year--selected {
      background-color: var(--ux-primary);
      color: var(--ux-primary-contrast);
    }

    /* ========================================
       Time Picker
    ======================================== */

    .ux-time-picker {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--ux-space-lg);
      gap: var(--ux-space-sm);
      border-top: 1px solid var(--ux-border-color);
    }

    .ux-time-picker__column {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .ux-time-picker__label {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-tertiary);
      margin-bottom: var(--ux-space-xs);
    }

    .ux-time-picker__input {
      width: 60px;
      height: 44px;
      padding: 0;
      font-size: var(--ux-font-size-xl);
      font-weight: 600;
      text-align: center;
      color: var(--ux-text);
      background-color: var(--ux-surface-secondary);
      border: none;
      border-radius: var(--ux-border-radius);
      outline: none;
      -moz-appearance: textfield;
    }

    .ux-time-picker__input::-webkit-outer-spin-button,
    .ux-time-picker__input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    .ux-time-picker__input:focus {
      background-color: rgba(var(--ux-primary-rgb), 0.15);
    }

    .ux-time-picker__separator {
      font-size: var(--ux-font-size-xl);
      font-weight: 600;
      color: var(--ux-text);
      padding-top: var(--ux-space-md);
    }

    .ux-time-picker__period {
      display: flex;
      flex-direction: column;
      gap: 2px;
      margin-left: var(--ux-space-sm);
    }

    .ux-time-picker__period-btn {
      padding: var(--ux-space-xs) var(--ux-space-sm);
      font-size: var(--ux-font-size-xs);
      font-weight: 600;
      color: var(--ux-text-secondary);
      background: none;
      border: none;
      border-radius: var(--ux-border-radius-sm);
      cursor: pointer;
      transition: all var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-time-picker__period-btn:hover {
      background-color: var(--ux-surface-secondary);
    }

    .ux-time-picker__period-btn--active {
      background-color: var(--ux-primary);
      color: var(--ux-primary-contrast);
    }

    /* ========================================
       Datetime Footer
    ======================================== */

    .ux-datetime-picker__footer {
      display: flex;
      justify-content: flex-end;
      gap: var(--ux-space-sm);
      padding: var(--ux-space-md);
      border-top: 1px solid var(--ux-border-color);
    }

    /* ========================================
       Inline Calendar
    ======================================== */

    .ux-calendar--inline {
      position: static;
      box-shadow: none;
      border: 1px solid var(--ux-border-color);
    }

    /* ========================================
       Sizes
    ======================================== */

    .ux-datetime--sm .ux-datetime__trigger,
    .ux-datetime--sm .ux-datetime__native {
      min-height: var(--ux-touch-target-sm);
      padding: var(--ux-space-sm) var(--ux-space-md);
      font-size: var(--ux-font-size-sm);
    }

    .ux-datetime--lg .ux-datetime__trigger,
    .ux-datetime--lg .ux-datetime__native {
      min-height: 52px;
      padding: var(--ux-space-lg) var(--ux-space-xl);
      font-size: var(--ux-font-size-lg);
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-datetime-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-datetime-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for datetime picker
  const datetimeComponent = (config = {}) => ({
    isOpen: false,
    value: config.value || null,
    displayValue: '',
    mode: config.mode || 'date', // date, time, datetime
    view: 'days', // days, months, years
    format: config.format || 'YYYY-MM-DD',
    min: config.min || null,
    max: config.max || null,
    currentMonth: new Date().getMonth(),
    currentYear: new Date().getFullYear(),
    hours: 12,
    minutes: 0,
    period: 'AM',
    use24Hour: config.use24Hour || false,

    weekdays: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

    init() {
      if (this.value) {
        const date = new Date(this.value);
        this.currentMonth = date.getMonth();
        this.currentYear = date.getFullYear();
        this.hours = date.getHours();
        this.minutes = date.getMinutes();
        this.updateDisplayValue();
      }
    },

    open() {
      this.isOpen = true;
      this.view = 'days';
    },

    close() {
      this.isOpen = false;
    },

    toggle() {
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    },

    get daysInMonth() {
      const days = [];
      const firstDay = new Date(this.currentYear, this.currentMonth, 1);
      const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);

      // Days from previous month
      const startDay = firstDay.getDay();
      const prevMonth = new Date(this.currentYear, this.currentMonth, 0);
      for (let i = startDay - 1; i >= 0; i--) {
        days.push({
          day: prevMonth.getDate() - i,
          month: this.currentMonth - 1,
          year: this.currentYear,
          isOtherMonth: true
        });
      }

      // Days in current month
      for (let i = 1; i <= lastDay.getDate(); i++) {
        days.push({
          day: i,
          month: this.currentMonth,
          year: this.currentYear,
          isOtherMonth: false
        });
      }

      // Days from next month
      const remaining = 42 - days.length;
      for (let i = 1; i <= remaining; i++) {
        days.push({
          day: i,
          month: this.currentMonth + 1,
          year: this.currentYear,
          isOtherMonth: true
        });
      }

      return days;
    },

    isToday(date) {
      const today = new Date();
      return date.day === today.getDate() &&
             date.month === today.getMonth() &&
             date.year === today.getFullYear();
    },

    isSelected(date) {
      if (!this.value) return false;
      const selected = new Date(this.value);
      return date.day === selected.getDate() &&
             date.month === selected.getMonth() &&
             date.year === selected.getFullYear();
    },

    selectDate(date) {
      const selected = new Date(date.year, date.month, date.day, this.hours, this.minutes);
      this.value = selected.toISOString();
      this.currentMonth = date.month;
      this.currentYear = date.year;
      this.updateDisplayValue();

      if (this.mode === 'date') {
        this.close();
      }
    },

    prevMonth() {
      if (this.currentMonth === 0) {
        this.currentMonth = 11;
        this.currentYear--;
      } else {
        this.currentMonth--;
      }
    },

    nextMonth() {
      if (this.currentMonth === 11) {
        this.currentMonth = 0;
        this.currentYear++;
      } else {
        this.currentMonth++;
      }
    },

    selectMonth(month) {
      this.currentMonth = month;
      this.view = 'days';
    },

    selectYear(year) {
      this.currentYear = year;
      this.view = 'months';
    },

    updateDisplayValue() {
      if (!this.value) {
        this.displayValue = '';
        return;
      }

      const date = new Date(this.value);
      const options = {};

      if (this.mode === 'date' || this.mode === 'datetime') {
        options.year = 'numeric';
        options.month = 'short';
        options.day = 'numeric';
      }

      if (this.mode === 'time' || this.mode === 'datetime') {
        options.hour = '2-digit';
        options.minute = '2-digit';
        options.hour12 = !this.use24Hour;
      }

      this.displayValue = date.toLocaleString(undefined, options);
    },

    confirm() {
      this.updateDisplayValue();
      this.close();
    },

    clear() {
      this.value = null;
      this.displayValue = '';
      this.close();
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxDatetime', datetimeComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxDatetime', datetimeComponent);
    });
  }
})();
/**
 * UX Infinite Scroll Component
 * Scroll infinito para listas
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Infinite Scroll
    ======================================== */

    .ux-infinite-scroll {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: var(--ux-space-lg);
      min-height: 60px;
    }

    .ux-infinite-scroll--hidden {
      display: none;
    }

    /* ========================================
       Loading State
    ======================================== */

    .ux-infinite-scroll__spinner {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--ux-space-md);
    }

    .ux-infinite-scroll__icon {
      width: 24px;
      height: 24px;
      border: 2px solid var(--ux-light);
      border-top-color: var(--ux-primary);
      border-radius: 50%;
      animation: ux-spin 0.8s linear infinite;
    }

    @keyframes ux-spin {
      to {
        transform: rotate(360deg);
      }
    }

    .ux-infinite-scroll__text {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
    }

    /* ========================================
       End State
    ======================================== */

    .ux-infinite-scroll--complete {
      color: var(--ux-text-tertiary);
    }

    .ux-infinite-scroll__end-text {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-tertiary);
    }

    .ux-infinite-scroll__end-icon {
      width: 20px;
      height: 20px;
      margin-bottom: var(--ux-space-xs);
      color: var(--ux-text-tertiary);
    }

    .ux-infinite-scroll__end-icon svg {
      width: 100%;
      height: 100%;
    }

    /* ========================================
       Error State
    ======================================== */

    .ux-infinite-scroll--error {
      flex-direction: column;
      gap: var(--ux-space-sm);
    }

    .ux-infinite-scroll__error-text {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-danger);
    }

    .ux-infinite-scroll__retry {
      padding: var(--ux-space-sm) var(--ux-space-md);
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      color: var(--ux-primary);
      background: none;
      border: none;
      cursor: pointer;
    }

    .ux-infinite-scroll__retry:hover {
      text-decoration: underline;
    }

    /* ========================================
       Scroll Progress Bar
    ======================================== */

    .ux-scroll-progress {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background-color: var(--ux-light);
      z-index: 1000;
    }

    .ux-scroll-progress__bar {
      height: 100%;
      background-color: var(--ux-primary);
      transition: width 0.1s ease-out;
    }

    /* ========================================
       Virtual Scroll Container
    ======================================== */

    .ux-virtual-scroll {
      position: relative;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }

    .ux-virtual-scroll__spacer {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      pointer-events: none;
    }

    .ux-virtual-scroll__content {
      position: relative;
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-infinite-scroll-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-infinite-scroll-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for infinite scroll
  const infiniteScrollComponent = (config = {}) => ({
    loading: false,
    complete: false,
    error: false,
    threshold: config.threshold || 100,
    disabled: config.disabled || false,

    async checkScroll(scrollContainer) {
      if (this.loading || this.complete || this.disabled) return;

      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

      if (distanceFromBottom < this.threshold) {
        await this.loadMore();
      }
    },

    async loadMore() {
      if (this.loading || this.complete) return;

      this.loading = true;
      this.error = false;

      // The actual loading should be handled by the parent component
      // via @load-more event
    },

    setComplete() {
      this.complete = true;
      this.loading = false;
    },

    setError() {
      this.error = true;
      this.loading = false;
    },

    reset() {
      this.loading = false;
      this.complete = false;
      this.error = false;
    },

    finishLoading() {
      this.loading = false;
    },

    retry() {
      this.error = false;
      this.loadMore();
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxInfiniteScroll', infiniteScrollComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxInfiniteScroll', infiniteScrollComponent);
    });
  }

  // Alpine component for scroll progress
  const scrollProgressComponent = () => ({
    progress: 0,

    updateProgress(scrollContainer) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      const maxScroll = scrollHeight - clientHeight;
      this.progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
    },

    get progressStyle() {
      return { width: this.progress + '%' };
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxScrollProgress', scrollProgressComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxScrollProgress', scrollProgressComponent);
    });
  }

  // Alpine component for simple virtual scroll
  const virtualScrollComponent = (config = {}) => ({
    items: config.items || [],
    itemHeight: config.itemHeight || 50,
    containerHeight: config.containerHeight || 400,
    buffer: config.buffer || 5,
    scrollTop: 0,

    get totalHeight() {
      return this.items.length * this.itemHeight;
    },

    get visibleCount() {
      return Math.ceil(this.containerHeight / this.itemHeight) + this.buffer * 2;
    },

    get startIndex() {
      return Math.max(0, Math.floor(this.scrollTop / this.itemHeight) - this.buffer);
    },

    get endIndex() {
      return Math.min(this.items.length, this.startIndex + this.visibleCount);
    },

    get visibleItems() {
      return this.items.slice(this.startIndex, this.endIndex).map((item, index) => ({
        ...item,
        _index: this.startIndex + index,
        _style: {
          position: 'absolute',
          top: (this.startIndex + index) * this.itemHeight + 'px',
          left: 0,
          right: 0,
          height: this.itemHeight + 'px'
        }
      }));
    },

    handleScroll(event) {
      this.scrollTop = event.target.scrollTop;
    },

    scrollToIndex(index) {
      const container = this.$refs.container;
      if (container) {
        container.scrollTop = index * this.itemHeight;
      }
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxVirtualScroll', virtualScrollComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxVirtualScroll', virtualScrollComponent);
    });
  }
})();
/**
 * UX Refresher Component
 * Pull-to-refresh estilo iOS
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Refresher
    ======================================== */

    .ux-refresher {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 60px;
      transform: translateY(-100%);
      transition: transform var(--ux-transition-base) var(--ux-ease);
      z-index: 10;
      pointer-events: none;
    }

    .ux-refresher--pulling {
      transform: translateY(0);
    }

    .ux-refresher--refreshing {
      transform: translateY(0);
    }

    /* ========================================
       Refresher Content
    ======================================== */

    .ux-refresher__content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--ux-space-xs);
    }

    /* ========================================
       Refresher Icon (Arrow)
    ======================================== */

    .ux-refresher__icon {
      width: 24px;
      height: 24px;
      color: var(--ux-text-secondary);
      transition: transform var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-refresher__icon svg {
      width: 100%;
      height: 100%;
    }

    .ux-refresher--pulling .ux-refresher__icon {
      transform: rotate(0deg);
    }

    .ux-refresher--ready .ux-refresher__icon {
      transform: rotate(180deg);
    }

    /* ========================================
       Refresher Spinner
    ======================================== */

    .ux-refresher__spinner {
      width: 24px;
      height: 24px;
      border: 2px solid var(--ux-light);
      border-top-color: var(--ux-primary);
      border-radius: 50%;
      animation: ux-refresher-spin 0.8s linear infinite;
    }

    @keyframes ux-refresher-spin {
      to {
        transform: rotate(360deg);
      }
    }

    /* iOS-style spinner */
    .ux-refresher__spinner--ios {
      position: relative;
      width: 24px;
      height: 24px;
      border: none;
      animation: none;
    }

    .ux-refresher__spinner--ios::before {
      content: '';
      position: absolute;
      top: 0;
      left: 50%;
      width: 2px;
      height: 6px;
      background-color: var(--ux-text-secondary);
      border-radius: 1px;
      transform-origin: center 12px;
      animation: ux-refresher-ios-spin 1s steps(8) infinite;
    }

    @keyframes ux-refresher-ios-spin {
      from {
        transform: translateX(-50%) rotate(0deg);
      }
      to {
        transform: translateX(-50%) rotate(360deg);
      }
    }

    /* ========================================
       Refresher Text
    ======================================== */

    .ux-refresher__text {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-tertiary);
    }

    /* ========================================
       Refresher Progress Circle
    ======================================== */

    .ux-refresher__progress {
      width: 28px;
      height: 28px;
    }

    .ux-refresher__progress-circle {
      fill: none;
      stroke: var(--ux-primary);
      stroke-width: 2;
      stroke-linecap: round;
      transform: rotate(-90deg);
      transform-origin: center;
    }

    /* ========================================
       Pull Content Container
    ======================================== */

    .ux-refresher-content {
      position: relative;
      transform: translateY(0);
      transition: transform var(--ux-transition-base) var(--ux-ease);
      will-change: transform;
    }

    .ux-refresher-content--pulling {
      transition: none;
    }

    .ux-refresher-content--refreshing {
      transform: translateY(60px);
    }

    /* ========================================
       Backdrop (optional visual feedback)
    ======================================== */

    .ux-refresher__backdrop {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 100%;
      background: linear-gradient(
        to bottom,
        rgba(var(--ux-primary-rgb), 0.05) 0%,
        transparent 100%
      );
      opacity: 0;
      transition: opacity var(--ux-transition-fast) var(--ux-ease);
      pointer-events: none;
    }

    .ux-refresher--pulling .ux-refresher__backdrop {
      opacity: 1;
    }

    /* ========================================
       Success/Complete State
    ======================================== */

    .ux-refresher--complete .ux-refresher__content {
      color: var(--ux-success);
    }

    .ux-refresher__check {
      width: 24px;
      height: 24px;
      color: var(--ux-success);
      animation: ux-refresher-check 0.3s var(--ux-ease-spring);
    }

    .ux-refresher__check svg {
      width: 100%;
      height: 100%;
    }

    @keyframes ux-refresher-check {
      0% {
        transform: scale(0);
      }
      50% {
        transform: scale(1.2);
      }
      100% {
        transform: scale(1);
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-refresher-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-refresher-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for refresher
  const refresherComponent = (config = {}) => ({
    state: 'idle', // idle, pulling, ready, refreshing, complete
    pullDistance: 0,
    startY: 0,
    threshold: config.threshold || 80,
    maxPull: config.maxPull || 120,
    disabled: config.disabled || false,
    snapback: config.snapback !== false,

    get progress() {
      return Math.min(1, this.pullDistance / this.threshold);
    },

    get progressDegrees() {
      return this.progress * 360;
    },

    get isPulling() {
      return this.state === 'pulling';
    },

    get isReady() {
      return this.state === 'ready';
    },

    get isRefreshing() {
      return this.state === 'refreshing';
    },

    get isComplete() {
      return this.state === 'complete';
    },

    get contentStyle() {
      if (this.state === 'pulling' || this.state === 'ready') {
        return { transform: `translateY(${this.pullDistance}px)` };
      }
      if (this.state === 'refreshing') {
        return { transform: `translateY(60px)` };
      }
      return {};
    },

    handleTouchStart(event) {
      if (this.disabled || this.state === 'refreshing') return;

      const scrollTop = this.$refs.content?.scrollTop || 0;
      if (scrollTop > 0) return;

      this.startY = event.touches[0].clientY;
    },

    handleTouchMove(event) {
      if (this.disabled || this.state === 'refreshing' || this.startY === 0) return;

      const scrollTop = this.$refs.content?.scrollTop || 0;
      if (scrollTop > 0) {
        this.startY = 0;
        return;
      }

      const currentY = event.touches[0].clientY;
      const diff = currentY - this.startY;

      if (diff > 0) {
        event.preventDefault();

        // Apply resistance
        this.pullDistance = Math.min(this.maxPull, diff * 0.5);

        if (this.pullDistance >= this.threshold) {
          this.state = 'ready';
        } else {
          this.state = 'pulling';
        }
      }
    },

    handleTouchEnd() {
      if (this.disabled || this.startY === 0) return;

      this.startY = 0;

      if (this.state === 'ready') {
        this.state = 'refreshing';
        this.pullDistance = 0;
        // Trigger refresh event - parent should handle actual refresh
      } else {
        this.reset();
      }
    },

    async doRefresh() {
      // This should be called by the parent after handling the refresh
      this.state = 'complete';
      await new Promise(resolve => setTimeout(resolve, 500));
      this.reset();
    },

    complete() {
      this.state = 'complete';
      setTimeout(() => {
        this.reset();
      }, 500);
    },

    cancel() {
      this.reset();
    },

    reset() {
      this.state = 'idle';
      this.pullDistance = 0;
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxRefresher', refresherComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxRefresher', refresherComponent);
    });
  }
})();
/**
 * UX Reorder Component
 * Drag-to-reorder para listas
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Reorder Group
    ======================================== */

    .ux-reorder-group {
      position: relative;
      user-select: none;
      -webkit-user-select: none;
    }

    .ux-reorder-group--disabled {
      pointer-events: none;
    }

    /* ========================================
       Reorder Item
    ======================================== */

    .ux-reorder-item {
      position: relative;
      display: flex;
      align-items: center;
      background-color: var(--ux-surface);
      transition:
        transform var(--ux-transition-fast) var(--ux-ease),
        box-shadow var(--ux-transition-fast) var(--ux-ease),
        opacity var(--ux-transition-fast) var(--ux-ease);
      will-change: transform;
    }

    .ux-reorder-item--dragging {
      z-index: 100;
      box-shadow: var(--ux-shadow-xl);
      transform: scale(1.02);
      opacity: 0.9;
    }

    .ux-reorder-item--ghost {
      opacity: 0.3;
    }

    /* ========================================
       Reorder Handle
    ======================================== */

    .ux-reorder-handle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--ux-touch-target);
      height: var(--ux-touch-target);
      padding: var(--ux-space-md);
      color: var(--ux-text-tertiary);
      cursor: grab;
      touch-action: none;
      -webkit-tap-highlight-color: transparent;
    }

    .ux-reorder-handle:active {
      cursor: grabbing;
    }

    .ux-reorder-item--disabled .ux-reorder-handle {
      opacity: 0.3;
      cursor: not-allowed;
    }

    .ux-reorder-handle__icon {
      width: 20px;
      height: 20px;
    }

    .ux-reorder-handle__icon svg {
      width: 100%;
      height: 100%;
    }

    /* Handle lines pattern */
    .ux-reorder-handle--lines {
      flex-direction: column;
      gap: 3px;
    }

    .ux-reorder-handle__line {
      width: 16px;
      height: 2px;
      background-color: var(--ux-text-tertiary);
      border-radius: 1px;
    }

    /* ========================================
       Drop Indicator
    ======================================== */

    .ux-reorder-indicator {
      position: absolute;
      left: 0;
      right: 0;
      height: 2px;
      background-color: var(--ux-primary);
      transform: scaleX(0);
      transition: transform var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-reorder-indicator--top {
      top: -1px;
    }

    .ux-reorder-indicator--bottom {
      bottom: -1px;
    }

    .ux-reorder-indicator--active {
      transform: scaleX(1);
    }

    /* ========================================
       Reorder Item Content
    ======================================== */

    .ux-reorder-item__content {
      flex: 1;
      min-width: 0;
    }

    /* ========================================
       Reorder Animations
    ======================================== */

    .ux-reorder-item--moving-up {
      animation: ux-reorder-move-up var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-reorder-item--moving-down {
      animation: ux-reorder-move-down var(--ux-transition-fast) var(--ux-ease);
    }

    @keyframes ux-reorder-move-up {
      from {
        transform: translateY(100%);
      }
      to {
        transform: translateY(0);
      }
    }

    @keyframes ux-reorder-move-down {
      from {
        transform: translateY(-100%);
      }
      to {
        transform: translateY(0);
      }
    }

    /* ========================================
       Reorder Group Variants
    ======================================== */

    /* Inset */
    .ux-reorder-group--inset {
      margin: var(--ux-space-lg);
      border-radius: var(--ux-border-radius-lg);
      overflow: hidden;
      background-color: var(--ux-surface);
    }

    .ux-reorder-group--inset .ux-reorder-item {
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-reorder-group--inset .ux-reorder-item:last-child {
      border-bottom: none;
    }

    /* Cards */
    .ux-reorder-group--cards .ux-reorder-item {
      margin-bottom: var(--ux-space-sm);
      border-radius: var(--ux-border-radius);
      box-shadow: var(--ux-shadow-sm);
    }

    .ux-reorder-group--cards .ux-reorder-item--dragging {
      box-shadow: var(--ux-shadow-xl);
    }

    /* ========================================
       Edit Mode Styles
    ======================================== */

    .ux-reorder-group--editing .ux-reorder-item {
      padding-left: 0;
    }

    .ux-reorder-group:not(.ux-reorder-group--editing) .ux-reorder-handle {
      display: none;
    }

    /* Show handles with animation */
    .ux-reorder-group--editing .ux-reorder-handle {
      animation: ux-reorder-handle-appear 0.3s var(--ux-ease);
    }

    @keyframes ux-reorder-handle-appear {
      from {
        opacity: 0;
        transform: translateX(-20px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    /* ========================================
       Horizontal Reorder
    ======================================== */

    .ux-reorder-group--horizontal {
      display: flex;
      flex-wrap: wrap;
      gap: var(--ux-space-sm);
    }

    .ux-reorder-group--horizontal .ux-reorder-item {
      flex: 0 0 auto;
    }

    .ux-reorder-group--horizontal .ux-reorder-indicator {
      width: 2px;
      height: auto;
      top: 0;
      bottom: 0;
    }

    .ux-reorder-group--horizontal .ux-reorder-indicator--left {
      left: -1px;
      right: auto;
    }

    .ux-reorder-group--horizontal .ux-reorder-indicator--right {
      right: -1px;
      left: auto;
    }

    /* ========================================
       Delete Button (iOS style)
    ======================================== */

    .ux-reorder-delete {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 0;
      height: 100%;
      background-color: var(--ux-danger);
      color: white;
      border: none;
      cursor: pointer;
      overflow: hidden;
      transition: width var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-reorder-group--editing .ux-reorder-delete {
      width: var(--ux-touch-target);
    }

    .ux-reorder-delete__icon {
      width: 20px;
      height: 20px;
    }

    .ux-reorder-delete__icon svg {
      width: 100%;
      height: 100%;
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-reorder-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-reorder-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for reorder group
  const reorderComponent = (config = {}) => ({
    items: config.items || [],
    editing: config.editing || false,
    disabled: config.disabled || false,
    draggingIndex: null,
    dragOverIndex: null,
    startY: 0,
    currentY: 0,

    get isEditing() {
      return this.editing;
    },

    toggleEdit() {
      this.editing = !this.editing;
    },

    startEdit() {
      this.editing = true;
    },

    endEdit() {
      this.editing = false;
    },

    handleDragStart(event, index) {
      if (this.disabled || !this.editing) return;

      this.draggingIndex = index;
      this.startY = event.type === 'touchstart'
        ? event.touches[0].clientY
        : event.clientY;

      // Set drag data for HTML5 drag
      if (event.dataTransfer) {
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/plain', index);
      }
    },

    handleDragOver(event, index) {
      if (this.draggingIndex === null || this.draggingIndex === index) return;

      event.preventDefault();
      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'move';
      }

      this.dragOverIndex = index;
    },

    handleDragEnd() {
      if (this.draggingIndex !== null && this.dragOverIndex !== null) {
        this.moveItem(this.draggingIndex, this.dragOverIndex);
      }

      this.draggingIndex = null;
      this.dragOverIndex = null;
    },

    handleTouchStart(event, index) {
      if (this.disabled || !this.editing) return;

      this.draggingIndex = index;
      this.startY = event.touches[0].clientY;
    },

    handleTouchMove(event, index) {
      if (this.draggingIndex === null) return;

      event.preventDefault();
      this.currentY = event.touches[0].clientY;

      // Find which item we're over
      const items = this.$refs.items?.children || [];
      for (let i = 0; i < items.length; i++) {
        const rect = items[i].getBoundingClientRect();
        if (this.currentY >= rect.top && this.currentY <= rect.bottom) {
          this.dragOverIndex = i;
          break;
        }
      }
    },

    handleTouchEnd() {
      this.handleDragEnd();
    },

    moveItem(fromIndex, toIndex) {
      if (fromIndex === toIndex) return;

      const item = this.items[fromIndex];
      this.items.splice(fromIndex, 1);
      this.items.splice(toIndex, 0, item);
    },

    removeItem(index) {
      this.items.splice(index, 1);
    },

    isDragging(index) {
      return this.draggingIndex === index;
    },

    isDragOver(index) {
      return this.dragOverIndex === index && this.draggingIndex !== index;
    },

    getItemStyle(index) {
      if (this.isDragging(index)) {
        const offset = this.currentY - this.startY;
        return {
          transform: `translateY(${offset}px)`,
          zIndex: 100
        };
      }
      return {};
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxReorder', reorderComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxReorder', reorderComponent);
    });
  }
})();
/**
 * UX Rating Component
 * Star rating component with 1-5 scale
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Rating
    ======================================== */

    .ux-rating {
      display: inline-flex;
      align-items: center;
      gap: var(--ux-space-xs);
    }

    .ux-rating__stars {
      display: inline-flex;
      align-items: center;
      gap: 2px;
    }

    .ux-rating__star {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      padding: 0;
      background: none;
      border: none;
      color: var(--ux-light-shade);
      cursor: pointer;
      transition:
        color var(--ux-transition-fast) var(--ux-ease),
        transform var(--ux-transition-fast) var(--ux-ease);
      -webkit-tap-highlight-color: transparent;
    }

    .ux-rating__star svg {
      width: 100%;
      height: 100%;
    }

    .ux-rating__star:hover {
      transform: scale(1.15);
    }

    .ux-rating__star:active {
      transform: scale(0.95);
    }

    .ux-rating__star--filled {
      color: var(--ux-warning);
    }

    .ux-rating__star--half {
      position: relative;
      color: var(--ux-light-shade);
    }

    .ux-rating__star--half::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 50%;
      height: 100%;
      overflow: hidden;
    }

    /* Readonly state */
    .ux-rating--readonly .ux-rating__star {
      cursor: default;
      pointer-events: none;
    }

    .ux-rating--readonly .ux-rating__star:hover {
      transform: none;
    }

    /* Disabled state */
    .ux-rating--disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    /* ========================================
       Sizes
    ======================================== */

    .ux-rating--sm .ux-rating__star {
      width: 18px;
      height: 18px;
    }

    .ux-rating--lg .ux-rating__star {
      width: 32px;
      height: 32px;
    }

    .ux-rating--xl .ux-rating__star {
      width: 40px;
      height: 40px;
    }

    /* ========================================
       Colors
    ======================================== */

    .ux-rating--primary .ux-rating__star--filled {
      color: var(--ux-primary);
    }

    .ux-rating--danger .ux-rating__star--filled {
      color: var(--ux-danger);
    }

    .ux-rating--success .ux-rating__star--filled {
      color: var(--ux-success);
    }

    /* ========================================
       Rating Value Display
    ======================================== */

    .ux-rating__value {
      font-size: var(--ux-font-size-md);
      font-weight: 600;
      color: var(--ux-text);
      margin-left: var(--ux-space-xs);
    }

    .ux-rating--sm .ux-rating__value {
      font-size: var(--ux-font-size-sm);
    }

    .ux-rating--lg .ux-rating__value {
      font-size: var(--ux-font-size-lg);
    }

    .ux-rating__count {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin-left: var(--ux-space-xs);
    }

    /* ========================================
       Hover Preview
    ======================================== */

    .ux-rating:not(.ux-rating--readonly):not(.ux-rating--disabled) .ux-rating__star--preview {
      color: var(--ux-warning);
      opacity: 0.7;
    }

    /* ========================================
       Compact Rating (inline display)
    ======================================== */

    .ux-rating--compact {
      gap: var(--ux-space-xs);
    }

    .ux-rating--compact .ux-rating__stars {
      gap: 0;
    }

    .ux-rating--compact .ux-rating__star {
      width: 16px;
      height: 16px;
    }

    /* ========================================
       Rating with Labels
    ======================================== */

    .ux-rating__label {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
    }

    .ux-rating__label--start {
      margin-right: var(--ux-space-sm);
    }

    .ux-rating__label--end {
      margin-left: var(--ux-space-sm);
    }

    /* ========================================
       Animation
    ======================================== */

    @keyframes ux-rating-pop {
      0% { transform: scale(1); }
      50% { transform: scale(1.3); }
      100% { transform: scale(1); }
    }

    .ux-rating__star--animate {
      animation: ux-rating-pop 0.3s var(--ux-ease);
    }
  `;

  // Star SVG paths
  const starFilled = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
  const starEmpty = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
  const starHalf = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><defs><linearGradient id="half"><stop offset="50%" stop-color="currentColor"/><stop offset="50%" stop-color="transparent"/></linearGradient></defs><path fill="url(#half)" stroke="currentColor" stroke-width="2" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-rating-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-rating-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for rating
  // ARIA: role="radiogroup" for interactive, aria-label for each star
  const ratingComponent = (config = {}) => ({
    value: config.value || 0,
    max: config.max || 5,
    readonly: config.readonly || false,
    disabled: config.disabled || false,
    allowHalf: config.allowHalf || false,
    showValue: config.showValue || false,
    hoverValue: 0,
    isHovering: false,
    ratingId: config.id || 'ux-rating-' + Math.random().toString(36).substr(2, 9),

    // ARIA attributes for the rating group
    get ariaAttrs() {
      return {
        'role': this.readonly ? 'img' : 'radiogroup',
        'aria-label': `Rating: ${this.value} out of ${this.max} stars`,
        'aria-valuenow': this.value,
        'aria-valuemin': 0,
        'aria-valuemax': this.max
      };
    },

    // ARIA attributes for each star
    getStarAriaAttrs(index) {
      const starValue = index + 1;
      return {
        'role': this.readonly ? 'presentation' : 'radio',
        'aria-checked': this.value >= starValue ? 'true' : 'false',
        'aria-label': `${starValue} star${starValue > 1 ? 's' : ''}`,
        'tabindex': this.readonly || this.disabled ? '-1' : (this.value === starValue ? '0' : '-1')
      };
    },

    // Get star SVG based on value
    getStarSvg(index) {
      const starValue = index + 1;
      const displayValue = this.isHovering && !this.readonly ? this.hoverValue : this.value;

      if (displayValue >= starValue) {
        return starFilled;
      } else if (this.allowHalf && displayValue >= starValue - 0.5) {
        return starHalf;
      }
      return starEmpty;
    },

    // Check if star is filled
    isStarFilled(index) {
      const starValue = index + 1;
      const displayValue = this.isHovering && !this.readonly ? this.hoverValue : this.value;
      return displayValue >= starValue;
    },

    // Check if star is half filled
    isStarHalf(index) {
      const starValue = index + 1;
      const displayValue = this.isHovering && !this.readonly ? this.hoverValue : this.value;
      return this.allowHalf && displayValue >= starValue - 0.5 && displayValue < starValue;
    },

    // Handle star click
    setRating(index, event) {
      if (this.readonly || this.disabled) return;

      let newValue = index + 1;

      // Support half stars on click
      if (this.allowHalf && event) {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        if (x < rect.width / 2) {
          newValue = index + 0.5;
        }
      }

      // Toggle off if clicking same value
      if (this.value === newValue) {
        this.value = 0;
      } else {
        this.value = newValue;
      }

      // Dispatch change event
      this.$dispatch('rating-change', { value: this.value });
    },

    // Handle hover
    onStarHover(index, event) {
      if (this.readonly || this.disabled) return;
      this.isHovering = true;

      let hoverVal = index + 1;

      if (this.allowHalf && event) {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        if (x < rect.width / 2) {
          hoverVal = index + 0.5;
        }
      }

      this.hoverValue = hoverVal;
    },

    // Handle mouse leave
    onMouseLeave() {
      this.isHovering = false;
      this.hoverValue = 0;
    },

    // Handle keyboard navigation
    handleKeydown(event, index) {
      if (this.readonly || this.disabled) return;

      let newValue = this.value;

      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowUp':
          event.preventDefault();
          newValue = Math.min(this.max, this.value + (this.allowHalf ? 0.5 : 1));
          break;
        case 'ArrowLeft':
        case 'ArrowDown':
          event.preventDefault();
          newValue = Math.max(0, this.value - (this.allowHalf ? 0.5 : 1));
          break;
        case 'Home':
          event.preventDefault();
          newValue = 0;
          break;
        case 'End':
          event.preventDefault();
          newValue = this.max;
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          this.setRating(index, null);
          return;
      }

      if (newValue !== this.value) {
        this.value = newValue;
        this.$dispatch('rating-change', { value: this.value });
      }
    },

    // Get array of star indices
    get stars() {
      return Array.from({ length: this.max }, (_, i) => i);
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxRating', ratingComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxRating', ratingComponent);
    });
  }
})();
/**
 * UX DataTable Component
 * Responsive data table with standard and "no more tables" mobile views
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX DataTable Container
    ======================================== */

    .ux-datatable {
      display: flex;
      flex-direction: column;
      width: 100%;
      background-color: var(--ux-surface);
      border-radius: var(--ux-border-radius-lg);
      overflow: hidden;
    }

    .ux-datatable--inset {
      margin: var(--ux-space-lg);
    }

    .ux-datatable--bordered {
      border: 1px solid var(--ux-border-color);
    }

    /* ========================================
       DataTable Header (Title & Actions)
    ======================================== */

    .ux-datatable__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--ux-space-md) var(--ux-space-lg);
      background-color: var(--ux-surface);
      border-bottom: 1px solid var(--ux-border-color);
      flex-shrink: 0;
    }

    .ux-datatable__title {
      font-size: var(--ux-font-size-lg);
      font-weight: 600;
      color: var(--ux-text);
      margin: 0;
    }

    .ux-datatable__subtitle {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin-top: 2px;
    }

    .ux-datatable__actions {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
    }

    /* ========================================
       DataTable Toolbar (Filters & Search)
    ======================================== */

    .ux-datatable__toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--ux-space-md);
      padding: var(--ux-space-sm) var(--ux-space-lg);
      background-color: var(--ux-surface-secondary);
      border-bottom: 1px solid var(--ux-border-color);
      flex-shrink: 0;
      flex-wrap: wrap;
    }

    .ux-datatable__toolbar-start {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
    }

    .ux-datatable__toolbar-end {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
    }

    .ux-datatable__search {
      min-width: 200px;
    }

    @media (max-width: 767px) {
      .ux-datatable__toolbar {
        flex-direction: column;
        align-items: stretch;
      }

      .ux-datatable__search {
        width: 100%;
      }
    }

    /* ========================================
       DataTable Body (Scrollable Content)
    ======================================== */

    .ux-datatable__body {
      flex: 1;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }

    .ux-datatable__body--fixed-height {
      max-height: 400px;
    }

    /* ========================================
       Standard Table View
    ======================================== */

    .ux-datatable__table {
      width: 100%;
      border-collapse: collapse;
      table-layout: auto;
    }

    .ux-datatable__table--fixed {
      table-layout: fixed;
    }

    /* Table Head */
    .ux-datatable__thead {
      position: sticky;
      top: 0;
      z-index: 10;
      background-color: var(--ux-surface-secondary);
    }

    .ux-datatable__th {
      padding: var(--ux-space-md) var(--ux-space-lg);
      text-align: left;
      font-size: var(--ux-font-size-sm);
      font-weight: 600;
      color: var(--ux-text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      white-space: nowrap;
      border-bottom: 2px solid var(--ux-border-color);
      background-color: var(--ux-surface-secondary);
    }

    .ux-datatable__th--sortable {
      cursor: pointer;
      user-select: none;
      transition: color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-datatable__th--sortable:hover {
      color: var(--ux-primary);
    }

    .ux-datatable__th--sorted {
      color: var(--ux-primary);
    }

    .ux-datatable__sort-icon {
      display: inline-flex;
      margin-left: var(--ux-space-xs);
      opacity: 0.5;
      transition: transform var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-datatable__th--sorted .ux-datatable__sort-icon {
      opacity: 1;
    }

    .ux-datatable__th--sorted-desc .ux-datatable__sort-icon {
      transform: rotate(180deg);
    }

    /* Alignment */
    .ux-datatable__th--center,
    .ux-datatable__td--center {
      text-align: center;
    }

    .ux-datatable__th--right,
    .ux-datatable__td--right {
      text-align: right;
    }

    /* Table Body */
    .ux-datatable__tbody {
      background-color: var(--ux-surface);
    }

    .ux-datatable__tr {
      transition: background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-datatable__tr:hover {
      background-color: rgba(var(--ux-primary-rgb), 0.05);
    }

    .ux-datatable__tr--selected {
      background-color: rgba(var(--ux-primary-rgb), 0.1);
    }

    .ux-datatable__tr--clickable {
      cursor: pointer;
    }

    .ux-datatable__td {
      padding: var(--ux-space-md) var(--ux-space-lg);
      font-size: var(--ux-font-size-md);
      color: var(--ux-text);
      border-bottom: 1px solid var(--ux-border-color);
      vertical-align: middle;
    }

    .ux-datatable__tr:last-child .ux-datatable__td {
      border-bottom: none;
    }

    /* Cell content truncation */
    .ux-datatable__td--truncate {
      max-width: 200px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* Cell with badge/chip */
    .ux-datatable__td .ux-badge,
    .ux-datatable__td .ux-chip {
      vertical-align: middle;
    }

    /* ========================================
       Checkbox Column
    ======================================== */

    .ux-datatable__th--checkbox,
    .ux-datatable__td--checkbox {
      width: 48px;
      padding-left: var(--ux-space-md);
      padding-right: var(--ux-space-sm);
    }

    /* ========================================
       Actions Column
    ======================================== */

    .ux-datatable__th--actions,
    .ux-datatable__td--actions {
      width: 80px;
      text-align: center;
    }

    .ux-datatable__row-actions {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--ux-space-xs);
    }

    .ux-datatable__row-action {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      padding: 0;
      background: none;
      border: none;
      border-radius: var(--ux-border-radius);
      color: var(--ux-text-secondary);
      cursor: pointer;
      transition:
        background-color var(--ux-transition-fast) var(--ux-ease),
        color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-datatable__row-action:hover {
      background-color: var(--ux-surface-secondary);
      color: var(--ux-text);
    }

    .ux-datatable__row-action--danger:hover {
      background-color: rgba(var(--ux-danger-rgb, 255, 59, 48), 0.1);
      color: var(--ux-danger);
    }

    .ux-datatable__row-action svg {
      width: 18px;
      height: 18px;
    }

    /* ========================================
       Empty State
    ======================================== */

    .ux-datatable__empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: var(--ux-space-2xl) var(--ux-space-lg);
      text-align: center;
    }

    .ux-datatable__empty-icon {
      width: 64px;
      height: 64px;
      margin-bottom: var(--ux-space-md);
      color: var(--ux-text-tertiary);
    }

    .ux-datatable__empty-title {
      font-size: var(--ux-font-size-lg);
      font-weight: 600;
      color: var(--ux-text);
      margin: 0 0 var(--ux-space-xs);
    }

    .ux-datatable__empty-text {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin: 0;
    }

    /* ========================================
       Loading State
    ======================================== */

    .ux-datatable__loading {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--ux-space-2xl);
    }

    .ux-datatable--loading .ux-datatable__tbody {
      opacity: 0.5;
      pointer-events: none;
    }

    /* ========================================
       DataTable Footer (Pagination)
    ======================================== */

    .ux-datatable__footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--ux-space-md) var(--ux-space-lg);
      background-color: var(--ux-surface);
      border-top: 1px solid var(--ux-border-color);
      flex-shrink: 0;
      flex-wrap: wrap;
      gap: var(--ux-space-md);
    }

    .ux-datatable__info {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
    }

    .ux-datatable__pagination {
      display: flex;
      align-items: center;
      gap: var(--ux-space-xs);
    }

    .ux-datatable__page-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 36px;
      height: 36px;
      padding: 0 var(--ux-space-sm);
      background: none;
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius);
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text);
      cursor: pointer;
      transition:
        background-color var(--ux-transition-fast) var(--ux-ease),
        border-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-datatable__page-btn:hover:not(:disabled) {
      background-color: var(--ux-surface-secondary);
      border-color: var(--ux-primary);
    }

    .ux-datatable__page-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .ux-datatable__page-btn--active {
      background-color: var(--ux-primary);
      border-color: var(--ux-primary);
      color: var(--ux-primary-contrast);
    }

    .ux-datatable__page-btn--active:hover:not(:disabled) {
      background-color: var(--ux-primary-shade);
      border-color: var(--ux-primary-shade);
    }

    .ux-datatable__page-btn svg {
      width: 16px;
      height: 16px;
    }

    .ux-datatable__per-page {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
    }

    .ux-datatable__per-page select {
      padding: var(--ux-space-xs) var(--ux-space-sm);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius);
      background-color: var(--ux-surface);
      color: var(--ux-text);
      font-size: var(--ux-font-size-sm);
    }

    @media (max-width: 767px) {
      .ux-datatable__footer {
        flex-direction: column;
        align-items: center;
      }
    }

    /* ========================================
       View Toggle Buttons
    ======================================== */

    .ux-datatable__view-toggle {
      display: inline-flex;
      align-items: center;
      background-color: var(--ux-surface-secondary);
      border-radius: var(--ux-border-radius);
      padding: 2px;
      gap: 2px;
    }

    .ux-datatable__view-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      padding: 0;
      background: none;
      border: none;
      border-radius: calc(var(--ux-border-radius) - 2px);
      color: var(--ux-text-tertiary);
      cursor: pointer;
      transition:
        background-color var(--ux-transition-fast) var(--ux-ease),
        color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-datatable__view-btn:hover {
      color: var(--ux-text);
    }

    .ux-datatable__view-btn--active {
      background-color: var(--ux-surface);
      color: var(--ux-primary);
      box-shadow: var(--ux-shadow-sm);
    }

    .ux-datatable__view-btn svg {
      width: 18px;
      height: 18px;
    }

    /* ========================================
       Responsive "No More Tables" View
    ======================================== */

    @media (max-width: 767px) {
      .ux-datatable--responsive .ux-datatable__table,
      .ux-datatable--responsive .ux-datatable__thead,
      .ux-datatable--responsive .ux-datatable__tbody,
      .ux-datatable--responsive .ux-datatable__th,
      .ux-datatable--responsive .ux-datatable__tr,
      .ux-datatable--responsive .ux-datatable__td {
        display: block;
      }

      .ux-datatable--responsive .ux-datatable__thead {
        position: absolute;
        top: -9999px;
        left: -9999px;
        visibility: hidden;
      }

      .ux-datatable--responsive .ux-datatable__tr {
        margin-bottom: var(--ux-space-md);
        background-color: var(--ux-surface);
        border-radius: var(--ux-border-radius-lg);
        border: 1px solid var(--ux-border-color);
        overflow: hidden;
      }

      .ux-datatable--responsive .ux-datatable__tr:last-child {
        margin-bottom: 0;
      }

      .ux-datatable--responsive .ux-datatable__td {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--ux-space-md) var(--ux-space-lg);
        text-align: right;
        border-bottom: 1px solid var(--ux-border-color);
      }

      .ux-datatable--responsive .ux-datatable__tr .ux-datatable__td:last-child {
        border-bottom: none;
      }

      .ux-datatable--responsive .ux-datatable__td::before {
        content: attr(data-label);
        flex: 1;
        font-weight: 600;
        font-size: var(--ux-font-size-sm);
        color: var(--ux-text-secondary);
        text-align: left;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        padding-right: var(--ux-space-md);
      }

      .ux-datatable--responsive .ux-datatable__td--checkbox,
      .ux-datatable--responsive .ux-datatable__td--actions {
        justify-content: flex-end;
      }

      .ux-datatable--responsive .ux-datatable__td--checkbox::before,
      .ux-datatable--responsive .ux-datatable__td--actions::before {
        content: none;
      }

      /* Card header style for first cell */
      .ux-datatable--responsive .ux-datatable__td--primary {
        background-color: var(--ux-surface-secondary);
        font-weight: 600;
      }

      .ux-datatable--responsive .ux-datatable__td--primary::before {
        display: none;
      }

      .ux-datatable--responsive .ux-datatable__td--primary {
        justify-content: flex-start;
        text-align: left;
      }
    }

    /* Force responsive view */
    .ux-datatable--force-responsive .ux-datatable__table,
    .ux-datatable--force-responsive .ux-datatable__thead,
    .ux-datatable--force-responsive .ux-datatable__tbody,
    .ux-datatable--force-responsive .ux-datatable__th,
    .ux-datatable--force-responsive .ux-datatable__tr,
    .ux-datatable--force-responsive .ux-datatable__td {
      display: block;
    }

    .ux-datatable--force-responsive .ux-datatable__thead {
      position: absolute;
      top: -9999px;
      left: -9999px;
      visibility: hidden;
    }

    .ux-datatable--force-responsive .ux-datatable__tr {
      margin-bottom: var(--ux-space-md);
      background-color: var(--ux-surface);
      border-radius: var(--ux-border-radius-lg);
      border: 1px solid var(--ux-border-color);
      overflow: hidden;
    }

    .ux-datatable--force-responsive .ux-datatable__td {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--ux-space-md) var(--ux-space-lg);
      text-align: right;
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-datatable--force-responsive .ux-datatable__tr .ux-datatable__td:last-child {
      border-bottom: none;
    }

    .ux-datatable--force-responsive .ux-datatable__td::before {
      content: attr(data-label);
      flex: 1;
      font-weight: 600;
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      text-align: left;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding-right: var(--ux-space-md);
    }

    /* ========================================
       Striped Rows
    ======================================== */

    .ux-datatable--striped .ux-datatable__tr:nth-child(even) {
      background-color: var(--ux-surface-secondary);
    }

    /* ========================================
       Compact Size
    ======================================== */

    .ux-datatable--compact .ux-datatable__th,
    .ux-datatable--compact .ux-datatable__td {
      padding: var(--ux-space-sm) var(--ux-space-md);
      font-size: var(--ux-font-size-sm);
    }

    /* ========================================
       DataTable Sizes
    ======================================== */

    .ux-datatable--sm .ux-datatable__th,
    .ux-datatable--sm .ux-datatable__td {
      padding: var(--ux-space-xs) var(--ux-space-sm);
      font-size: var(--ux-font-size-sm);
    }

    .ux-datatable--lg .ux-datatable__th,
    .ux-datatable--lg .ux-datatable__td {
      padding: var(--ux-space-lg) var(--ux-space-xl);
    }
  `;

  // Icons
  const icons = {
    sortAsc: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12l7-7 7 7"/></svg>',
    sortDesc: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>',
    chevronLeft: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>',
    chevronRight: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>',
    chevronsLeft: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 17l-5-5 5-5M18 17l-5-5 5-5"/></svg>',
    chevronsRight: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 7l5 5-5 5M6 7l5 5-5 5"/></svg>',
    empty: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>',
    edit: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
    delete: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>',
    view: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
    // View toggle icons
    viewTable: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg>',
    viewCards: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
    viewList: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="4" rx="1"/><rect x="3" y="10" width="18" height="4" rx="1"/><rect x="3" y="16" width="18" height="4" rx="1"/></svg>'
  };

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-datatable-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-datatable-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for datatable
  // ARIA: role="table", role="rowgroup", role="row", role="columnheader", role="cell"
  const datatableComponent = (config = {}) => ({
    // Data
    columns: config.columns || [],
    rows: config.rows || [],

    // Selection
    selectable: config.selectable || false,
    selectedRows: [],
    selectAll: false,

    // Sorting
    sortable: config.sortable !== false,
    sortColumn: config.sortColumn || null,
    sortDirection: config.sortDirection || 'asc',

    // Pagination
    paginated: config.paginated !== false,
    currentPage: 1,
    perPage: config.perPage || 10,
    perPageOptions: config.perPageOptions || [10, 25, 50, 100],

    // Search
    searchable: config.searchable !== false,
    searchQuery: '',
    searchPlaceholder: config.searchPlaceholder || 'Search...',

    // Responsive
    responsive: config.responsive !== false,
    forceResponsive: config.forceResponsive || false,

    // View mode (table, cards)
    viewMode: config.viewMode || 'table',
    showViewToggle: config.showViewToggle || false,

    // Loading
    loading: config.loading || false,

    // Empty state
    emptyTitle: config.emptyTitle || 'No data',
    emptyText: config.emptyText || 'There are no records to display.',

    // Labels (for i18n)
    labels: {
      showing: config.labels?.showing || 'Showing',
      to: config.labels?.to || 'to',
      of: config.labels?.of || 'of',
      entries: config.labels?.entries || 'entries',
      perPage: config.labels?.perPage || 'per page',
      noResults: config.labels?.noResults || 'No results found',
      viewTable: config.labels?.viewTable || 'Table view',
      viewCards: config.labels?.viewCards || 'Cards view',
      ...config.labels
    },

    // Component ID
    tableId: config.id || 'ux-datatable-' + Math.random().toString(36).substr(2, 9),

    // ARIA attributes
    get ariaAttrs() {
      return {
        'role': 'table',
        'aria-label': config.ariaLabel || 'Data table',
        'aria-busy': this.loading ? 'true' : 'false'
      };
    },

    // Initialize
    init() {
      // Watch for external data changes
      if (config.watchData) {
        this.$watch('rows', () => {
          this.currentPage = 1;
          this.selectedRows = [];
          this.selectAll = false;
        });
      }
    },

    // Computed: Filtered rows (search)
    get filteredRows() {
      if (!this.searchQuery.trim()) {
        return this.rows;
      }

      const query = this.searchQuery.toLowerCase().trim();
      return this.rows.filter(row => {
        return this.columns.some(col => {
          const value = this.getCellValue(row, col);
          if (value === null || value === undefined) return false;
          return String(value).toLowerCase().includes(query);
        });
      });
    },

    // Computed: Sorted rows
    get sortedRows() {
      if (!this.sortColumn) {
        return this.filteredRows;
      }

      const col = this.columns.find(c => c.key === this.sortColumn);
      if (!col) return this.filteredRows;

      return [...this.filteredRows].sort((a, b) => {
        let valA = this.getCellValue(a, col);
        let valB = this.getCellValue(b, col);

        // Handle nulls
        if (valA === null || valA === undefined) valA = '';
        if (valB === null || valB === undefined) valB = '';

        // Numeric sort
        if (col.type === 'number') {
          valA = parseFloat(valA) || 0;
          valB = parseFloat(valB) || 0;
        }
        // Date sort
        else if (col.type === 'date') {
          valA = new Date(valA).getTime() || 0;
          valB = new Date(valB).getTime() || 0;
        }
        // String sort
        else {
          valA = String(valA).toLowerCase();
          valB = String(valB).toLowerCase();
        }

        let result = 0;
        if (valA < valB) result = -1;
        if (valA > valB) result = 1;

        return this.sortDirection === 'desc' ? -result : result;
      });
    },

    // Computed: Paginated rows
    get paginatedRows() {
      if (!this.paginated) {
        return this.sortedRows;
      }

      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.sortedRows.slice(start, end);
    },

    // Computed: Total pages
    get totalPages() {
      return Math.ceil(this.sortedRows.length / this.perPage);
    },

    // Computed: Visible page numbers
    get visiblePages() {
      const pages = [];
      const total = this.totalPages;
      const current = this.currentPage;
      const delta = 2;

      for (let i = 1; i <= total; i++) {
        if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
          pages.push(i);
        } else if (pages[pages.length - 1] !== '...') {
          pages.push('...');
        }
      }

      return pages;
    },

    // Computed: Showing info text
    get showingInfo() {
      const total = this.sortedRows.length;
      if (total === 0) return '';

      const start = (this.currentPage - 1) * this.perPage + 1;
      const end = Math.min(this.currentPage * this.perPage, total);

      return `${this.labels.showing} ${start} ${this.labels.to} ${end} ${this.labels.of} ${total} ${this.labels.entries}`;
    },

    // Get cell value
    getCellValue(row, col) {
      if (col.getValue) {
        return col.getValue(row);
      }

      // Support nested keys like "user.name"
      const keys = col.key.split('.');
      let value = row;
      for (const key of keys) {
        value = value?.[key];
      }
      return value;
    },

    // Format cell value
    formatCellValue(row, col) {
      const value = this.getCellValue(row, col);

      if (col.format) {
        return col.format(value, row);
      }

      if (value === null || value === undefined) {
        return col.defaultValue || '-';
      }

      return value;
    },

    // Sort by column
    sortBy(column) {
      if (!this.sortable || !column.sortable) return;

      if (this.sortColumn === column.key) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortColumn = column.key;
        this.sortDirection = 'asc';
      }

      this.$dispatch('sort-change', {
        column: this.sortColumn,
        direction: this.sortDirection
      });
    },

    // Check if column is sorted
    isSorted(column) {
      return this.sortColumn === column.key;
    },

    // Go to page
    goToPage(page) {
      if (page < 1 || page > this.totalPages) return;
      this.currentPage = page;
      this.$dispatch('page-change', { page: this.currentPage });
    },

    // Change per page
    changePerPage(value) {
      this.perPage = parseInt(value);
      this.currentPage = 1;
      this.$dispatch('per-page-change', { perPage: this.perPage });
    },

    // Search
    onSearch() {
      this.currentPage = 1;
      this.$dispatch('search', { query: this.searchQuery });
    },

    // View mode
    setViewMode(mode) {
      this.viewMode = mode;
      this.$dispatch('view-mode-change', { mode });
    },

    get viewModeClass() {
      if (this.viewMode === 'cards') {
        return 'ux-datatable--force-responsive';
      }
      return this.responsive ? 'ux-datatable--responsive' : '';
    },

    // Selection
    toggleSelectAll() {
      if (this.selectAll) {
        this.selectedRows = this.paginatedRows.map(row => this.getRowId(row));
      } else {
        this.selectedRows = [];
      }
      this.$dispatch('selection-change', { selected: this.selectedRows });
    },

    toggleRowSelection(row) {
      const rowId = this.getRowId(row);
      const index = this.selectedRows.indexOf(rowId);

      if (index > -1) {
        this.selectedRows.splice(index, 1);
      } else {
        this.selectedRows.push(rowId);
      }

      this.selectAll = this.selectedRows.length === this.paginatedRows.length;
      this.$dispatch('selection-change', { selected: this.selectedRows });
    },

    isRowSelected(row) {
      return this.selectedRows.includes(this.getRowId(row));
    },

    getRowId(row) {
      return row.id || row._id || JSON.stringify(row);
    },

    // Row click
    onRowClick(row, event) {
      this.$dispatch('row-click', { row, event });
    },

    // Actions
    onAction(action, row, event) {
      event.stopPropagation();
      this.$dispatch('row-action', { action, row, event });
    },

    // Get icons
    getIcon(name) {
      return icons[name] || '';
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxDatatable', datatableComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxDatatable', datatableComponent);
    });
  }
})();
/**
 * UX Swipe Directives
 * Directivas Alpine para gestos táctiles
 * @requires Alpine.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       Swipe Action Container
    ======================================== */

    .ux-swipe-container {
      position: relative;
      overflow: hidden;
      touch-action: pan-y;
    }

    .ux-swipe-content {
      position: relative;
      transition: transform var(--ux-transition-base) var(--ux-ease);
      will-change: transform;
      background-color: var(--ux-surface);
    }

    .ux-swipe-content--swiping {
      transition: none;
    }

    /* ========================================
       Swipe Actions
    ======================================== */

    .ux-swipe-actions {
      position: absolute;
      top: 0;
      bottom: 0;
      display: flex;
      align-items: stretch;
    }

    .ux-swipe-actions--start {
      left: 0;
      transform: translateX(-100%);
    }

    .ux-swipe-actions--end {
      right: 0;
      transform: translateX(100%);
    }

    .ux-swipe-action {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 80px;
      padding: 0 var(--ux-space-lg);
      color: white;
      font-weight: 500;
      cursor: pointer;
      transition: background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-swipe-action--delete {
      background-color: var(--ux-danger);
    }

    .ux-swipe-action--archive {
      background-color: var(--ux-warning);
    }

    .ux-swipe-action--pin {
      background-color: var(--ux-primary);
    }

    .ux-swipe-action--more {
      background-color: var(--ux-medium);
    }

    .ux-swipe-action__icon {
      width: 24px;
      height: 24px;
    }

    .ux-swipe-action__icon svg {
      width: 100%;
      height: 100%;
    }

    /* ========================================
       Drag Handle
    ======================================== */

    .ux-drag-handle {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--ux-space-md);
      color: var(--ux-text-tertiary);
      cursor: grab;
      touch-action: none;
      -webkit-tap-highlight-color: transparent;
    }

    .ux-drag-handle:active {
      cursor: grabbing;
    }

    .ux-drag-handle__icon {
      width: 20px;
      height: 20px;
    }

    /* ========================================
       Draggable Item
    ======================================== */

    .ux-draggable {
      touch-action: none;
      user-select: none;
      -webkit-user-select: none;
    }

    .ux-draggable--dragging {
      z-index: 100;
      opacity: 0.8;
      box-shadow: var(--ux-shadow-xl);
    }

    .ux-draggable--over {
      background-color: var(--ux-primary-tint);
    }

    /* ========================================
       Drop Zone
    ======================================== */

    .ux-drop-zone {
      transition:
        background-color var(--ux-transition-fast) var(--ux-ease),
        border-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-drop-zone--active {
      background-color: var(--ux-primary-tint);
      border-color: var(--ux-primary);
    }

    /* ========================================
       Pull to Refresh Indicator
    ======================================== */

    .ux-pull-indicator {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 60px;
      transform: translateY(-100%);
      pointer-events: none;
      z-index: 10;
    }

    .ux-pull-indicator__spinner {
      width: 24px;
      height: 24px;
      border: 2px solid var(--ux-light);
      border-top-color: var(--ux-primary);
      border-radius: 50%;
    }

    .ux-pull-indicator--refreshing .ux-pull-indicator__spinner {
      animation: ux-spin 0.8s linear infinite;
    }

    @keyframes ux-spin {
      to {
        transform: rotate(360deg);
      }
    }

    /* ========================================
       Long Press Indicator
    ======================================== */

    .ux-long-press-indicator {
      position: absolute;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: rgba(var(--ux-primary-rgb), 0.2);
      transform: scale(0);
      pointer-events: none;
    }

    .ux-long-press-indicator--active {
      animation: ux-long-press-pulse 0.5s ease-out;
    }

    @keyframes ux-long-press-pulse {
      0% {
        transform: scale(0);
        opacity: 1;
      }
      100% {
        transform: scale(2);
        opacity: 0;
      }
    }

    /* ========================================
       Gesture Feedback
    ======================================== */

    .ux-gesture-feedback {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: var(--ux-space-lg) var(--ux-space-xl);
      background-color: rgba(0, 0, 0, 0.8);
      color: white;
      border-radius: var(--ux-border-radius-lg);
      font-size: var(--ux-font-size-lg);
      font-weight: 500;
      opacity: 0;
      pointer-events: none;
      transition: opacity var(--ux-transition-fast) var(--ux-ease);
      z-index: 10000;
    }

    .ux-gesture-feedback--visible {
      opacity: 1;
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-swipe-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-swipe-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Helper functions
  const getPointerPosition = (event) => {
    if (event.touches && event.touches.length > 0) {
      return { x: event.touches[0].clientX, y: event.touches[0].clientY };
    }
    return { x: event.clientX, y: event.clientY };
  };

  const getDistance = (start, end) => {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const getAngle = (start, end) => {
    return Math.atan2(end.y - start.y, end.x - start.x) * 180 / Math.PI;
  };

  const getDirection = (angle) => {
    if (angle >= -45 && angle < 45) return 'right';
    if (angle >= 45 && angle < 135) return 'down';
    if (angle >= -135 && angle < -45) return 'up';
    return 'left';
  };

  // Register Alpine directives when Alpine is available
  const registerDirectives = () => {
    if (typeof Alpine === 'undefined') {
      document.addEventListener('alpine:init', registerDirectives);
      return;
    }

    // ========================================
    // x-swipe directive
    // Usage: x-swipe.left="handler" x-swipe.right="handler"
    // ========================================
    Alpine.directive('swipe', (el, { modifiers, expression }, { evaluate, cleanup }) => {
      const threshold = 50;
      const velocityThreshold = 0.3;
      let startPos = null;
      let startTime = null;
      let isSwiping = false;

      const handleStart = (event) => {
        startPos = getPointerPosition(event);
        startTime = Date.now();
        isSwiping = true;
      };

      const handleMove = (event) => {
        if (!isSwiping || !startPos) return;

        const currentPos = getPointerPosition(event);
        const dx = Math.abs(currentPos.x - startPos.x);
        const dy = Math.abs(currentPos.y - startPos.y);

        // If horizontal movement is greater, prevent vertical scrolling
        if (dx > dy && dx > 10) {
          event.preventDefault();
        }
      };

      const handleEnd = (event) => {
        if (!isSwiping || !startPos) return;

        const endPos = getPointerPosition(event.changedTouches ? event.changedTouches[0] : event);
        const distance = getDistance(startPos, endPos);
        const angle = getAngle(startPos, endPos);
        const direction = getDirection(angle);
        const duration = Date.now() - startTime;
        const velocity = distance / duration;

        if (distance >= threshold || velocity >= velocityThreshold) {
          const directionModifiers = ['left', 'right', 'up', 'down'];
          const targetDirection = modifiers.find(m => directionModifiers.includes(m));

          if (!targetDirection || targetDirection === direction) {
            const handler = evaluate(expression);
            if (typeof handler === 'function') {
              handler({
                direction,
                distance,
                velocity,
                angle,
                startPos,
                endPos
              });
            }
          }
        }

        startPos = null;
        startTime = null;
        isSwiping = false;
      };

      el.addEventListener('touchstart', handleStart, { passive: true });
      el.addEventListener('touchmove', handleMove, { passive: false });
      el.addEventListener('touchend', handleEnd, { passive: true });
      el.addEventListener('mousedown', handleStart);
      el.addEventListener('mousemove', handleMove);
      el.addEventListener('mouseup', handleEnd);

      cleanup(() => {
        el.removeEventListener('touchstart', handleStart);
        el.removeEventListener('touchmove', handleMove);
        el.removeEventListener('touchend', handleEnd);
        el.removeEventListener('mousedown', handleStart);
        el.removeEventListener('mousemove', handleMove);
        el.removeEventListener('mouseup', handleEnd);
      });
    });

    // ========================================
    // x-drag directive
    // Usage: x-drag="handleDrag" x-drag.handle=".handle-selector"
    // ========================================
    Alpine.directive('drag', (el, { modifiers, expression }, { evaluate, cleanup }) => {
      let isDragging = false;
      let startPos = null;
      let currentPos = null;
      let offset = { x: 0, y: 0 };
      let dragElement = el;

      // Check for handle modifier
      const handleSelector = modifiers.find(m => m.startsWith('handle:'))?.slice(7);
      const handle = handleSelector ? el.querySelector(handleSelector) : el;

      if (!handle) return;

      const handleStart = (event) => {
        // Check if started on handle
        if (handleSelector && !event.target.closest(handleSelector)) return;

        event.preventDefault();
        isDragging = true;
        startPos = getPointerPosition(event);
        currentPos = { ...startPos };

        const rect = dragElement.getBoundingClientRect();
        offset = {
          x: startPos.x - rect.left,
          y: startPos.y - rect.top
        };

        dragElement.classList.add('ux-draggable--dragging');

        const handler = evaluate(expression);
        if (typeof handler === 'function') {
          handler({ type: 'start', startPos, offset, element: dragElement });
        }
      };

      const handleMove = (event) => {
        if (!isDragging) return;

        event.preventDefault();
        currentPos = getPointerPosition(event);

        const dx = currentPos.x - startPos.x;
        const dy = currentPos.y - startPos.y;

        const handler = evaluate(expression);
        if (typeof handler === 'function') {
          handler({
            type: 'move',
            startPos,
            currentPos,
            delta: { x: dx, y: dy },
            offset,
            element: dragElement
          });
        }
      };

      const handleEnd = (event) => {
        if (!isDragging) return;

        isDragging = false;
        dragElement.classList.remove('ux-draggable--dragging');

        const endPos = getPointerPosition(event.changedTouches ? event.changedTouches[0] : event);

        const handler = evaluate(expression);
        if (typeof handler === 'function') {
          handler({
            type: 'end',
            startPos,
            endPos,
            delta: { x: endPos.x - startPos.x, y: endPos.y - startPos.y },
            element: dragElement
          });
        }

        startPos = null;
        currentPos = null;
      };

      handle.addEventListener('touchstart', handleStart, { passive: false });
      document.addEventListener('touchmove', handleMove, { passive: false });
      document.addEventListener('touchend', handleEnd, { passive: true });
      handle.addEventListener('mousedown', handleStart);
      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', handleEnd);

      cleanup(() => {
        handle.removeEventListener('touchstart', handleStart);
        document.removeEventListener('touchmove', handleMove);
        document.removeEventListener('touchend', handleEnd);
        handle.removeEventListener('mousedown', handleStart);
        document.removeEventListener('mousemove', handleMove);
        document.removeEventListener('mouseup', handleEnd);
      });
    });

    // ========================================
    // x-pull-refresh directive
    // Usage: x-pull-refresh="handleRefresh"
    // ========================================
    Alpine.directive('pull-refresh', (el, { expression }, { evaluate, cleanup }) => {
      const threshold = 80;
      const maxPull = 120;
      const resistance = 0.5;

      let startY = 0;
      let pullDistance = 0;
      let isPulling = false;
      let isRefreshing = false;

      // Create indicator element
      const indicator = document.createElement('div');
      indicator.className = 'ux-pull-indicator';
      indicator.innerHTML = '<div class="ux-pull-indicator__spinner"></div>';
      el.style.position = 'relative';
      el.insertBefore(indicator, el.firstChild);

      // Content wrapper
      let content = el.querySelector('.ux-pull-content');
      if (!content) {
        content = document.createElement('div');
        content.className = 'ux-pull-content';
        while (el.children.length > 1) {
          content.appendChild(el.children[1]);
        }
        el.appendChild(content);
      }

      const handleStart = (event) => {
        if (isRefreshing) return;
        if (el.scrollTop > 0) return;

        startY = event.touches[0].clientY;
        isPulling = true;
      };

      const handleMove = (event) => {
        if (!isPulling || isRefreshing) return;

        const currentY = event.touches[0].clientY;
        const diff = currentY - startY;

        if (diff > 0 && el.scrollTop <= 0) {
          event.preventDefault();
          pullDistance = Math.min(maxPull, diff * resistance);

          content.style.transform = `translateY(${pullDistance}px)`;
          indicator.style.transform = `translateY(${pullDistance - 60}px)`;

          // Update spinner based on progress
          const progress = Math.min(1, pullDistance / threshold);
          indicator.querySelector('.ux-pull-indicator__spinner').style.transform = `rotate(${progress * 360}deg)`;
        }
      };

      const handleEnd = async () => {
        if (!isPulling) return;

        isPulling = false;

        if (pullDistance >= threshold) {
          isRefreshing = true;
          indicator.classList.add('ux-pull-indicator--refreshing');

          content.style.transition = 'transform 0.3s ease';
          content.style.transform = 'translateY(60px)';
          indicator.style.transition = 'transform 0.3s ease';
          indicator.style.transform = 'translateY(0)';

          try {
            const handler = evaluate(expression);
            if (typeof handler === 'function') {
              await handler();
            }
          } finally {
            // Reset
            isRefreshing = false;
            indicator.classList.remove('ux-pull-indicator--refreshing');
            content.style.transform = 'translateY(0)';
            indicator.style.transform = 'translateY(-100%)';

            setTimeout(() => {
              content.style.transition = '';
              indicator.style.transition = '';
            }, 300);
          }
        } else {
          content.style.transition = 'transform 0.3s ease';
          content.style.transform = 'translateY(0)';
          indicator.style.transition = 'transform 0.3s ease';
          indicator.style.transform = 'translateY(-100%)';

          setTimeout(() => {
            content.style.transition = '';
            indicator.style.transition = '';
          }, 300);
        }

        pullDistance = 0;
        startY = 0;
      };

      el.addEventListener('touchstart', handleStart, { passive: true });
      el.addEventListener('touchmove', handleMove, { passive: false });
      el.addEventListener('touchend', handleEnd, { passive: true });

      cleanup(() => {
        el.removeEventListener('touchstart', handleStart);
        el.removeEventListener('touchmove', handleMove);
        el.removeEventListener('touchend', handleEnd);
        indicator.remove();
      });
    });

    // ========================================
    // x-long-press directive
    // Usage: x-long-press="handler" x-long-press.500ms="handler"
    // ========================================
    Alpine.directive('long-press', (el, { modifiers, expression }, { evaluate, cleanup }) => {
      const durationMatch = modifiers.find(m => m.match(/^\d+ms$/));
      const duration = durationMatch ? parseInt(durationMatch) : 500;

      let pressTimer = null;
      let startPos = null;
      const moveThreshold = 10;

      const handleStart = (event) => {
        startPos = getPointerPosition(event);

        pressTimer = setTimeout(() => {
          const handler = evaluate(expression);
          if (typeof handler === 'function') {
            handler({ position: startPos, element: el });
          }

          // Visual feedback
          el.classList.add('ux-long-pressed');
          setTimeout(() => el.classList.remove('ux-long-pressed'), 200);
        }, duration);
      };

      const handleMove = (event) => {
        if (!startPos) return;

        const currentPos = getPointerPosition(event);
        const distance = getDistance(startPos, currentPos);

        if (distance > moveThreshold) {
          clearTimeout(pressTimer);
          pressTimer = null;
        }
      };

      const handleEnd = () => {
        if (pressTimer) {
          clearTimeout(pressTimer);
          pressTimer = null;
        }
        startPos = null;
      };

      el.addEventListener('touchstart', handleStart, { passive: true });
      el.addEventListener('touchmove', handleMove, { passive: true });
      el.addEventListener('touchend', handleEnd, { passive: true });
      el.addEventListener('touchcancel', handleEnd, { passive: true });
      el.addEventListener('mousedown', handleStart);
      el.addEventListener('mousemove', handleMove);
      el.addEventListener('mouseup', handleEnd);
      el.addEventListener('mouseleave', handleEnd);

      cleanup(() => {
        el.removeEventListener('touchstart', handleStart);
        el.removeEventListener('touchmove', handleMove);
        el.removeEventListener('touchend', handleEnd);
        el.removeEventListener('touchcancel', handleEnd);
        el.removeEventListener('mousedown', handleStart);
        el.removeEventListener('mousemove', handleMove);
        el.removeEventListener('mouseup', handleEnd);
        el.removeEventListener('mouseleave', handleEnd);
        if (pressTimer) clearTimeout(pressTimer);
      });
    });

    // ========================================
    // x-pinch directive
    // Usage: x-pinch="handlePinch"
    // ========================================
    Alpine.directive('pinch', (el, { expression }, { evaluate, cleanup }) => {
      let initialDistance = null;
      let initialScale = 1;

      const getTouchDistance = (event) => {
        if (event.touches.length < 2) return null;
        const [t1, t2] = event.touches;
        return Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      };

      const handleStart = (event) => {
        if (event.touches.length === 2) {
          event.preventDefault();
          initialDistance = getTouchDistance(event);
        }
      };

      const handleMove = (event) => {
        if (event.touches.length !== 2 || !initialDistance) return;

        event.preventDefault();
        const currentDistance = getTouchDistance(event);
        const scale = currentDistance / initialDistance;

        const handler = evaluate(expression);
        if (typeof handler === 'function') {
          handler({
            type: 'pinch',
            scale: initialScale * scale,
            delta: scale,
            center: {
              x: (event.touches[0].clientX + event.touches[1].clientX) / 2,
              y: (event.touches[0].clientY + event.touches[1].clientY) / 2
            }
          });
        }
      };

      const handleEnd = () => {
        initialDistance = null;
      };

      el.addEventListener('touchstart', handleStart, { passive: false });
      el.addEventListener('touchmove', handleMove, { passive: false });
      el.addEventListener('touchend', handleEnd, { passive: true });

      cleanup(() => {
        el.removeEventListener('touchstart', handleStart);
        el.removeEventListener('touchmove', handleMove);
        el.removeEventListener('touchend', handleEnd);
      });
    });

    // ========================================
    // x-tap directive (single/double tap)
    // Usage: x-tap="handler" x-tap.double="handler"
    // ========================================
    Alpine.directive('tap', (el, { modifiers, expression }, { evaluate, cleanup }) => {
      const isDouble = modifiers.includes('double');
      const tapThreshold = 10;
      const doubleTapDelay = 300;

      let startPos = null;
      let startTime = null;
      let lastTapTime = 0;

      const handleStart = (event) => {
        startPos = getPointerPosition(event);
        startTime = Date.now();
      };

      const handleEnd = (event) => {
        if (!startPos) return;

        const endPos = getPointerPosition(event.changedTouches ? event.changedTouches[0] : event);
        const distance = getDistance(startPos, endPos);
        const duration = Date.now() - startTime;

        // Check if it's a tap (short distance, short duration)
        if (distance <= tapThreshold && duration <= 300) {
          const now = Date.now();

          if (isDouble) {
            if (now - lastTapTime <= doubleTapDelay) {
              const handler = evaluate(expression);
              if (typeof handler === 'function') {
                handler({ position: endPos, element: el });
              }
              lastTapTime = 0;
            } else {
              lastTapTime = now;
            }
          } else {
            const handler = evaluate(expression);
            if (typeof handler === 'function') {
              handler({ position: endPos, element: el });
            }
          }
        }

        startPos = null;
        startTime = null;
      };

      el.addEventListener('touchstart', handleStart, { passive: true });
      el.addEventListener('touchend', handleEnd, { passive: true });
      el.addEventListener('mousedown', handleStart);
      el.addEventListener('mouseup', handleEnd);

      cleanup(() => {
        el.removeEventListener('touchstart', handleStart);
        el.removeEventListener('touchend', handleEnd);
        el.removeEventListener('mousedown', handleStart);
        el.removeEventListener('mouseup', handleEnd);
      });
    });
  };

  // Initialize
  registerDirectives();

  // Alpine component for swipeable item
  const swipeItemComponent = (config = {}) => ({
    offset: 0,
    isSwiping: false,
    openSide: null, // 'start' | 'end' | null
    startActionsWidth: config.startActionsWidth || 160,
    endActionsWidth: config.endActionsWidth || 80,
    threshold: config.threshold || 40,

    get contentStyle() {
      return { transform: `translateX(${this.offset}px)` };
    },

    handleSwipeStart() {
      this.isSwiping = true;
    },

    handleSwipeMove(delta) {
      if (!this.isSwiping) return;

      let newOffset = delta;

      // Apply resistance at boundaries
      if (newOffset > 0) {
        newOffset = Math.min(newOffset, this.startActionsWidth * 1.2);
      } else {
        newOffset = Math.max(newOffset, -this.endActionsWidth * 1.2);
      }

      this.offset = newOffset;
    },

    handleSwipeEnd() {
      this.isSwiping = false;

      // Snap to open or closed
      if (this.offset > this.threshold) {
        this.offset = this.startActionsWidth;
        this.openSide = 'start';
      } else if (this.offset < -this.threshold) {
        this.offset = -this.endActionsWidth;
        this.openSide = 'end';
      } else {
        this.close();
      }
    },

    openStart() {
      this.offset = this.startActionsWidth;
      this.openSide = 'start';
    },

    openEnd() {
      this.offset = -this.endActionsWidth;
      this.openSide = 'end';
    },

    close() {
      this.offset = 0;
      this.openSide = null;
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxSwipeItem', swipeItemComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxSwipeItem', swipeItemComponent);
    });
  }
})();
/**
 * UX Carousel Component
 * Carrusel con navegacion por flechas
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Carousel Container
    ======================================== */

    .ux-carousel {
      position: relative;
      width: 100%;
      overflow: hidden;
    }

    .ux-carousel__viewport {
      overflow: hidden;
      width: 100%;
    }

    .ux-carousel__track {
      display: flex;
      transition: transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
      will-change: transform;
    }

    /* Variantes de transicion */
    .ux-carousel--smooth .ux-carousel__track {
      transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .ux-carousel--fast .ux-carousel__track {
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .ux-carousel--spring .ux-carousel__track {
      transition: transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .ux-carousel--dragging .ux-carousel__track {
      transition: none;
      cursor: grabbing;
    }

    .ux-carousel__slide {
      flex-shrink: 0;
      box-sizing: border-box;
    }

    /* Gap between slides */
    .ux-carousel--gap-xs .ux-carousel__slide { padding: 0 var(--ux-space-xs); }
    .ux-carousel--gap-sm .ux-carousel__slide { padding: 0 var(--ux-space-sm); }
    .ux-carousel--gap-md .ux-carousel__slide { padding: 0 var(--ux-space-md); }
    .ux-carousel--gap-lg .ux-carousel__slide { padding: 0 var(--ux-space-lg); }

    /* Negative margin to compensate for padding */
    .ux-carousel--gap-xs .ux-carousel__track { margin: 0 calc(-1 * var(--ux-space-xs)); }
    .ux-carousel--gap-sm .ux-carousel__track { margin: 0 calc(-1 * var(--ux-space-sm)); }
    .ux-carousel--gap-md .ux-carousel__track { margin: 0 calc(-1 * var(--ux-space-md)); }
    .ux-carousel--gap-lg .ux-carousel__track { margin: 0 calc(-1 * var(--ux-space-lg)); }

    /* ========================================
       Navigation Arrows
    ======================================== */

    .ux-carousel__nav {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background-color: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: 50%;
      box-shadow: var(--ux-shadow-md);
      cursor: pointer;
      transition:
        background-color var(--ux-transition-fast) var(--ux-ease),
        transform var(--ux-transition-fast) var(--ux-ease),
        opacity var(--ux-transition-fast) var(--ux-ease);
      -webkit-tap-highlight-color: transparent;
    }

    .ux-carousel__nav:hover {
      background-color: var(--ux-surface-secondary);
    }

    .ux-carousel__nav:active {
      transform: translateY(-50%) scale(0.95);
    }

    .ux-carousel__nav:disabled {
      opacity: 0.4;
      cursor: not-allowed;
      pointer-events: none;
    }

    .ux-carousel__nav--prev {
      left: var(--ux-space-sm);
    }

    .ux-carousel__nav--next {
      right: var(--ux-space-sm);
    }

    .ux-carousel__nav svg {
      width: 20px;
      height: 20px;
      color: var(--ux-text);
    }

    /* Navigation outside */
    .ux-carousel--nav-outside .ux-carousel__nav--prev {
      left: calc(-1 * (40px + var(--ux-space-md)));
    }

    .ux-carousel--nav-outside .ux-carousel__nav--next {
      right: calc(-1 * (40px + var(--ux-space-md)));
    }

    /* Navigation small */
    .ux-carousel--nav-sm .ux-carousel__nav {
      width: 32px;
      height: 32px;
    }

    .ux-carousel--nav-sm .ux-carousel__nav svg {
      width: 16px;
      height: 16px;
    }

    /* Navigation hidden on mobile */
    @media (max-width: 768px) {
      .ux-carousel--nav-hide-mobile .ux-carousel__nav {
        display: none;
      }
    }

    /* ========================================
       Pagination Dots
    ======================================== */

    .ux-carousel__pagination {
      display: flex;
      justify-content: center;
      gap: var(--ux-space-xs);
      margin-top: var(--ux-space-md);
    }

    .ux-carousel__dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: var(--ux-border-color);
      border: none;
      padding: 0;
      cursor: pointer;
      transition:
        background-color var(--ux-transition-fast) var(--ux-ease),
        transform var(--ux-transition-fast) var(--ux-ease);
      -webkit-tap-highlight-color: transparent;
    }

    .ux-carousel__dot:hover {
      background-color: var(--ux-text-tertiary);
    }

    .ux-carousel__dot--active {
      background-color: var(--ux-primary);
      transform: scale(1.2);
    }

    /* Pagination lines */
    .ux-carousel--pagination-lines .ux-carousel__dot {
      width: 24px;
      height: 4px;
      border-radius: 2px;
    }

    .ux-carousel--pagination-lines .ux-carousel__dot--active {
      transform: scaleX(1.2);
    }

    /* ========================================
       Slide Widths (Responsive)
    ======================================== */

    /* 1 slide visible */
    .ux-carousel--show-1 .ux-carousel__slide { width: 100%; }

    /* 2 slides visible */
    .ux-carousel--show-2 .ux-carousel__slide { width: 50%; }

    /* 3 slides visible */
    .ux-carousel--show-3 .ux-carousel__slide { width: 33.333333%; }

    /* 4 slides visible */
    .ux-carousel--show-4 .ux-carousel__slide { width: 25%; }

    /* 5 slides visible */
    .ux-carousel--show-5 .ux-carousel__slide { width: 20%; }

    /* 6 slides visible */
    .ux-carousel--show-6 .ux-carousel__slide { width: 16.666666%; }

    /* Responsive breakpoints */
    @media (max-width: 1024px) {
      .ux-carousel--show-lg-1 .ux-carousel__slide { width: 100%; }
      .ux-carousel--show-lg-2 .ux-carousel__slide { width: 50%; }
      .ux-carousel--show-lg-3 .ux-carousel__slide { width: 33.333333%; }
      .ux-carousel--show-lg-4 .ux-carousel__slide { width: 25%; }
    }

    @media (max-width: 768px) {
      .ux-carousel--show-md-1 .ux-carousel__slide { width: 100%; }
      .ux-carousel--show-md-2 .ux-carousel__slide { width: 50%; }
      .ux-carousel--show-md-3 .ux-carousel__slide { width: 33.333333%; }
    }

    @media (max-width: 480px) {
      .ux-carousel--show-sm-1 .ux-carousel__slide { width: 100%; }
      .ux-carousel--show-sm-2 .ux-carousel__slide { width: 50%; }
    }

    /* ========================================
       Peek (Partial slides visible)
    ======================================== */

    .ux-carousel--peek .ux-carousel__viewport {
      overflow: visible;
    }

    .ux-carousel--peek {
      overflow: hidden;
    }

    .ux-carousel--peek-sm .ux-carousel__slide:last-child {
      margin-right: 20px;
    }

    .ux-carousel--peek-md .ux-carousel__slide:last-child {
      margin-right: 40px;
    }

    /* ========================================
       Auto Width
    ======================================== */

    .ux-carousel--auto .ux-carousel__slide {
      width: auto;
    }

    /* ========================================
       Center Mode
    ======================================== */

    .ux-carousel--center .ux-carousel__slide {
      transition: transform var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-carousel--center .ux-carousel__slide--active {
      transform: scale(1.05);
      z-index: 1;
    }

    /* ========================================
       Fade Effect
    ======================================== */

    .ux-carousel--fade .ux-carousel__track {
      display: block;
      position: relative;
    }

    .ux-carousel--fade .ux-carousel__slide {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      opacity: 0;
      transition: opacity var(--ux-transition-base) var(--ux-ease);
    }

    .ux-carousel--fade .ux-carousel__slide--active {
      position: relative;
      opacity: 1;
    }

    /* ========================================
       Loading State
    ======================================== */

    .ux-carousel--loading .ux-carousel__track {
      opacity: 0;
    }

    .ux-carousel--loading::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 32px;
      height: 32px;
      border: 3px solid var(--ux-border-color);
      border-top-color: var(--ux-primary);
      border-radius: 50%;
      animation: ux-carousel-spin 0.8s linear infinite;
    }

    @keyframes ux-carousel-spin {
      to { transform: translate(-50%, -50%) rotate(360deg); }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-carousel-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-carousel-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component
  // ARIA: group role, aria-roledescription, aria-label for navigation
  const carouselComponent = (config = {}) => ({
    currentIndex: 0,
    slidesCount: 0,
    slidesPerView: config.slidesPerView || 1,
    loop: config.loop || false,
    autoplay: config.autoplay || false,
    autoplayInterval: config.autoplayInterval || 5000,
    showPagination: config.showPagination !== false,
    showNavigation: config.showNavigation !== false,
    draggable: config.draggable !== false,
    _autoplayTimer: null,
    _startX: 0,
    _currentX: 0,
    _isDragging: false,
    _trackEl: null,
    carouselId: config.id || 'ux-carousel-' + Math.random().toString(36).substr(2, 9),

    // ARIA attributes for the carousel container
    get ariaAttrs() {
      return {
        'role': 'group',
        'aria-roledescription': 'carousel',
        'aria-label': config.ariaLabel || 'Carousel'
      };
    },

    // ARIA attributes for navigation prev button
    get prevButtonAriaAttrs() {
      return {
        'aria-label': 'Previous slide',
        'aria-controls': this.carouselId + '-track'
      };
    },

    // ARIA attributes for navigation next button
    get nextButtonAriaAttrs() {
      return {
        'aria-label': 'Next slide',
        'aria-controls': this.carouselId + '-track'
      };
    },

    // ARIA attributes for slide
    getSlideAriaAttrs(index) {
      return {
        'role': 'group',
        'aria-roledescription': 'slide',
        'aria-label': `Slide ${index + 1} of ${this.slidesCount}`
      };
    },

    // ARIA attributes for pagination dot
    getDotAriaAttrs(pageIndex) {
      const isCurrentPage = this.getCurrentPage() === pageIndex;
      return {
        'role': 'button',
        'aria-label': `Go to slide ${pageIndex + 1}`,
        'aria-current': isCurrentPage ? 'true' : 'false'
      };
    },

    get trackId() {
      return this.carouselId + '-track';
    },

    init() {
      this.$nextTick(() => {
        this._trackEl = this.$refs.track;
        if (this._trackEl) {
          this.slidesCount = this._trackEl.children.length;
        }

        // Setup touch/mouse events for dragging
        if (this.draggable) {
          this.setupDrag();
        }

        // Start autoplay
        if (this.autoplay) {
          this.startAutoplay();
        }

        // Dispatch init event
        this.$dispatch('ux-carousel:init', {
          slidesCount: this.slidesCount,
          currentIndex: this.currentIndex
        });
      });
    },

    destroy() {
      this.stopAutoplay();
    },

    get canGoPrev() {
      if (this.loop) return true;
      return this.currentIndex > 0;
    },

    get canGoNext() {
      if (this.loop) return true;
      return this.currentIndex < this.maxIndex;
    },

    get maxIndex() {
      return Math.max(0, this.slidesCount - this.slidesPerView);
    },

    get translateX() {
      const slideWidth = 100 / this.slidesPerView;
      return -(this.currentIndex * slideWidth);
    },

    get paginationDots() {
      // Show dots for each "page"
      const pages = Math.ceil(this.slidesCount / this.slidesPerView);
      return Array.from({ length: pages }, (_, i) => i);
    },

    prev() {
      if (!this.canGoPrev && !this.loop) return;

      if (this.currentIndex === 0 && this.loop) {
        this.currentIndex = this.maxIndex;
      } else {
        this.currentIndex = Math.max(0, this.currentIndex - 1);
      }

      this.$dispatch('ux-carousel:change', {
        index: this.currentIndex,
        direction: 'prev'
      });

      // Reset autoplay timer
      if (this.autoplay) {
        this.stopAutoplay();
        this.startAutoplay();
      }
    },

    next() {
      if (!this.canGoNext && !this.loop) return;

      if (this.currentIndex >= this.maxIndex && this.loop) {
        this.currentIndex = 0;
      } else {
        this.currentIndex = Math.min(this.maxIndex, this.currentIndex + 1);
      }

      this.$dispatch('ux-carousel:change', {
        index: this.currentIndex,
        direction: 'next'
      });

      // Reset autoplay timer
      if (this.autoplay) {
        this.stopAutoplay();
        this.startAutoplay();
      }
    },

    goTo(index) {
      const targetIndex = Math.max(0, Math.min(this.maxIndex, index));
      if (targetIndex !== this.currentIndex) {
        this.currentIndex = targetIndex;
        this.$dispatch('ux-carousel:change', {
          index: this.currentIndex,
          direction: targetIndex > this.currentIndex ? 'next' : 'prev'
        });
      }
    },

    goToPage(pageIndex) {
      this.goTo(pageIndex * this.slidesPerView);
    },

    getCurrentPage() {
      return Math.floor(this.currentIndex / this.slidesPerView);
    },

    startAutoplay() {
      if (this._autoplayTimer) return;
      this._autoplayTimer = setInterval(() => {
        this.next();
      }, this.autoplayInterval);
    },

    stopAutoplay() {
      if (this._autoplayTimer) {
        clearInterval(this._autoplayTimer);
        this._autoplayTimer = null;
      }
    },

    setupDrag() {
      const viewport = this.$refs.viewport;
      if (!viewport) return;

      // Touch events
      viewport.addEventListener('touchstart', (e) => this.onDragStart(e), { passive: true });
      viewport.addEventListener('touchmove', (e) => this.onDragMove(e), { passive: false });
      viewport.addEventListener('touchend', (e) => this.onDragEnd(e));

      // Mouse events
      viewport.addEventListener('mousedown', (e) => this.onDragStart(e));
      viewport.addEventListener('mousemove', (e) => this.onDragMove(e));
      viewport.addEventListener('mouseup', (e) => this.onDragEnd(e));
      viewport.addEventListener('mouseleave', (e) => this.onDragEnd(e));
    },

    onDragStart(e) {
      this._isDragging = true;
      this._startX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
      this._currentX = this._startX;
      this.$el.classList.add('ux-carousel--dragging');

      if (this.autoplay) {
        this.stopAutoplay();
      }
    },

    onDragMove(e) {
      if (!this._isDragging) return;

      this._currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
      const diff = this._currentX - this._startX;

      // Apply drag transform
      if (this._trackEl) {
        const baseTranslate = this.translateX;
        const dragPercent = (diff / this.$refs.viewport.offsetWidth) * 100;
        this._trackEl.style.transform = `translateX(${baseTranslate + dragPercent}%)`;
      }

      // Prevent scrolling while dragging horizontally
      if (Math.abs(diff) > 10) {
        e.preventDefault();
      }
    },

    onDragEnd(e) {
      if (!this._isDragging) return;

      this._isDragging = false;
      this.$el.classList.remove('ux-carousel--dragging');

      const diff = this._currentX - this._startX;
      const threshold = this.$refs.viewport.offsetWidth * 0.2; // 20% threshold

      // Reset track transform
      if (this._trackEl) {
        this._trackEl.style.transform = '';
      }

      // Determine direction
      if (diff > threshold) {
        this.prev();
      } else if (diff < -threshold) {
        this.next();
      }

      // Resume autoplay
      if (this.autoplay) {
        this.startAutoplay();
      }
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxCarousel', carouselComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxCarousel', carouselComponent);
    });
  }
})();
/**
 * UX Shell Component
 * Layouts de estructura para admin panels
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Shell - CSS Variables
    ======================================== */

    :root {
      --ux-shell-navbar: 56px;
      --ux-shell-toolbar: 48px;
      --ux-shell-sidebar: 250px;
      --ux-shell-sidebar-collapsed: 56px;
      --ux-shell-bottom-nav: 56px;
    }

    /* ========================================
       Base Shell
    ======================================== */

    .ux-shell {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      min-height: 100dvh;
      background-color: var(--ux-background);
    }

    /* ========================================
       Shell Navbar
    ======================================== */

    .ux-shell__navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: var(--ux-shell-navbar);
      display: flex;
      align-items: center;
      padding: 0 var(--ux-space-lg);
      background-color: var(--ux-surface);
      border-bottom: 1px solid var(--ux-border-color);
      z-index: var(--ux-z-fixed);
      gap: var(--ux-space-md);
    }

    .ux-shell__navbar-brand {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
      font-size: var(--ux-font-size-lg);
      font-weight: 600;
      color: var(--ux-text);
    }

    .ux-shell__navbar-brand img {
      height: 32px;
      width: auto;
    }

    .ux-shell__navbar-toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--ux-touch-target);
      height: var(--ux-touch-target);
      border-radius: var(--ux-border-radius);
      color: var(--ux-text-secondary);
      transition: background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-shell__navbar-toggle:hover {
      background-color: var(--ux-surface-secondary);
    }

    .ux-shell__navbar-toggle svg {
      width: 24px;
      height: 24px;
    }

    .ux-shell__navbar-content {
      flex: 1;
      display: flex;
      align-items: center;
      gap: var(--ux-space-md);
    }

    .ux-shell__navbar-actions {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
    }

    /* ========================================
       Shell Toolbar
    ======================================== */

    .ux-shell__toolbar {
      position: fixed;
      top: var(--ux-shell-navbar);
      left: 0;
      right: 0;
      height: var(--ux-shell-toolbar);
      display: flex;
      align-items: center;
      padding: 0 var(--ux-space-lg);
      background-color: var(--ux-surface);
      border-bottom: 1px solid var(--ux-border-color);
      z-index: calc(var(--ux-z-fixed) - 1);
      gap: var(--ux-space-sm);
    }

    /* Adjust toolbar position when sidebar exists */
    .ux-shell--sidebar .ux-shell__toolbar {
      left: var(--ux-shell-sidebar);
      transition: left var(--ux-transition-base) var(--ux-ease);
    }

    .ux-shell--sidebar.ux-shell--collapsed .ux-shell__toolbar {
      left: var(--ux-shell-sidebar-collapsed);
    }

    @media (max-width: 767px) {
      .ux-shell--sidebar .ux-shell__toolbar {
        left: 0;
      }
    }

    /* ========================================
       Shell Sidebar
    ======================================== */

    .ux-shell__sidebar {
      position: fixed;
      top: var(--ux-shell-navbar);
      left: 0;
      bottom: 0;
      width: var(--ux-shell-sidebar);
      background-color: var(--ux-surface);
      border-right: 1px solid var(--ux-border-color);
      z-index: var(--ux-z-sticky);
      overflow-y: auto;
      overflow-x: hidden;
      transition:
        width var(--ux-transition-base) var(--ux-ease),
        transform var(--ux-transition-base) var(--ux-ease);
      -webkit-overflow-scrolling: touch;
    }

    .ux-shell__sidebar-content {
      display: flex;
      flex-direction: column;
      min-height: 100%;
    }

    .ux-shell__sidebar-nav {
      flex: 1;
      padding: var(--ux-space-md) 0;
    }

    .ux-shell__sidebar-footer {
      padding: var(--ux-space-md);
      border-top: 1px solid var(--ux-border-color);
    }

    /* Collapsed sidebar */
    .ux-shell--collapsed .ux-shell__sidebar {
      width: var(--ux-shell-sidebar-collapsed);
    }

    .ux-shell--collapsed .ux-shell__sidebar-item-text,
    .ux-shell--collapsed .ux-shell__sidebar-section-title {
      opacity: 0;
      visibility: hidden;
    }

    /* Mobile sidebar (drawer) */
    @media (max-width: 767px) {
      .ux-shell__sidebar {
        transform: translateX(-100%);
        width: 280px;
        z-index: calc(var(--ux-z-modal) + 1);
        box-shadow: var(--ux-shadow-xl);
      }

      .ux-shell--sidebar-open .ux-shell__sidebar {
        transform: translateX(0);
      }

      .ux-shell--collapsed .ux-shell__sidebar {
        width: 280px;
      }

      .ux-shell--collapsed .ux-shell__sidebar-item-text,
      .ux-shell--collapsed .ux-shell__sidebar-section-title {
        opacity: 1;
        visibility: visible;
      }
    }

    /* Sidebar backdrop (mobile) */
    .ux-shell__sidebar-backdrop {
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: var(--ux-z-modal);
      opacity: 0;
      visibility: hidden;
      transition:
        opacity var(--ux-transition-base) var(--ux-ease),
        visibility var(--ux-transition-base) var(--ux-ease);
    }

    .ux-shell--sidebar-open .ux-shell__sidebar-backdrop {
      opacity: 1;
      visibility: visible;
    }

    @media (min-width: 768px) {
      .ux-shell__sidebar-backdrop {
        display: none;
      }
    }

    /* Sidebar navigation items */
    .ux-shell__sidebar-section {
      margin-bottom: var(--ux-space-md);
    }

    .ux-shell__sidebar-section-title {
      padding: var(--ux-space-sm) var(--ux-space-lg);
      font-size: var(--ux-font-size-xs);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--ux-text-tertiary);
      white-space: nowrap;
      overflow: hidden;
      transition: opacity var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-shell__sidebar-item {
      display: flex;
      align-items: center;
      gap: var(--ux-space-md);
      padding: var(--ux-space-md) var(--ux-space-lg);
      color: var(--ux-text-secondary);
      text-decoration: none;
      transition:
        background-color var(--ux-transition-fast) var(--ux-ease),
        color var(--ux-transition-fast) var(--ux-ease);
      cursor: pointer;
    }

    .ux-shell__sidebar-item:hover {
      background-color: var(--ux-surface-secondary);
      color: var(--ux-text);
      text-decoration: none;
    }

    .ux-shell__sidebar-item--active {
      background-color: rgba(var(--ux-primary-rgb), 0.1);
      color: var(--ux-primary);
    }

    .ux-shell__sidebar-item--active:hover {
      background-color: rgba(var(--ux-primary-rgb), 0.15);
      color: var(--ux-primary);
    }

    .ux-shell__sidebar-item-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      flex-shrink: 0;
    }

    .ux-shell__sidebar-item-icon svg {
      width: 20px;
      height: 20px;
    }

    .ux-shell__sidebar-item-text {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      transition: opacity var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-shell__sidebar-item-badge {
      padding: 2px 8px;
      font-size: var(--ux-font-size-xs);
      font-weight: 600;
      background-color: var(--ux-primary);
      color: var(--ux-primary-contrast);
      border-radius: 9999px;
    }

    /* ========================================
       Shell Main Content
    ======================================== */

    .ux-shell__main {
      flex: 1;
      margin-top: var(--ux-shell-navbar);
      min-height: calc(100vh - var(--ux-shell-navbar));
      min-height: calc(100dvh - var(--ux-shell-navbar));
      background-color: var(--ux-surface-secondary);
    }

    /* With toolbar */
    .ux-shell--toolbar .ux-shell__main {
      margin-top: calc(var(--ux-shell-navbar) + var(--ux-shell-toolbar));
      min-height: calc(100vh - var(--ux-shell-navbar) - var(--ux-shell-toolbar));
      min-height: calc(100dvh - var(--ux-shell-navbar) - var(--ux-shell-toolbar));
    }

    /* With sidebar */
    .ux-shell--sidebar .ux-shell__main {
      margin-left: var(--ux-shell-sidebar);
      transition: margin-left var(--ux-transition-base) var(--ux-ease);
    }

    .ux-shell--sidebar.ux-shell--collapsed .ux-shell__main {
      margin-left: var(--ux-shell-sidebar-collapsed);
    }

    @media (max-width: 767px) {
      .ux-shell--sidebar .ux-shell__main {
        margin-left: 0;
      }
    }

    /* With bottom nav (mobile) */
    .ux-shell--bottom-nav .ux-shell__main {
      padding-bottom: var(--ux-shell-bottom-nav);
    }

    @media (min-width: 768px) {
      .ux-shell--bottom-nav .ux-shell__main {
        padding-bottom: 0;
      }
    }

    /* ========================================
       Shell Bottom Navigation
    ======================================== */

    .ux-shell__bottom-nav {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: var(--ux-shell-bottom-nav);
      padding-bottom: var(--ux-safe-bottom);
      display: flex;
      align-items: center;
      justify-content: space-around;
      background-color: var(--ux-surface);
      border-top: 1px solid var(--ux-border-color);
      z-index: var(--ux-z-fixed);
    }

    @media (min-width: 768px) {
      .ux-shell__bottom-nav {
        display: none;
      }
    }

    .ux-shell__bottom-nav-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex: 1;
      height: 100%;
      padding: var(--ux-space-xs) 0;
      color: var(--ux-text-tertiary);
      text-decoration: none;
      transition: color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-shell__bottom-nav-item:hover,
    .ux-shell__bottom-nav-item--active {
      color: var(--ux-primary);
      text-decoration: none;
    }

    .ux-shell__bottom-nav-item-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 2px;
    }

    .ux-shell__bottom-nav-item-icon svg {
      width: 24px;
      height: 24px;
    }

    .ux-shell__bottom-nav-item-label {
      font-size: var(--ux-font-size-xs);
      font-weight: 500;
    }

    /* ========================================
       Shell Layouts
    ======================================== */

    /* Layout: Sidebar (navbar + collapsible sidebar) */
    .ux-shell-sidebar {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      min-height: 100dvh;
    }

    /* Layout: Toolbar (navbar + toolbar) */
    .ux-shell-toolbar {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      min-height: 100dvh;
    }

    /* Layout: Simple (navbar only) */
    .ux-shell-simple {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      min-height: 100dvh;
    }

    /* ========================================
       Shell Section (scrollable content areas)
    ======================================== */

    .ux-shell__section {
      height: 100%;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }

    /* ========================================
       Alpine Transitions
    ======================================== */

    [x-cloak] {
      display: none !important;
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-shell-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-shell-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for shell with sidebar
  const shellComponent = (config = {}) => ({
    sidebarOpen: false,
    sidebarCollapsed: config.collapsed || false,
    isMobile: window.innerWidth < 768,

    init() {
      // Set initial state based on screen size
      this.checkMobile();

      // Listen for resize
      window.addEventListener('resize', () => {
        this.checkMobile();
      });

      // Close sidebar on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.sidebarOpen && this.isMobile) {
          this.closeSidebar();
        }
      });
    },

    checkMobile() {
      const wasMobile = this.isMobile;
      this.isMobile = window.innerWidth < 768;

      // Auto-close sidebar when switching to mobile
      if (!wasMobile && this.isMobile) {
        this.sidebarOpen = false;
      }
    },

    toggleSidebar() {
      if (this.isMobile) {
        this.sidebarOpen = !this.sidebarOpen;
        if (this.sidebarOpen) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
      } else {
        this.sidebarCollapsed = !this.sidebarCollapsed;
      }
    },

    openSidebar() {
      if (this.isMobile) {
        this.sidebarOpen = true;
        document.body.style.overflow = 'hidden';
      }
    },

    closeSidebar() {
      if (this.isMobile) {
        this.sidebarOpen = false;
        document.body.style.overflow = '';
      }
    },

    collapseSidebar() {
      if (!this.isMobile) {
        this.sidebarCollapsed = true;
      }
    },

    expandSidebar() {
      if (!this.isMobile) {
        this.sidebarCollapsed = false;
      }
    },

    get shellClasses() {
      return {
        'ux-shell--sidebar': true,
        'ux-shell--sidebar-open': this.sidebarOpen,
        'ux-shell--collapsed': this.sidebarCollapsed && !this.isMobile
      };
    }
  });

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxShell', shellComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxShell', shellComponent);
    });
  }
})();
/**
 * UX Panel Component
 * Layouts de contenido para admin panels
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Panel - CSS Variables
    ======================================== */

    :root {
      --ux-panel-header: 64px;
      --ux-panel-actions: 56px;
      --ux-panel-pagination: 48px;
      --ux-panel-filters: 56px;
      --ux-panel-gap: 16px;
      --ux-panel-aside-toggle: 48px;
    }

    @media (min-width: 768px) {
      :root {
        --ux-panel-gap: 24px;
      }
    }

    /* ========================================
       Base Panel - Container que ocupa 100%
    ======================================== */

    .ux-panel {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      min-height: 0;
      overflow: hidden;
      background-color: var(--ux-surface-secondary);
    }

    /* Seccion con scroll interno */
    .ux-panel__section {
      position: relative;
      min-height: 0;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }

    .ux-panel__section--fixed {
      flex-shrink: 0;
      overflow: visible;
    }

    .ux-panel__section--scroll {
      flex: 1;
      overflow: auto;
    }

    /* ========================================
       Scrollable Table Wrapper
       Header fijo + body con scroll
    ======================================== */

    .ux-panel-table-wrapper {
      display: flex;
      flex-direction: column;
      height: 100%;
      min-height: 0;
      overflow: hidden;
    }

    .ux-panel-table-wrapper__header {
      flex-shrink: 0;
      overflow-x: auto;
      overflow-y: hidden;
      background-color: var(--ux-surface);
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-panel-table-wrapper__body {
      flex: 1;
      min-height: 0;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }

    /* Sync scroll horizontal between header and body */
    .ux-panel-table-wrapper__inner {
      min-width: max-content;
    }

    /* Table styles for fixed header */
    .ux-panel-table-wrapper table {
      width: 100%;
      min-width: max-content;
      border-collapse: collapse;
    }

    .ux-panel-table-wrapper th,
    .ux-panel-table-wrapper td {
      padding: var(--ux-space-sm) var(--ux-space-md);
      text-align: left;
      white-space: nowrap;
    }

    .ux-panel-table-wrapper th {
      font-weight: 600;
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      background-color: var(--ux-surface);
    }

    .ux-panel-table-wrapper td {
      font-size: var(--ux-font-size-sm);
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-panel-table-wrapper tbody tr:hover {
      background-color: var(--ux-surface-secondary);
    }

    /* ========================================
       Panel 1: Dashboard
       KPIs arriba + graficos + tabla
    ======================================== */

    .ux-panel-dashboard {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      min-height: 0;
      overflow: hidden;
    }

    .ux-panel-dashboard__kpis {
      flex-shrink: 0;
      overflow-x: auto;
      overflow-y: hidden;
      padding: var(--ux-panel-gap);
      -webkit-overflow-scrolling: touch;
    }

    .ux-panel-dashboard__charts {
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      gap: var(--ux-panel-gap);
      padding: 0 var(--ux-panel-gap);
      overflow: visible;
    }

    .ux-panel-dashboard__charts > * {
      min-height: 200px;
    }

    .ux-panel-dashboard__table {
      flex: 1;
      min-height: 0;
      overflow: hidden;
      padding: var(--ux-panel-gap);
    }

    @media (min-width: 768px) {
      .ux-panel-dashboard__charts {
        flex-direction: row;
        min-height: 250px;
        flex-shrink: 0;
      }

      .ux-panel-dashboard__charts > * {
        flex: 1;
        min-height: 0;
      }
    }

    /* ========================================
       Panel 2: Table
       Acciones + tabla + paginacion
    ======================================== */

    .ux-panel-table {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      min-height: 0;
      overflow: hidden;
    }

    .ux-panel-table__actions {
      flex-shrink: 0;
      height: var(--ux-panel-actions);
      display: flex;
      align-items: center;
      gap: var(--ux-space-md);
      padding: 0 var(--ux-panel-gap);
      border-bottom: 1px solid var(--ux-border-color);
      background-color: var(--ux-surface);
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }

    .ux-panel-table__actions-inner {
      display: flex;
      align-items: center;
      gap: var(--ux-space-md);
      min-width: max-content;
    }

    .ux-panel-table__content {
      flex: 1;
      min-height: 0;
      overflow: hidden;
    }

    .ux-panel-table__pagination {
      flex-shrink: 0;
      height: var(--ux-panel-pagination);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 var(--ux-panel-gap);
      border-top: 1px solid var(--ux-border-color);
      background-color: var(--ux-surface);
      font-size: var(--ux-font-size-sm);
      gap: var(--ux-space-md);
      overflow-x: auto;
    }

    /* ========================================
       Panel 3: Split Horizontal
       Mobile: apilado vertical
       Desktop: izquierda / derecha
    ======================================== */

    .ux-panel-split-h {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      min-height: 0;
      overflow: hidden;
    }

    .ux-panel-split-h__left,
    .ux-panel-split-h__right {
      min-height: 0;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }

    /* Mobile: cada seccion scrollable vertical */
    .ux-panel-split-h__left {
      flex: 1;
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-panel-split-h__right {
      flex: 1;
    }

    @media (min-width: 768px) {
      .ux-panel-split-h {
        flex-direction: row;
        gap: 0;
      }

      .ux-panel-split-h__left {
        flex: 0 0 35%;
        border-bottom: none;
        border-right: 1px solid var(--ux-border-color);
      }

      .ux-panel-split-h__right {
        flex: 1;
      }
    }

    /* Variant: 50/50 */
    @media (min-width: 768px) {
      .ux-panel-split-h--equal .ux-panel-split-h__left {
        flex: 0 0 50%;
      }
    }

    /* ========================================
       Panel 4: Split Vertical
       Arriba / Abajo (siempre vertical)
    ======================================== */

    .ux-panel-split-v {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      min-height: 0;
      overflow: hidden;
    }

    .ux-panel-split-v__top {
      flex: 0 0 40%;
      min-height: 0;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-panel-split-v__bottom {
      flex: 1;
      min-height: 0;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }

    /* Variant: 50/50 */
    .ux-panel-split-v--equal .ux-panel-split-v__top {
      flex: 1;
    }

    /* ========================================
       Panel 5: Detail
       Mobile: main visible, aside colapsable
       Desktop: main + aside lado a lado
    ======================================== */

    .ux-panel-detail {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      min-height: 0;
      overflow: hidden;
    }

    .ux-panel-detail__main {
      flex: 1;
      min-height: 0;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }

    /* Mobile: aside como drawer desde abajo */
    .ux-panel-detail__aside {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      max-height: 70vh;
      background-color: var(--ux-surface);
      border-top-left-radius: var(--ux-border-radius-xl);
      border-top-right-radius: var(--ux-border-radius-xl);
      box-shadow: var(--ux-shadow-xl);
      transform: translateY(100%);
      transition: transform var(--ux-transition-base) var(--ux-ease);
      z-index: var(--ux-z-modal);
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    .ux-panel-detail__aside.is-open {
      transform: translateY(0);
    }

    .ux-panel-detail__aside-header {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--ux-space-md) var(--ux-space-lg);
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-panel-detail__aside-content {
      flex: 1;
      min-height: 0;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }

    /* Toggle button para mostrar aside en mobile */
    .ux-panel-detail__toggle {
      position: fixed;
      bottom: var(--ux-space-lg);
      right: var(--ux-space-lg);
      width: var(--ux-panel-aside-toggle);
      height: var(--ux-panel-aside-toggle);
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--ux-primary);
      color: var(--ux-primary-contrast);
      border-radius: 50%;
      box-shadow: var(--ux-shadow-lg);
      z-index: var(--ux-z-fixed);
      cursor: pointer;
      transition: transform var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-panel-detail__toggle:active {
      transform: scale(0.95);
    }

    .ux-panel-detail__toggle svg {
      width: 24px;
      height: 24px;
    }

    /* Backdrop para aside */
    .ux-panel-detail__backdrop {
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: calc(var(--ux-z-modal) - 1);
      opacity: 0;
      visibility: hidden;
      transition: opacity var(--ux-transition-base) var(--ux-ease),
                  visibility var(--ux-transition-base) var(--ux-ease);
    }

    .ux-panel-detail__backdrop.is-visible {
      opacity: 1;
      visibility: visible;
    }

    @media (min-width: 768px) {
      .ux-panel-detail {
        flex-direction: row;
        gap: 0;
      }

      .ux-panel-detail__main {
        flex: 0 0 70%;
        border-right: 1px solid var(--ux-border-color);
      }

      .ux-panel-detail__aside {
        position: relative;
        bottom: auto;
        left: auto;
        right: auto;
        flex: 1;
        max-height: none;
        transform: none;
        border-radius: 0;
        box-shadow: none;
        z-index: auto;
      }

      .ux-panel-detail__aside-header {
        display: none;
      }

      .ux-panel-detail__toggle,
      .ux-panel-detail__backdrop {
        display: none;
      }
    }

    /* ========================================
       Panel 6: Form
       Header + contenido scrollable + acciones
    ======================================== */

    .ux-panel-form {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      min-height: 0;
      overflow: hidden;
    }

    .ux-panel-form__header {
      flex-shrink: 0;
      height: var(--ux-panel-header);
      display: flex;
      align-items: center;
      gap: var(--ux-space-md);
      padding: 0 var(--ux-panel-gap);
      border-bottom: 1px solid var(--ux-border-color);
      background-color: var(--ux-surface);
    }

    .ux-panel-form__content {
      flex: 1;
      min-height: 0;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
      padding: var(--ux-panel-gap);
    }

    .ux-panel-form__content-inner {
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
    }

    .ux-panel-form__actions {
      flex-shrink: 0;
      height: var(--ux-panel-header);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: var(--ux-space-md);
      padding: 0 var(--ux-panel-gap);
      border-top: 1px solid var(--ux-border-color);
      background-color: var(--ux-surface);
    }

    /* ========================================
       Panel 7: Analytics
       Filtros + KPIs + graficos + datos
    ======================================== */

    .ux-panel-analytics {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      min-height: 0;
      overflow: hidden;
    }

    .ux-panel-analytics__filters {
      flex-shrink: 0;
      height: var(--ux-panel-filters);
      display: flex;
      align-items: center;
      gap: var(--ux-space-md);
      padding: 0 var(--ux-panel-gap);
      border-bottom: 1px solid var(--ux-border-color);
      background-color: var(--ux-surface);
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }

    .ux-panel-analytics__scroll {
      flex: 1;
      min-height: 0;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }

    .ux-panel-analytics__kpis {
      padding: var(--ux-panel-gap);
    }

    .ux-panel-analytics__charts {
      display: flex;
      flex-direction: column;
      gap: var(--ux-panel-gap);
      padding: 0 var(--ux-panel-gap);
    }

    .ux-panel-analytics__charts > * {
      min-height: 200px;
    }

    .ux-panel-analytics__data {
      padding: var(--ux-panel-gap);
    }

    @media (min-width: 768px) {
      .ux-panel-analytics__charts {
        flex-direction: row;
      }

      .ux-panel-analytics__charts > * {
        flex: 1;
      }
    }

    /* ========================================
       Panel 8: Settings
       Mobile: menu horizontal scrollable, contenido con toggle
       Desktop: menu lateral + contenido
    ======================================== */

    .ux-panel-settings {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      min-height: 0;
      overflow: hidden;
    }

    /* Mobile: menu como tabs horizontales */
    .ux-panel-settings__menu {
      flex-shrink: 0;
      overflow-x: auto;
      overflow-y: hidden;
      border-bottom: 1px solid var(--ux-border-color);
      background-color: var(--ux-surface);
      -webkit-overflow-scrolling: touch;
    }

    .ux-panel-settings__menu-list {
      display: flex;
      min-width: max-content;
    }

    .ux-panel-settings__content {
      flex: 1;
      min-height: 0;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }

    .ux-panel-settings__content-inner {
      width: 100%;
      max-width: 700px;
      margin: 0 auto;
      padding: var(--ux-panel-gap);
    }

    @media (min-width: 768px) {
      .ux-panel-settings {
        flex-direction: row;
      }

      .ux-panel-settings__menu {
        flex: 0 0 220px;
        overflow-x: hidden;
        overflow-y: auto;
        border-bottom: none;
        border-right: 1px solid var(--ux-border-color);
      }

      .ux-panel-settings__menu-list {
        flex-direction: column;
        min-width: 0;
      }
    }

    /* Settings menu item */
    .ux-panel-settings__menu-item {
      display: flex;
      align-items: center;
      gap: var(--ux-space-md);
      padding: var(--ux-space-md) var(--ux-space-lg);
      color: var(--ux-text-secondary);
      text-decoration: none;
      white-space: nowrap;
      transition: background-color var(--ux-transition-fast) var(--ux-ease),
                  color var(--ux-transition-fast) var(--ux-ease);
      cursor: pointer;
      border-bottom: 2px solid transparent;
    }

    .ux-panel-settings__menu-item:hover {
      background-color: var(--ux-surface-secondary);
      color: var(--ux-text);
      text-decoration: none;
    }

    .ux-panel-settings__menu-item--active {
      color: var(--ux-primary);
      border-bottom-color: var(--ux-primary);
    }

    @media (min-width: 768px) {
      .ux-panel-settings__menu-item {
        border-bottom: none;
        border-left: 3px solid transparent;
      }

      .ux-panel-settings__menu-item--active {
        background-color: rgba(var(--ux-primary-rgb), 0.1);
        border-left-color: var(--ux-primary);
      }
    }

    /* ========================================
       Panel 9: Cards
       Grid de cards con scroll
    ======================================== */

    .ux-panel-cards {
      width: 100%;
      height: 100%;
      min-height: 0;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
      padding: var(--ux-panel-gap);
    }

    .ux-panel-cards__grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--ux-panel-gap);
    }

    @media (min-width: 576px) {
      .ux-panel-cards__grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (min-width: 768px) {
      .ux-panel-cards__grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    @media (min-width: 992px) {
      .ux-panel-cards__grid {
        grid-template-columns: repeat(4, 1fr);
      }
    }

    .ux-panel-cards__grid--auto {
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    }

    /* ========================================
       Panel 10: Grid 2x2
       Mobile: stack vertical
       Desktop: 4 secciones en grid
    ======================================== */

    .ux-panel-grid-2x2 {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      min-height: 0;
      overflow: hidden;
    }

    .ux-panel-grid-2x2__cell {
      flex: 1;
      min-height: 0;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-panel-grid-2x2__cell:last-child {
      border-bottom: none;
    }

    @media (min-width: 768px) {
      .ux-panel-grid-2x2 {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
        gap: 1px;
        background-color: var(--ux-border-color);
      }

      .ux-panel-grid-2x2__cell {
        border-bottom: none;
        background-color: var(--ux-surface-secondary);
      }
    }

    /* ========================================
       Panel 11: Grid 1-2
       Mobile: stack vertical
       Desktop: 1 arriba + 2 abajo
    ======================================== */

    .ux-panel-grid-1-2 {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      min-height: 0;
      overflow: hidden;
    }

    .ux-panel-grid-1-2__top {
      flex: 1;
      min-height: 0;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-panel-grid-1-2__bottom {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-height: 0;
    }

    .ux-panel-grid-1-2__bottom-left,
    .ux-panel-grid-1-2__bottom-right {
      flex: 1;
      min-height: 0;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-panel-grid-1-2__bottom-right {
      border-bottom: none;
    }

    @media (min-width: 768px) {
      .ux-panel-grid-1-2__top {
        flex: 0 0 40%;
      }

      .ux-panel-grid-1-2__bottom {
        flex: 1;
        flex-direction: row;
      }

      .ux-panel-grid-1-2__bottom-left {
        flex: 1;
        border-bottom: none;
        border-right: 1px solid var(--ux-border-color);
      }

      .ux-panel-grid-1-2__bottom-right {
        flex: 1;
      }
    }

    /* ========================================
       Panel 12: Grid 2-1
       Mobile: stack vertical
       Desktop: 2 arriba + 1 abajo
    ======================================== */

    .ux-panel-grid-2-1 {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      min-height: 0;
      overflow: hidden;
    }

    .ux-panel-grid-2-1__top {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-height: 0;
    }

    .ux-panel-grid-2-1__top-left,
    .ux-panel-grid-2-1__top-right {
      flex: 1;
      min-height: 0;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-panel-grid-2-1__bottom {
      flex: 1;
      min-height: 0;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }

    @media (min-width: 768px) {
      .ux-panel-grid-2-1__top {
        flex: 0 0 60%;
        flex-direction: row;
        border-bottom: 1px solid var(--ux-border-color);
      }

      .ux-panel-grid-2-1__top-left {
        flex: 1;
        border-bottom: none;
        border-right: 1px solid var(--ux-border-color);
      }

      .ux-panel-grid-2-1__top-right {
        flex: 1;
        border-bottom: none;
      }

      .ux-panel-grid-2-1__bottom {
        flex: 1;
      }
    }

    /* ========================================
       Panel Content Card
    ======================================== */

    .ux-panel-card {
      display: flex;
      flex-direction: column;
      height: 100%;
      min-height: 0;
      background-color: var(--ux-surface);
      border-radius: var(--ux-border-radius-lg);
      border: 1px solid var(--ux-border-color);
      overflow: hidden;
    }

    .ux-panel-card--shadow {
      border: none;
      box-shadow: var(--ux-shadow-md);
    }

    .ux-panel-card__header {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--ux-space-md) var(--ux-space-lg);
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-panel-card__title {
      font-size: var(--ux-font-size-md);
      font-weight: 600;
      color: var(--ux-text);
    }

    .ux-panel-card__subtitle {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin-top: 2px;
    }

    .ux-panel-card__actions {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
    }

    .ux-panel-card__body {
      flex: 1;
      min-height: 0;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
      padding: var(--ux-space-lg);
    }

    .ux-panel-card__body--flush {
      padding: 0;
    }

    .ux-panel-card__footer {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: var(--ux-space-md) var(--ux-space-lg);
      border-top: 1px solid var(--ux-border-color);
      gap: var(--ux-space-sm);
    }

    /* ========================================
       KPI Card
    ======================================== */

    .ux-panel-kpi {
      display: flex;
      flex-direction: column;
      padding: var(--ux-space-lg);
      background-color: var(--ux-surface);
      border-radius: var(--ux-border-radius-lg);
      border: 1px solid var(--ux-border-color);
    }

    .ux-panel-kpi__label {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin-bottom: var(--ux-space-xs);
    }

    .ux-panel-kpi__value {
      font-size: var(--ux-font-size-2xl);
      font-weight: 700;
      color: var(--ux-text);
      line-height: 1.2;
    }

    .ux-panel-kpi__trend {
      display: flex;
      align-items: center;
      gap: var(--ux-space-xs);
      margin-top: var(--ux-space-sm);
      font-size: var(--ux-font-size-sm);
    }

    .ux-panel-kpi__trend--up { color: var(--ux-success); }
    .ux-panel-kpi__trend--down { color: var(--ux-danger); }
    .ux-panel-kpi__trend--neutral { color: var(--ux-text-tertiary); }

    /* KPI Grid - horizontal scroll on mobile */
    .ux-panel-kpi-grid {
      display: flex;
      gap: var(--ux-panel-gap);
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      padding-bottom: var(--ux-space-sm);
    }

    .ux-panel-kpi-grid > * {
      flex: 0 0 auto;
      min-width: 150px;
    }

    @media (min-width: 576px) {
      .ux-panel-kpi-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        overflow-x: visible;
        padding-bottom: 0;
      }

      .ux-panel-kpi-grid > * {
        min-width: 0;
      }
    }

    @media (min-width: 992px) {
      .ux-panel-kpi-grid {
        grid-template-columns: repeat(4, 1fr);
      }
    }

    /* ========================================
       Empty & Loading States
    ======================================== */

    .ux-panel-empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: var(--ux-space-3xl);
      text-align: center;
      color: var(--ux-text-secondary);
    }

    .ux-panel-empty__icon {
      width: 64px;
      height: 64px;
      margin-bottom: var(--ux-space-lg);
      color: var(--ux-text-tertiary);
    }

    .ux-panel-empty__title {
      font-size: var(--ux-font-size-lg);
      font-weight: 600;
      color: var(--ux-text);
      margin-bottom: var(--ux-space-sm);
    }

    .ux-panel-empty__description {
      font-size: var(--ux-font-size-base);
      max-width: 400px;
      margin-bottom: var(--ux-space-xl);
    }

    .ux-panel-loading {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--ux-space-3xl);
    }

    /* ========================================
       Fullscreen Panel
    ======================================== */

    .ux-panel-fullscreen {
      position: fixed;
      inset: 0;
      z-index: var(--ux-z-modal);
      background-color: var(--ux-background);
      display: flex;
      flex-direction: column;
    }

    .ux-panel-fullscreen__header {
      flex-shrink: 0;
      height: var(--ux-panel-header);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 var(--ux-space-lg);
      background-color: var(--ux-surface);
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-panel-fullscreen__content {
      flex: 1;
      min-height: 0;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-panel-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-panel-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for panel detail (with aside toggle)
  const panelDetailComponent = (config = {}) => ({
    asideOpen: false,

    init() {
      // Close aside on escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.asideOpen) {
          this.closeAside();
        }
      });
    },

    toggleAside() {
      this.asideOpen = !this.asideOpen;
      if (this.asideOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    },

    openAside() {
      this.asideOpen = true;
      document.body.style.overflow = 'hidden';
    },

    closeAside() {
      this.asideOpen = false;
      document.body.style.overflow = '';
    }
  });

  // Alpine component for panels with HTMX support
  const panelComponent = (config = {}) => ({
    loading: config.loading || false,
    error: null,

    init() {
      // Listen for HTMX events on sections
      this.$el.addEventListener('htmx:beforeRequest', (e) => {
        const section = e.target.closest('[class*="__"]');
        if (section) {
          section.classList.add('is-loading');
        }
      });

      this.$el.addEventListener('htmx:afterRequest', (e) => {
        const section = e.target.closest('[class*="__"]');
        if (section) {
          section.classList.remove('is-loading');
        }
      });

      this.$el.addEventListener('htmx:responseError', (e) => {
        const section = e.target.closest('[class*="__"]');
        if (section) {
          section.classList.add('is-error');
        }
      });
    },

    refresh(sectionId) {
      const section = document.getElementById(sectionId);
      if (section && typeof htmx !== 'undefined') {
        htmx.trigger(section, 'refresh');
      }
    },

    refreshAll() {
      const sections = this.$el.querySelectorAll('[hx-get], [hx-post]');
      sections.forEach(section => {
        if (typeof htmx !== 'undefined') {
          htmx.trigger(section, 'refresh');
        }
      });
    }
  });

  // Sync horizontal scroll between table header and body
  const syncTableScroll = (wrapper) => {
    const header = wrapper.querySelector('.ux-panel-table-wrapper__header');
    const body = wrapper.querySelector('.ux-panel-table-wrapper__body');

    if (header && body) {
      body.addEventListener('scroll', () => {
        header.scrollLeft = body.scrollLeft;
      });
      header.addEventListener('scroll', () => {
        body.scrollLeft = header.scrollLeft;
      });
    }
  };

  // Auto-init table wrappers
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.ux-panel-table-wrapper').forEach(syncTableScroll);
  });

  // Register components
  if (window.UX) {
    window.UX.registerComponent('uxPanel', panelComponent);
    window.UX.registerComponent('uxPanelDetail', panelDetailComponent);
    window.UX.syncTableScroll = syncTableScroll;
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxPanel', panelComponent);
      Alpine.data('uxPanelDetail', panelDetailComponent);
    });
  }
})();
/**
 * UX PWA - Progressive Web App Support
 * Service Worker registration, offline detection, and install prompts
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX PWA Styles
    ======================================== */

    /* Online/Offline Indicator */
    .ux-pwa-status {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: var(--ux-z-toast);
      padding: var(--ux-space-sm) var(--ux-space-md);
      text-align: center;
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      transform: translateY(-100%);
      transition: transform 0.3s ease;
    }

    .ux-pwa-status--visible {
      transform: translateY(0);
    }

    .ux-pwa-status--offline {
      background-color: var(--ux-danger);
      color: white;
    }

    .ux-pwa-status--online {
      background-color: var(--ux-success);
      color: white;
    }

    /* Install Banner */
    .ux-pwa-install {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: var(--ux-z-modal);
      background: var(--ux-surface);
      border-top: 1px solid var(--ux-border-color);
      padding: var(--ux-space-lg);
      padding-bottom: calc(var(--ux-space-lg) + env(safe-area-inset-bottom));
      box-shadow: var(--ux-shadow-lg);
      transform: translateY(100%);
      transition: transform 0.3s ease;
    }

    .ux-pwa-install--visible {
      transform: translateY(0);
    }

    .ux-pwa-install__content {
      display: flex;
      align-items: center;
      gap: var(--ux-space-md);
      max-width: 600px;
      margin: 0 auto;
    }

    .ux-pwa-install__icon {
      width: 48px;
      height: 48px;
      border-radius: var(--ux-border-radius);
      flex-shrink: 0;
      object-fit: contain;
    }

    .ux-pwa-install__text {
      flex: 1;
      min-width: 0;
    }

    .ux-pwa-install__title {
      font-weight: 600;
      font-size: var(--ux-font-size-base);
      color: var(--ux-text);
      margin-bottom: 2px;
    }

    .ux-pwa-install__subtitle {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
    }

    .ux-pwa-install__actions {
      display: flex;
      gap: var(--ux-space-sm);
      flex-shrink: 0;
    }

    /* Update Available Banner */
    .ux-pwa-update {
      position: fixed;
      bottom: var(--ux-space-lg);
      left: var(--ux-space-lg);
      right: var(--ux-space-lg);
      z-index: var(--ux-z-modal);
      background: var(--ux-primary);
      color: white;
      border-radius: var(--ux-border-radius-lg);
      padding: var(--ux-space-md) var(--ux-space-lg);
      box-shadow: var(--ux-shadow-lg);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--ux-space-md);
      transform: translateY(calc(100% + var(--ux-space-xl)));
      transition: transform 0.3s ease;
    }

    .ux-pwa-update--visible {
      transform: translateY(0);
    }

    .ux-pwa-update__text {
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
    }

    .ux-pwa-update__btn {
      background: rgba(255, 255, 255, 0.2);
      color: white;
      border: none;
      padding: var(--ux-space-xs) var(--ux-space-md);
      border-radius: var(--ux-border-radius);
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      cursor: pointer;
      transition: background 0.2s;
    }

    .ux-pwa-update__btn:hover {
      background: rgba(255, 255, 255, 0.3);
    }

    /* Offline Overlay */
    .ux-pwa-offline-overlay {
      position: fixed;
      inset: 0;
      z-index: var(--ux-z-modal);
      background: var(--ux-surface);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: var(--ux-space-xl);
      text-align: center;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s, visibility 0.3s;
    }

    .ux-pwa-offline-overlay--visible {
      opacity: 1;
      visibility: visible;
    }

    .ux-pwa-offline-overlay__icon {
      width: 80px;
      height: 80px;
      margin-bottom: var(--ux-space-lg);
      color: var(--ux-text-secondary);
    }

    .ux-pwa-offline-overlay__title {
      font-size: var(--ux-font-size-xl);
      font-weight: 600;
      color: var(--ux-text);
      margin-bottom: var(--ux-space-sm);
    }

    .ux-pwa-offline-overlay__subtitle {
      font-size: var(--ux-font-size-base);
      color: var(--ux-text-secondary);
      max-width: 300px;
    }

    /* Cached indicator badge */
    .ux-pwa-cached {
      display: inline-flex;
      align-items: center;
      gap: var(--ux-space-xs);
      padding: var(--ux-space-xs) var(--ux-space-sm);
      background: var(--ux-success-soft);
      color: var(--ux-success);
      font-size: var(--ux-font-size-xs);
      font-weight: 500;
      border-radius: var(--ux-border-radius);
    }

    .ux-pwa-cached__icon {
      width: 14px;
      height: 14px;
    }

    /* iOS Safari specific styles */
    @supports (-webkit-touch-callout: none) {
      .ux-pwa-install__subtitle--ios::after {
        content: ' Tap Share then "Add to Home Screen"';
      }
    }

    /* Safe area support */
    @supports (padding: env(safe-area-inset-bottom)) {
      .ux-pwa-status {
        padding-top: calc(var(--ux-space-sm) + env(safe-area-inset-top));
      }
    }

    /* Dark mode adjustments */
    .ux-dark .ux-pwa-install {
      background: var(--ux-surface);
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles(styles, 'ux-pwa');
  } else {
    const styleEl = document.createElement('style');
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // PWA Manager Alpine component
  const pwaComponent = (config = {}) => ({
    // State
    isOnline: navigator.onLine,
    isInstallable: false,
    isStandalone: false,
    hasUpdate: false,
    showInstallBanner: false,
    showOfflineStatus: false,
    showOnlineStatus: false,
    showUpdateBanner: false,
    showOfflineOverlay: false,

    // Config
    serviceWorkerPath: config.serviceWorkerPath || '/sw.js',
    appName: config.appName || document.title,
    appIcon: config.appIcon || '/icon-192.png',
    offlineStatusDuration: config.offlineStatusDuration ?? 3000,
    onlineStatusDuration: config.onlineStatusDuration ?? 2000,
    autoShowInstall: config.autoShowInstall ?? true,
    installDelay: config.installDelay ?? 30000, // 30 seconds

    // Internal
    deferredPrompt: null,
    registration: null,
    statusTimeout: null,

    init() {
      // Check if running as installed PWA
      this.isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                          window.navigator.standalone === true;

      // Online/Offline events
      window.addEventListener('online', () => this.handleOnline());
      window.addEventListener('offline', () => this.handleOffline());

      // Install prompt event
      window.addEventListener('beforeinstallprompt', (e) => this.handleInstallPrompt(e));

      // App installed event
      window.addEventListener('appinstalled', () => this.handleAppInstalled());

      // Register service worker
      if (config.registerServiceWorker !== false) {
        this.registerServiceWorker();
      }

      // Auto-show install banner after delay
      if (this.autoShowInstall && !this.isStandalone) {
        setTimeout(() => {
          if (this.isInstallable && !this.isStandalone) {
            this.showInstallBanner = true;
          }
        }, this.installDelay);
      }
    },

    async registerServiceWorker() {
      if ('serviceWorker' in navigator) {
        try {
          this.registration = await navigator.serviceWorker.register(this.serviceWorkerPath);

          // Check for updates
          this.registration.addEventListener('updatefound', () => {
            const newWorker = this.registration.installing;
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                this.hasUpdate = true;
                this.showUpdateBanner = true;
              }
            });
          });

          // Listen for controller change (after update)
          navigator.serviceWorker.addEventListener('controllerchange', () => {
            if (config.reloadOnUpdate !== false) {
              window.location.reload();
            }
          });

          console.log('Service Worker registered:', this.registration.scope);
        } catch (error) {
          console.error('Service Worker registration failed:', error);
        }
      }
    },

    handleOnline() {
      this.isOnline = true;
      this.showOfflineOverlay = false;
      this.showOnlineStatus = true;

      clearTimeout(this.statusTimeout);
      this.statusTimeout = setTimeout(() => {
        this.showOnlineStatus = false;
      }, this.onlineStatusDuration);

      this.$dispatch('ux-pwa-online');
    },

    handleOffline() {
      this.isOnline = false;
      this.showOfflineStatus = true;

      clearTimeout(this.statusTimeout);
      this.statusTimeout = setTimeout(() => {
        this.showOfflineStatus = false;
      }, this.offlineStatusDuration);

      this.$dispatch('ux-pwa-offline');
    },

    handleInstallPrompt(e) {
      e.preventDefault();
      this.deferredPrompt = e;
      this.isInstallable = true;
      this.$dispatch('ux-pwa-installable');
    },

    handleAppInstalled() {
      this.isInstallable = false;
      this.isStandalone = true;
      this.showInstallBanner = false;
      this.deferredPrompt = null;
      this.$dispatch('ux-pwa-installed');
    },

    async promptInstall() {
      if (!this.deferredPrompt) return false;

      this.deferredPrompt.prompt();
      const { outcome } = await this.deferredPrompt.userChoice;

      if (outcome === 'accepted') {
        this.isInstallable = false;
        this.showInstallBanner = false;
      }

      this.deferredPrompt = null;
      return outcome === 'accepted';
    },

    dismissInstall() {
      this.showInstallBanner = false;
      this.$dispatch('ux-pwa-install-dismissed');
    },

    async applyUpdate() {
      if (this.registration && this.registration.waiting) {
        this.registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      }
      this.showUpdateBanner = false;
    },

    dismissUpdate() {
      this.showUpdateBanner = false;
    },

    // Check if a specific resource is cached
    async isCached(url) {
      if ('caches' in window) {
        const cache = await caches.open('v1');
        const response = await cache.match(url);
        return !!response;
      }
      return false;
    },

    // Clear all caches
    async clearCache() {
      if ('caches' in window) {
        const names = await caches.keys();
        await Promise.all(names.map(name => caches.delete(name)));
        return true;
      }
      return false;
    },

    // Get cache storage estimate
    async getCacheSize() {
      if ('storage' in navigator && 'estimate' in navigator.storage) {
        const estimate = await navigator.storage.estimate();
        return {
          usage: estimate.usage,
          quota: estimate.quota,
          usageFormatted: this.formatBytes(estimate.usage),
          quotaFormatted: this.formatBytes(estimate.quota),
          percentUsed: Math.round((estimate.usage / estimate.quota) * 100)
        };
      }
      return null;
    },

    formatBytes(bytes) {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },

    // Check if iOS
    get isIOS() {
      return /iPad|iPhone|iPod/.test(navigator.userAgent);
    },

    // Check if can install (not iOS Safari in standalone)
    get canInstall() {
      return this.isInstallable && !this.isStandalone;
    }
  });

  // Register Alpine component
  if (window.UX) {
    window.UX.registerComponent('uxPWA', pwaComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxPWA', pwaComponent);
    });
  }

  // Simple offline detection helper (no Alpine required)
  window.UXOffline = {
    isOnline: navigator.onLine,
    callbacks: { online: [], offline: [] },

    init() {
      window.addEventListener('online', () => {
        this.isOnline = true;
        this.callbacks.online.forEach(cb => cb());
      });
      window.addEventListener('offline', () => {
        this.isOnline = false;
        this.callbacks.offline.forEach(cb => cb());
      });
    },

    onOnline(callback) {
      this.callbacks.online.push(callback);
    },

    onOffline(callback) {
      this.callbacks.offline.push(callback);
    }
  };

  // Auto-init
  window.UXOffline.init();

})();
