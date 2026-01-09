(function() {
  'use strict';

  const styles = `
    /* ==========================================================================
       UX Stats - KPI & Stats Cards
       iOS 26 Style - Liquid Glass Design
       ========================================================================== */

    :root {
      /* Stats Card Tokens */
      --ux-stats-padding: var(--ux-space-lg);
      --ux-stats-border-radius: var(--ux-border-radius-lg);
      --ux-stats-gap: var(--ux-space-sm);
      --ux-stats-value-size: 2rem;
      --ux-stats-value-weight: 700;
      --ux-stats-label-size: var(--ux-font-size-sm);
      --ux-stats-label-color: var(--ux-text-secondary);
      --ux-stats-icon-size: 48px;
      --ux-stats-icon-bg: var(--ux-surface-secondary);
      --ux-stats-trend-size: var(--ux-font-size-sm);
    }

    /* ==========================================================================
       Stats Card
       ========================================================================== */

    .ux-stats-card {
      display: flex;
      flex-direction: column;
      gap: var(--ux-stats-gap);
      padding: var(--ux-stats-padding);
      background: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-stats-border-radius);
      transition: transform var(--ux-transition-fast) var(--ux-ease-ios),
                  box-shadow var(--ux-transition-fast) var(--ux-ease-ios);
    }

    .ux-stats-card:hover {
      transform: translateY(-2px);
      box-shadow: var(--ux-shadow-md);
    }

    /* Clickable card */
    a.ux-stats-card,
    button.ux-stats-card {
      cursor: pointer;
      text-decoration: none;
      text-align: left;
    }

    a.ux-stats-card:active,
    button.ux-stats-card:active {
      transform: scale(0.98);
    }

    /* ==========================================================================
       Stats Header (Label + Icon)
       ========================================================================== */

    .ux-stats-card__header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: var(--ux-space-md);
    }

    .ux-stats-card__label {
      font-size: var(--ux-stats-label-size);
      font-weight: 500;
      color: var(--ux-stats-label-color);
      line-height: 1.4;
      margin: 0;
    }

    .ux-stats-card__icon {
      width: var(--ux-stats-icon-size);
      height: var(--ux-stats-icon-size);
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--ux-stats-icon-bg);
      border-radius: var(--ux-border-radius);
      color: var(--ux-primary);
      flex-shrink: 0;
    }

    .ux-stats-card__icon svg {
      width: 24px;
      height: 24px;
    }

    .ux-stats-card__icon img {
      width: 24px;
      height: 24px;
      object-fit: contain;
    }

    /* Icon sizes */
    .ux-stats-card__icon--sm {
      --ux-stats-icon-size: 36px;
    }

    .ux-stats-card__icon--sm svg,
    .ux-stats-card__icon--sm img {
      width: 18px;
      height: 18px;
    }

    .ux-stats-card__icon--lg {
      --ux-stats-icon-size: 56px;
    }

    .ux-stats-card__icon--lg svg,
    .ux-stats-card__icon--lg img {
      width: 28px;
      height: 28px;
    }

    /* Icon colors */
    .ux-stats-card__icon--primary { background: rgba(var(--ux-primary-rgb), 0.1); color: var(--ux-primary); }
    .ux-stats-card__icon--success { background: rgba(var(--ux-success-rgb), 0.1); color: var(--ux-success); }
    .ux-stats-card__icon--warning { background: rgba(var(--ux-warning-rgb), 0.1); color: var(--ux-warning); }
    .ux-stats-card__icon--danger { background: rgba(var(--ux-danger-rgb), 0.1); color: var(--ux-danger); }
    .ux-stats-card__icon--info { background: rgba(var(--ux-info-rgb, var(--ux-primary-rgb)), 0.1); color: var(--ux-info, var(--ux-primary)); }

    /* ==========================================================================
       Stats Value
       ========================================================================== */

    .ux-stats-card__value {
      font-size: var(--ux-stats-value-size);
      font-weight: var(--ux-stats-value-weight);
      color: var(--ux-text);
      line-height: 1.2;
      margin: 0;
      font-variant-numeric: tabular-nums;
    }

    /* Value sizes */
    .ux-stats-card__value--sm {
      --ux-stats-value-size: 1.5rem;
    }

    .ux-stats-card__value--lg {
      --ux-stats-value-size: 2.5rem;
    }

    .ux-stats-card__value--xl {
      --ux-stats-value-size: 3rem;
    }

    /* Value with prefix/suffix */
    .ux-stats-card__value-wrapper {
      display: flex;
      align-items: baseline;
      gap: var(--ux-space-xs);
    }

    .ux-stats-card__value-prefix,
    .ux-stats-card__value-suffix {
      font-size: calc(var(--ux-stats-value-size) * 0.6);
      font-weight: 500;
      color: var(--ux-text-secondary);
    }

    /* ==========================================================================
       Stats Footer (Trend + Description)
       ========================================================================== */

    .ux-stats-card__footer {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
      margin-top: var(--ux-space-xs);
    }

    .ux-stats-card__trend {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: var(--ux-stats-trend-size);
      font-weight: 600;
      padding: 2px 8px;
      border-radius: var(--ux-border-radius-pill);
    }

    .ux-stats-card__trend svg {
      width: 14px;
      height: 14px;
    }

    /* Trend up */
    .ux-stats-card__trend--up {
      color: var(--ux-success);
      background: rgba(var(--ux-success-rgb), 0.1);
    }

    /* Trend down */
    .ux-stats-card__trend--down {
      color: var(--ux-danger);
      background: rgba(var(--ux-danger-rgb), 0.1);
    }

    /* Trend neutral */
    .ux-stats-card__trend--neutral {
      color: var(--ux-text-secondary);
      background: var(--ux-surface-secondary);
    }

    .ux-stats-card__description {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-tertiary);
    }

    /* ==========================================================================
       Stats Progress
       ========================================================================== */

    .ux-stats-card__progress {
      margin-top: var(--ux-space-sm);
    }

    .ux-stats-card__progress-bar {
      height: 6px;
      background: var(--ux-surface-secondary);
      border-radius: var(--ux-border-radius-pill);
      overflow: hidden;
    }

    .ux-stats-card__progress-fill {
      height: 100%;
      background: var(--ux-primary);
      border-radius: var(--ux-border-radius-pill);
      transition: width var(--ux-transition-slow) var(--ux-ease-ios);
    }

    .ux-stats-card__progress-fill--success { background: var(--ux-success); }
    .ux-stats-card__progress-fill--warning { background: var(--ux-warning); }
    .ux-stats-card__progress-fill--danger { background: var(--ux-danger); }

    .ux-stats-card__progress-label {
      display: flex;
      justify-content: space-between;
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-tertiary);
      margin-top: var(--ux-space-xs);
    }

    /* ==========================================================================
       Stats Sparkline (Mini chart)
       ========================================================================== */

    .ux-stats-card__sparkline {
      height: 40px;
      margin-top: var(--ux-space-sm);
    }

    .ux-stats-card__sparkline svg {
      width: 100%;
      height: 100%;
    }

    .ux-stats-card__sparkline path {
      fill: none;
      stroke: var(--ux-primary);
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .ux-stats-card__sparkline-fill {
      fill: rgba(var(--ux-primary-rgb), 0.1);
      stroke: none;
    }

    /* ==========================================================================
       Size Variants
       ========================================================================== */

    /* Small */
    .ux-stats-card--sm {
      --ux-stats-padding: var(--ux-space-md);
      --ux-stats-value-size: 1.5rem;
      --ux-stats-icon-size: 36px;
    }

    /* Large */
    .ux-stats-card--lg {
      --ux-stats-padding: var(--ux-space-xl);
      --ux-stats-value-size: 2.5rem;
      --ux-stats-icon-size: 56px;
    }

    /* ==========================================================================
       Layout Variants
       ========================================================================== */

    /* Horizontal layout */
    .ux-stats-card--horizontal {
      flex-direction: row;
      align-items: center;
    }

    .ux-stats-card--horizontal .ux-stats-card__icon {
      order: -1;
    }

    .ux-stats-card--horizontal .ux-stats-card__body {
      flex: 1;
    }

    /* Centered layout */
    .ux-stats-card--centered {
      text-align: center;
      align-items: center;
    }

    .ux-stats-card--centered .ux-stats-card__header {
      flex-direction: column;
      align-items: center;
    }

    .ux-stats-card--centered .ux-stats-card__footer {
      justify-content: center;
    }

    /* ==========================================================================
       Color Variants
       ========================================================================== */

    .ux-stats-card--primary {
      background: var(--ux-primary);
      border-color: var(--ux-primary);
      color: white;
    }

    .ux-stats-card--primary .ux-stats-card__label,
    .ux-stats-card--primary .ux-stats-card__description {
      color: rgba(255, 255, 255, 0.8);
    }

    .ux-stats-card--primary .ux-stats-card__value {
      color: white;
    }

    .ux-stats-card--primary .ux-stats-card__icon {
      background: rgba(255, 255, 255, 0.2);
      color: white;
    }

    .ux-stats-card--primary .ux-stats-card__progress-bar {
      background: rgba(255, 255, 255, 0.2);
    }

    .ux-stats-card--primary .ux-stats-card__progress-fill {
      background: white;
    }

    /* Gradient variant */
    .ux-stats-card--gradient {
      background: linear-gradient(135deg, var(--ux-primary) 0%, var(--ux-secondary) 100%);
      border: none;
      color: white;
    }

    .ux-stats-card--gradient .ux-stats-card__label,
    .ux-stats-card--gradient .ux-stats-card__description {
      color: rgba(255, 255, 255, 0.85);
    }

    .ux-stats-card--gradient .ux-stats-card__value {
      color: white;
    }

    .ux-stats-card--gradient .ux-stats-card__icon {
      background: rgba(255, 255, 255, 0.2);
      color: white;
    }

    /* ==========================================================================
       Glass Variant
       ========================================================================== */

    .ux-stats-card--glass {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      border-color: var(--ux-glass-border);
    }

    .ux-stats-card--glass .ux-stats-card__icon {
      background: rgba(255, 255, 255, 0.15);
    }

    /* ==========================================================================
       Stats Grid
       ========================================================================== */

    .ux-stats-grid {
      display: grid;
      gap: var(--ux-space-md);
    }

    /* Auto-fit columns */
    .ux-stats-grid--auto {
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    }

    /* Fixed columns */
    .ux-stats-grid--2 { grid-template-columns: repeat(2, 1fr); }
    .ux-stats-grid--3 { grid-template-columns: repeat(3, 1fr); }
    .ux-stats-grid--4 { grid-template-columns: repeat(4, 1fr); }

    /* Responsive grid */
    @media (max-width: 991px) {
      .ux-stats-grid--4 { grid-template-columns: repeat(2, 1fr); }
      .ux-stats-grid--3 { grid-template-columns: repeat(2, 1fr); }
    }

    @media (max-width: 767px) {
      .ux-stats-grid--4,
      .ux-stats-grid--3,
      .ux-stats-grid--2 {
        grid-template-columns: 1fr;
      }
    }

    /* ==========================================================================
       Stats Row (Horizontal scrolling)
       ========================================================================== */

    .ux-stats-row {
      display: flex;
      gap: var(--ux-space-md);
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      -ms-overflow-style: none;
      padding-bottom: var(--ux-space-sm);
    }

    .ux-stats-row::-webkit-scrollbar {
      display: none;
    }

    .ux-stats-row .ux-stats-card {
      flex-shrink: 0;
      min-width: 200px;
      scroll-snap-align: start;
    }

    /* ==========================================================================
       Dark Mode
       ========================================================================== */

    @media (prefers-color-scheme: dark) {
      :root:not(.ux-light) .ux-stats-card--glass .ux-stats-card__icon {
        background: rgba(255, 255, 255, 0.1);
      }
    }

    .ux-dark .ux-stats-card--glass .ux-stats-card__icon {
      background: rgba(255, 255, 255, 0.1);
    }

    /* ==========================================================================
       Reduced Motion
       ========================================================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-stats-card {
        transition: none;
      }

      .ux-stats-card:hover {
        transform: none;
      }

      .ux-stats-card__progress-fill {
        transition: none;
      }
    }

    /* ==========================================================================
       Animation - Counter
       ========================================================================== */

    .ux-stats-card__value--animated {
      animation: ux-stats-count-up 0.8s var(--ux-ease-ios) forwards;
    }

    @keyframes ux-stats-count-up {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-stats-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-stats-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine.js component for animated counter
  const statsCardComponent = (config = {}) => ({
    value: config.value || 0,
    targetValue: config.targetValue || config.value || 0,
    displayValue: 0,
    animated: config.animated !== false,
    duration: config.duration || 1000,
    decimals: config.decimals || 0,
    prefix: config.prefix || '',
    suffix: config.suffix || '',

    init() {
      if (this.animated) {
        // Use Intersection Observer to animate when visible
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.animateValue();
              observer.disconnect();
            }
          });
        }, { threshold: 0.3 });

        observer.observe(this.$el);
      } else {
        this.displayValue = this.targetValue;
      }
    },

    animateValue() {
      const startTime = performance.now();
      const startValue = 0;
      const endValue = this.targetValue;

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / this.duration, 1);

        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);

        this.displayValue = startValue + (endValue - startValue) * easeOut;

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          this.displayValue = endValue;
        }
      };

      requestAnimationFrame(animate);
    },

    get formattedValue() {
      const num = this.displayValue.toFixed(this.decimals);
      // Add thousands separator
      const parts = num.split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return this.prefix + parts.join('.') + this.suffix;
    },

    // Update value externally
    updateValue(newValue) {
      this.targetValue = newValue;
      if (this.animated) {
        this.animateValue();
      } else {
        this.displayValue = newValue;
      }
    }
  });

  // Simple sparkline generator
  const generateSparklinePath = (data, width = 100, height = 40) => {
    if (!data || data.length < 2) return '';

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;

    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    });

    return `M${points.join(' L')}`;
  };

  // Generate sparkline with fill
  const generateSparklineFill = (data, width = 100, height = 40) => {
    const linePath = generateSparklinePath(data, width, height);
    if (!linePath) return '';

    return `${linePath} L${width},${height} L0,${height} Z`;
  };

  // Register component and utilities
  if (window.UX) {
    window.UX.registerComponent('uxStatsCard', statsCardComponent);
    window.UX.generateSparklinePath = generateSparklinePath;
    window.UX.generateSparklineFill = generateSparklineFill;
  }

  window.UXSparkline = {
    path: generateSparklinePath,
    fill: generateSparklineFill
  };

})();
