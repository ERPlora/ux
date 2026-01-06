# UX - Universal eXtensions

Touch-first UI components for Web, Mobile & PWA. Inspired by Ionic Framework. Optimized for HTMX and Alpine.js.

**[Live Demo](https://erplora.github.io/ux/)** | [Documentación en Español](docs/index.html) | [English Documentation](docs/index.html?lang=en)

## Features

- **Zero Build** - No compilation needed, works directly in browsers
- **Self-contained** - Each component includes CSS + JS in one file
- **Universal** - Works on Web, Mobile browsers & PWA
- **HTMX Compatible** - Works seamlessly with HTMX
- **Touch-First** - Optimized for mobile (44px touch targets, gestures)
- **iOS Style** - Pixel-perfect iOS/Ionic design patterns
- **Accessible** - ARIA attributes for screen readers
- **Dark Mode** - Built-in light and dark themes
- **12 Color Themes** - Ocean, Emerald, Purple, Sunset, Rose, Teal, Amber, Slate, Indigo, Cyan, Crimson, Forest

## Installation

### Via CDN (Recommended)

```html
<!-- Bootstrap Grid (external, for grid system) -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap-grid.min.css" rel="stylesheet">

<!-- Full library (all components) -->
<script src="https://cdn.jsdelivr.net/gh/ERPlora/ux@main/dist/ux.min.js"></script>

<!-- Or core only -->
<script src="https://cdn.jsdelivr.net/gh/ERPlora/ux@main/dist/ux-core.min.js"></script>
```

> **Note:** UX Library uses Bootstrap Grid externally. Load `bootstrap-grid.min.css` before `ux-core.js`. UX automatically overrides Bootstrap's gutter variables to match Ionic spacing (12px vs 24px).

### Bundle Sizes

| Bundle | Size | Gzipped |
|--------|------|---------|
| ux.min.js | ~586 KB | ~80 KB |
| ux-core.min.js | ~53 KB | ~10 KB |

### Local Installation

```html
<!-- Bootstrap Grid (required for grid system) -->
<link href="bootstrap-grid.min.css" rel="stylesheet">

<!-- Dependencies (optional) -->
<script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
<script src="https://unpkg.com/htmx.org@1.x.x"></script>

<!-- Core (required) - overrides Bootstrap gutter variables -->
<script src="components/ux-core.js"></script>

<!-- Load only what you need -->
<script src="components/ux-button.js"></script>
<script src="components/ux-modal.js"></script>

<!-- Or load everything -->
<script src="ux-all.js"></script>
```

## Components (47)

| Category | Components |
|----------|------------|
| **Basic** | button, badge, chip, spinner, progress, avatar, img |
| **Forms** | input, checkbox, radio, toggle, range, select, searchbar, textarea |
| **Layout** | card, list, content, page-header |
| **Navigation** | navbar, toolbar, tabs, segment, breadcrumbs, menu, back-button |
| **Overlay** | modal, sheet, alert, toast, popover, loading, picker |
| **Feedback** | skeleton, fab |
| **Interactive** | accordion, datetime, infinite-scroll, refresher, reorder, rating, datatable, swipe, carousel |
| **Admin** | shell, panel |
| **PWA** | pwa (offline detection, install prompt, service worker) |

## Usage

### Buttons
```html
<button class="ux-button ux-button--primary">Primary</button>
<button class="ux-button ux-button--secondary ux-button--lg">Large</button>
<button class="ux-button ux-button--outline ux-button--sm">Small Outline</button>
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

### Carousel
```html
<div x-data="uxCarousel({ slidesPerView: 3 })"
     class="ux-carousel ux-carousel--show-3 ux-carousel--gap-md">
  <button class="ux-carousel__nav ux-carousel__nav--prev" @click="prev()">←</button>
  <button class="ux-carousel__nav ux-carousel__nav--next" @click="next()">→</button>
  <div class="ux-carousel__viewport" x-ref="viewport">
    <div class="ux-carousel__track" x-ref="track"
         :style="{ transform: `translateX(${translateX}%)` }">
      <div class="ux-carousel__slide">1</div>
      <div class="ux-carousel__slide">2</div>
      <div class="ux-carousel__slide">3</div>
    </div>
  </div>
</div>
```

### With HTMX
```html
<button class="ux-button" hx-post="/api/save" hx-target="#result">
  Save
</button>

<form hx-post="/api/submit" hx-swap="outerHTML">
  <input type="text" class="ux-input" name="email">
  <button type="submit" class="ux-button ux-button--primary">Submit</button>
</form>
```

## Theming

### Dark Mode
```html
<body x-data="uxTheme()" :class="{ 'ux-dark': darkMode }">
  <button @click="toggleDarkMode()">Toggle</button>
</body>
```

### Color Themes
```html
<body class="ux-theme-emerald"><!-- or purple, sunset, rose, etc. --></body>
```

## Grid System

UX Library uses **Bootstrap Grid** externally with Ionic-style spacing overrides:

```html
<!-- Bootstrap Grid classes work as expected -->
<div class="container">
  <div class="row">
    <div class="col-12 col-md-6 col-lg-4">Column</div>
    <div class="col-12 col-md-6 col-lg-4">Column</div>
    <div class="col-12 col-md-6 col-lg-4">Column</div>
  </div>
</div>

<!-- UX CSS Grid utilities (native CSS Grid) -->
<div class="ux-css-grid ux-css-grid--3 ux-gap-lg">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

| Class | Description |
|-------|-------------|
| `.ux-css-grid--{2,3,4,6,12}` | Fixed column grid |
| `.ux-css-grid--auto-fit` | Auto-fit responsive grid |
| `.ux-gap-{xs,sm,md,lg,xl}` | Gap utilities |

## CSS Utilities

```css
/* Flex */
.ux-flex .ux-flex-col .ux-items-center .ux-justify-between .ux-gap-md

/* Responsive Spacing (scales with viewport) */
.ux-padding .ux-margin .ux-padding-horizontal .ux-margin-vertical

/* Fixed Spacing: xs, sm, md, lg, xl */
.ux-p-md .ux-m-lg .ux-px-sm .ux-py-xl .ux-mt-md .ux-mb-lg

/* Typography */
.ux-text-sm .ux-text-lg .ux-text-center .ux-font-bold .ux-text-primary

/* Display */
.ux-hidden .ux-block .ux-rounded-lg .ux-shadow-md
```

## CSS Variables

```css
:root {
  --ux-primary: #007aff;
  --ux-success: #34c759;
  --ux-danger: #ff3b30;
  --ux-space-md: 16px;
  --ux-border-radius: 8px;
  --ux-touch-target: 44px;
}
```

## Component Sizing System (Ionic-based)

All components use CSS variables for sizing, making it easy to customize globally or per-theme. Override these variables to create compact, large, or custom-sized themes.

### Button Sizing
```css
--ux-button-height: 3.1em;          /* Default height */
--ux-button-height-sm: 2.1em;       /* Small variant */
--ux-button-height-lg: 3.1em;       /* Large variant */
--ux-button-min-height: 36px;
--ux-button-padding-y: 13px;
--ux-button-padding-x: 1em;
--ux-button-border-radius: 14px;
--ux-button-font-size: 1rem;
```

### Input Sizing
```css
--ux-input-height: 44px;            /* Standard iOS height */
--ux-input-height-sm: 36px;
--ux-input-height-lg: 52px;
--ux-input-padding-y: 10px;
--ux-input-padding-x: 16px;
--ux-input-font-size: 16px;         /* Prevents zoom on iOS */
```

### Other Component Variables
```css
/* Avatar */
--ux-avatar-size: 48px;
--ux-avatar-size-sm: 36px;
--ux-avatar-size-lg: 64px;

/* FAB */
--ux-fab-size: 56px;
--ux-fab-size-sm: 40px;
--ux-fab-size-lg: 72px;

/* Chip */
--ux-chip-height: 32px;
--ux-chip-height-sm: 24px;
--ux-chip-height-lg: 40px;

/* Toggle (iOS-style) */
--ux-toggle-width: 51px;
--ux-toggle-height: 31px;
--ux-toggle-handle-size: 27px;

/* Checkbox/Radio */
--ux-checkbox-size: 22px;
--ux-radio-size: 20px;

/* Segment */
--ux-segment-min-height: 28px;
--ux-segment-border-radius: 7px;

/* Modal/Sheet/Toast */
--ux-modal-max-width: 500px;
--ux-modal-border-radius: 14px;
--ux-toast-border-radius: 14px;
```

### Custom Theme Example
```css
/* Compact theme */
.ux-theme-compact {
  --ux-button-height: 2.5em;
  --ux-button-min-height: 32px;
  --ux-input-height: 36px;
  --ux-avatar-size: 36px;
  --ux-fab-size: 44px;
}

/* Large touch theme */
.ux-theme-large {
  --ux-button-height: 4em;
  --ux-button-min-height: 52px;
  --ux-input-height: 56px;
  --ux-avatar-size: 64px;
  --ux-fab-size: 72px;
}
```

## Text Customization (i18n)

All component text can be customized via config parameters. No hardcoded strings - pass your own translations.

### Alert Dialogs
```javascript
// Default usage
alert.confirm('Title', 'Message')

// With custom button text
alert.confirm('Título', 'Mensaje', {
  cancelText: 'Cancelar',
  okText: 'Aceptar'
})

alert.prompt('Título', 'Mensaje', {
  cancelText: 'Cancelar',
  okText: 'Aceptar',
  placeholder: 'Escribe aquí...'
})
```

### Other Components
```html
<!-- Picker -->
<div x-data="uxPicker({ cancelText: 'Cancelar', confirmText: 'Hecho' })">

<!-- Select -->
<div x-data="uxSelect({ cancelText: 'Cancelar', okText: 'Aceptar' })">

<!-- Back Button -->
<div x-data="uxBackButton({ text: 'Atrás' })">

<!-- Searchbar placeholder -->
<input class="ux-searchbar" placeholder="Buscar...">

<!-- Loading message -->
<div x-data="uxLoading({ message: 'Cargando...' })">
```

## Browser Support

Chrome 88+ | Firefox 78+ | Safari 14+ | Edge 88+

## Documentation

Open `docs/index.html` for full documentation with live examples.

## License

MIT
