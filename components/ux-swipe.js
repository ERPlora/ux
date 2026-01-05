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
