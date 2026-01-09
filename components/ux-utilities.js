(function() {
  'use strict';

  /* ========================================
     UX Utilities
     CSS utilities and Alpine.js directives/magic helpers
  ======================================== */

  const styles = `
    /* ========================================
       Visibility Helpers
    ======================================== */

    /* Hide visually but keep accessible to screen readers */
    .ux-sr-only {
      position: absolute !important;
      width: 1px !important;
      height: 1px !important;
      padding: 0 !important;
      margin: -1px !important;
      overflow: hidden !important;
      clip: rect(0, 0, 0, 0) !important;
      white-space: nowrap !important;
      border: 0 !important;
    }

    /* Completely hidden */
    .ux-hidden {
      display: none !important;
    }

    /* Invisible but takes space */
    .ux-invisible {
      visibility: hidden !important;
    }

    /* Responsive visibility */
    @media (max-width: 575px) {
      .ux-hidden-xs { display: none !important; }
      .ux-visible-xs { display: block !important; }
      .ux-visible-xs-inline { display: inline !important; }
      .ux-visible-xs-flex { display: flex !important; }
    }

    @media (min-width: 576px) and (max-width: 767px) {
      .ux-hidden-sm { display: none !important; }
      .ux-visible-sm { display: block !important; }
      .ux-visible-sm-inline { display: inline !important; }
      .ux-visible-sm-flex { display: flex !important; }
    }

    @media (min-width: 768px) and (max-width: 991px) {
      .ux-hidden-md { display: none !important; }
      .ux-visible-md { display: block !important; }
      .ux-visible-md-inline { display: inline !important; }
      .ux-visible-md-flex { display: flex !important; }
    }

    @media (min-width: 992px) and (max-width: 1199px) {
      .ux-hidden-lg { display: none !important; }
      .ux-visible-lg { display: block !important; }
      .ux-visible-lg-inline { display: inline !important; }
      .ux-visible-lg-flex { display: flex !important; }
    }

    @media (min-width: 1200px) {
      .ux-hidden-xl { display: none !important; }
      .ux-visible-xl { display: block !important; }
      .ux-visible-xl-inline { display: inline !important; }
      .ux-visible-xl-flex { display: flex !important; }
    }

    /* Mobile/Desktop shortcuts */
    @media (max-width: 767px) {
      .ux-desktop-only { display: none !important; }
    }

    @media (min-width: 768px) {
      .ux-mobile-only { display: none !important; }
    }

    /* Touch/No-touch visibility */
    @media (hover: none) and (pointer: coarse) {
      .ux-no-touch { display: none !important; }
    }

    @media (hover: hover) and (pointer: fine) {
      .ux-touch-only { display: none !important; }
    }

    /* Dark/Light mode visibility */
    @media (prefers-color-scheme: dark) {
      .ux-light-only { display: none !important; }
    }

    @media (prefers-color-scheme: light) {
      .ux-dark-only { display: none !important; }
    }

    .ux-dark .ux-light-only { display: none !important; }
    .ux-dark .ux-dark-only { display: block !important; }
    .ux-light .ux-dark-only { display: none !important; }
    .ux-light .ux-light-only { display: block !important; }

    /* ========================================
       Print Utilities
    ======================================== */

    @media print {
      /* Hide elements when printing */
      .ux-no-print {
        display: none !important;
      }

      /* Show only when printing */
      .ux-print-only {
        display: block !important;
      }

      /* Page break utilities */
      .ux-print-break-before {
        page-break-before: always !important;
        break-before: page !important;
      }

      .ux-print-break-after {
        page-break-after: always !important;
        break-after: page !important;
      }

      .ux-print-break-avoid {
        page-break-inside: avoid !important;
        break-inside: avoid !important;
      }

      /* Print-friendly backgrounds */
      .ux-print-bg {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        color-adjust: exact !important;
      }

      /* Remove shadows for print */
      * {
        box-shadow: none !important;
        text-shadow: none !important;
      }

      /* Expand links for print */
      a[href^="http"]::after {
        content: " (" attr(href) ")";
        font-size: 0.8em;
        color: #666;
      }

      /* Page margins */
      @page {
        margin: 1.5cm;
      }

      /* Ensure content is visible */
      body {
        background: white !important;
        color: black !important;
      }
    }

    /* Hidden until print */
    .ux-print-only {
      display: none !important;
    }

    /* ========================================
       Scroll Lock Body Class
    ======================================== */

    .ux-scroll-locked {
      overflow: hidden !important;
      position: fixed !important;
      width: 100% !important;
      height: 100% !important;
    }

    /* Preserve scroll position */
    .ux-scroll-locked--preserve {
      overflow: hidden !important;
    }

    /* ========================================
       Focus Ring Utilities
    ======================================== */

    .ux-focus-visible:focus {
      outline: none;
    }

    .ux-focus-visible:focus-visible {
      outline: 2px solid var(--ux-primary);
      outline-offset: 2px;
    }

    .ux-focus-ring:focus {
      outline: none;
      box-shadow: 0 0 0 3px var(--ux-primary-tint);
    }

    .ux-focus-ring--inset:focus {
      outline: none;
      box-shadow: inset 0 0 0 3px var(--ux-primary-tint);
    }

    /* Remove focus ring on mouse click, keep for keyboard */
    .ux-focus-keyboard:focus:not(:focus-visible) {
      outline: none;
      box-shadow: none;
    }

    /* ========================================
       Interactive State Utilities
    ======================================== */

    .ux-disabled {
      opacity: 0.5 !important;
      pointer-events: none !important;
      cursor: not-allowed !important;
    }

    .ux-loading {
      pointer-events: none !important;
      cursor: wait !important;
    }

    .ux-clickable {
      cursor: pointer !important;
    }

    .ux-draggable {
      cursor: grab !important;
    }

    .ux-dragging {
      cursor: grabbing !important;
    }

    /* ========================================
       Text Selection Utilities
    ======================================== */

    .ux-select-none {
      user-select: none !important;
      -webkit-user-select: none !important;
    }

    .ux-select-text {
      user-select: text !important;
      -webkit-user-select: text !important;
    }

    .ux-select-all {
      user-select: all !important;
      -webkit-user-select: all !important;
    }

    /* ========================================
       Pointer Events Utilities
    ======================================== */

    .ux-pointer-none {
      pointer-events: none !important;
    }

    .ux-pointer-auto {
      pointer-events: auto !important;
    }

    /* ========================================
       Overflow Utilities
    ======================================== */

    .ux-overflow-hidden { overflow: hidden !important; }
    .ux-overflow-auto { overflow: auto !important; }
    .ux-overflow-scroll { overflow: scroll !important; }
    .ux-overflow-visible { overflow: visible !important; }

    .ux-overflow-x-hidden { overflow-x: hidden !important; }
    .ux-overflow-x-auto { overflow-x: auto !important; }
    .ux-overflow-x-scroll { overflow-x: scroll !important; }

    .ux-overflow-y-hidden { overflow-y: hidden !important; }
    .ux-overflow-y-auto { overflow-y: auto !important; }
    .ux-overflow-y-scroll { overflow-y: scroll !important; }

    /* Scrollbar styling */
    .ux-scrollbar-thin {
      scrollbar-width: thin;
    }

    .ux-scrollbar-none {
      scrollbar-width: none;
      -ms-overflow-style: none;
    }

    .ux-scrollbar-none::-webkit-scrollbar {
      display: none;
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-utilities-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-utilities-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  /* ========================================
     JavaScript Utilities
  ======================================== */

  // Ensure UX namespace exists
  window.UX = window.UX || {};

  /* ----------------------------------------
     Focus Trap
  ---------------------------------------- */

  // Store for active focus traps
  const focusTraps = new Map();

  /**
   * Trap focus within an element
   * @param {HTMLElement} element - Container to trap focus in
   * @param {Object} options - Configuration options
   * @returns {Function} Function to remove the trap
   */
  window.UX.trapFocus = function(element, options = {}) {
    const {
      initialFocus = null,  // Element or selector to focus initially
      returnFocus = true,   // Return focus to previously focused element on release
      escapeDeactivates = false // Deactivate trap on Escape key
    } = options;

    const previouslyFocused = document.activeElement;

    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled]):not([type="hidden"])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]'
    ].join(', ');

    function getFocusableElements() {
      return [...element.querySelectorAll(focusableSelectors)]
        .filter(el => el.offsetParent !== null); // Only visible elements
    }

    function handleKeyDown(e) {
      if (e.key === 'Tab') {
        const focusable = getFocusableElements();
        if (focusable.length === 0) return;

        const firstFocusable = focusable[0];
        const lastFocusable = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable.focus();
          }
        }
      }

      if (escapeDeactivates && e.key === 'Escape') {
        release();
      }
    }

    function release() {
      element.removeEventListener('keydown', handleKeyDown);
      focusTraps.delete(element);

      if (returnFocus && previouslyFocused && previouslyFocused.focus) {
        previouslyFocused.focus();
      }
    }

    // Set up trap
    element.addEventListener('keydown', handleKeyDown);
    focusTraps.set(element, release);

    // Set initial focus
    requestAnimationFrame(() => {
      if (initialFocus) {
        const target = typeof initialFocus === 'string'
          ? element.querySelector(initialFocus)
          : initialFocus;
        if (target) target.focus();
      } else {
        const focusable = getFocusableElements();
        if (focusable.length > 0) focusable[0].focus();
      }
    });

    return release;
  };

  /**
   * Release a focus trap
   * @param {HTMLElement} element - The trapped element
   */
  window.UX.releaseFocusTrap = function(element) {
    const release = focusTraps.get(element);
    if (release) release();
  };

  /* ----------------------------------------
     Click Outside
  ---------------------------------------- */

  /**
   * Detect clicks outside an element
   * @param {HTMLElement} element - Target element
   * @param {Function} callback - Callback when clicked outside
   * @param {Object} options - Configuration
   * @returns {Function} Cleanup function
   */
  window.UX.onClickOutside = function(element, callback, options = {}) {
    const {
      ignore = [],  // Elements or selectors to ignore
      capture = true // Use capture phase
    } = options;

    function handleClick(e) {
      // Check if click is on the element
      if (element.contains(e.target)) return;

      // Check ignored elements
      for (const ignored of ignore) {
        if (typeof ignored === 'string') {
          if (e.target.closest(ignored)) return;
        } else if (ignored instanceof HTMLElement) {
          if (ignored.contains(e.target)) return;
        }
      }

      callback(e);
    }

    // Delay adding listener to avoid immediate trigger
    setTimeout(() => {
      document.addEventListener('click', handleClick, capture);
      document.addEventListener('touchstart', handleClick, capture);
    }, 0);

    return function cleanup() {
      document.removeEventListener('click', handleClick, capture);
      document.removeEventListener('touchstart', handleClick, capture);
    };
  };

  /* ----------------------------------------
     Scroll Lock
  ---------------------------------------- */

  let scrollLockCount = 0;
  let scrollPosition = 0;

  /**
   * Lock body scroll
   * @param {boolean} preservePosition - Keep scroll position
   */
  window.UX.lockScroll = function(preservePosition = true) {
    scrollLockCount++;

    if (scrollLockCount === 1) {
      scrollPosition = window.scrollY;

      if (preservePosition) {
        document.body.style.top = `-${scrollPosition}px`;
        document.body.classList.add('ux-scroll-locked--preserve');
      } else {
        document.body.classList.add('ux-scroll-locked');
      }
    }
  };

  /**
   * Unlock body scroll
   */
  window.UX.unlockScroll = function() {
    scrollLockCount = Math.max(0, scrollLockCount - 1);

    if (scrollLockCount === 0) {
      const wasPreserved = document.body.classList.contains('ux-scroll-locked--preserve');

      document.body.classList.remove('ux-scroll-locked', 'ux-scroll-locked--preserve');
      document.body.style.top = '';

      if (wasPreserved) {
        window.scrollTo(0, scrollPosition);
      }
    }
  };

  /**
   * Force unlock all scroll locks
   */
  window.UX.forceUnlockScroll = function() {
    scrollLockCount = 0;
    document.body.classList.remove('ux-scroll-locked', 'ux-scroll-locked--preserve');
    document.body.style.top = '';
    window.scrollTo(0, scrollPosition);
  };

  /* ----------------------------------------
     Clipboard
  ---------------------------------------- */

  /**
   * Copy text to clipboard
   * @param {string} text - Text to copy
   * @returns {Promise<boolean>} Success status
   */
  window.UX.copyToClipboard = async function(text) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }

      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      textarea.style.top = '-9999px';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();

      const success = document.execCommand('copy');
      document.body.removeChild(textarea);
      return success;
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
      return false;
    }
  };

  /**
   * Read text from clipboard
   * @returns {Promise<string|null>} Clipboard text or null
   */
  window.UX.readFromClipboard = async function() {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        return await navigator.clipboard.readText();
      }
      return null;
    } catch (err) {
      console.error('Failed to read from clipboard:', err);
      return null;
    }
  };

  /* ----------------------------------------
     Debounce & Throttle
  ---------------------------------------- */

  /**
   * Debounce a function
   * @param {Function} fn - Function to debounce
   * @param {number} delay - Delay in ms
   * @param {Object} options - Configuration
   * @returns {Function} Debounced function
   */
  window.UX.debounce = function(fn, delay = 300, options = {}) {
    const { leading = false, trailing = true } = options;
    let timeoutId = null;
    let lastCallTime = 0;

    function debounced(...args) {
      const now = Date.now();
      const isFirstCall = !timeoutId;

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      if (leading && isFirstCall) {
        fn.apply(this, args);
        lastCallTime = now;
      }

      if (trailing) {
        timeoutId = setTimeout(() => {
          if (!leading || now - lastCallTime >= delay) {
            fn.apply(this, args);
          }
          timeoutId = null;
        }, delay);
      }
    }

    debounced.cancel = function() {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    };

    debounced.flush = function(...args) {
      debounced.cancel();
      fn.apply(this, args);
    };

    return debounced;
  };

  /**
   * Throttle a function
   * @param {Function} fn - Function to throttle
   * @param {number} limit - Minimum time between calls in ms
   * @param {Object} options - Configuration
   * @returns {Function} Throttled function
   */
  window.UX.throttle = function(fn, limit = 300, options = {}) {
    const { leading = true, trailing = true } = options;
    let lastCallTime = 0;
    let timeoutId = null;
    let lastArgs = null;

    function throttled(...args) {
      const now = Date.now();
      const timeSinceLastCall = now - lastCallTime;

      if (timeSinceLastCall >= limit) {
        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }

        if (leading) {
          fn.apply(this, args);
          lastCallTime = now;
        }
      } else {
        lastArgs = args;

        if (trailing && !timeoutId) {
          timeoutId = setTimeout(() => {
            fn.apply(this, lastArgs);
            lastCallTime = Date.now();
            timeoutId = null;
            lastArgs = null;
          }, limit - timeSinceLastCall);
        }
      }
    }

    throttled.cancel = function() {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      lastArgs = null;
    };

    return throttled;
  };

  /* ----------------------------------------
     Alpine.js Directives
  ---------------------------------------- */

  // Register directives when Alpine is available
  function registerDirectives() {
    if (typeof Alpine === 'undefined') return;

    // x-click-outside directive
    Alpine.directive('click-outside', (el, { expression }, { evaluateLater, cleanup }) => {
      const evaluate = evaluateLater(expression);

      const removeListener = window.UX.onClickOutside(el, () => {
        evaluate();
      });

      cleanup(() => removeListener());
    });

    // x-trap-focus directive
    Alpine.directive('trap-focus', (el, { value, modifiers }, { cleanup }) => {
      const options = {
        escapeDeactivates: modifiers.includes('escape'),
        returnFocus: !modifiers.includes('noreturn')
      };

      const release = window.UX.trapFocus(el, options);
      cleanup(() => release());
    });

    // x-clipboard directive
    Alpine.directive('clipboard', (el, { expression, modifiers }, { evaluateLater, effect }) => {
      const getValue = evaluateLater(expression);

      el.addEventListener('click', async () => {
        getValue(async (value) => {
          const success = await window.UX.copyToClipboard(value);

          if (success) {
            el.dispatchEvent(new CustomEvent('clipboard:copied', {
              detail: { value },
              bubbles: true
            }));

            if (modifiers.includes('feedback')) {
              const originalText = el.textContent;
              el.textContent = 'Copied!';
              setTimeout(() => {
                el.textContent = originalText;
              }, 1500);
            }
          }
        });
      });
    });

    // $clipboard magic
    Alpine.magic('clipboard', () => ({
      copy: window.UX.copyToClipboard,
      read: window.UX.readFromClipboard
    }));

    // $debounce magic
    Alpine.magic('debounce', () => window.UX.debounce);

    // $throttle magic
    Alpine.magic('throttle', () => window.UX.throttle);
  }

  // Try to register immediately
  if (typeof Alpine !== 'undefined') {
    registerDirectives();
  }

  // Also register when Alpine loads
  document.addEventListener('alpine:init', registerDirectives);

  /* ----------------------------------------
     Print Utilities
  ---------------------------------------- */

  /**
   * Print a specific element
   * @param {HTMLElement|string} element - Element or selector to print
   * @param {Object} options - Print options
   */
  window.UX.printElement = function(element, options = {}) {
    const {
      title = document.title,
      styles = true, // Include page styles
      extraStyles = '' // Additional CSS
    } = options;

    const el = typeof element === 'string'
      ? document.querySelector(element)
      : element;

    if (!el) {
      console.error('Element not found for printing');
      return;
    }

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      console.error('Could not open print window');
      return;
    }

    let styleSheets = '';
    if (styles) {
      for (const sheet of document.styleSheets) {
        try {
          if (sheet.cssRules) {
            for (const rule of sheet.cssRules) {
              styleSheets += rule.cssText + '\n';
            }
          }
        } catch (e) {
          // Cross-origin stylesheets will throw
          if (sheet.href) {
            styleSheets += `@import url("${sheet.href}");\n`;
          }
        }
      }
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${title}</title>
        <style>
          ${styleSheets}
          ${extraStyles}
          @media print {
            body { margin: 0; padding: 20px; }
          }
        </style>
      </head>
      <body>
        ${el.outerHTML}
      </body>
      </html>
    `);

    printWindow.document.close();

    printWindow.onload = function() {
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    };
  };

  /**
   * Print current page
   */
  window.UX.print = function() {
    window.print();
  };

})();
