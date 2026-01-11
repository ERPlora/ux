# UX - Universal eXtensions

Touch-first UI components for Web, Mobile & PWA. Inspired by Ionic Framework. Optimized for HTMX and Alpine.js.

**[Live Demo](https://erplora.github.io/ux/)** | [Documentation](docs/index.html)

## Features

- **Zero Build** - No compilation needed, works directly in browsers
- **Self-contained** - Each component includes CSS + JS in one file
- **145 Components** - Comprehensive library for any application
- **Universal** - Works on Web, Mobile browsers & PWA
- **HTMX Compatible** - Works seamlessly with HTMX
- **Touch-First** - Optimized for mobile (44px touch targets, gestures)
- **iOS Style** - Pixel-perfect iOS/Ionic design patterns
- **Glass Morphism** - iOS 26 Liquid Glass effect on all components
- **Accessible** - ARIA attributes for screen readers
- **Dark Mode** - Built-in light and dark themes
- **12 Color Themes** - Ocean, Emerald, Purple, Sunset, Rose, Teal, Amber, Slate, Indigo, Cyan, Crimson, Forest

## Installation

### Via CDN (Recommended)

```html
<!-- Bootstrap Grid (external, for grid system) -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap-grid.min.css" rel="stylesheet">

<!-- Alpine.js (required for interactive components) -->
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>

<!-- Full library (all 145 components) -->
<script src="https://cdn.jsdelivr.net/gh/ERPlora/ux@main/dist/ux.min.js"></script>

<!-- Or core only (basic components) -->
<script src="https://cdn.jsdelivr.net/gh/ERPlora/ux@main/dist/ux-core.min.js"></script>
```

> **Note:** UX Library uses Bootstrap Grid externally. Load `bootstrap-grid.min.css` before `ux-core.js`. UX automatically overrides Bootstrap's gutter variables to match Ionic spacing.

### Bundle Sizes

| Bundle | Size | Gzipped |
|--------|------|---------|
| ux.min.js | ~1.7 MB | ~294 KB |
| ux-core.min.js | ~60 KB | ~11 KB |

### Local Installation

```html
<!-- Bootstrap Grid (required for grid system) -->
<link href="bootstrap-grid.min.css" rel="stylesheet">

<!-- Dependencies (optional) -->
<script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
<script src="https://unpkg.com/htmx.org@1.x.x"></script>

<!-- Core (required) -->
<script src="components/ux-core.js"></script>

<!-- Load only what you need -->
<script src="components/ux-button.js"></script>
<script src="components/ux-modal.js"></script>

<!-- Or load everything -->
<script src="dist/ux.min.js"></script>
```

## Components (145)

### Basic (CSS-only)
`avatar` · `badge` · `button` · `button-group` · `chip` · `divider` · `icon-button` · `img` · `progress` · `spacer` · `spinner` · `tag`

### Forms
`autocomplete` · `checkbox` · `color-picker` · `currency-input` · `form` · `form-wizard` · `input` · `otp-input` · `phone-input` · `radio` · `range` · `searchbar` · `select` · `signature-pad` · `tag-input` · `textarea` · `toggle` · `upload`

### Layout
`card` · `content` · `list` · `masonry` · `master-detail` · `section` · `split-pane-right`

### Navigation
`back-button` · `breadcrumbs` · `category-tabs` · `context-menu` · `dropdown` · `mega-menu` · `menu` · `navbar` · `pagination` · `segment` · `tabs` · `toolbar`

### Overlay
`alert` · `drawer` · `fullscreen-modal` · `lightbox` · `loading` · `modal` · `picker` · `popover` · `sheet` · `snackbar` · `toast` · `tooltip`

### Feedback
`banner` · `callout` · `fab` · `notifications` · `progress-circle` · `progress-steps` · `rating` · `skeleton` · `state` · `stats` · `status-indicator` · `stepper`

### Interactive
`accordion` · `calendar` · `calendar-views` · `carousel` · `command` · `datatable` · `date-range-picker` · `datetime` · `infinite-scroll` · `load-more` · `refresher` · `reorder` · `tree` · `virtual-list`

### Gestures
`swipe` (x-swipe, x-drag, x-pull-refresh, x-long-press, x-pinch, x-tap)

### Media
`audio-player` · `barcode-scanner` · `image-crop` · `image-gallery` · `image-zoom` · `lightbox` · `pdf-viewer` · `qr-code` · `video-player`

### Data Visualization
`code-block` · `diff-viewer` · `gauge` · `json-viewer` · `sparkline` · `table`

### Admin/Shell
`dashboard-grid` · `panel` · `shell`

### POS/Retail
`calculator` · `cart` · `numpad` · `payment` · `product-card` · `quantity-badge` · `quantity-stepper` · `receipt` · `variant-selector`

### Manufacturing/ERP
`batch-tracker` · `bom-tree` · `gantt` · `kanban` · `machine-status` · `order-ticket` · `org-chart` · `performance-meter` · `production-line` · `quality-check` · `scheduler` · `stock-indicator` · `timeline` · `work-order`

### HR/Time
`attendance-list` · `employee-card` · `event-card` · `leave-request` · `shift-calendar` · `time-clock`

### Utilities
`alpine-utils` · `app-icon` · `core` · `electron` · `keyboard` · `pwa` · `rich-text` · `scroll` · `utilities` · `virtual-keyboard`

## Usage

### Buttons with Color Composition
```html
<!-- Filled buttons -->
<button class="ux-button ux-color-primary">Primary</button>
<button class="ux-button ux-color-success">Success</button>
<button class="ux-button ux-color-danger">Danger</button>

<!-- Outline variant -->
<button class="ux-button ux-button--outline ux-color-primary--outline">Outline</button>

<!-- Soft/tinted variant -->
<button class="ux-button ux-button--soft ux-color-success--soft">Soft</button>

<!-- Sizes -->
<button class="ux-button ux-button--sm ux-color-primary">Small</button>
<button class="ux-button ux-button--lg ux-color-primary">Large</button>
```

### Glass Morphism (iOS 26 Style)
```html
<!-- Any component with --glass modifier -->
<div class="ux-card--glass">Glass card</div>
<nav class="ux-navbar--glass">Glass navbar</nav>
<div class="ux-modal--glass">Glass modal</div>
<input class="ux-input--glass" placeholder="Glass input">
```

### Modal (Alpine.js)
```html
<div x-data="uxModal()">
  <button @click="open()" class="ux-button">Open</button>
  <template x-teleport="body">
    <div x-show="isOpen" class="ux-modal__backdrop" @click.self="close()">
      <div class="ux-modal__content">
        Modal content
      </div>
    </div>
  </template>
</div>
```

### Toast Notifications
```html
<div x-data="uxToastManager({ position: 'top-end' })">
  <button @click="success('Saved!')">Toast</button>
  <button @click="danger('Error!')">Error</button>
</div>
```

### DataTable
```html
<div x-data="uxDatatable({
  data: [...],
  columns: [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email' }
  ]
})">
  <table class="ux-datatable">
    <!-- Auto-generated content -->
  </table>
</div>
```

### Shell (Admin Layout)
```html
<div class="ux-shell" x-data="uxShell()">
  <nav class="ux-shell__navbar">
    <button @click="toggleSidebar()">Menu</button>
    <div class="ux-shell__navbar-brand">My App</div>
  </nav>

  <aside class="ux-shell__sidebar">
    <div class="ux-shell__sidebar-header">
      <img src="logo.png" class="ux-shell__sidebar-logo">
      <span class="ux-shell__sidebar-title">My App</span>
    </div>
    <nav class="ux-shell__sidebar-nav">
      <a href="#" class="ux-shell__sidebar-item">Dashboard</a>
    </nav>
  </aside>

  <main class="ux-shell__main">Content</main>
</div>
```

### With HTMX
```html
<button class="ux-button" hx-post="/api/save" hx-target="#result">
  Save
</button>

<form hx-post="/api/submit" hx-swap="outerHTML">
  <div class="ux-input">
    <input type="email" name="email">
    <label>Email</label>
  </div>
  <button type="submit" class="ux-button ux-color-primary">Submit</button>
</form>
```

## Theming

### Dark Mode
```html
<!-- Automatic (follows system) -->
<body>

<!-- Force dark -->
<body class="ux-dark">

<!-- Force light -->
<body class="ux-light">

<!-- Toggle with Alpine -->
<body x-data="{ dark: false }" :class="{ 'ux-dark': dark }">
  <button @click="dark = !dark">Toggle</button>
</body>
```

### Color Themes
```html
<body class="ux-theme-ocean">    <!-- Default blue -->
<body class="ux-theme-emerald">  <!-- Green -->
<body class="ux-theme-purple">   <!-- Purple -->
<body class="ux-theme-sunset">   <!-- Orange -->
<body class="ux-theme-rose">     <!-- Pink -->
<body class="ux-theme-teal">     <!-- Teal -->
<body class="ux-theme-amber">    <!-- Amber -->
<body class="ux-theme-slate">    <!-- Gray -->
<body class="ux-theme-indigo">   <!-- Indigo -->
<body class="ux-theme-cyan">     <!-- Cyan -->
<body class="ux-theme-crimson">  <!-- Red -->
<body class="ux-theme-forest">   <!-- Dark green -->
```

## Grid System

UX Library uses **Bootstrap Grid** externally:

```html
<!-- Bootstrap Grid classes -->
<div class="container">
  <div class="row">
    <div class="col-12 col-md-6 col-lg-4">Column</div>
    <div class="col-12 col-md-6 col-lg-4">Column</div>
    <div class="col-12 col-md-6 col-lg-4">Column</div>
  </div>
</div>

<!-- UX CSS Grid utilities -->
<div class="ux-css-grid ux-css-grid--3 ux-gap-lg">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

## CSS Variables

```css
:root {
  /* Colors */
  --ux-primary: #007aff;
  --ux-success: #34c759;
  --ux-warning: #ff9500;
  --ux-danger: #ff3b30;

  /* Surfaces */
  --ux-surface: #ffffff;
  --ux-surface-secondary: #f2f2f7;
  --ux-border-color: #c6c6c8;

  /* Glass Morphism */
  --ux-glass-blur: 20px;
  --ux-glass-bg: rgba(255, 255, 255, 0.72);
  --ux-glass-border: rgba(255, 255, 255, 0.18);

  /* Spacing */
  --ux-space-xs: 0.25rem;
  --ux-space-sm: 0.5rem;
  --ux-space-md: 1rem;
  --ux-space-lg: 1.5rem;
  --ux-space-xl: 2rem;

  /* Touch */
  --ux-touch-target: 44px;
  --ux-border-radius: 8px;
}
```

## Browser Support

Chrome 88+ | Firefox 78+ | Safari 14+ | Edge 88+

## Documentation

Open `docs/index.html` for full documentation with live examples.

## License

Apache 2.0
