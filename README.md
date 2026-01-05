# UX Library

Zero-build, touch-first UI component library with iOS/Ionic-style design, optimized for HTMX and Alpine.js integration.

## Features

- **Zero Build** - No npm, no webpack, no bundlers. Just include the scripts.
- **Touch First** - 44px touch targets, gestures, mobile-optimized
- **iOS/Ionic Style** - Clean, modern design following Apple HIG
- **Dark Mode** - Automatic dark mode support
- **Alpine.js Integration** - Interactive components with Alpine.js
- **HTMX Ready** - Works seamlessly with HTMX

## Quick Start

```html
<!-- Alpine.js (required for interactive components) -->
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>

<!-- UX Library -->
<script src="ux-all.js"></script>
```

Or load individual components:

```html
<script src="components/ux-core.js"></script>
<script src="components/ux-button.js"></script>
<script src="components/ux-modal.js"></script>
```

## Components

### Basic (CSS-only)
- Button, Badge, Chip, Spinner, Progress, Avatar

### Form
- Input, Toggle, Checkbox, Radio, Range, Select, Searchbar, Textarea

### Layout
- Card, List, Grid, Content

### Navigation
- Navbar, Toolbar, Tabs, Segment, Breadcrumbs, Menu

### Overlay
- Modal, Sheet, Alert, Toast, Popover

### Feedback
- Skeleton, FAB

### Interactive (Alpine.js)
- Accordion, Datetime, Infinite Scroll, Refresher, Reorder

### Gestures
- Swipe, Drag, Pull-to-Refresh, Long Press, Pinch, Tap

## CSS Naming Convention

```css
/* Component */
.ux-button { }

/* Modifier */
.ux-button--primary { }
.ux-button--lg { }

/* Child element */
.ux-button__icon { }
```

## CSS Variables

All components use CSS custom properties with `--ux-*` prefix:

```css
:root {
  --ux-primary: #007aff;
  --ux-space-md: 16px;
  --ux-border-radius: 8px;
  --ux-touch-target: 44px;
}
```

## Documentation

Open `docs/index.html` in your browser to see all components with interactive examples.

## License

MIT
