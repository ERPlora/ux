/**
 * UX Alpine Utils
 * Utility directives and magic helpers for Alpine.js
 * @requires Alpine.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       Clipboard Feedback
    ======================================== */

    .ux-clipboard-feedback {
      position: fixed;
      bottom: calc(var(--ux-safe-bottom, 0px) + var(--ux-space-lg));
      left: 50%;
      transform: translateX(-50%) translateY(100px);
      padding: var(--ux-space-sm) var(--ux-space-lg);
      background: var(--ux-gray-900);
      color: white;
      border-radius: var(--ux-radius-full, 9999px);
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      opacity: 0;
      transition: transform var(--ux-transition-normal) var(--ux-ease-out),
                  opacity var(--ux-transition-normal) var(--ux-ease-out);
      z-index: var(--ux-z-toast, 800);
      pointer-events: none;
    }

    .ux-clipboard-feedback--visible {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }

    /* Dark mode */
    @media (prefers-color-scheme: dark) {
      .ux-clipboard-feedback {
        background: var(--ux-gray-100);
        color: var(--ux-gray-900);
      }
    }
    .ux-dark .ux-clipboard-feedback {
      background: var(--ux-gray-100);
      color: var(--ux-gray-900);
    }

    /* ========================================
       Focus Trap Visual Indicator (dev only)
    ======================================== */

    [data-focus-trapped] {
      outline: none;
    }

    /* ========================================
       Scroll Lock Body State
    ======================================== */

    body.ux-scroll-locked {
      overflow: hidden !important;
      touch-action: none;
    }

    /* iOS fix for scroll lock */
    body.ux-scroll-locked--ios {
      position: fixed;
      width: 100%;
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-alpine-utils-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-alpine-utils-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // ========================================
  // Utility Functions
  // ========================================

  // Detect iOS for scroll lock workarounds
  const isIOS = () => {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
           (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  };

  // Get focusable elements within a container
  const getFocusableElements = (container) => {
    const selector = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled]):not([type="hidden"])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"]):not([disabled])',
      '[contenteditable="true"]'
    ].join(', ');

    return Array.from(container.querySelectorAll(selector))
      .filter(el => {
        // Only include visible elements
        if (el.offsetParent === null && el.tagName !== 'BODY') return false;
        // Check computed styles
        const style = window.getComputedStyle(el);
        return style.visibility !== 'hidden' && style.display !== 'none';
      });
  };

  // ========================================
  // Scroll Lock State Manager
  // ========================================

  const scrollLockState = {
    count: 0,
    scrollPosition: 0,

    lock() {
      this.count++;
      if (this.count === 1) {
        this.scrollPosition = window.scrollY;

        if (isIOS()) {
          document.body.classList.add('ux-scroll-locked', 'ux-scroll-locked--ios');
          document.body.style.top = `-${this.scrollPosition}px`;
        } else {
          document.body.classList.add('ux-scroll-locked');
          document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
        }
      }
    },

    unlock() {
      this.count = Math.max(0, this.count - 1);
      if (this.count === 0) {
        document.body.classList.remove('ux-scroll-locked', 'ux-scroll-locked--ios');
        document.body.style.top = '';
        document.body.style.paddingRight = '';

        if (isIOS()) {
          window.scrollTo(0, this.scrollPosition);
        }
      }
    }
  };

  // ========================================
  // Clipboard Feedback Element
  // ========================================

  let clipboardFeedback = null;
  let feedbackTimeout = null;

  const showClipboardFeedback = (message = 'Copied!') => {
    if (!clipboardFeedback) {
      clipboardFeedback = document.createElement('div');
      clipboardFeedback.className = 'ux-clipboard-feedback';
      document.body.appendChild(clipboardFeedback);
    }

    clipboardFeedback.textContent = message;

    // Clear existing timeout
    if (feedbackTimeout) {
      clearTimeout(feedbackTimeout);
    }

    // Show feedback
    requestAnimationFrame(() => {
      clipboardFeedback.classList.add('ux-clipboard-feedback--visible');
    });

    // Hide after delay
    feedbackTimeout = setTimeout(() => {
      clipboardFeedback.classList.remove('ux-clipboard-feedback--visible');
    }, 2000);
  };

  // ========================================
  // Register Directives and Magics
  // ========================================

  const registerAll = () => {
    if (typeof Alpine === 'undefined') {
      document.addEventListener('alpine:init', registerAll);
      return;
    }

    // ========================================
    // x-focus-trap directive
    // Traps focus within element when active
    // Usage: x-focus-trap="isOpen" or x-focus-trap
    // ========================================
    Alpine.directive('focus-trap', (el, { expression }, { effect, evaluate, cleanup }) => {
      let cleanupFn = null;
      let previousActiveElement = null;

      const activate = () => {
        // Store currently focused element to restore later
        previousActiveElement = document.activeElement;

        el.setAttribute('data-focus-trapped', '');

        const focusable = getFocusableElements(el);

        // Focus first focusable element or container itself
        if (focusable.length > 0) {
          // Small delay to ensure element is visible
          requestAnimationFrame(() => {
            focusable[0].focus();
          });
        } else {
          el.setAttribute('tabindex', '-1');
          el.focus();
        }

        // Handle Tab key cycling
        const handleKeydown = (event) => {
          if (event.key !== 'Tab') return;

          const focusableNow = getFocusableElements(el);
          if (focusableNow.length === 0) return;

          const firstElement = focusableNow[0];
          const lastElement = focusableNow[focusableNow.length - 1];

          if (event.shiftKey) {
            // Shift+Tab: wrap from first to last
            if (document.activeElement === firstElement || !el.contains(document.activeElement)) {
              event.preventDefault();
              lastElement.focus();
            }
          } else {
            // Tab: wrap from last to first
            if (document.activeElement === lastElement || !el.contains(document.activeElement)) {
              event.preventDefault();
              firstElement.focus();
            }
          }
        };

        // Prevent focus from leaving the trap
        const handleFocusin = (event) => {
          if (!el.contains(event.target)) {
            event.stopPropagation();
            const focusableNow = getFocusableElements(el);
            if (focusableNow.length > 0) {
              focusableNow[0].focus();
            }
          }
        };

        el.addEventListener('keydown', handleKeydown);
        document.addEventListener('focusin', handleFocusin);

        return () => {
          el.removeEventListener('keydown', handleKeydown);
          document.removeEventListener('focusin', handleFocusin);
          el.removeAttribute('data-focus-trapped');
          el.removeAttribute('tabindex');

          // Return focus to previous element
          if (previousActiveElement && previousActiveElement.focus) {
            previousActiveElement.focus();
          }
        };
      };

      const deactivate = () => {
        if (cleanupFn) {
          cleanupFn();
          cleanupFn = null;
        }
      };

      // If expression provided, use it reactively
      if (expression) {
        effect(() => {
          const isActive = evaluate(expression);
          if (isActive) {
            cleanupFn = activate();
          } else {
            deactivate();
          }
        });
      } else {
        // No expression = always active
        cleanupFn = activate();
      }

      cleanup(() => {
        deactivate();
      });
    });

    // ========================================
    // x-click-outside directive
    // Detects clicks outside element
    // Usage: x-click-outside="close()"
    // Modifiers: .ignore="selector" to ignore certain elements
    // ========================================
    Alpine.directive('click-outside', (el, { expression, modifiers }, { evaluate, cleanup }) => {
      // Parse ignore selectors from modifiers
      const ignoreSelectors = [];
      modifiers.forEach((mod, index) => {
        if (mod === 'ignore' && modifiers[index + 1]) {
          ignoreSelectors.push(modifiers[index + 1]);
        }
      });

      const handleClick = (event) => {
        // Check if click is inside element
        if (el.contains(event.target)) return;

        // Check if click is on ignored elements
        for (const selector of ignoreSelectors) {
          const ignored = document.querySelector(selector);
          if (ignored && ignored.contains(event.target)) return;
        }

        // Execute expression
        evaluate(expression);
      };

      const handleTouch = (event) => {
        // Same logic for touch events
        if (el.contains(event.target)) return;

        for (const selector of ignoreSelectors) {
          const ignored = document.querySelector(selector);
          if (ignored && ignored.contains(event.target)) return;
        }

        evaluate(expression);
      };

      // Use capture phase to detect clicks early
      // Small delay to avoid triggering on the click that opened the element
      setTimeout(() => {
        document.addEventListener('click', handleClick, true);
        document.addEventListener('touchstart', handleTouch, true);
      }, 0);

      cleanup(() => {
        document.removeEventListener('click', handleClick, true);
        document.removeEventListener('touchstart', handleTouch, true);
      });
    });

    // ========================================
    // x-scroll-lock directive
    // Locks body scroll when element/condition is active
    // Usage: x-scroll-lock="isOpen" or x-scroll-lock
    // ========================================
    Alpine.directive('scroll-lock', (el, { expression }, { effect, evaluate, cleanup }) => {
      let isLocked = false;

      const lock = () => {
        if (!isLocked) {
          scrollLockState.lock();
          isLocked = true;
        }
      };

      const unlock = () => {
        if (isLocked) {
          scrollLockState.unlock();
          isLocked = false;
        }
      };

      // If expression provided, use it reactively
      if (expression) {
        effect(() => {
          const shouldLock = evaluate(expression);
          if (shouldLock) {
            lock();
          } else {
            unlock();
          }
        });
      } else {
        // No expression = lock when element exists
        lock();
      }

      cleanup(() => {
        unlock();
      });
    });

    // ========================================
    // x-clipboard directive
    // Copy text to clipboard
    // Usage: x-clipboard="textToCopy" or x-clipboard:target="#element-id"
    // Modifiers: .feedback to show visual feedback
    // ========================================
    Alpine.directive('clipboard', (el, { expression, modifiers, value }, { evaluate, cleanup }) => {
      const showFeedback = modifiers.includes('feedback') || modifiers.length === 0;
      const feedbackMessage = modifiers.find(m => m.startsWith('message:'))?.slice(8) || 'Copied!';

      const handleClick = async () => {
        let textToCopy = '';

        if (value === 'target') {
          // Copy from target element
          const targetSelector = evaluate(expression);
          const targetEl = document.querySelector(targetSelector);
          if (targetEl) {
            textToCopy = targetEl.textContent || targetEl.value || '';
          }
        } else if (expression) {
          // Evaluate expression for text
          textToCopy = evaluate(expression);
        } else {
          // Copy element's own text content
          textToCopy = el.textContent || el.value || '';
        }

        try {
          // Modern clipboard API
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(textToCopy);
          } else {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = textToCopy;
            textarea.style.position = 'fixed';
            textarea.style.left = '-9999px';
            textarea.style.top = '-9999px';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
          }

          // Show feedback
          if (showFeedback) {
            showClipboardFeedback(feedbackMessage);
          }

          // Dispatch success event
          el.dispatchEvent(new CustomEvent('clipboard:success', {
            detail: { text: textToCopy },
            bubbles: true
          }));

        } catch (err) {
          console.error('Failed to copy:', err);

          // Dispatch error event
          el.dispatchEvent(new CustomEvent('clipboard:error', {
            detail: { error: err },
            bubbles: true
          }));
        }
      };

      el.addEventListener('click', handleClick);

      cleanup(() => {
        el.removeEventListener('click', handleClick);
      });
    });

    // ========================================
    // $debounce magic helper
    // Usage: $debounce(fn, delay)
    // Returns debounced version of function
    // ========================================
    Alpine.magic('debounce', () => {
      return (fn, delay = 300) => {
        let timeoutId = null;

        const debounced = (...args) => {
          if (timeoutId) {
            clearTimeout(timeoutId);
          }
          timeoutId = setTimeout(() => {
            fn.apply(null, args);
            timeoutId = null;
          }, delay);
        };

        // Allow canceling pending execution
        debounced.cancel = () => {
          if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
          }
        };

        // Allow immediate execution and cancel pending
        debounced.flush = (...args) => {
          debounced.cancel();
          fn.apply(null, args);
        };

        return debounced;
      };
    });

    // ========================================
    // $throttle magic helper
    // Usage: $throttle(fn, limit)
    // Returns throttled version of function
    // ========================================
    Alpine.magic('throttle', () => {
      return (fn, limit = 300) => {
        let inThrottle = false;
        let lastArgs = null;

        const throttled = (...args) => {
          if (!inThrottle) {
            fn.apply(null, args);
            inThrottle = true;

            setTimeout(() => {
              inThrottle = false;
              // Execute with last args if called during throttle
              if (lastArgs) {
                throttled.apply(null, lastArgs);
                lastArgs = null;
              }
            }, limit);
          } else {
            // Store args to execute after throttle period
            lastArgs = args;
          }
        };

        // Allow canceling pending execution
        throttled.cancel = () => {
          lastArgs = null;
        };

        return throttled;
      };
    });

    // ========================================
    // $clipboard magic helper (alternative API)
    // Usage: $clipboard('text to copy')
    // Returns Promise
    // ========================================
    Alpine.magic('clipboard', () => {
      return async (text, options = {}) => {
        const { feedback = true, message = 'Copied!' } = options;

        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(text);
          } else {
            // Fallback
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.left = '-9999px';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
          }

          if (feedback) {
            showClipboardFeedback(message);
          }

          return true;
        } catch (err) {
          console.error('Clipboard error:', err);
          return false;
        }
      };
    });

    // ========================================
    // $scrollLock magic helper (alternative API)
    // Usage: $scrollLock.lock() / $scrollLock.unlock()
    // ========================================
    Alpine.magic('scrollLock', () => {
      return {
        lock: () => scrollLockState.lock(),
        unlock: () => scrollLockState.unlock(),
        get isLocked() {
          return scrollLockState.count > 0;
        }
      };
    });

    // ========================================
    // $focusTrap magic helper (alternative API)
    // Usage: $focusTrap(element) returns cleanup function
    // ========================================
    Alpine.magic('focusTrap', () => {
      return (container) => {
        const previousActiveElement = document.activeElement;
        container.setAttribute('data-focus-trapped', '');

        const focusable = getFocusableElements(container);

        if (focusable.length > 0) {
          requestAnimationFrame(() => {
            focusable[0].focus();
          });
        }

        const handleKeydown = (event) => {
          if (event.key !== 'Tab') return;

          const focusableNow = getFocusableElements(container);
          if (focusableNow.length === 0) return;

          const firstElement = focusableNow[0];
          const lastElement = focusableNow[focusableNow.length - 1];

          if (event.shiftKey) {
            if (document.activeElement === firstElement) {
              event.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              event.preventDefault();
              firstElement.focus();
            }
          }
        };

        container.addEventListener('keydown', handleKeydown);

        // Return cleanup function
        return () => {
          container.removeEventListener('keydown', handleKeydown);
          container.removeAttribute('data-focus-trapped');

          if (previousActiveElement && previousActiveElement.focus) {
            previousActiveElement.focus();
          }
        };
      };
    });
  };

  // Initialize
  registerAll();

  // Register with UX namespace if available
  if (window.UX) {
    window.UX.alpineUtils = {
      scrollLockState,
      getFocusableElements,
      showClipboardFeedback,
      isIOS
    };
  }
})();
