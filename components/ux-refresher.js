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
