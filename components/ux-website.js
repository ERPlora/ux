/**
 * UX Website Layout
 * Sitio web tradicional para landing pages y documentación
 * Navbar + Main + Footer
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Website - CSS Variables
    ======================================== */

    :root {
      --ux-website-navbar-height: 4rem;  /* 64px */
    }

    /* ========================================
       UX Website Container
    ======================================== */

    .ux-website {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      min-height: 100dvh;
      background-color: var(--ux-background);
    }

    /* ========================================
       UX Website Navbar
    ======================================== */

    .ux-website__navbar {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      height: var(--ux-website-navbar-height);
      padding: 0 var(--ux-space-lg);
      background-color: var(--ux-surface);
      border-bottom: 1px solid var(--ux-border-color);
      gap: var(--ux-space-lg);
      z-index: var(--ux-z-sticky);
    }

    /* Sticky navbar */
    .ux-website__navbar--sticky {
      position: sticky;
      top: 0;
    }

    /* Transparent navbar */
    .ux-website__navbar--transparent {
      background-color: transparent;
      border-bottom: none;
    }

    /* Glass navbar */
    .ux-website__navbar--glass {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      border-bottom: 0.5px solid var(--ux-glass-border);
    }

    /* Brand/Logo */
    .ux-website__brand {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
      font-size: var(--ux-font-size-xl);
      font-weight: 700;
      color: var(--ux-text);
      text-decoration: none;
      flex-shrink: 0;
    }

    .ux-website__brand:hover {
      color: var(--ux-text);
      text-decoration: none;
    }

    .ux-website__brand img {
      height: 2rem;
      width: auto;
    }

    /* Navigation links */
    .ux-website__nav {
      flex: 1;
      display: flex;
      align-items: center;
      gap: var(--ux-space-md);
    }

    .ux-website__nav a {
      color: var(--ux-text-secondary);
      text-decoration: none;
      font-weight: 500;
      padding: var(--ux-space-xs) var(--ux-space-sm);
      border-radius: var(--ux-border-radius);
      transition: color var(--ux-transition-fast) var(--ux-ease),
                  background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-website__nav a:hover {
      color: var(--ux-text);
      background-color: var(--ux-surface-secondary);
    }

    .ux-website__nav a.active,
    .ux-website__nav a[aria-current="page"] {
      color: var(--ux-primary);
    }

    /* Actions (CTA buttons) */
    .ux-website__actions {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
      flex-shrink: 0;
    }

    /* Mobile toggle (burger) */
    .ux-website__toggle {
      display: none;
      align-items: center;
      justify-content: center;
      width: var(--ux-touch-target);
      height: var(--ux-touch-target);
      padding: 0;
      border: none;
      background: none;
      color: var(--ux-text);
      cursor: pointer;
      border-radius: var(--ux-border-radius);
      transition: background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-website__toggle:hover {
      background-color: var(--ux-surface-secondary);
    }

    .ux-website__toggle svg {
      width: 1.5rem;
      height: 1.5rem;
    }

    /* Mobile responsive */
    @media (max-width: 767px) {
      .ux-website__nav {
        display: none;
      }

      .ux-website__toggle {
        display: flex;
      }

      .ux-website__actions {
        display: none;
      }

      /* Show actions on mobile when specified */
      .ux-website__navbar--show-actions .ux-website__actions {
        display: flex;
      }
    }

    /* ========================================
       UX Website Mobile Menu
    ======================================== */

    .ux-website__mobile-menu {
      position: fixed;
      top: var(--ux-website-navbar-height);
      left: 0;
      right: 0;
      bottom: 0;
      background-color: var(--ux-surface);
      z-index: calc(var(--ux-z-sticky) - 1);
      padding: var(--ux-space-lg);
      overflow-y: auto;
      transform: translateY(-100%);
      opacity: 0;
      visibility: hidden;
      transition: transform var(--ux-transition-base) var(--ux-ease),
                  opacity var(--ux-transition-base) var(--ux-ease),
                  visibility var(--ux-transition-base) var(--ux-ease);
    }

    .ux-website__mobile-menu--open {
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
    }

    .ux-website__mobile-menu a {
      display: block;
      padding: var(--ux-space-md);
      color: var(--ux-text);
      text-decoration: none;
      font-size: var(--ux-font-size-lg);
      font-weight: 500;
      border-radius: var(--ux-border-radius);
      transition: background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-website__mobile-menu a:hover {
      background-color: var(--ux-surface-secondary);
    }

    .ux-website__mobile-menu .ux-website__actions {
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-sm);
      margin-top: var(--ux-space-lg);
      padding-top: var(--ux-space-lg);
      border-top: 1px solid var(--ux-border-color);
    }

    .ux-website__mobile-menu .ux-website__actions .ux-button {
      width: 100%;
      justify-content: center;
    }

    /* ========================================
       UX Website Main
    ======================================== */

    .ux-website__main {
      flex: 1;
    }

    /* ========================================
       UX Website Footer
    ======================================== */

    .ux-website__footer {
      flex-shrink: 0;
      padding: var(--ux-space-2xl) var(--ux-space-lg);
      background-color: var(--ux-surface-secondary);
      border-top: 1px solid var(--ux-border-color);
    }

    .ux-website__footer--dark {
      background-color: var(--ux-dark);
      color: var(--ux-dark-contrast);
      border-top: none;
    }

    .ux-website__footer--dark a {
      color: var(--ux-dark-contrast);
      opacity: 0.8;
    }

    .ux-website__footer--dark a:hover {
      opacity: 1;
    }

    /* Footer grid */
    .ux-website__footer-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
      gap: var(--ux-space-xl);
      max-width: 75rem;
      margin: 0 auto;
    }

    .ux-website__footer-section h4 {
      font-size: var(--ux-font-size-sm);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--ux-text-secondary);
      margin: 0 0 var(--ux-space-md);
    }

    .ux-website__footer-section a {
      display: block;
      color: var(--ux-text);
      text-decoration: none;
      padding: var(--ux-space-xs) 0;
      transition: color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-website__footer-section a:hover {
      color: var(--ux-primary);
    }

    /* Footer bottom */
    .ux-website__footer-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: var(--ux-space-md);
      max-width: 75rem;
      margin: var(--ux-space-xl) auto 0;
      padding-top: var(--ux-space-xl);
      border-top: 1px solid var(--ux-border-color);
    }

    .ux-website__footer--dark .ux-website__footer-bottom {
      border-top-color: rgba(255, 255, 255, 0.1);
    }

    .ux-website__copyright {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
    }

    .ux-website__social {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
    }

    .ux-website__social a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--ux-touch-target);
      height: var(--ux-touch-target);
      color: var(--ux-text-secondary);
      border-radius: var(--ux-border-radius);
      transition: color var(--ux-transition-fast) var(--ux-ease),
                  background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-website__social a:hover {
      color: var(--ux-text);
      background-color: var(--ux-surface-secondary);
    }

    .ux-website__footer--dark .ux-website__social a:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    /* ========================================
       UX Website Sections
    ======================================== */

    .ux-website__section {
      padding: var(--ux-space-3xl) var(--ux-space-lg);
    }

    .ux-website__section--hero {
      padding: var(--ux-space-4xl) var(--ux-space-lg);
      text-align: center;
    }

    .ux-website__section--alt {
      background-color: var(--ux-surface-secondary);
    }

    .ux-website__section--dark {
      background-color: var(--ux-dark);
      color: var(--ux-dark-contrast);
    }

    .ux-website__container {
      max-width: 75rem;
      margin: 0 auto;
    }

    .ux-website__container--narrow {
      max-width: 50rem;
    }

    .ux-website__container--wide {
      max-width: 90rem;
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-website-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-website-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for website
  const websiteComponent = (config = {}) => ({
    mobileMenuOpen: false,
    scrolled: false,
    _scrollHandler: null,

    init() {
      // Track scroll for navbar effects
      this._scrollHandler = () => {
        this.scrolled = window.scrollY > 10;
      };
      window.addEventListener('scroll', this._scrollHandler, { passive: true });

      // Close mobile menu on resize
      window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && this.mobileMenuOpen) {
          this.closeMobileMenu();
        }
      });

      // Close mobile menu on escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.mobileMenuOpen) {
          this.closeMobileMenu();
        }
      });
    },

    destroy() {
      if (this._scrollHandler) {
        window.removeEventListener('scroll', this._scrollHandler);
      }
    },

    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
      if (this.mobileMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    },

    openMobileMenu() {
      this.mobileMenuOpen = true;
      document.body.style.overflow = 'hidden';
    },

    closeMobileMenu() {
      this.mobileMenuOpen = false;
      document.body.style.overflow = '';
    },

    // Smooth scroll to section
    scrollToSection(selector) {
      const el = document.querySelector(selector);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        this.closeMobileMenu();
      }
    }
  });

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxWebsite', websiteComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxWebsite', websiteComponent);
    });
  }
})();
