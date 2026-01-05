# UX Library

iOS-style UI components for web, optimized for HTMX and Alpine.js.

**[Live Demo](https://erplora.github.io/ux/)** | [Documentación en Español](docs/index.html) | [English Documentation](docs/index.html?lang=en)

## Features

- **Zero Build** - No compilation needed, works directly in browsers
- **Self-contained** - Each component includes CSS + JS in one file
- **HTMX Compatible** - Works seamlessly with HTMX
- **Touch-First** - Optimized for mobile (44px touch targets, gestures)
- **iOS Style** - Pixel-perfect iOS/Ionic design patterns
- **Dark Mode** - Built-in light and dark themes
- **12 Color Themes** - Ocean, Emerald, Purple, Sunset, Rose, Teal, Amber, Slate, Indigo, Cyan, Crimson, Forest

## Installation

### Via CDN (Recommended)

```html
<!-- Full library (all components) -->
<script src="https://cdn.jsdelivr.net/gh/ERPlora/ux@main/dist/ux.min.js"></script>

<!-- Or core only -->
<script src="https://cdn.jsdelivr.net/gh/ERPlora/ux@main/dist/ux-core.min.js"></script>
```

### Bundle Sizes

| Bundle | Size | Gzipped |
|--------|------|---------|
| ux.min.js | 474 KB | ~62 KB |
| ux-core.min.js | 33 KB | ~8 KB |

### Local Installation

```html
<!-- Dependencies (optional) -->
<script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
<script src="https://unpkg.com/htmx.org@1.x.x"></script>

<!-- Core (required) -->
<script src="components/ux-core.js"></script>

<!-- Load only what you need -->
<script src="components/ux-button.js"></script>
<script src="components/ux-modal.js"></script>

<!-- Or load everything -->
<script src="ux-all.js"></script>
```

## Components (40+)

| Category | Components |
|----------|------------|
| **Basic** | button, badge, chip, spinner, progress, avatar, img |
| **Forms** | input, checkbox, radio, toggle, range, select, searchbar, textarea |
| **Layout** | card, list, grid, content |
| **Navigation** | navbar, toolbar, tabs, segment, breadcrumbs, menu |
| **Overlay** | modal, sheet, alert, toast, popover |
| **Feedback** | skeleton, fab |
| **Interactive** | accordion, datetime, infinite-scroll, refresher, reorder, swipe, carousel |
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

## CSS Utilities

```css
/* Flex */
.ux-flex .ux-flex-col .ux-items-center .ux-justify-between .ux-gap-md

/* Spacing: xs, sm, md, lg, xl */
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

## Browser Support

Chrome 88+ | Firefox 78+ | Safari 14+ | Edge 88+

## Documentation

Open `docs/index.html` for full documentation with live examples.

## License

MIT
