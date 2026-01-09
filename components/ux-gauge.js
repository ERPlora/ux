/**
 * UX Gauge / Meter Component
 * Visual gauge/meter indicator with arc, needle, and segments
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Gauge - Base
    ======================================== */

    .ux-gauge {
      position: relative;
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      font-family: var(--ux-font-family);
    }

    .ux-gauge__svg {
      display: block;
      overflow: visible;
    }

    /* ========================================
       Arc Track & Fill
    ======================================== */

    .ux-gauge__track {
      fill: none;
      stroke: var(--ux-surface-secondary);
      stroke-linecap: round;
    }

    .ux-gauge__fill {
      fill: none;
      stroke: var(--ux-primary);
      stroke-linecap: round;
      transition: stroke-dashoffset var(--ux-transition-slow) var(--ux-ease);
    }

    /* Color variants */
    .ux-gauge--success .ux-gauge__fill {
      stroke: var(--ux-success);
    }

    .ux-gauge--warning .ux-gauge__fill {
      stroke: var(--ux-warning);
    }

    .ux-gauge--danger .ux-gauge__fill {
      stroke: var(--ux-danger);
    }

    /* ========================================
       Segments (Multi-color)
    ======================================== */

    .ux-gauge__segment {
      fill: none;
      stroke-linecap: round;
      opacity: 0.25;
    }

    .ux-gauge__segment--active {
      opacity: 1;
    }

    .ux-gauge__segment--danger {
      stroke: var(--ux-danger);
    }

    .ux-gauge__segment--warning {
      stroke: var(--ux-warning);
    }

    .ux-gauge__segment--success {
      stroke: var(--ux-success);
    }

    /* ========================================
       Needle
    ======================================== */

    .ux-gauge__needle {
      fill: var(--ux-text);
      transform-origin: center center;
      transition: transform var(--ux-transition-slow) var(--ux-ease-bounce);
    }

    .ux-gauge__needle-center {
      fill: var(--ux-surface);
      stroke: var(--ux-border-color);
      stroke-width: 2;
    }

    /* ========================================
       Value Display
    ======================================== */

    .ux-gauge__value-container {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    }

    .ux-gauge__value {
      font-size: 2rem;
      font-weight: 700;
      font-variant-numeric: tabular-nums;
      color: var(--ux-text);
      line-height: 1;
    }

    .ux-gauge__unit {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--ux-text-secondary);
      margin-top: 0.25rem;
    }

    .ux-gauge__label {
      font-size: 0.75rem;
      font-weight: 500;
      color: var(--ux-text-tertiary);
      margin-top: 0.5rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    /* ========================================
       Min/Max Labels
    ======================================== */

    .ux-gauge__labels {
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin-top: 0.5rem;
      padding: 0 0.5rem;
    }

    .ux-gauge__min,
    .ux-gauge__max {
      font-size: 0.75rem;
      color: var(--ux-text-tertiary);
    }

    /* ========================================
       Ticks
    ======================================== */

    .ux-gauge__tick {
      stroke: var(--ux-border-color);
      stroke-width: 2;
    }

    .ux-gauge__tick--major {
      stroke-width: 3;
      stroke: var(--ux-text-secondary);
    }

    .ux-gauge__tick-label {
      fill: var(--ux-text-tertiary);
      font-size: 10px;
      text-anchor: middle;
    }

    /* ========================================
       Size Variants
    ======================================== */

    /* Small */
    .ux-gauge--sm {
      --gauge-size: 120px;
    }

    .ux-gauge--sm .ux-gauge__value {
      font-size: 1.25rem;
    }

    .ux-gauge--sm .ux-gauge__unit {
      font-size: 0.75rem;
    }

    /* Default */
    .ux-gauge--md {
      --gauge-size: 180px;
    }

    /* Large */
    .ux-gauge--lg {
      --gauge-size: 240px;
    }

    .ux-gauge--lg .ux-gauge__value {
      font-size: 2.5rem;
    }

    .ux-gauge--lg .ux-gauge__unit {
      font-size: 1rem;
    }

    /* Extra Large */
    .ux-gauge--xl {
      --gauge-size: 320px;
    }

    .ux-gauge--xl .ux-gauge__value {
      font-size: 3rem;
    }

    .ux-gauge--xl .ux-gauge__unit {
      font-size: 1.125rem;
    }

    /* ========================================
       Arc Angles
    ======================================== */

    .ux-gauge--half {
      /* 180 degree arc (default) */
    }

    .ux-gauge--three-quarter {
      /* 270 degree arc */
    }

    .ux-gauge--full {
      /* 360 degree arc */
    }

    /* ========================================
       Glass Variant
    ======================================== */

    .ux-gauge--glass .ux-gauge__track {
      stroke: var(--ux-glass-bg);
    }

    .ux-gauge--glass .ux-gauge__needle-center {
      fill: var(--ux-glass-bg);
      stroke: var(--ux-glass-border);
    }

    /* ========================================
       Animated
    ======================================== */

    .ux-gauge--animated .ux-gauge__fill {
      animation: ux-gauge-fill 1s ease-out forwards;
    }

    @keyframes ux-gauge-fill {
      from {
        stroke-dashoffset: var(--gauge-circumference);
      }
    }

    /* ========================================
       Dark Mode
    ======================================== */

    @media (prefers-color-scheme: dark) {
      .ux-gauge__track {
        stroke: var(--ux-surface-secondary);
      }
    }

    .ux-dark .ux-gauge__track {
      stroke: var(--ux-surface-secondary);
    }

    /* ========================================
       Reduced Motion
    ======================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-gauge__fill,
      .ux-gauge__needle {
        transition: none;
      }

      .ux-gauge--animated .ux-gauge__fill {
        animation: none;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-gauge-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-gauge-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine.js component for gauge
  const gaugeData = (options = {}) => ({
    // Configuration
    value: options.value ?? 0,
    min: options.min ?? 0,
    max: options.max ?? 100,
    size: options.size || 180,
    strokeWidth: options.strokeWidth || 12,
    startAngle: options.startAngle ?? -135,
    endAngle: options.endAngle ?? 135,
    unit: options.unit || '',
    label: options.label || '',
    showValue: options.showValue ?? true,
    showLabels: options.showLabels ?? true,
    showNeedle: options.showNeedle ?? false,
    showTicks: options.showTicks ?? false,
    tickCount: options.tickCount || 10,
    animated: options.animated ?? true,
    decimals: options.decimals ?? 0,

    // Segments (for multi-color gauge)
    segments: options.segments || null,
    // Example: [
    //   { value: 30, color: 'danger' },
    //   { value: 60, color: 'warning' },
    //   { value: 100, color: 'success' }
    // ]

    // Thresholds for auto-color
    thresholds: options.thresholds || null,
    // Example: { warning: 60, danger: 80 }

    // Computed properties
    get normalizedValue() {
      return Math.min(Math.max(this.value, this.min), this.max);
    },

    get percentage() {
      return ((this.normalizedValue - this.min) / (this.max - this.min)) * 100;
    },

    get radius() {
      return (this.size - this.strokeWidth) / 2;
    },

    get center() {
      return this.size / 2;
    },

    get angleRange() {
      return this.endAngle - this.startAngle;
    },

    get circumference() {
      return 2 * Math.PI * this.radius * (this.angleRange / 360);
    },

    get dashOffset() {
      return this.circumference * (1 - this.percentage / 100);
    },

    get needleAngle() {
      return this.startAngle + (this.percentage / 100) * this.angleRange;
    },

    get valueColor() {
      if (this.thresholds) {
        if (this.percentage >= (this.thresholds.danger || 80)) return 'danger';
        if (this.percentage >= (this.thresholds.warning || 60)) return 'warning';
        return 'success';
      }
      return null;
    },

    get displayValue() {
      return this.normalizedValue.toFixed(this.decimals);
    },

    // SVG path calculations
    get arcPath() {
      const startRad = (this.startAngle * Math.PI) / 180;
      const endRad = (this.endAngle * Math.PI) / 180;

      const startX = this.center + this.radius * Math.cos(startRad);
      const startY = this.center + this.radius * Math.sin(startRad);
      const endX = this.center + this.radius * Math.cos(endRad);
      const endY = this.center + this.radius * Math.sin(endRad);

      const largeArc = this.angleRange > 180 ? 1 : 0;

      return `M ${startX} ${startY} A ${this.radius} ${this.radius} 0 ${largeArc} 1 ${endX} ${endY}`;
    },

    // Get point on arc at given percentage
    getPointOnArc(percent) {
      const angle = this.startAngle + (percent / 100) * this.angleRange;
      const rad = (angle * Math.PI) / 180;
      return {
        x: this.center + this.radius * Math.cos(rad),
        y: this.center + this.radius * Math.sin(rad)
      };
    },

    // Get tick positions
    get ticks() {
      const ticks = [];
      const step = 100 / this.tickCount;

      for (let i = 0; i <= this.tickCount; i++) {
        const percent = i * step;
        const angle = this.startAngle + (percent / 100) * this.angleRange;
        const rad = (angle * Math.PI) / 180;

        const innerRadius = this.radius - 8;
        const outerRadius = this.radius + 4;
        const labelRadius = this.radius + 16;

        ticks.push({
          x1: this.center + innerRadius * Math.cos(rad),
          y1: this.center + innerRadius * Math.sin(rad),
          x2: this.center + outerRadius * Math.cos(rad),
          y2: this.center + outerRadius * Math.sin(rad),
          labelX: this.center + labelRadius * Math.cos(rad),
          labelY: this.center + labelRadius * Math.sin(rad),
          value: Math.round(this.min + (percent / 100) * (this.max - this.min)),
          isMajor: i % 2 === 0
        });
      }

      return ticks;
    },

    // Get segments for multi-color gauge
    getSegments() {
      if (!this.segments) return [];

      const result = [];
      let prevValue = this.min;

      for (const segment of this.segments) {
        const startPercent = ((prevValue - this.min) / (this.max - this.min)) * 100;
        const endPercent = ((segment.value - this.min) / (this.max - this.min)) * 100;
        const segmentLength = this.circumference * ((endPercent - startPercent) / 100);

        result.push({
          ...segment,
          startPercent,
          endPercent,
          length: segmentLength,
          offset: this.circumference * (startPercent / 100),
          isActive: this.percentage >= startPercent
        });

        prevValue = segment.value;
      }

      return result;
    },

    // Methods
    setValue(newValue) {
      this.value = newValue;
      this.$dispatch('gauge:change', {
        value: this.normalizedValue,
        percentage: this.percentage
      });
    },

    increment(amount = 1) {
      this.setValue(Math.min(this.value + amount, this.max));
    },

    decrement(amount = 1) {
      this.setValue(Math.max(this.value - amount, this.min));
    },

    // Get needle path
    get needlePath() {
      const length = this.radius - 10;
      const width = 4;

      return `M ${-width} 0 L 0 ${-length} L ${width} 0 L 0 ${width * 2} Z`;
    },

    // Value container position
    get valueContainerStyle() {
      // For half circle, position at bottom center
      if (this.angleRange <= 180) {
        return {
          bottom: '10%',
          left: '50%',
          transform: 'translateX(-50%)'
        };
      }
      // For larger arcs, center it
      return {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      };
    }
  });

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxGauge', gaugeData);
  }

})();
