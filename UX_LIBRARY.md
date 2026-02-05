# UX Library - Claude Context

> Copy this file to your project's root or `.claude/` folder so Claude understands how to use the UX CSS library.

## Overview

UX is a **zero-dependency, framework-agnostic CSS component library** with iOS/Ionic-style design. It provides **148 CSS components** that work with any framework: HTMX, React, Vue, Alpine.js, or vanilla JavaScript.

**CDN Usage:**
```html
<!-- Full bundle -->
<link rel="stylesheet" href="https://unpkg.com/ux/dist/ux.min.css">
<!-- Or via GitHub Pages -->
<link rel="stylesheet" href="https://erplora.github.io/ux/ux.min.css">

<!-- Modular (recommended for smaller bundles) -->
<link rel="stylesheet" href="https://unpkg.com/ux/dist/core.min.css">
<link rel="stylesheet" href="https://unpkg.com/ux/dist/bundles/basic.min.css">
<link rel="stylesheet" href="https://unpkg.com/ux/dist/bundles/forms.min.css">
<!-- Add only the bundles you need -->
```

---

## Quick Reference

### Naming Convention (BEM)

```html
<!-- Block -->
<div class="ux-card">

<!-- Block with modifier -->
<div class="ux-card ux-card--glass">

<!-- Block with color -->
<button class="ux-button ux-color-primary">

<!-- Child elements -->
<div class="ux-card__header">
<div class="ux-card__content">
<div class="ux-card__footer">
```

### State Management

Components respond to `data-state` attributes:

```html
<!-- Closed state -->
<div class="ux-modal-backdrop" data-state="closed">

<!-- Open state -->
<div class="ux-modal-backdrop" data-state="open">
```

**Control with JavaScript:**
```javascript
// Open
document.getElementById('modal').dataset.state = 'open';

// Close
document.getElementById('modal').dataset.state = 'closed';
```

---

## Components by Category

### Basic Components

| Component | Class | Example |
|-----------|-------|---------|
| Button | `ux-button` | `<button class="ux-button ux-color-primary">Click</button>` |
| Badge | `ux-badge` | `<span class="ux-badge ux-color-danger">5</span>` |
| Avatar | `ux-avatar` | `<div class="ux-avatar"><img src="..."></div>` |
| Spinner | `ux-spinner` | `<div class="ux-spinner"></div>` |
| Progress | `ux-progress` | `<div class="ux-progress" style="--progress: 75%"></div>` |
| Chip | `ux-chip` | `<span class="ux-chip">Tag</span>` |

### Form Components

| Component | Class | Example |
|-----------|-------|---------|
| Input | `ux-input` | `<input class="ux-input" placeholder="Text">` |
| Textarea | `ux-textarea` | `<textarea class="ux-textarea"></textarea>` |
| Select | `ux-select` | `<select class="ux-select"><option>...</option></select>` |
| Checkbox | `ux-checkbox` | `<label class="ux-checkbox"><input type="checkbox"><span></span></label>` |
| Radio | `ux-radio` | `<label class="ux-radio"><input type="radio"><span></span></label>` |
| Toggle | `ux-toggle` | `<label class="ux-toggle"><input type="checkbox"><span></span></label>` |
| Range | `ux-range` | `<input type="range" class="ux-range">` |
| Searchbar | `ux-searchbar` | `<div class="ux-searchbar"><input type="search"></div>` |

### Layout Components

| Component | Class | Description |
|-----------|-------|-------------|
| Card | `ux-card` | Container with header/content/footer |
| List | `ux-list` | iOS-style list |
| Section | `ux-section` | Grouped content with header |
| Divider | `ux-divider` | Horizontal separator |
| Accordion | `ux-accordion` | Collapsible sections |
| Tabs | `ux-tabs` | Tab navigation |

### Navigation Components

| Component | Class | Description |
|-----------|-------|-------------|
| Navbar | `ux-navbar` | Top navigation bar |
| Toolbar | `ux-toolbar` | Action toolbar |
| Breadcrumbs | `ux-breadcrumbs` | Navigation path |
| Menu | `ux-menu` | Side menu |
| Tabs | `ux-tabs` | Tab navigation |
| Segment | `ux-segment` | iOS-style segment control |

### Overlay Components

| Component | Class | State Attribute |
|-----------|-------|-----------------|
| Modal | `ux-modal-backdrop` + `ux-modal` | `data-state="open/closed"` |
| Sheet | `ux-sheet-backdrop` + `ux-sheet` | `data-state="open/closed"` |
| Drawer | `ux-drawer-backdrop` + `ux-drawer` | `data-state="open/closed"` |
| Alert | `ux-alert` | `data-state="visible/hidden"` |
| Toast | `ux-toast` | `data-state="visible/hidden"` |
| Popover | `ux-popover` | `data-state="open/closed"` |
| Tooltip | `ux-tooltip` | CSS :hover or `data-state` |

