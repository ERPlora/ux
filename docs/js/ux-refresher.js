/**
 * Alpine helper: uxRefresher
 * Pull-to-refresh interaction used across docs examples.
 */
(function (global) {
  global.uxRefresher = function uxRefresher(config = {}) {
    return {
      pullMin: config.pullMin ?? 60,
      pullMax: config.pullMax ?? 120,
      resistance: config.resistance ?? 0.5,
      completeDelay: config.completeDelay ?? 500,
      disabled: config.disabled ?? false,
      onRefresh: config.onRefresh || (() => Promise.resolve()),

      state: 'idle',
      pullDistance: 0,
      startY: 0,

      get progress() {
        return Math.min(this.pullDistance / this.pullMin, 1);
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
        return {
          transform: `translateY(${this.pullDistance}px)`,
          transition: this.state === 'idle' ? 'transform 0.3s ease' : 'none',
        };
      },

      handleTouchStart(event) {
        if (this.disabled || this.state === 'refreshing' || this.state === 'complete') {
          return;
        }
        if (this.$el.scrollTop > 0) return;

        const touch = event.touches ? event.touches[0] : event;
        this.startY = touch.clientY;
        this.pullDistance = 0;
        this.state = 'pulling';
      },

      handleTouchMove(event) {
        if (this.state !== 'pulling' && this.state !== 'ready') return;
        const touch = event.touches ? event.touches[0] : event;
        const delta = touch.clientY - this.startY;
        if (delta <= 0) return;

        event.preventDefault();
        const resistance = 1 - Math.min(delta / this.pullMax, 1) * (1 - this.resistance);
        this.pullDistance = Math.min(this.pullMax, delta * resistance);

        if (this.pullDistance >= this.pullMin) {
          this.state = 'ready';
        } else {
          this.state = 'pulling';
        }
      },

      handleTouchEnd() {
        if (this.state === 'ready') {
          this.doRefresh();
        } else {
          this.cancel();
        }
      },

      async doRefresh() {
        if (this.disabled || this.state === 'refreshing') return;
        this.state = 'refreshing';
        try {
          await this.onRefresh();
          this.complete();
        } catch (error) {
          console.error('uxRefresher error:', error);
          this.cancel();
        }
      },

      complete() {
        this.state = 'complete';
        setTimeout(() => this.reset(), this.completeDelay);
      },

      cancel() {
        this.state = 'idle';
        this.pullDistance = 0;
      },

      reset() {
        this.state = 'idle';
        this.pullDistance = 0;
      },
    };
  };
})(window);
