/**
 * UX Chart Component
 * Wrapper for Chart.js with UX theme integration
 * Also supports external SVG charts (matplotlib, seaborn)
 * @requires ux-core.js
 * @requires Chart.js (external)
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Chart - CSS Variables
    ======================================== */

    :root {
      /* Chart Color Palette (10 colors for data series) */
      --ux-chart-1: var(--ux-primary);
      --ux-chart-2: var(--ux-cyan-500);
      --ux-chart-3: var(--ux-emerald-500);
      --ux-chart-4: var(--ux-amber-500);
      --ux-chart-5: var(--ux-rose-500);
      --ux-chart-6: var(--ux-violet-500);
      --ux-chart-7: var(--ux-orange-500);
      --ux-chart-8: var(--ux-teal-500);
      --ux-chart-9: var(--ux-indigo-500);
      --ux-chart-10: var(--ux-purple-500);

      /* Chart Structural Colors */
      --ux-chart-bg: var(--ux-surface);
      --ux-chart-grid: var(--ux-border-color);
      --ux-chart-axis: var(--ux-text-tertiary);
      --ux-chart-text: var(--ux-text);
      --ux-chart-text-secondary: var(--ux-text-secondary);
    }

    /* ========================================
       UX Chart - Container
    ======================================== */

    .ux-chart {
      position: relative;
      display: block;
      width: 100%;
      background: var(--ux-chart-bg);
      border-radius: var(--ux-radius-lg);
      overflow: hidden;
      font-family: var(--ux-font-family);
    }

    /* Canvas for Chart.js */
    .ux-chart canvas {
      display: block;
      width: 100% !important;
      max-width: 100%;
    }

    /* ========================================
       Container Modifiers
    ======================================== */

    .ux-chart--bordered {
      border: 1px solid var(--ux-border-color);
    }

    .ux-chart--padded {
      padding: var(--ux-space-md);
    }

    /* Fixed Heights */
    .ux-chart--sm { height: 200px; }
    .ux-chart--md { height: 300px; }
    .ux-chart--lg { height: 400px; }
    .ux-chart--xl { height: 500px; }

    /* ========================================
       SVG Support (matplotlib, etc.)
    ======================================== */

    .ux-chart--svg svg {
      display: block;
      width: 100%;
      height: auto;
      max-width: 100%;
      background: var(--ux-chart-bg) !important;
    }

    /* SVG Background Override */
    .ux-chart--svg svg rect[fill="#ffffff"],
    .ux-chart--svg svg rect[fill="white"],
    .ux-chart--svg svg rect.background {
      fill: var(--ux-chart-bg) !important;
    }

    /* SVG Text Override */
    .ux-chart--svg svg text {
      fill: var(--ux-chart-text) !important;
      font-family: var(--ux-font-family) !important;
    }

    .ux-chart--svg svg .tick text {
      fill: var(--ux-chart-text-secondary) !important;
    }

    /* Matplotlib Colors -> UX */
    .ux-chart--svg svg [fill="#1f77b4"] { fill: var(--ux-chart-1) !important; }
    .ux-chart--svg svg [stroke="#1f77b4"] { stroke: var(--ux-chart-1) !important; }
    .ux-chart--svg svg [fill="#ff7f0e"] { fill: var(--ux-chart-2) !important; }
    .ux-chart--svg svg [stroke="#ff7f0e"] { stroke: var(--ux-chart-2) !important; }
    .ux-chart--svg svg [fill="#2ca02c"] { fill: var(--ux-chart-3) !important; }
    .ux-chart--svg svg [stroke="#2ca02c"] { stroke: var(--ux-chart-3) !important; }
    .ux-chart--svg svg [fill="#d62728"] { fill: var(--ux-chart-4) !important; }
    .ux-chart--svg svg [stroke="#d62728"] { stroke: var(--ux-chart-4) !important; }
    .ux-chart--svg svg [fill="#9467bd"] { fill: var(--ux-chart-5) !important; }
    .ux-chart--svg svg [stroke="#9467bd"] { stroke: var(--ux-chart-5) !important; }

    /* ========================================
       Dark Mode
    ======================================== */

    @media (prefers-color-scheme: dark) {
      :root {
        --ux-chart-grid: rgba(255, 255, 255, 0.1);
      }
    }

    .ux-dark {
      --ux-chart-grid: rgba(255, 255, 255, 0.1);
    }

    /* ========================================
       Responsive
    ======================================== */

    @media (max-width: 767px) {
      .ux-chart--padded {
        padding: var(--ux-space-sm);
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-chart-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-chart-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // ========================================
  // Helper: Get UX theme colors for Chart.js
  // ========================================
  function getChartColors() {
    const root = document.documentElement;
    const getColor = (name) => getComputedStyle(root).getPropertyValue(name).trim();

    return {
      // Series colors
      colors: [
        getColor('--ux-chart-1') || getColor('--ux-primary'),
        getColor('--ux-chart-2') || getColor('--ux-cyan-500'),
        getColor('--ux-chart-3') || getColor('--ux-emerald-500'),
        getColor('--ux-chart-4') || getColor('--ux-amber-500'),
        getColor('--ux-chart-5') || getColor('--ux-rose-500'),
        getColor('--ux-chart-6') || getColor('--ux-violet-500'),
        getColor('--ux-chart-7') || getColor('--ux-orange-500'),
        getColor('--ux-chart-8') || getColor('--ux-teal-500'),
        getColor('--ux-chart-9') || getColor('--ux-indigo-500'),
        getColor('--ux-chart-10') || getColor('--ux-purple-500'),
      ],
      // Structural colors
      text: getColor('--ux-chart-text') || getColor('--ux-text'),
      textSecondary: getColor('--ux-chart-text-secondary') || getColor('--ux-text-secondary'),
      grid: getColor('--ux-chart-grid') || getColor('--ux-border-color'),
      background: getColor('--ux-chart-bg') || getColor('--ux-surface'),
    };
  }

  // ========================================
  // Helper: Get UX-themed Chart.js defaults
  // ========================================
  function getChartDefaults() {
    const colors = getChartColors();

    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: colors.text,
            font: { family: 'inherit' }
          }
        },
        tooltip: {
          backgroundColor: colors.background,
          titleColor: colors.text,
          bodyColor: colors.textSecondary,
          borderColor: colors.grid,
          borderWidth: 1
        }
      },
      scales: {
        x: {
          ticks: { color: colors.textSecondary },
          grid: { color: colors.grid }
        },
        y: {
          ticks: { color: colors.textSecondary },
          grid: { color: colors.grid }
        }
      }
    };
  }

  // ========================================
  // Alpine.js Component: uxChart
  // ========================================
  const chartData = (config = {}) => ({
    chart: null,
    type: config.type || 'line',
    data: config.data || { labels: [], datasets: [] },
    options: config.options || {},

    init() {
      // Si es contenedor SVG, solo procesar SVG
      if (this.$el.classList.contains('ux-chart--svg')) {
        this.initSvg();
        return;
      }

      // Inicializar Chart.js si existe canvas
      const canvas = this.$el.querySelector('canvas');
      if (canvas && typeof Chart !== 'undefined') {
        this.initChart(canvas);
      }

      // Escuchar actualizaciones HTMX
      this.$el.addEventListener('htmx:afterSwap', () => {
        this.$nextTick(() => this.handleHtmxSwap());
      });
    },

    initChart(canvas) {
      const colors = getChartColors();
      const defaults = getChartDefaults();

      // Aplicar colores a datasets si no tienen
      if (this.data.datasets) {
        this.data.datasets.forEach((ds, i) => {
          if (!ds.borderColor) ds.borderColor = colors.colors[i % colors.colors.length];
          if (!ds.backgroundColor) {
            ds.backgroundColor = this.type === 'line'
              ? colors.colors[i % colors.colors.length] + '20'
              : colors.colors[i % colors.colors.length];
          }
        });
      }

      // Merge options con defaults
      const mergedOptions = this.deepMerge(defaults, this.options);

      this.chart = new Chart(canvas, {
        type: this.type,
        data: this.data,
        options: mergedOptions
      });

      this.$dispatch('chart:ready', { chart: this.chart });
    },

    // Actualizar datos (reactivo)
    updateData(newData) {
      if (!this.chart) return;

      if (newData.labels) this.chart.data.labels = newData.labels;
      if (newData.datasets) {
        newData.datasets.forEach((ds, i) => {
          if (this.chart.data.datasets[i]) {
            Object.assign(this.chart.data.datasets[i], ds);
          } else {
            this.chart.data.datasets.push(ds);
          }
        });
      }

      this.chart.update();
      this.$dispatch('chart:updated');
    },

    // Reemplazar config completa
    setConfig(config) {
      if (this.chart) {
        this.chart.destroy();
      }

      this.type = config.type || this.type;
      this.data = config.data || this.data;
      this.options = config.options || this.options;

      const canvas = this.$el.querySelector('canvas');
      if (canvas) {
        this.initChart(canvas);
      }
    },

    // HTMX: procesar datos JSON recibidos
    handleHtmxSwap() {
      // Buscar script con datos JSON
      const script = this.$el.querySelector('script[type="application/json"]');
      if (script) {
        try {
          const config = JSON.parse(script.textContent);
          this.setConfig(config);
          script.remove();
        } catch (e) {
          console.error('uxChart: Error parsing JSON', e);
        }
        return;
      }

      // Si hay canvas nuevo, reinicializar
      const canvas = this.$el.querySelector('canvas');
      if (canvas && !this.chart) {
        this.initChart(canvas);
      }
    },

    // SVG: procesar para tematización
    initSvg() {
      const svg = this.$el.querySelector('svg');
      if (!svg) return;

      // Hacer responsive
      const width = svg.getAttribute('width');
      const height = svg.getAttribute('height');
      if (!svg.getAttribute('viewBox') && width && height) {
        svg.setAttribute('viewBox', `0 0 ${parseFloat(width)} ${parseFloat(height)}`);
      }
      svg.removeAttribute('width');
      svg.removeAttribute('height');

      this.$dispatch('chart:ready', { svg });
    },

    // Helper: deep merge
    deepMerge(target, source) {
      const result = { ...target };
      for (const key in source) {
        if (source[key] instanceof Object && !Array.isArray(source[key])) {
          result[key] = this.deepMerge(result[key] || {}, source[key]);
        } else {
          result[key] = source[key];
        }
      }
      return result;
    },

    // Destruir chart
    destroy() {
      if (this.chart) {
        this.chart.destroy();
        this.chart = null;
      }
    }
  });

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxChart', chartData);
  }

  // Expose helpers globally
  window.UX = window.UX || {};
  window.UX.chart = {
    getColors: getChartColors,
    getDefaults: getChartDefaults
  };

})();
