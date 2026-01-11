/**
 * UX Content Component
 * Contenedor principal de contenido estilo Ionic
 * @requires ux-core.js
 */
(function () {
  'use strict';

  const styles = `
    /* ========================================
       UX App Container
    ======================================== */

    .ux-app {
      display: flex;
      flex-direction: column;
      min-height: 100dvh;
      background-color: var(--ux-background);
    }

    /* ========================================
       UX Page
    ======================================== */

    .ux-page {
      position: relative;
      display: grid;
      grid-template-rows: auto 1fr auto;
      grid-template-areas:
        "header"
        "content"
        "footer";
      flex: 1;
      width: 100%;
      height: 100%;
      min-height: 0;
      contain: layout style;
    }

    /* Page with fixed navbar offset */
    .ux-page--has-navbar {
      height: calc(100% - var(--ux-navbar-height, 56px));
      margin-top: var(--ux-navbar-height, 56px);
    }

    /* Page with fixed footer offset */
    .ux-page--has-tabbar {
      height: calc(100% - var(--ux-tabbar-height, 56px));
      margin-bottom: var(--ux-tabbar-height, 56px);
    }

    /* Page with both navbar and tabbar */
    .ux-page--has-navbar.ux-page--has-tabbar {
      height: calc(100% - var(--ux-navbar-height, 56px) - var(--ux-tabbar-height, 56px));
    }

    /* Alternative: use padding instead of margin (keeps height: 100%) */
    .ux-page--pad-navbar {
      padding-top: var(--ux-navbar-height, 56px);
    }

    .ux-page--pad-tabbar {
      padding-bottom: var(--ux-tabbar-height, 56px);
    }

    .ux-page > .ux-header {
      grid-area: header;
    }

    .ux-page > .ux-content {
      grid-area: content;
      min-height: 0;
    }

    .ux-page > .ux-footer {
      grid-area: footer;
    }

    /* ========================================
       UX Header
    ======================================== */

    .ux-header {
      position: sticky;
      top: 0;
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      z-index: var(--ux-z-sticky);
    }

    .ux-header--fixed {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: var(--ux-z-fixed);
    }

    .ux-header--translucent {
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
      position: sticky;
      bottom: 0;
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      z-index: var(--ux-z-sticky);
    }

    .ux-footer--fixed {
      position: fixed;
      bottom: 0;
      z-index: var(--ux-z-fixed);
      left: 0;
      right: 0;
    }

    .ux-footer--translucent {
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
    }

    .ux-footer--safe-area {
      padding-bottom: env(safe-area-inset-bottom);
    }

    /* ========================================
       UX Split Pane (iPad/Tablet layout)
       Like Ionic: responsive sidebar with
       push/overlay modes
    ======================================== */

    .ux-split-pane {
      --ux-split-pane-side-width: 270px;
      --ux-split-pane-side-min-width: 270px;
      --ux-split-pane-side-max-width: 28%;
      --ux-split-pane-breakpoint: 992px;

      position: relative;
      display: flex;
      width: 100%;
      height: 100dvh;
      max-height: 100dvh;
      overflow: hidden;
    }

    /* Backdrop for overlay mode (mobile) */
    .ux-split-pane__backdrop {
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.4);
      z-index: var(--ux-z-modal-backdrop);
      opacity: 0;
      visibility: hidden;
      transition:
        opacity 350ms var(--ux-ease-ios),
        visibility 350ms var(--ux-ease-ios);
      -webkit-tap-highlight-color: transparent;
    }

    .ux-split-pane--open .ux-split-pane__backdrop {
      opacity: 1;
      visibility: visible;
    }

    /* Hide backdrop on large screens (push mode) */
    @media (min-width: 992px) {
      .ux-split-pane__backdrop {
        display: none;
      }
    }

    /* Side Panel */
    .ux-split-pane__side {
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      z-index: var(--ux-z-modal);
      display: flex;
      flex-direction: column;
      width: var(--ux-split-pane-side-width);
      max-width: 85dvw;
      background-color: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      border-right: 0.5px solid var(--ux-glass-border);
      overflow: hidden;
      transform: translateX(-100%);
      /* iOS-style smooth transition */
      transition: transform 350ms var(--ux-ease-ios);
      will-change: transform;
    }

    /* Open state for mobile (overlay) */
    .ux-split-pane--open .ux-split-pane__side {
      transform: translateX(0);
    }

    /* Large screens: always visible, push mode */
    @media (min-width: 992px) {
      .ux-split-pane__side {
        position: relative;
        z-index: auto;
        width: clamp(
          var(--ux-split-pane-side-min-width),
          var(--ux-split-pane-side-max-width),
          350px
        );
        max-width: none;
        height: 100dvh;
        max-height: 100dvh;
        transform: translateX(0);
        flex-shrink: 0;
      }

      /* Collapsed state - slide out with animation */
      .ux-split-pane--collapsed .ux-split-pane__side {
        transform: translateX(-100%);
        position: absolute;
      }

      .ux-split-pane--collapsed.ux-split-pane--end .ux-split-pane__side {
        transform: translateX(100%);
      }
    }

    /* Main Content */
    .ux-split-pane__main {
      flex: 1;
      min-width: 0;
      width: 100%;
      height: 100dvh;
      max-height: 100dvh;
      overflow-y: auto;
      overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
      /* iOS-style smooth transition for layout changes */
      transition: margin-left 350ms var(--ux-ease-ios);
    }

    /* Navbar inside main is sticky */
    .ux-split-pane__main > .ux-navbar {
      position: sticky;
      top: 0;
      z-index: var(--ux-z-sticky);
    }

    /* Navbar inside sidebar inherits glass effect */
    .ux-split-pane__side > .ux-navbar {
      background: transparent;
      border-bottom: 0.5px solid var(--ux-glass-border);
    }

    /* When sidebar visible on large screens, no margin needed (flexbox handles it) */
    @media (min-width: 992px) {
      .ux-split-pane__main {
        /* Push mode: content automatically adjusts via flex */
      }
    }

    /* ========================================
       Split Pane Variants
    ======================================== */

    /* Right side panel */
    .ux-split-pane--end .ux-split-pane__side {
      left: auto;
      right: 0;
      border-right: none;
      border-left: 0.5px solid var(--ux-glass-border);
      transform: translateX(100%);
    }

    .ux-split-pane--end.ux-split-pane--open .ux-split-pane__side {
      transform: translateX(0);
    }

    @media (min-width: 992px) {
      .ux-split-pane--end {
        flex-direction: row-reverse;
      }

      .ux-split-pane--end .ux-split-pane__side {
        transform: translateX(0);
      }
    }

    /* Always visible (no toggle needed) */
    .ux-split-pane--visible .ux-split-pane__side {
      transform: translateX(0);
    }

    .ux-split-pane--visible .ux-split-pane__backdrop {
      display: none;
    }

    @media (max-width: 991px) {
      .ux-split-pane--visible .ux-split-pane__side {
        position: relative;
        max-width: 50%;
      }
    }

    /* Always hidden (use as drawer only) */
    @media (min-width: 992px) {
      .ux-split-pane--drawer .ux-split-pane__side {
        position: fixed;
        transform: translateX(-100%);
      }

      .ux-split-pane--drawer.ux-split-pane--end .ux-split-pane__side {
        transform: translateX(100%);
      }

      .ux-split-pane--drawer.ux-split-pane--open .ux-split-pane__side {
        transform: translateX(0);
      }

      .ux-split-pane--drawer .ux-split-pane__backdrop {
        display: block;
      }
    }

    /* Glass variant */
    .ux-split-pane__side--glass {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      border-right-color: var(--ux-glass-border);
    }

    /* ========================================
       Split Pane Menu Button
    ======================================== */

    .ux-split-pane__toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      padding: 0;
      background: none;
      border: none;
      color: var(--ux-primary);
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }

    .ux-split-pane__toggle:hover {
      opacity: 0.7;
    }

    .ux-split-pane__toggle svg {
      width: 24px;
      height: 24px;
    }

    /* Hide toggle on large screens when not in drawer mode */
    @media (min-width: 992px) {
      .ux-split-pane:not(.ux-split-pane--drawer) .ux-split-pane__toggle {
        display: none;
      }
    }

    /* Collapse button for desktop - sits on sidebar edge */
    .ux-split-pane__collapse {
      display: none;
      position: absolute;
      top: 50%;
      right: -12px;
      transform: translateY(-50%);
      z-index: 10;
      width: 24px;
      height: 24px;
      padding: 0;
      background: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: 50%;
      color: var(--ux-text-secondary);
      cursor: pointer;
      box-shadow: var(--ux-shadow-sm);
      transition: all 250ms var(--ux-ease-ios);
      -webkit-tap-highlight-color: transparent;
    }

    .ux-split-pane__collapse:hover {
      background: var(--ux-surface-secondary);
      color: var(--ux-text);
    }

    .ux-split-pane__collapse svg {
      width: 14px;
      height: 14px;
      transition: transform 250ms var(--ux-ease-ios);
    }

    /* Rotate icon when collapsed */
    .ux-split-pane--collapsed .ux-split-pane__collapse svg {
      transform: rotate(180deg);
    }

    /* Show collapse button only on large screens */
    @media (min-width: 992px) {
      .ux-split-pane__collapse {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      /* When collapsed, position button at left edge of viewport */
      .ux-split-pane--collapsed .ux-split-pane__collapse {
        position: fixed;
        left: 0;
        right: auto;
        top: 50%;
        border-radius: 0 50% 50% 0;
        border-left: none;
      }
    }

    /* End position adjustments */
    .ux-split-pane--end .ux-split-pane__collapse {
      right: auto;
      left: -12px;
    }

    .ux-split-pane--end .ux-split-pane__collapse svg {
      transform: rotate(180deg);
    }

    .ux-split-pane--end.ux-split-pane--collapsed .ux-split-pane__collapse svg {
      transform: rotate(0deg);
    }

    @media (min-width: 992px) {
      .ux-split-pane--end.ux-split-pane--collapsed .ux-split-pane__collapse {
        left: auto;
        right: 0;
        border-radius: 50% 0 0 50%;
        border-left: 1px solid var(--ux-border-color);
        border-right: none;
      }
    }

    /* ========================================
       Scroll Utilities
    ======================================== */

    .ux-scroll {
      flex: 1;
      min-height: 0;
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
       Fixed Slot (elements outside scroll)
    ======================================== */

    .ux-content__fixed {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
      z-index: 2;
    }

    .ux-content__fixed > * {
      pointer-events: auto;
    }

    /* Fixed position helpers */
    .ux-fixed-top {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
    }

    .ux-fixed-bottom {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
    }

    .ux-fixed-top-left {
      position: absolute;
      top: 0;
      left: 0;
    }

    .ux-fixed-top-right {
      position: absolute;
      top: 0;
      right: 0;
    }

    .ux-fixed-bottom-left {
      position: absolute;
      bottom: 0;
      left: 0;
    }

    .ux-fixed-bottom-right {
      position: absolute;
      bottom: 0;
      right: 0;
    }

    .ux-fixed-center {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
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

  // Alpine component for content with scroll events and methods
  // ARIA: Main content landmark
  const contentComponent = (config = {}) => ({
    scrollTop: 0,
    scrollLeft: 0,
    scrollHeight: 0,
    scrollWidth: 0,
    clientHeight: 0,
    clientWidth: 0,
    isScrolling: false,
    scrollEvents: config.scrollEvents || false,
    _scrollTimeout: null,
    _lastScrollTop: 0,
    _scrollDirection: 'down',
    contentId: config.id || 'ux-content-' + Math.random().toString(36).substr(2, 9),

    // ARIA attributes
    get ariaAttrs() {
      return {
        'role': 'main',
        'id': this.contentId
      };
    },

    init() {
      this.$nextTick(() => {
        this.updateScrollInfo();
      });
    },

    // Get content element
    getContentElement() {
      return this.$refs.content || this.$el;
    },

    // Update scroll information
    updateScrollInfo() {
      const el = this.getContentElement();
      if (!el) return;

      this.scrollTop = el.scrollTop;
      this.scrollLeft = el.scrollLeft;
      this.scrollHeight = el.scrollHeight;
      this.scrollWidth = el.scrollWidth;
      this.clientHeight = el.clientHeight;
      this.clientWidth = el.clientWidth;
    },

    // Handle scroll event
    handleScroll(event) {
      const el = event.target;

      // Determine scroll direction
      this._scrollDirection = el.scrollTop > this._lastScrollTop ? 'down' : 'up';
      this._lastScrollTop = el.scrollTop;

      // Update scroll info
      this.scrollTop = el.scrollTop;
      this.scrollLeft = el.scrollLeft;

      // Dispatch scroll start
      if (!this.isScrolling) {
        this.isScrolling = true;
        this.$dispatch('ux-scroll-start', {
          scrollTop: this.scrollTop,
          scrollLeft: this.scrollLeft,
          direction: this._scrollDirection
        });
      }

      // Dispatch scroll event (throttled if scrollEvents is false)
      if (this.scrollEvents) {
        this.$dispatch('ux-scroll', {
          scrollTop: this.scrollTop,
          scrollLeft: this.scrollLeft,
          scrollHeight: el.scrollHeight,
          clientHeight: el.clientHeight,
          direction: this._scrollDirection,
          detail: {
            currentY: this.scrollTop,
            currentX: this.scrollLeft,
            deltaY: el.scrollTop - this._lastScrollTop,
            velocityY: 0 // Would need RAF for accurate velocity
          }
        });
      }

      // Dispatch scroll end (debounced)
      clearTimeout(this._scrollTimeout);
      this._scrollTimeout = setTimeout(() => {
        this.isScrolling = false;
        this.$dispatch('ux-scroll-end', {
          scrollTop: this.scrollTop,
          scrollLeft: this.scrollLeft,
          direction: this._scrollDirection
        });
      }, 150);
    },

    // Scroll to top
    scrollToTop(duration = 300) {
      return this.scrollToPoint(0, 0, duration);
    },

    // Scroll to bottom
    scrollToBottom(duration = 300) {
      const el = this.getContentElement();
      if (!el) return Promise.resolve();

      return this.scrollToPoint(0, el.scrollHeight - el.clientHeight, duration);
    },

    // Scroll to specific point
    scrollToPoint(x, y, duration = 300) {
      const el = this.getContentElement();
      if (!el) return Promise.resolve();

      return new Promise((resolve) => {
        if (duration === 0) {
          el.scrollTop = y;
          el.scrollLeft = x;
          this.updateScrollInfo();
          resolve();
          return;
        }

        el.scrollTo({
          top: y,
          left: x,
          behavior: 'smooth'
        });

        // Resolve after animation
        setTimeout(() => {
          this.updateScrollInfo();
          resolve();
        }, duration);
      });
    },

    // Scroll by amount
    scrollByPoint(x, y, duration = 300) {
      const el = this.getContentElement();
      if (!el) return Promise.resolve();

      return this.scrollToPoint(
        el.scrollLeft + x,
        el.scrollTop + y,
        duration
      );
    },

    // Scroll to element
    scrollToElement(selector, duration = 300) {
      const el = this.getContentElement();
      const target = el?.querySelector(selector);
      if (!target) return Promise.resolve();

      const targetRect = target.getBoundingClientRect();
      const contentRect = el.getBoundingClientRect();

      return this.scrollToPoint(
        el.scrollLeft,
        el.scrollTop + (targetRect.top - contentRect.top),
        duration
      );
    },

    // Get scroll element (for external use)
    getScrollElement() {
      return this.getContentElement();
    },

    // Check if scrolled to top
    get isAtTop() {
      return this.scrollTop <= 0;
    },

    // Check if scrolled to bottom
    get isAtBottom() {
      const el = this.getContentElement();
      if (!el) return false;
      return this.scrollTop >= el.scrollHeight - el.clientHeight - 1;
    },

    // Get scroll progress (0 to 1)
    get scrollProgress() {
      const el = this.getContentElement();
      if (!el || el.scrollHeight <= el.clientHeight) return 0;
      return this.scrollTop / (el.scrollHeight - el.clientHeight);
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxContent', contentComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxContent', contentComponent);
    });
  }

  // Alpine component for page
  // Handles page-level concerns like visibility, lifecycle
  const pageComponent = (config = {}) => ({
    isActive: config.isActive !== false,
    pageId: config.id || 'ux-page-' + Math.random().toString(36).substr(2, 9),

    // ARIA attributes
    get ariaAttrs() {
      return {
        'role': 'document',
        'id': this.pageId,
        'aria-hidden': !this.isActive ? 'true' : 'false'
      };
    },

    // Lifecycle methods
    onEnter() {
      this.isActive = true;
      this.$dispatch('ux-page-enter', { pageId: this.pageId });
    },

    onLeave() {
      this.isActive = false;
      this.$dispatch('ux-page-leave', { pageId: this.pageId });
    },

    // For use with routers
    activate() {
      this.onEnter();
    },

    deactivate() {
      this.onLeave();
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxPage', pageComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxPage', pageComponent);
    });
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

  // Alpine component for Split Pane (Ionic-style)
  // Handles responsive sidebar with push/overlay modes
  const splitPaneComponent = (config = {}) => ({
    isOpen: false,
    isCollapsed: config.collapsed || false,
    mode: config.mode || 'auto', // 'auto', 'push', 'overlay', 'visible'
    side: config.side || 'start', // 'start' or 'end'
    breakpoint: config.breakpoint || 992,
    closeOnBackdrop: config.closeOnBackdrop !== false,
    closeOnEscape: config.closeOnEscape !== false,
    _mediaQuery: null,
    _isLargeScreen: false,

    init() {
      // Setup media query listener
      this._mediaQuery = window.matchMedia(`(min-width: ${this.breakpoint}px)`);
      this._isLargeScreen = this._mediaQuery.matches;

      const handleChange = (e) => {
        this._isLargeScreen = e.matches;
        // Auto-close on resize to large screen (push mode takes over)
        if (e.matches && this.mode !== 'overlay') {
          this.isOpen = false;
        }
        this.$dispatch('splitpane-breakpoint', { isLargeScreen: e.matches });
      };

      this._mediaQuery.addEventListener('change', handleChange);

      // Escape key handler
      if (this.closeOnEscape) {
        this._escapeHandler = (e) => {
          if (e.key === 'Escape' && this.isOpen) {
            this.close();
          }
        };
        document.addEventListener('keydown', this._escapeHandler);
      }
    },

    destroy() {
      if (this._escapeHandler) {
        document.removeEventListener('keydown', this._escapeHandler);
      }
    },

    // Open the sidebar (for mobile/overlay mode)
    open() {
      this.isOpen = true;
      if (!this._isLargeScreen || this.mode === 'overlay') {
        if (window.UX?.lockScroll) {
          window.UX.lockScroll();
        } else {
          document.body.style.overflow = 'hidden';
        }
      }
      this.$dispatch('splitpane-open');
    },

    // Close the sidebar
    close() {
      this.isOpen = false;
      if (window.UX?.unlockScroll) {
        window.UX.unlockScroll();
      } else {
        document.body.style.overflow = '';
      }
      this.$dispatch('splitpane-close');
    },

    // Toggle the sidebar
    toggle() {
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    },

    // Handle backdrop click
    handleBackdropClick() {
      if (this.closeOnBackdrop) {
        this.close();
      }
    },

    // Collapse/expand on large screens
    collapse() {
      this.isCollapsed = true;
      this.$dispatch('splitpane-collapse');
    },

    expand() {
      this.isCollapsed = false;
      this.$dispatch('splitpane-expand');
    },

    toggleCollapse() {
      if (this.isCollapsed) {
        this.expand();
      } else {
        this.collapse();
      }
    },

    // Check if sidebar is visible (either open or on large screen)
    get isVisible() {
      if (this.mode === 'visible') return true;
      if (this._isLargeScreen && this.mode !== 'overlay' && !this.isCollapsed) {
        return true;
      }
      return this.isOpen;
    },

    // Check if we're in overlay mode (mobile or forced overlay)
    get isOverlay() {
      return !this._isLargeScreen || this.mode === 'overlay';
    },

    // Get container classes
    get containerClasses() {
      return {
        'ux-split-pane--open': this.isOpen,
        'ux-split-pane--collapsed': this.isCollapsed,
        'ux-split-pane--end': this.side === 'end',
        'ux-split-pane--visible': this.mode === 'visible',
        'ux-split-pane--drawer': this.mode === 'overlay'
      };
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxSplitPane', splitPaneComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxSplitPane', splitPaneComponent);
    });
  }

  // Menu icon SVG for split pane toggle button
  const menuIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;

  // Export for use in templates
  window.UX = window.UX || {};
  window.UX.menuIconSvg = menuIconSvg;
})();
