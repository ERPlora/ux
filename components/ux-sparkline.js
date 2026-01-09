/**
 * UX Sparkline Component
 * Lightweight inline charts for displaying trends
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Sparkline - Base
    ======================================== */

    .ux-sparkline {
      display: inline-flex;
      align-items: center;
      gap: var(--ux-space-sm);
      font-family: var(--ux-font-family);
    }

    .ux-sparkline__svg {
      display: block;
      overflow: visible;
    }

    /* ========================================
       Line Chart
    ======================================== */

    .ux-sparkline__line {
      fill: none;
      stroke: var(--ux-primary);
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .ux-sparkline__area {
      fill: url(#sparklineGradient);
      opacity: 0.2;
    }

    .ux-sparkline__dot {
      fill: var(--ux-primary);
    }

    .ux-sparkline__dot--last {
      fill: var(--ux-primary);
      stroke: var(--ux-surface);
      stroke-width: 2;
    }

    /* ========================================
       Bar Chart
    ======================================== */

    .ux-sparkline__bar {
      fill: var(--ux-primary);
      rx: 2;
    }

    .ux-sparkline__bar--negative {
      fill: var(--ux-danger);
    }

    /* ========================================
       Reference Line
    ======================================== */

    .ux-sparkline__reference {
      stroke: var(--ux-text-tertiary);
      stroke-width: 1;
      stroke-dasharray: 4 2;
    }

    /* ========================================
       Color Variants
    ======================================== */

    .ux-sparkline--success .ux-sparkline__line,
    .ux-sparkline--success .ux-sparkline__dot,
    .ux-sparkline--success .ux-sparkline__bar {
      stroke: var(--ux-success);
      fill: var(--ux-success);
    }

    .ux-sparkline--success .ux-sparkline__line {
      fill: none;
    }

    .ux-sparkline--danger .ux-sparkline__line,
    .ux-sparkline--danger .ux-sparkline__dot,
    .ux-sparkline--danger .ux-sparkline__bar {
      stroke: var(--ux-danger);
      fill: var(--ux-danger);
    }

    .ux-sparkline--danger .ux-sparkline__line {
      fill: none;
    }

    .ux-sparkline--warning .ux-sparkline__line,
    .ux-sparkline--warning .ux-sparkline__dot,
    .ux-sparkline--warning .ux-sparkline__bar {
      stroke: var(--ux-warning);
      fill: var(--ux-warning);
    }

    .ux-sparkline--warning .ux-sparkline__line {
      fill: none;
    }

    /* ========================================
       Value Display
    ======================================== */

    .ux-sparkline__value {
      font-size: var(--ux-font-size-sm);
      font-weight: 600;
      color: var(--ux-text);
      font-variant-numeric: tabular-nums;
    }

    .ux-sparkline__change {
      display: inline-flex;
      align-items: center;
      gap: 0.125rem;
      font-size: var(--ux-font-size-xs);
      font-weight: 500;
    }

    .ux-sparkline__change--positive {
      color: var(--ux-success);
    }

    .ux-sparkline__change--negative {
      color: var(--ux-danger);
    }

    .ux-sparkline__change--neutral {
      color: var(--ux-text-secondary);
    }

    .ux-sparkline__change svg {
      width: 12px;
      height: 12px;
    }

    /* ========================================
       Size Variants
    ======================================== */

    .ux-sparkline--sm .ux-sparkline__line {
      stroke-width: 1.5;
    }

    .ux-sparkline--lg .ux-sparkline__line {
      stroke-width: 2.5;
    }

    /* ========================================
       Interactive
    ======================================== */

    .ux-sparkline--interactive {
      cursor: pointer;
    }

    .ux-sparkline--interactive:hover .ux-sparkline__line {
      stroke-width: 2.5;
    }

    .ux-sparkline__tooltip {
      position: absolute;
      padding: 0.375rem 0.625rem;
      background: var(--ux-gray-900);
      border-radius: var(--ux-radius-sm);
      font-size: 0.75rem;
      color: white;
      white-space: nowrap;
      pointer-events: none;
      transform: translate(-50%, -100%);
      margin-top: -8px;
      z-index: var(--ux-z-tooltip);
    }

    .ux-sparkline__tooltip::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border: 4px solid transparent;
      border-top-color: var(--ux-gray-900);
    }

    /* ========================================
       Animated
    ======================================== */

    .ux-sparkline--animated .ux-sparkline__line {
      stroke-dasharray: 1000;
      stroke-dashoffset: 1000;
      animation: ux-sparkline-draw 1s ease-out forwards;
    }

    @keyframes ux-sparkline-draw {
      to {
        stroke-dashoffset: 0;
      }
    }

    /* ========================================
       Reduced Motion
    ======================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-sparkline--animated .ux-sparkline__line {
        animation: none;
        stroke-dasharray: none;
        stroke-dashoffset: 0;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-sparkline-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-sparkline-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Icons
  const icons = {
    up: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 14l5-5 5 5H7z"/></svg>',
    down: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5H7z"/></svg>',
    neutral: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="11" width="16" height="2" rx="1"/></svg>'
  };

  // Alpine.js component for sparkline
  const sparklineData = (options = {}) => ({
    // Data
    data: options.data || [],

    // Configuration
    width: options.width || 100,
    height: options.height || 30,
    type: options.type || 'line', // 'line', 'bar', 'area'
    showDots: options.showDots ?? false,
    showLastDot: options.showLastDot ?? true,
    showArea: options.showArea ?? false,
    showReference: options.showReference ?? false,
    referenceValue: options.referenceValue || null, // null = average
    smooth: options.smooth ?? true,
    animated: options.animated ?? false,
    barGap: options.barGap || 2,
    padding: options.padding || 4,

    // Value display
    showValue: options.showValue ?? false,
    showChange: options.showChange ?? false,
    valueFormat: options.valueFormat || null, // Function to format value
    changeFormat: options.changeFormat || null,

    // State
    icons,

    // Get normalized data
    get normalizedData() {
      if (!this.data || this.data.length === 0) return [];

      const values = this.data.map(d => typeof d === 'object' ? d.value : d);
      const min = Math.min(...values);
      const max = Math.max(...values);
      const range = max - min || 1;

      return values.map(v => (v - min) / range);
    },

    // Get min/max values
    get minValue() {
      if (!this.data || this.data.length === 0) return 0;
      const values = this.data.map(d => typeof d === 'object' ? d.value : d);
      return Math.min(...values);
    },

    get maxValue() {
      if (!this.data || this.data.length === 0) return 0;
      const values = this.data.map(d => typeof d === 'object' ? d.value : d);
      return Math.max(...values);
    },

    // Get current (last) value
    get currentValue() {
      if (!this.data || this.data.length === 0) return 0;
      const last = this.data[this.data.length - 1];
      return typeof last === 'object' ? last.value : last;
    },

    // Get first value
    get firstValue() {
      if (!this.data || this.data.length === 0) return 0;
      const first = this.data[0];
      return typeof first === 'object' ? first.value : first;
    },

    // Calculate change
    get change() {
      if (this.firstValue === 0) return 0;
      return ((this.currentValue - this.firstValue) / Math.abs(this.firstValue)) * 100;
    },

    get changeType() {
      if (this.change > 0) return 'positive';
      if (this.change < 0) return 'negative';
      return 'neutral';
    },

    // Get average
    get average() {
      if (!this.data || this.data.length === 0) return 0;
      const values = this.data.map(d => typeof d === 'object' ? d.value : d);
      return values.reduce((a, b) => a + b, 0) / values.length;
    },

    // Calculate points for line/area
    get points() {
      const data = this.normalizedData;
      if (data.length === 0) return [];

      const innerWidth = this.width - (this.padding * 2);
      const innerHeight = this.height - (this.padding * 2);
      const step = innerWidth / Math.max(data.length - 1, 1);

      return data.map((value, index) => ({
        x: this.padding + (index * step),
        y: this.padding + (innerHeight - (value * innerHeight)),
        value: typeof this.data[index] === 'object' ? this.data[index].value : this.data[index]
      }));
    },

    // Get SVG path for line
    get linePath() {
      if (this.points.length === 0) return '';

      if (this.smooth && this.points.length > 2) {
        return this.getSmoothPath(this.points);
      }

      return this.points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    },

    // Get SVG path for area
    get areaPath() {
      if (this.points.length === 0) return '';

      const linePath = this.linePath;
      const firstPoint = this.points[0];
      const lastPoint = this.points[this.points.length - 1];
      const bottom = this.height - this.padding;

      return `${linePath} L ${lastPoint.x} ${bottom} L ${firstPoint.x} ${bottom} Z`;
    },

    // Smooth curve using bezier
    getSmoothPath(points) {
      if (points.length < 2) return '';

      let path = `M ${points[0].x} ${points[0].y}`;

      for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i === 0 ? i : i - 1];
        const p1 = points[i];
        const p2 = points[i + 1];
        const p3 = points[i + 2 >= points.length ? i + 1 : i + 2];

        const cp1x = p1.x + (p2.x - p0.x) / 6;
        const cp1y = p1.y + (p2.y - p0.y) / 6;
        const cp2x = p2.x - (p3.x - p1.x) / 6;
        const cp2y = p2.y - (p3.y - p1.y) / 6;

        path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
      }

      return path;
    },

    // Get bars data
    get bars() {
      const data = this.normalizedData;
      if (data.length === 0) return [];

      const innerWidth = this.width - (this.padding * 2);
      const innerHeight = this.height - (this.padding * 2);
      const barWidth = (innerWidth - (this.barGap * (data.length - 1))) / data.length;

      return data.map((value, index) => {
        const rawValue = typeof this.data[index] === 'object' ? this.data[index].value : this.data[index];
        const isNegative = rawValue < 0;

        return {
          x: this.padding + (index * (barWidth + this.barGap)),
          y: this.padding + (innerHeight - (value * innerHeight)),
          width: Math.max(barWidth, 1),
          height: value * innerHeight,
          value: rawValue,
          isNegative
        };
      });
    },

    // Get reference line Y position
    get referenceY() {
      const refValue = this.referenceValue !== null ? this.referenceValue : this.average;
      const range = this.maxValue - this.minValue || 1;
      const normalized = (refValue - this.minValue) / range;
      const innerHeight = this.height - (this.padding * 2);

      return this.padding + (innerHeight - (normalized * innerHeight));
    },

    // Format value for display
    formatValue(value) {
      if (this.valueFormat && typeof this.valueFormat === 'function') {
        return this.valueFormat(value);
      }
      if (Math.abs(value) >= 1000000) {
        return (value / 1000000).toFixed(1) + 'M';
      }
      if (Math.abs(value) >= 1000) {
        return (value / 1000).toFixed(1) + 'K';
      }
      return value.toFixed(value % 1 === 0 ? 0 : 1);
    },

    // Format change for display
    formatChange(value) {
      if (this.changeFormat && typeof this.changeFormat === 'function') {
        return this.changeFormat(value);
      }
      const sign = value > 0 ? '+' : '';
      return `${sign}${value.toFixed(1)}%`;
    },

    // Set data
    setData(newData) {
      this.data = newData;
    },

    // Add data point
    addPoint(value) {
      this.data.push(value);
    }
  });

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxSparkline', sparklineData);
  }

})();
