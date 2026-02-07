# UX - Universal eXtensions

Semantic CSS component library built with Tailwind v4. **155 components**, zero dependencies for consumers.

**[Live Demo & Docs](https://erplora.github.io/ux/)**

## Features

- **155 Components** — from buttons to Gantt charts, POS terminals to HR dashboards
- **Zero Dependencies** — single CSS file via CDN, no JavaScript required
- **Framework Agnostic** — works with Django, HTMX, React, Vue, or vanilla JS
- **Dual Output** — semantic classes (`btn btn-primary`) or Tailwind utilities (`bg-primary text-primary-content`)
- **No Build Step** — pre-compiled CSS, just link and use (ideal for Django without Node)
- **OKLCH Colors** — perceptually uniform color system with 4 themes
- **Dark Mode** — automatic via `prefers-color-scheme` + manual via `data-theme="dark"`
- **Touch-First** — 44px touch targets, iOS-style animations
- **Glass Morphism** — built-in `.glass` utility class

## Quick Start

```html
<!-- ONE link. Zero JS. Zero Node. Zero build step. -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/ERPlora/ux@3/dist/ux-full.min.css">

<!-- Semantic classes -->
<button class="btn btn-primary">Save</button>

<!-- Tailwind utilities -->
<div class="flex gap-4 p-6 bg-base-200 rounded-box">...</div>

<!-- Mix both freely -->
<div class="card mt-4">
  <div class="card-body">
    <h2 class="card-title text-primary">Title</h2>
  </div>
</div>
```

### Django / HTMX (no Node needed)

```html
{% load static %}
<link rel="stylesheet" href="{% static 'css/ux-full.min.css' %}">

<button class="btn btn-primary"
        hx-get="/api/users/"
        hx-target="#user-list">
  Load Users
</button>
```

## Three CSS Files

| File | Content | Usage |
|------|---------|-------|
| `ux.min.css` | Semantic classes + tokens | `class="btn btn-primary"` |
| `tw.min.css` | Tailwind utilities + tokens | `class="bg-primary text-primary-content ..."` |
| `ux-full.min.css` | **Both combined** (recommended) | Mix semantic + utilities freely |

## Themes

4 built-in themes: **default** (light), **dark**, **erplora**, **ocean**.

```html
<html data-theme="dark">     <!-- Dark mode -->
<html data-theme="erplora">  <!-- ERPlora brand -->
<html data-theme="ocean">    <!-- Ocean blue tint -->
<html>                        <!-- Light default, auto-dark via prefers-color-scheme -->
```

Switch at runtime:

```js
document.documentElement.setAttribute('data-theme', 'dark');
```

## Color System

8 semantic colors, all OKLCH:

| Color | Class | Token |
|-------|-------|-------|
| Primary | `.color-primary` / `.btn-primary` | `--color-primary` |
| Secondary | `.color-secondary` / `.btn-secondary` | `--color-secondary` |
| Accent | `.color-accent` / `.btn-accent` | `--color-accent` |
| Neutral | `.color-neutral` / `.btn-neutral` | `--color-neutral` |
| Info | `.color-info` / `.btn-info` | `--color-info` |
| Success | `.color-success` / `.btn-success` | `--color-success` |
| Warning | `.color-warning` / `.btn-warning` | `--color-warning` |
| Error | `.color-error` / `.btn-error` | `--color-error` |

Each color has a `-content` variant for text contrast (e.g. `--color-primary-content`).

## Components (155)

### Basic (14)
`btn`, `btn-group`, `badge`, `avatar`, `chip`, `loading`, `skeleton`, `divider`, `fab`, `spinner`, `icon-btn`, `back-button`, `menu-button`, `split-button`

### Forms (24)
`input`, `textarea`, `select`, `checkbox`, `radio`, `toggle`, `range`, `searchbar`, `upload`, `tag-input`, `autocomplete`, `otp-input`, `picker`, `color-picker`, `datetime`, `date-range-picker`, `currency-input`, `phone-input`, `signature-pad`, `rich-text`, `quantity-stepper`, `rating`, `form`, `form-wizard`

### Navigation (10)
`tabs`, `tabbar`, `menu`, `breadcrumbs`, `pagination`, `segment`, `stepper`, `sidebar`, `mega-menu`, `menubar`

### Layout (17)
`card`, `list`, `table`, `accordion`, `tree`, `panel`, `section`, `master-detail`, `grid`, `split-pane`, `masonry`, `dashboard-grid`, `shell`, `structure`, `app`, `page`, `drawer`

### Overlays (10)
`modal`, `sheet`, `dropdown`, `popover`, `tooltip`, `context-menu`, `hover-card`, `command`, `notifications`, `lightbox`

### Feedback (9)
`alert`, `toast`, `snackbar`, `banner`, `callout`, `progress`, `progress-circle`, `progress-steps`, `gauge`

### Data Display (17)
`datatable`, `code-block`, `json-viewer`, `diff-viewer`, `pdf-viewer`, `kpi-card`, `sparkline`, `qr-code`, `bar-chart`, `chart`, `calendar`, `calendar-views`, `scheduler`, `kanban`, `event-card`, `virtual-list`, `loyalty-card`

### Multimedia (8)
`img`, `image-gallery`, `image-crop`, `image-zoom`, `carousel`, `audio-player`, `video-player`, `barcode-scanner`

### Interaction (7)
`toggle-group`, `filter-chip`, `scroll-area`, `infinite-scroll`, `load-more`, `swipe`, `reorder`

### POS / Retail (17)
`numpad`, `pinpad`, `calculator`, `product-card`, `cart`, `order-ticket`, `payment`, `receipt`, `stock-indicator`, `quantity-badge`, `variant-selector`, `virtual-keyboard`, `kds-order`, `category-tabs`, `keyboard`, `onscreen-keyboard`, `reorder`

### HR / Employees (7)
`employee-card`, `time-clock`, `shift-calendar`, `attendance-list`, `leave-request`, `org-chart`, `performance-meter`

### Manufacturing (7)
`work-order`, `machine-status`, `production-line`, `quality-check`, `batch-tracker`, `bom-tree`, `gantt`

### System & Status (5)
`system-monitor`, `pwa`, `refresher`, `status-badge`, `status-indicator`

### Color Composition (8)
`color-primary`, `color-secondary`, `color-accent`, `color-neutral`, `color-info`, `color-success`, `color-warning`, `color-error`

## Glass Morphism

Add `.glass` to any component:

```html
<div class="card glass">Glass card</div>
<button class="btn glass">Glass button</button>
<nav class="sidebar glass">Glass sidebar</nav>
```

## Layout System

```html
<div class="app">
  <div class="page">
    <header class="header">...</header>
    <aside class="drawer drawer-start">...</aside>
    <main class="content">...</main>
    <footer class="footer">...</footer>
  </div>
</div>
```

## Development

```bash
npm install

# Build all CSS + JS
npm run build

# Build CSS only (semantic + tw + full)
npm run build:css

# Docs dev server
cd docs && npm install && npm run dev
```

## Project Structure

```
ux/
├── src/css/
│   ├── tokens.css              # Shared design tokens (@theme)
│   ├── ux.css                  # Semantic entry point
│   ├── tw.css                  # Tailwind utilities entry point
│   ├── utilities.css           # Custom @utility (glass, touch-target, etc.)
│   ├── themes/                 # dark.css, erplora.css, ocean.css
│   └── components/             # 155 component CSS files
├── dist/                       # Build output (CDN-ready)
│   ├── ux.css / ux.min.css     # Semantic classes
│   ├── tw.css / tw.min.css     # Tailwind utilities
│   └── ux-full.css / .min.css  # Both combined
├── docs/                       # Astro documentation site
├── UX_LIBRARY.md               # AI context file (for Claude, Codex, Copilot)
└── CLAUDE.md                   # Development guidelines
```

## AI Integration

The `UX_LIBRARY.md` file is a comprehensive reference (1,600+ lines) designed for AI systems. Add it as context in any project to let Claude, Codex, Copilot, or Cursor generate correct HTML/CSS with this library.

## License

MIT - ERPlora
