/**
 * UX Helpers
 * Core utility functions for state management and accessibility
 * Part of the UX Library
 */

// ==========================================================
// Scroll Lock (with nested modal support)
// ==========================================================

let scrollLockCount = 0;
let originalOverflow = '';
let originalPaddingRight = '';

/**
 * Lock body scroll (prevents scrolling when modal is open)
 * Supports nested modals with reference counting
 */
export function lockScroll() {
  if (scrollLockCount === 0) {
    originalOverflow = document.body.style.overflow;
    originalPaddingRight = document.body.style.paddingRight;

    // Calculate scrollbar width to prevent layout shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
  }
  scrollLockCount++;
}

/**
 * Unlock body scroll
 * Only restores scroll when all modals are closed
 */
export function unlockScroll() {
  scrollLockCount = Math.max(0, scrollLockCount - 1);
  if (scrollLockCount === 0) {
    document.body.style.overflow = originalOverflow;
    document.body.style.paddingRight = originalPaddingRight;
  }
}

/**
 * Force unlock scroll (cleanup)
 */
export function forceUnlockScroll() {
  scrollLockCount = 0;
  document.body.style.overflow = originalOverflow;
  document.body.style.paddingRight = originalPaddingRight;
}

// ==========================================================
// Focus Trap
// ==========================================================

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]:not([contenteditable="false"])'
].join(',');

/**
 * Trap focus within an element
 * @param {HTMLElement} element - Container element
 * @returns {Function} Cleanup function to remove the trap
 */
export function trapFocus(element) {
  const focusableElements = element.querySelectorAll(FOCUSABLE_SELECTOR);
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  function handleKeydown(e) {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      // Shift + Tab: go to last if at first
      if (document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable?.focus();
      }
    } else {
      // Tab: go to first if at last
      if (document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable?.focus();
      }
    }
  }

  element.addEventListener('keydown', handleKeydown);

  // Focus first element
  if (firstFocusable) {
    firstFocusable.focus();
  }

  // Return cleanup function
  return () => {
    element.removeEventListener('keydown', handleKeydown);
  };
}

// ==========================================================
// Screen Reader Announcements
// ==========================================================

/**
 * Announce a message to screen readers
 * @param {string} message - Message to announce
 * @param {string} priority - 'polite' or 'assertive'
 */
export function announce(message, priority = 'polite') {
  let announcer = document.getElementById('ux-announcer');

  if (!announcer) {
    announcer = document.createElement('div');
    announcer.id = 'ux-announcer';
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.style.cssText = `
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    `;
    document.body.appendChild(announcer);
  }

  // Update priority if different
  announcer.setAttribute('aria-live', priority);

  // Clear and set message (triggers announcement)
  announcer.textContent = '';
  requestAnimationFrame(() => {
    announcer.textContent = message;
  });
}

// ==========================================================
// State Management
// ==========================================================

/**
 * Set state on an element (data-state + ARIA sync)
 * @param {HTMLElement|string} element - Element or selector
 * @param {string} state - State to set
 */
export function setState(element, state) {
  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (!el) return;

  el.dataset.state = state;

  // Sync ARIA attributes
  const ariaMap = {
    'open': { 'aria-hidden': 'false' },
    'closed': { 'aria-hidden': 'true' },
    'expanded': { 'aria-expanded': 'true' },
    'collapsed': { 'aria-expanded': 'false' },
    'selected': { 'aria-selected': 'true' },
    'loading': { 'aria-busy': 'true' },
    'disabled': { 'aria-disabled': 'true' },
  };

  if (ariaMap[state]) {
    Object.entries(ariaMap[state]).forEach(([attr, val]) => {
      el.setAttribute(attr, val);
    });
  }
}

/**
 * Get state of an element
 * @param {HTMLElement|string} element - Element or selector
 * @returns {string|undefined} Current state
 */
export function getState(element) {
  const el = typeof element === 'string' ? document.querySelector(element) : element;
  return el?.dataset.state;
}

/**
 * Check if element has a specific state
 * @param {HTMLElement|string} element - Element or selector
 * @param {string} state - State to check
 * @returns {boolean}
 */
export function hasState(element, state) {
  return getState(element) === state;
}

/**
 * Toggle between two states
 * @param {HTMLElement|string} element - Element or selector
 * @param {string} state1 - First state
 * @param {string} state2 - Second state
 */
export function toggleState(element, state1, state2) {
  if (hasState(element, state1)) {
    setState(element, state2);
  } else {
    setState(element, state1);
  }
}

// ==========================================================
// Event Utilities
// ==========================================================

/**
 * Dispatch a custom event
 * @param {HTMLElement|string} element - Element or selector
 * @param {string} eventName - Event name
 * @param {object} detail - Event detail
 */
export function dispatch(element, eventName, detail = {}) {
  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (!el) return;

  el.dispatchEvent(new CustomEvent(eventName, {
    bubbles: true,
    cancelable: true,
    detail
  }));
}

/**
 * Handle click outside an element
 * @param {HTMLElement} element - Element to monitor
 * @param {Function} callback - Callback when clicked outside
 * @returns {Function} Cleanup function
 */
export function onClickOutside(element, callback) {
  function handler(e) {
    if (!element.contains(e.target)) {
      callback(e);
    }
  }

  document.addEventListener('click', handler, true);

  return () => {
    document.removeEventListener('click', handler, true);
  };
}

/**
 * Handle Escape key press
 * @param {Function} callback - Callback when Escape is pressed
 * @returns {Function} Cleanup function
 */
export function onEscape(callback) {
  function handler(e) {
    if (e.key === 'Escape') {
      callback(e);
    }
  }

  document.addEventListener('keydown', handler);

  return () => {
    document.removeEventListener('keydown', handler);
  };
}

/**
 * Wait for next animation frame (double rAF for layout)
 * @param {Function} callback - Callback to execute
 */
export function nextTick(callback) {
  requestAnimationFrame(() => {
    requestAnimationFrame(callback);
  });
}

// ==========================================================
// Modal Shortcuts
// ==========================================================

export const modal = {
  /**
   * Open a modal
   * @param {HTMLElement|string} selector - Modal element or selector
   */
  open(selector) {
    setState(selector, 'open');
    lockScroll();
    dispatch(selector, 'ux:opened');
  },

  /**
   * Close a modal
   * @param {HTMLElement|string} selector - Modal element or selector
   */
  close(selector) {
    setState(selector, 'closed');
    unlockScroll();
    dispatch(selector, 'ux:closed');
  },

  /**
   * Toggle a modal
   * @param {HTMLElement|string} selector - Modal element or selector
   */
  toggle(selector) {
    if (hasState(selector, 'open')) {
      this.close(selector);
    } else {
      this.open(selector);
    }
  }
};