### Data Display

| Component | Class | Description |
|-----------|-------|-------------|
| Datatable | `ux-datatable` | Data tables with sorting/filtering |
| Stats | `ux-stats` | Statistics display |
| Calendar | `ux-calendar` | Date picker calendar |
| Code Block | `ux-code-block` | Syntax highlighted code |
| JSON Viewer | `ux-json-viewer` | JSON display |

---

## Color System

### Applying Colors

Use `.ux-color-{name}` classes:

```html
<!-- Filled (solid background) -->
<button class="ux-button ux-color-primary">Primary</button>
<button class="ux-button ux-color-success">Success</button>
<button class="ux-button ux-color-danger">Danger</button>
<button class="ux-button ux-color-warning">Warning</button>

<!-- Soft (tinted background) -->
<span class="ux-badge ux-badge--soft ux-color-success--soft">New</span>

<!-- Outline (border only) -->
<button class="ux-button ux-button--outline ux-color-primary--outline">Outline</button>
```

### Available Colors

- `primary` - Brand color (blue by default)
- `secondary` - Gray
- `tertiary` - Light gray
- `success` - Green
- `warning` - Yellow/orange
- `danger` - Red
- `dark` - Dark gray/black
- `light` - Light/white
- `medium` - Medium gray

---

## Size Modifiers

Most components support size modifiers:

```html
<button class="ux-button ux-button--sm">Small</button>
<button class="ux-button">Default</button>
<button class="ux-button ux-button--lg">Large</button>

<input class="ux-input ux-input--sm">
<input class="ux-input">
<input class="ux-input ux-input--lg">
```

---

## Glass Morphism

Add `--glass` modifier for frosted glass effect:

```html
<div class="ux-card--glass">Glass card</div>
<nav class="ux-navbar--glass">Glass navbar</nav>
<div class="ux-modal--glass">Glass modal</div>
<input class="ux-input--glass" placeholder="Glass input">
```

---

## Common Patterns

### Modal

```html
<div id="my-modal" class="ux-modal-backdrop" data-state="closed">
  <div class="ux-modal">
    <div class="ux-modal__header">
      <h2 class="ux-modal__title">Title</h2>
      <button class="ux-modal__close" onclick="this.closest('[data-state]').dataset.state='closed'">×</button>
    </div>
    <div class="ux-modal__content">
      Content here
    </div>
    <div class="ux-modal__footer">
      <button class="ux-button" onclick="this.closest('[data-state]').dataset.state='closed'">Cancel</button>
      <button class="ux-button ux-color-primary">Confirm</button>
    </div>
  </div>
</div>

<!-- Trigger -->
<button class="ux-button" onclick="document.getElementById('my-modal').dataset.state='open'">
  Open Modal
</button>
```

### Card with Image

```html
<div class="ux-card">
  <img src="image.jpg" class="ux-card__media">
  <div class="ux-card__header">
    <h3 class="ux-card__title">Card Title</h3>
    <p class="ux-card__subtitle">Subtitle</p>
  </div>
  <div class="ux-card__content">
    <p>Card content goes here.</p>
  </div>
  <div class="ux-card__footer">
    <button class="ux-button ux-color-primary">Action</button>
  </div>
</div>
```

### List with Items

```html
<ul class="ux-list">
  <li class="ux-list__item">
    <div class="ux-list__start">
      <div class="ux-avatar ux-avatar--sm"><img src="..."></div>
    </div>
    <div class="ux-list__content">
      <div class="ux-list__title">Item Title</div>
      <div class="ux-list__subtitle">Subtitle</div>
    </div>
    <div class="ux-list__end">
      <span class="ux-badge">5</span>
    </div>
  </li>
</ul>
```

### Form

```html
<form class="ux-form">
  <div class="ux-form__group">
    <label class="ux-form__label">Email</label>
    <input type="email" class="ux-input" placeholder="your@email.com">
  </div>

  <div class="ux-form__group">
    <label class="ux-form__label">Password</label>
    <input type="password" class="ux-input">
  </div>

  <div class="ux-form__group">
    <label class="ux-checkbox">
      <input type="checkbox">
      <span></span>
      Remember me
    </label>
  </div>

  <button type="submit" class="ux-button ux-color-primary ux-button--block">
    Sign In
  </button>
</form>
```

### Tabs

