# UX - Universal eXtensions

**Zero-dependency, framework-agnostic CSS component library** with iOS/Ionic-style design. Works with any framework: HTMX, React, Vue, Radix UI, or vanilla JavaScript.

**[Live Demo](https://erplora.github.io/ux/)** | [Documentation](docs/index.html)

## Features

- **Zero Dependencies** - Pure CSS library, no JavaScript framework required
- **Framework Agnostic** - Works with HTMX, React, Vue, Radix UI, vanilla JS
- **157 Components** - Comprehensive library for any application
- **Vanilla JS Components** - Optional JS classes for interactive components (modal, tabs, accordion, etc.)
- **Web Components** - Framework-agnostic custom elements (`<ux-modal>`, `<ux-toast>`, `<ux-sheet>`, `<ux-alert>`)
- **Alpine.js Support** - Full Alpine.js components available for demos
- **Interactive Documentation** - Live code playground with editable examples
- **Touch-First** - Optimized for mobile (44px touch targets, gestures)
- **iOS Style** - Pixel-perfect iOS/Ionic design patterns
- **Glass Morphism** - iOS 26 Liquid Glass effect on all components
- **Accessible** - ARIA attributes and keyboard navigation
- **Dark Mode** - Built-in light and dark themes
- **12 Color Themes** - Ocean, Emerald, Purple, Sunset, Rose, Teal, Amber, Slate, Indigo, Cyan, Crimson, Forest

## Installation

### CSS Only (Recommended)

```html
<!-- Just CSS - works with any framework -->
<link rel="stylesheet" href="dist/ux.min.css">

<!-- Optional: Bootstrap Grid for layout -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap-grid.min.css" rel="stylesheet">
```

### With Vanilla JS Components

```html
<!-- CSS -->
<link rel="stylesheet" href="dist/ux.min.css">

<!-- Vanilla JS bundle (modal, tabs, accordion, toast, etc.) -->
<script src="dist/ux.min.js"></script>

<!-- Use components -->
<script>
  // Auto-initialized via data attributes
  // Or manually:
  const modal = UX.create('modal', '#my-modal');
  modal.open();
</script>
```

### With Web Components

```html
<!-- CSS + JS -->
<link rel="stylesheet" href="dist/ux.min.css">
<script src="dist/ux.min.js"></script>

<!-- Use anywhere - React, Vue, Angular, vanilla HTML -->
<ux-modal id="my-modal" title="Hello">
  <p>Modal content here</p>
</ux-modal>

<button onclick="document.getElementById('my-modal').open()">Open</button>

<!-- Toast notifications -->
<ux-toast message="Saved!" variant="success" duration="3000"></ux-toast>

<!-- Bottom sheet -->
<ux-sheet id="my-sheet" side="bottom">
  <p>Sheet content</p>
</ux-sheet>

<!-- Alert dialog -->
<ux-alert id="my-alert" title="Confirm" message="Are you sure?"></ux-alert>
```

### With Alpine.js (for demos)

```html
<!-- CSS -->
<link rel="stylesheet" href="dist/ux.min.css">

<!-- Alpine.js -->
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>

<!-- Alpine components -->
<script src="docs/alpine-components.js"></script>
```

### Bundle Sizes

| Bundle | Size | Description |
|--------|------|-------------|
| ux.min.css | ~1.1 MB | All CSS styles |
| ux.min.js | ~50 KB | Vanilla JS + Web Components |
| ux.esm.js | ~50 KB | ES Module bundle |
| alpine-components.js | ~80 KB | Alpine.js components (optional) |

## Components (157)

### CSS-Only (no JS required)
`avatar` · `badge` · `button` · `button-group` · `chip` · `divider` · `icon-button` · `img` · `progress` · `spacer` · `spinner` · `tag` · `card` · `list` · `navbar` · `toolbar`

### Vanilla JS Components
Interactive components with vanilla JavaScript classes:
`accordion` · `alert` · `drawer` · `dropdown` · `modal` · `sheet` · `tabs` · `toast` · `tooltip` · `quantity-stepper` · `signature-pad` · `color-picker` · `phone-input` · `autocomplete` · `tag-input` · `otp-input`

### Web Components (Custom Elements)
Framework-agnostic components that work everywhere:
`<ux-modal>` · `<ux-toast>` · `<ux-sheet>` · `<ux-alert>`

### Forms
`autocomplete` · `checkbox` · `color-picker` · `currency-input` · `form` · `form-wizard` · `input` · `otp-input` · `phone-input` · `radio` · `range` · `searchbar` · `select` · `signature-pad` · `tag-input` · `textarea` · `toggle` · `upload`

### Layout
`card` · `content` · `list` · `masonry` · `master-detail` · `section` · `split-pane-right` · `shell` · `sidebar` · `resizable`

### Navigation
`back-button` · `breadcrumbs` · `category-tabs` · `context-menu` · `dropdown` · `mega-menu` · `menu` · `menubar` · `navbar` · `pagination` · `segment` · `tabs` · `toolbar`

### Overlay
`alert` · `drawer` · `fullscreen-modal` · `lightbox` · `loading` · `modal` · `picker` · `popover` · `hover-card` · `sheet` · `snackbar` · `toast` · `tooltip`

### Feedback
`banner` · `callout` · `fab` · `notifications` · `progress-circle` · `progress-steps` · `rating` · `skeleton` · `state` · `stats` · `status-indicator` · `stepper`

### Interactive (Alpine.js)
`calendar` · `calendar-views` · `carousel` · `command` · `datatable` · `date-range-picker` · `datetime` · `infinite-scroll` · `load-more` · `refresher` · `reorder` · `tree` · `virtual-list`

### Gestures (Alpine directives)
`x-swipe` · `x-drag` · `x-pull-refresh` · `x-long-press` · `x-pinch` · `x-tap`

### Media
`audio-player` · `barcode-scanner` · `image-crop` · `image-gallery` · `image-zoom` · `lightbox` · `pdf-viewer` · `qr-code` · `video-player`

### Data Visualization
`chart` · `code-block` · `diff-viewer` · `gauge` · `json-viewer` · `sparkline` · `table`

### POS/Retail
`calculator` · `cart` · `numpad` · `payment` · `product-card` · `quantity-badge` · `quantity-stepper` · `receipt` · `variant-selector` · `virtual-keyboard` · `onscreen-keyboard`

### Manufacturing/ERP
`batch-tracker` · `bom-tree` · `gantt` · `kanban` · `machine-status` · `order-ticket` · `org-chart` · `performance-meter` · `production-line` · `quality-check` · `scheduler` · `stock-indicator` · `timeline` · `work-order`

### HR/Time
`attendance-list` · `employee-card` · `event-card` · `leave-request` · `shift-calendar` · `time-clock`

## Usage

### CSS-Only (Any Framework)
```html
<!-- Just use CSS classes -->
<button class="ux-button ux-color-primary">Primary</button>
<button class="ux-button ux-button--outline">Outline</button>

<!-- State management via data-state -->
<div class="ux-modal-backdrop" data-state="closed">
  <div class="ux-modal">Modal content</div>
</div>

<!-- Open via JavaScript (any framework) -->
<script>
  document.getElementById('modal').dataset.state = 'open';
</script>
```

### Vanilla JS Components
```html
<link rel="stylesheet" href="dist/ux.min.css">
<script src="dist/ux.min.js"></script>

<!-- Auto-init via data attributes -->
<div id="my-modal" class="ux-modal-backdrop" data-ux="js" data-state="closed">
  <div class="ux-modal">
    <button data-ux-close>Close</button>
  </div>
</div>

<button onclick="UX.get('#my-modal').open()">Open Modal</button>

<!-- Or manual init -->
<script>
  const modal = UX.create('modal', '#my-modal');
  modal.open();
  modal.close();
</script>
```

### With React/Radix UI
```jsx
import * as Dialog from '@radix-ui/react-dialog';

<Dialog.Root>
  <Dialog.Trigger className="ux-button ux-color-primary">Open</Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay className="ux-modal-backdrop" data-state="open" />
    <Dialog.Content className="ux-modal">
      <Dialog.Title className="ux-modal__title">Title</Dialog.Title>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
```

### With HTMX
```html
<button class="ux-button ux-color-primary"
        hx-get="/modal-content"
        hx-target="#modal-content"
        hx-on::after-swap="document.getElementById('my-modal').dataset.state='open'">
  Load & Open
</button>

<div id="my-modal" class="ux-modal-backdrop" data-state="closed">
  <div class="ux-modal">
    <div id="modal-content"></div>
  </div>
</div>
```

### With Alpine.js
```html
<script src="docs/alpine-components.js"></script>

<div x-data="uxModal()">
  <button @click="open()" class="ux-button">Open</button>
  <div class="ux-modal-backdrop" :data-state="isOpen ? 'open' : 'closed'">
    <div class="ux-modal">Content</div>
  </div>
</div>
```

### Glass Morphism (iOS 26 Style)
```html
<!-- Any component with --glass modifier -->
<div class="ux-card--glass">Glass card</div>
<nav class="ux-navbar--glass">Glass navbar</nav>
<div class="ux-modal--glass">Glass modal</div>
<input class="ux-input--glass" placeholder="Glass input">
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

### Interactive Code Playground

All HTML code examples in the documentation are interactive:
- **Editable** - Modify the code directly in the browser
- **Live Preview** - See changes rendered in real-time below each code block
- **Copy & Reset** - Copy code to clipboard or reset to original

Code blocks with Alpine.js expressions or JavaScript that require external dependencies display as static examples with syntax highlighting.

#### Writing Code Examples

Use escaped HTML in `<pre>` tags:

```html
<!-- Escaped HTML (HTMX-compatible) -->
<pre class="ux-code-block" data-lang="html">&lt;button class="ux-button ux-color-primary"&gt;Click me&lt;/button&gt;</pre>
```

Add `data-no-playground` to disable the playground for blocks with external dependencies (Alpine.js, etc.).

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

## License

Apache 2.0
