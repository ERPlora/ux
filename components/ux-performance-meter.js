/**
 * UX Performance Meter Component
 * HR module component for displaying employee performance metrics
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ==========================================================================
       UX Performance Meter - HR Performance Visualization
       iOS 26 Style - Liquid Glass Design
       ========================================================================== */

    :root {
      /* Performance Meter Tokens */
      --ux-perf-meter-padding: var(--ux-space-lg);
      --ux-perf-meter-border-radius: var(--ux-border-radius-lg);
      --ux-perf-meter-gap: var(--ux-space-md);
      --ux-perf-meter-score-size: 120px;
      --ux-perf-meter-bar-height: 8px;
      --ux-perf-meter-bar-radius: 4px;
    }

    /* ==========================================================================
       Main Container
       ========================================================================== */

    .ux-performance-meter {
      display: flex;
      flex-direction: column;
      gap: var(--ux-perf-meter-gap);
      padding: var(--ux-perf-meter-padding);
      background: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-perf-meter-border-radius);
      font-family: var(--ux-font-family);
    }

    /* ==========================================================================
       Employee Header
       ========================================================================== */

    .ux-performance-meter__header {
      display: flex;
      align-items: center;
      gap: var(--ux-space-md);
      padding-bottom: var(--ux-space-md);
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-performance-meter__avatar {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: var(--ux-medium);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--ux-font-size-xl);
      font-weight: 600;
      color: var(--ux-medium-contrast);
      overflow: hidden;
      flex-shrink: 0;
    }

    .ux-performance-meter__avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .ux-performance-meter__employee-info {
      flex: 1;
      min-width: 0;
    }

    .ux-performance-meter__employee-name {
      font-size: var(--ux-font-size-lg);
      font-weight: 600;
      color: var(--ux-text);
      margin: 0;
      line-height: 1.3;
    }

    .ux-performance-meter__employee-role {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin: 0;
    }

    .ux-performance-meter__employee-department {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-tertiary);
      margin: 0;
    }

    .ux-performance-meter__period-badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 6px 12px;
      background: var(--ux-surface-secondary);
      border-radius: var(--ux-border-radius-pill);
      font-size: var(--ux-font-size-xs);
      font-weight: 500;
      color: var(--ux-text-secondary);
      flex-shrink: 0;
    }

    /* ==========================================================================
       Score Display (Gauge Style)
       ========================================================================== */

    .ux-performance-meter__score-section {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--ux-space-xl);
      padding: var(--ux-space-md) 0;
    }

    .ux-performance-meter__score-gauge {
      position: relative;
      width: var(--ux-perf-meter-score-size);
      height: var(--ux-perf-meter-score-size);
    }

    .ux-performance-meter__score-svg {
      width: 100%;
      height: 100%;
      transform: rotate(-90deg);
    }

    .ux-performance-meter__score-track {
      fill: none;
      stroke: var(--ux-surface-secondary);
      stroke-width: 10;
    }

    .ux-performance-meter__score-fill {
      fill: none;
      stroke: var(--ux-primary);
      stroke-width: 10;
      stroke-linecap: round;
      transition: stroke-dashoffset 1s var(--ux-ease-ios);
    }

    /* Score colors based on performance */
    .ux-performance-meter__score-fill--excellent {
      stroke: var(--ux-success);
    }

    .ux-performance-meter__score-fill--good {
      stroke: var(--ux-primary);
    }

    .ux-performance-meter__score-fill--average {
      stroke: var(--ux-warning);
    }

    .ux-performance-meter__score-fill--poor {
      stroke: var(--ux-danger);
    }

    .ux-performance-meter__score-value {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
    }

    .ux-performance-meter__score-number {
      font-size: 2rem;
      font-weight: 700;
      color: var(--ux-text);
      line-height: 1;
      font-variant-numeric: tabular-nums;
    }

    .ux-performance-meter__score-max {
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      color: var(--ux-text-tertiary);
    }

    .ux-performance-meter__score-label {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-secondary);
      margin-top: 4px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    /* Score summary beside gauge */
    .ux-performance-meter__score-summary {
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-sm);
    }

    .ux-performance-meter__score-status {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border-radius: var(--ux-border-radius-pill);
      font-size: var(--ux-font-size-sm);
      font-weight: 600;
    }

    .ux-performance-meter__score-status--excellent {
      background: rgba(var(--ux-success-rgb), 0.1);
      color: var(--ux-success);
    }

    .ux-performance-meter__score-status--good {
      background: rgba(var(--ux-primary-rgb), 0.1);
      color: var(--ux-primary);
    }

    .ux-performance-meter__score-status--average {
      background: rgba(var(--ux-warning-rgb), 0.1);
      color: var(--ux-warning);
    }

    .ux-performance-meter__score-status--poor {
      background: rgba(var(--ux-danger-rgb), 0.1);
      color: var(--ux-danger);
    }

    .ux-performance-meter__trend {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
    }

    .ux-performance-meter__trend--up {
      color: var(--ux-success);
    }

    .ux-performance-meter__trend--down {
      color: var(--ux-danger);
    }

    .ux-performance-meter__trend--neutral {
      color: var(--ux-text-secondary);
    }

    .ux-performance-meter__trend svg {
      width: 16px;
      height: 16px;
    }

    /* ==========================================================================
       Goal vs Actual
       ========================================================================== */

    .ux-performance-meter__goal-section {
      display: flex;
      align-items: center;
      gap: var(--ux-space-lg);
      padding: var(--ux-space-sm) var(--ux-space-md);
      background: var(--ux-surface-secondary);
      border-radius: var(--ux-border-radius);
    }

    .ux-performance-meter__goal-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1;
    }

    .ux-performance-meter__goal-label {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-tertiary);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .ux-performance-meter__goal-value {
      font-size: var(--ux-font-size-xl);
      font-weight: 700;
      color: var(--ux-text);
      font-variant-numeric: tabular-nums;
    }

    .ux-performance-meter__goal-divider {
      width: 1px;
      height: 40px;
      background: var(--ux-border-color);
    }

    .ux-performance-meter__goal-diff {
      font-size: var(--ux-font-size-sm);
      font-weight: 600;
    }

    .ux-performance-meter__goal-diff--positive {
      color: var(--ux-success);
    }

    .ux-performance-meter__goal-diff--negative {
      color: var(--ux-danger);
    }

    /* ==========================================================================
       Category Breakdown
       ========================================================================== */

    .ux-performance-meter__categories {
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-md);
    }

    .ux-performance-meter__categories-title {
      font-size: var(--ux-font-size-sm);
      font-weight: 600;
      color: var(--ux-text);
      margin: 0;
      padding-bottom: var(--ux-space-xs);
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-performance-meter__category {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .ux-performance-meter__category-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .ux-performance-meter__category-name {
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      color: var(--ux-text);
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .ux-performance-meter__category-icon {
      width: 18px;
      height: 18px;
      color: var(--ux-text-secondary);
    }

    .ux-performance-meter__category-score {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .ux-performance-meter__category-value {
      font-size: var(--ux-font-size-sm);
      font-weight: 600;
      color: var(--ux-text);
      font-variant-numeric: tabular-nums;
      min-width: 36px;
      text-align: right;
    }

    .ux-performance-meter__category-trend {
      display: flex;
      align-items: center;
      gap: 2px;
      font-size: var(--ux-font-size-xs);
      font-weight: 500;
    }

    .ux-performance-meter__category-trend--up {
      color: var(--ux-success);
    }

    .ux-performance-meter__category-trend--down {
      color: var(--ux-danger);
    }

    .ux-performance-meter__category-trend--neutral {
      color: var(--ux-text-tertiary);
    }

    .ux-performance-meter__category-trend svg {
      width: 12px;
      height: 12px;
    }

    .ux-performance-meter__category-bar {
      height: var(--ux-perf-meter-bar-height);
      background: var(--ux-surface-secondary);
      border-radius: var(--ux-perf-meter-bar-radius);
      overflow: hidden;
    }

    .ux-performance-meter__category-fill {
      height: 100%;
      border-radius: var(--ux-perf-meter-bar-radius);
      transition: width 0.8s var(--ux-ease-ios);
    }

    .ux-performance-meter__category-fill--excellent {
      background: var(--ux-success);
    }

    .ux-performance-meter__category-fill--good {
      background: var(--ux-primary);
    }

    .ux-performance-meter__category-fill--average {
      background: var(--ux-warning);
    }

    .ux-performance-meter__category-fill--poor {
      background: var(--ux-danger);
    }

    /* ==========================================================================
       Period Selector
       ========================================================================== */

    .ux-performance-meter__period-selector {
      display: flex;
      gap: 4px;
      padding: 4px;
      background: var(--ux-surface-secondary);
      border-radius: var(--ux-border-radius);
    }

    .ux-performance-meter__period-btn {
      flex: 1;
      padding: 8px 12px;
      background: transparent;
      border: none;
      border-radius: var(--ux-border-radius-sm);
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      color: var(--ux-text-secondary);
      cursor: pointer;
      transition: all var(--ux-transition-fast) var(--ux-ease-ios);
    }

    .ux-performance-meter__period-btn:hover {
      color: var(--ux-text);
      background: rgba(var(--ux-primary-rgb), 0.05);
    }

    .ux-performance-meter__period-btn--active {
      background: var(--ux-surface);
      color: var(--ux-text);
      box-shadow: var(--ux-shadow-sm);
    }

    /* ==========================================================================
       Size Variants
       ========================================================================== */

    /* Compact */
    .ux-performance-meter--compact {
      --ux-perf-meter-padding: var(--ux-space-md);
      --ux-perf-meter-gap: var(--ux-space-sm);
      --ux-perf-meter-score-size: 80px;
    }

    .ux-performance-meter--compact .ux-performance-meter__score-number {
      font-size: 1.5rem;
    }

    .ux-performance-meter--compact .ux-performance-meter__avatar {
      width: 40px;
      height: 40px;
      font-size: var(--ux-font-size-md);
    }

    .ux-performance-meter--compact .ux-performance-meter__score-svg .ux-performance-meter__score-track,
    .ux-performance-meter--compact .ux-performance-meter__score-svg .ux-performance-meter__score-fill {
      stroke-width: 8;
    }

    /* Large */
    .ux-performance-meter--lg {
      --ux-perf-meter-padding: var(--ux-space-xl);
      --ux-perf-meter-gap: var(--ux-space-lg);
      --ux-perf-meter-score-size: 160px;
    }

    .ux-performance-meter--lg .ux-performance-meter__score-number {
      font-size: 2.5rem;
    }

    .ux-performance-meter--lg .ux-performance-meter__avatar {
      width: 72px;
      height: 72px;
      font-size: var(--ux-font-size-2xl);
    }

    /* ==========================================================================
       Score Only Variant (No header, no categories)
       ========================================================================== */

    .ux-performance-meter--score-only {
      padding: var(--ux-space-md);
    }

    .ux-performance-meter--score-only .ux-performance-meter__score-section {
      padding: 0;
    }

    /* ==========================================================================
       Inline Variant (Horizontal Layout)
       ========================================================================== */

    .ux-performance-meter--inline {
      flex-direction: row;
      align-items: center;
      flex-wrap: wrap;
    }

    .ux-performance-meter--inline .ux-performance-meter__header {
      flex: 1;
      min-width: 200px;
      border-bottom: none;
      padding-bottom: 0;
      padding-right: var(--ux-space-md);
      border-right: 1px solid var(--ux-border-color);
    }

    .ux-performance-meter--inline .ux-performance-meter__score-section {
      padding: 0 var(--ux-space-md);
    }

    /* ==========================================================================
       Glass Variant
       ========================================================================== */

    .ux-performance-meter--glass {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      border-color: var(--ux-glass-border);
    }

    .ux-performance-meter--glass .ux-performance-meter__score-track {
      stroke: var(--ux-glass-bg-thick);
    }

    .ux-performance-meter--glass .ux-performance-meter__goal-section,
    .ux-performance-meter--glass .ux-performance-meter__period-selector {
      background: rgba(255, 255, 255, 0.1);
    }

    .ux-performance-meter--glass .ux-performance-meter__category-bar {
      background: rgba(255, 255, 255, 0.15);
    }

    /* ==========================================================================
       Dark Mode
       ========================================================================== */

    @media (prefers-color-scheme: dark) {
      :root:not(.ux-light) .ux-performance-meter--glass .ux-performance-meter__goal-section,
      :root:not(.ux-light) .ux-performance-meter--glass .ux-performance-meter__period-selector {
        background: rgba(255, 255, 255, 0.05);
      }

      :root:not(.ux-light) .ux-performance-meter--glass .ux-performance-meter__category-bar {
        background: rgba(255, 255, 255, 0.08);
      }
    }

    .ux-dark .ux-performance-meter--glass .ux-performance-meter__goal-section,
    .ux-dark .ux-performance-meter--glass .ux-performance-meter__period-selector {
      background: rgba(255, 255, 255, 0.05);
    }

    .ux-dark .ux-performance-meter--glass .ux-performance-meter__category-bar {
      background: rgba(255, 255, 255, 0.08);
    }

    /* ==========================================================================
       Responsive
       ========================================================================== */

    @media (max-width: 767px) {
      .ux-performance-meter__score-section {
        flex-direction: column;
        gap: var(--ux-space-md);
      }

      .ux-performance-meter__score-summary {
        align-items: center;
        text-align: center;
      }

      .ux-performance-meter--inline {
        flex-direction: column;
      }

      .ux-performance-meter--inline .ux-performance-meter__header {
        border-right: none;
        border-bottom: 1px solid var(--ux-border-color);
        padding-right: 0;
        padding-bottom: var(--ux-space-md);
        width: 100%;
      }

      .ux-performance-meter__goal-section {
        flex-wrap: wrap;
      }

      .ux-performance-meter__goal-divider {
        display: none;
      }

      .ux-performance-meter__goal-item {
        min-width: 80px;
      }
    }

    /* ==========================================================================
       Animation
       ========================================================================== */

    .ux-performance-meter--animated .ux-performance-meter__score-fill {
      animation: ux-perf-meter-fill 1.2s var(--ux-ease-ios) forwards;
    }

    .ux-performance-meter--animated .ux-performance-meter__category-fill {
      animation: ux-perf-meter-bar-fill 0.8s var(--ux-ease-ios) forwards;
    }

    @keyframes ux-perf-meter-fill {
      from {
        stroke-dashoffset: var(--ux-perf-circumference);
      }
    }

    @keyframes ux-perf-meter-bar-fill {
      from {
        width: 0;
      }
    }

    /* ==========================================================================
       Reduced Motion
       ========================================================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-performance-meter__score-fill,
      .ux-performance-meter__category-fill {
        transition: none;
      }

      .ux-performance-meter--animated .ux-performance-meter__score-fill,
      .ux-performance-meter--animated .ux-performance-meter__category-fill {
        animation: none;
      }
    }

    /* ==========================================================================
       Print Styles
       ========================================================================== */

    @media print {
      .ux-performance-meter {
        border: 1px solid #ccc;
        break-inside: avoid;
      }

      .ux-performance-meter--glass {
        backdrop-filter: none;
        -webkit-backdrop-filter: none;
        background: #f9f9f9;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-performance-meter-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-performance-meter-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine.js component
  const performanceMeterComponent = (config = {}) => ({
    // Employee data
    employee: config.employee || {
      name: 'Employee Name',
      role: 'Role',
      department: 'Department',
      avatar: null,
      initials: null
    },

    // Score configuration
    score: config.score ?? 0,
    maxScore: config.maxScore ?? 100,
    scoreType: config.scoreType || 'percentage', // 'percentage' | 'points' | 'rating'
    ratingMax: config.ratingMax ?? 5, // For rating type (1-5 scale)

    // Goal vs Actual
    goal: config.goal ?? null,
    actual: config.actual ?? null,

    // Categories breakdown
    categories: config.categories || [],
    // Example: [
    //   { name: 'Productivity', score: 85, icon: null, trend: 5 },
    //   { name: 'Quality', score: 92, icon: null, trend: 3 },
    //   { name: 'Teamwork', score: 78, icon: null, trend: -2 },
    //   { name: 'Communication', score: 88, icon: null, trend: 0 }
    // ]

    // Trend
    trend: config.trend ?? null, // positive number = up, negative = down, 0 = neutral
    trendLabel: config.trendLabel || 'vs last period',

    // Period
    period: config.period || 'quarterly',
    periods: config.periods || ['monthly', 'quarterly', 'yearly'],

    // Animation
    animated: config.animated !== false,
    animationTriggered: false,

    // Thresholds for color coding
    thresholds: config.thresholds || {
      excellent: 90,
      good: 70,
      average: 50
      // Below 50 = poor
    },

    // Computed properties
    get normalizedScore() {
      if (this.scoreType === 'rating') {
        return (this.score / this.ratingMax) * 100;
      }
      return Math.min(Math.max((this.score / this.maxScore) * 100, 0), 100);
    },

    get displayScore() {
      if (this.scoreType === 'rating') {
        return this.score.toFixed(1);
      }
      return Math.round(this.score);
    },

    get displayMaxScore() {
      if (this.scoreType === 'rating') {
        return this.ratingMax;
      }
      if (this.scoreType === 'percentage') {
        return '%';
      }
      return '/ ' + this.maxScore;
    },

    get scoreLevel() {
      const normalized = this.normalizedScore;
      if (normalized >= this.thresholds.excellent) return 'excellent';
      if (normalized >= this.thresholds.good) return 'good';
      if (normalized >= this.thresholds.average) return 'average';
      return 'poor';
    },

    get scoreLevelLabel() {
      const labels = {
        excellent: 'Excellent',
        good: 'Good',
        average: 'Average',
        poor: 'Needs Improvement'
      };
      return labels[this.scoreLevel];
    },

    get trendDirection() {
      if (this.trend === null || this.trend === 0) return 'neutral';
      return this.trend > 0 ? 'up' : 'down';
    },

    get trendValue() {
      if (this.trend === null) return '';
      const sign = this.trend > 0 ? '+' : '';
      return sign + this.trend + '%';
    },

    get goalDifference() {
      if (this.goal === null || this.actual === null) return null;
      return this.actual - this.goal;
    },

    get goalDifferenceLabel() {
      const diff = this.goalDifference;
      if (diff === null) return '';
      const sign = diff > 0 ? '+' : '';
      return sign + diff;
    },

    // SVG calculations for circular gauge
    get gaugeRadius() {
      return 45; // Based on viewBox of 100
    },

    get gaugeCircumference() {
      return 2 * Math.PI * this.gaugeRadius;
    },

    get gaugeDashOffset() {
      return this.gaugeCircumference * (1 - this.normalizedScore / 100);
    },

    // Methods
    getCategoryLevel(score) {
      if (score >= this.thresholds.excellent) return 'excellent';
      if (score >= this.thresholds.good) return 'good';
      if (score >= this.thresholds.average) return 'average';
      return 'poor';
    },

    getCategoryTrendDirection(trend) {
      if (trend === null || trend === undefined || trend === 0) return 'neutral';
      return trend > 0 ? 'up' : 'down';
    },

    getCategoryTrendValue(trend) {
      if (trend === null || trend === undefined) return '';
      const sign = trend > 0 ? '+' : '';
      return sign + trend;
    },

    setPeriod(newPeriod) {
      this.period = newPeriod;
      this.$dispatch('performance-meter:period-change', { period: newPeriod });
    },

    // Update score with animation
    updateScore(newScore) {
      this.score = newScore;
      this.$dispatch('performance-meter:score-change', {
        score: newScore,
        level: this.scoreLevel
      });
    },

    // Get initials from employee name
    getInitials() {
      if (this.employee.initials) return this.employee.initials;
      if (!this.employee.name) return '?';
      return this.employee.name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    },

    // Lifecycle
    init() {
      // Trigger animation when component is visible
      if (this.animated) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && !this.animationTriggered) {
              this.animationTriggered = true;
              this.$el.classList.add('ux-performance-meter--animated');
              observer.disconnect();
            }
          });
        }, { threshold: 0.3 });

        observer.observe(this.$el);
      }
    }
  });

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxPerformanceMeter', performanceMeterComponent);
  }

})();