```html
<div class="ux-tabs">
  <div class="ux-tabs__list">
    <button class="ux-tabs__tab ux-tabs__tab--active" data-tab="tab1">Tab 1</button>
    <button class="ux-tabs__tab" data-tab="tab2">Tab 2</button>
    <button class="ux-tabs__tab" data-tab="tab3">Tab 3</button>
  </div>
  <div class="ux-tabs__panel ux-tabs__panel--active" id="tab1">Content 1</div>
  <div class="ux-tabs__panel" id="tab2">Content 2</div>
  <div class="ux-tabs__panel" id="tab3">Content 3</div>
</div>
```

### Toast Notification

```html
<div class="ux-toast ux-color-success" data-state="visible">
  <span class="ux-toast__icon">✓</span>
  <span class="ux-toast__message">Saved successfully!</span>
  <button class="ux-toast__close" onclick="this.parentElement.dataset.state='hidden'">×</button>
</div>
```

### Navbar

```html
<nav class="ux-navbar">
  <div class="ux-navbar__start">
    <button class="ux-button ux-button--clear">☰</button>
  </div>
  <div class="ux-navbar__center">
    <h1 class="ux-navbar__title">Page Title</h1>
  </div>
  <div class="ux-navbar__end">
    <button class="ux-button ux-button--clear">⚙️</button>
  </div>
</nav>
```

---

## Button Variants

```html
<!-- Filled (default) -->
<button class="ux-button ux-color-primary">Filled</button>

<!-- Outline -->
<button class="ux-button ux-button--outline ux-color-primary--outline">Outline</button>

<!-- Clear (text only) -->
<button class="ux-button ux-button--clear">Clear</button>

<!-- Soft (tinted) -->
<button class="ux-button ux-button--soft ux-color-primary--soft">Soft</button>

<!-- Block (full width) -->
<button class="ux-button ux-button--block ux-color-primary">Full Width</button>

<!-- With icon -->
<button class="ux-button ux-color-primary">
  <span class="ux-button__icon">+</span>
  Add Item
</button>

<!-- Icon only -->
<button class="ux-button ux-button--icon ux-color-primary">
  <span>+</span>
</button>

<!-- Loading state -->
<button class="ux-button ux-button--loading ux-color-primary">
  <span class="ux-spinner"></span>
  Loading...
</button>
```

---

## Dark Mode

The library automatically supports dark mode via:

1. **System preference** (automatic):
   ```css
   @media (prefers-color-scheme: dark) { }
   ```

2. **Manual toggle** - add class to root:
   ```html
   <html class="ux-dark">
   ```

3. **Force light mode**:
   ```html
   <html class="ux-light">
   ```

---

## CSS Variables

Override these in your CSS to customize:

```css
:root {
  /* Brand colors */
  --ux-primary: #007aff;
  --ux-success: #34c759;
  --ux-warning: #ff9500;
  --ux-danger: #ff3b30;

  /* Surfaces */
  --ux-surface: #ffffff;
  --ux-surface-secondary: #f2f2f7;

  /* Text */
  --ux-text: #000000;
  --ux-text-secondary: #6c6c70;

  /* Borders */
  --ux-border-color: #c6c6c8;
  --ux-border-radius: 10px;

  /* Spacing */
  --ux-space-xs: 4px;
  --ux-space-sm: 8px;
  --ux-space-md: 16px;
  --ux-space-lg: 24px;
  --ux-space-xl: 32px;
}
```

---

## Framework Integration

### With HTMX

```html
<button hx-get="/api/data"
        hx-target="#content"
        hx-indicator="#spinner"
        class="ux-button ux-color-primary">
  Load Data
</button>

<div id="spinner" class="ux-spinner htmx-indicator"></div>
<div id="content"></div>
```

### With Alpine.js

```html
<div x-data="{ open: false }">
  <button @click="open = true" class="ux-button ux-color-primary">
    Open Modal
  </button>

  <div class="ux-modal-backdrop" :data-state="open ? 'open' : 'closed'">
    <div class="ux-modal">
      <div class="ux-modal__header">
        <h2 class="ux-modal__title">Title</h2>
        <button @click="open = false" class="ux-modal__close">×</button>
      </div>
      <div class="ux-modal__content">Content</div>
    </div>
  </div>
</div>
```

### With React

```jsx
function Button({ children, color = 'primary', variant, ...props }) {
  const classes = [
    'ux-button',
    variant && `ux-button--${variant}`,
    `ux-color-${color}${variant === 'outline' ? '--outline' : variant === 'soft' ? '--soft' : ''}`
  ].filter(Boolean).join(' ');

  return <button className={classes} {...props}>{children}</button>;
}

// Usage
<Button color="success">Save</Button>
<Button color="danger" variant="outline">Delete</Button>
```

### With Vue

```vue
<template>
  <div class="ux-modal-backdrop" :data-state="isOpen ? 'open' : 'closed'">
    <div class="ux-modal">
      <div class="ux-modal__header">
        <h2 class="ux-modal__title">{{ title }}</h2>
        <button class="ux-modal__close" @click="$emit('close')">×</button>
      </div>
      <div class="ux-modal__content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(['isOpen', 'title']);
defineEmits(['close']);
</script>
```

---

## Accessibility

Components are designed with accessibility in mind:

```html
<!-- Modal with ARIA -->
<div class="ux-modal-backdrop"
     data-state="open"
     role="dialog"
     aria-modal="true"
     aria-labelledby="modal-title">
  <div class="ux-modal">
    <h2 id="modal-title" class="ux-modal__title">Accessible Title</h2>
  </div>
</div>

<!-- Toggle with ARIA -->
<label class="ux-toggle">
  <input type="checkbox" role="switch" aria-checked="false">
  <span></span>
  Enable notifications
</label>

<!-- Button loading state -->
<button class="ux-button ux-button--loading" aria-busy="true" disabled>
  <span class="ux-spinner"></span>
  Saving...
</button>
```

---

## Tips

1. **Always use data-state** for overlay components (modal, sheet, drawer, alert, toast)

2. **Compose colors separately** - use `ux-color-*` classes instead of component-specific color classes

3. **Glass works everywhere** - any component supports `--glass` modifier

4. **Touch-friendly by default** - minimum touch targets are 44px

5. **Mobile-first** - modals become sheets on mobile (< 768px)

6. **No JS required** - all styling is CSS-only; add your own JS or use optional helpers

---

## Modular Imports

Load only what you need for smaller bundle sizes:

```html
<!-- Core (required) - variables, utilities, themes -->
<link rel="stylesheet" href="dist/core.min.css">

<!-- Add only the bundles you need -->
<link rel="stylesheet" href="dist/bundles/basic.min.css">
<link rel="stylesheet" href="dist/bundles/forms.min.css">
```

### NPM Package Imports

```js
// Full bundle
import 'ux/css';

// Modular imports
import 'ux/core';
import 'ux/bundles/basic';
import 'ux/bundles/forms';
```

### Bundle Sizes

| Bundle | Size (min) | Components |
|--------|------------|------------|
| core | 83 KB | Variables, mixins, utilities, themes |
| basic | 77 KB | button, button-group, badge, avatar, chip, spinner, progress, divider, icon-btn, tag, status-badge |
| forms | 180 KB | input, textarea, select, checkbox, radio, toggle, range, searchbar, form, rating, datetime, color-picker, autocomplete, tag-input, otp-input, currency-input, phone-input, signature-pad, quantity-stepper, rich-text, upload, filter-chip |
| navigation | 113 KB | navbar, toolbar, tabs, segment, breadcrumbs, menu, menu-button, menubar, mega-menu, dropdown, context-menu, command, back-button, pagination, stepper, sidebar |
| overlays | 95 KB | modal, sheet, drawer, alert, toast, snackbar, popover, tooltip, hover-card, loading, picker, lightbox, fullscreen-modal, notifications |
| data | 137 KB | datatable, table, stats, sparkline, chart, bar-chart, gauge, diff-viewer, code-block, json-viewer, calendar, calendar-views, scheduler, tree, kpi-card, timeline |
| feedback | 61 KB | skeleton, fab, refresher, banner, callout, pwa, infinite-scroll, load-more, swipe, reorder |
| media | 89 KB | img, image-gallery, image-crop, image-zoom, carousel, video-player, audio-player, pdf-viewer, qr-code, barcode-scanner, aspect-ratio |
| layout | 141 KB | card, list, content, section, panel, accordion, masonry, master-detail, shell, dashboard-grid, kanban, split-pane-right, scroll-area, resizable, app-icon, event-card, toggle-group |
| pos | 111 KB | numpad, onscreen-keyboard, calculator, product-card, category-tabs, cart, order-ticket, kds-order, payment, receipt, stock-indicator, quantity-badge, variant-selector, loyalty-card |
| hr | 92 KB | employee-card, time-clock, shift-calendar, attendance-list, leave-request, org-chart, performance-meter |
| manufacturing | 104 KB | work-order, machine-status, production-line, quality-check, batch-tracker, bom-tree, gantt |
| utils | 21 KB | alpine-utils, keyboard, electron |

**Full bundle (ux.min.css):** ~1.1 MB
