# UX - Universal eXtensions

Semantic CSS component library built with Tailwind v4. Zero dependencies for consumers.

**[Live Demo & Docs](https://erplora.github.io/ux/)**

## Features

- **Zero Dependencies** - Single CSS file, no JavaScript required
- **Framework Agnostic** - Works with HTMX, React, Vue, Alpine.js, or vanilla JS
- **Dual Output** - Semantic classes (`btn btn-primary`) or Tailwind utilities (`bg-primary text-primary-content`)
- **OKLCH Colors** - Perceptually uniform color system with 4 themes
- **Dark Mode** - Automatic via `prefers-color-scheme` + manual via `data-theme="dark"`
- **Touch-First** - 44px touch targets, iOS-style animations
- **Glass Morphism** - Built-in `.glass` utility class

## Quick Start

```html
<!-- Option A: Semantic classes (recommended) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/ERPlora/ux@3/dist/ux.min.css">

<button class="btn btn-primary">Save</button>

<!-- Option B: Tailwind utilities -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/ERPlora/ux@3/dist/tw.min.css">

<button class="inline-flex items-center justify-center h-11 px-4
               bg-primary text-primary-content rounded-lg font-semibold
               hover:brightness-95 active:scale-[0.97] transition-all">Save</button>

<!-- Option C: Both combined -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/ERPlora/ux@3/dist/ux-full.min.css">

<button class="btn btn-primary mt-4">Save</button>
```

## Three CSS Files

| File | Content | Usage |
|------|---------|-------|
| `ux.min.css` | Semantic classes + tokens | `class="btn btn-primary"` |
| `tw.min.css` | Tailwind utilities + tokens | `class="bg-primary text-primary-content ..."` |
| `ux-full.min.css` | Both combined | Mix semantic + utilities |

## Themes

4 built-in themes: **default** (light), **dark**, **erplora**, **ocean**.

```html
<!-- Manual theme -->
<html data-theme="dark">

<!-- Auto dark mode (default - no attribute needed) -->
<html>
<!-- Respects prefers-color-scheme automatically -->
```

Switch themes at runtime:

```js
document.documentElement.setAttribute('data-theme', 'dark');
```

## Color System

All colors use OKLCH for perceptual uniformity:

| Token | Light | Dark |
|-------|-------|------|
| `--color-primary` | `oklch(0.55 0.22 250)` | `oklch(0.65 0.22 250)` |
| `--color-secondary` | `oklch(0.55 0.20 280)` | `oklch(0.65 0.20 280)` |
| `--color-accent` | `oklch(0.70 0.18 155)` | `oklch(0.75 0.18 155)` |
| `--color-success` | `oklch(0.72 0.20 142)` | `oklch(0.75 0.18 142)` |
| `--color-warning` | `oklch(0.80 0.18 85)` | `oklch(0.82 0.16 85)` |
| `--color-error` | `oklch(0.63 0.24 29)` | `oklch(0.68 0.22 29)` |

Each color has a matching `-content` variant for text contrast.

## Layout System

```html
<div class="app">
  <div class="page">
    <header class="header">...</header>

    <aside class="drawer drawer-start">
      <div class="header">...</div>
      <div class="content">...</div>
      <div class="footer">...</div>
    </aside>

    <main class="content">...</main>

    <footer class="footer">...</footer>
  </div>
</div>
```

- `.app` - Full viewport container
- `.page` - CSS Grid layout with header/content/footer/drawers
- `.drawer` - Responsive sidebar (inline on desktop, overlay on mobile)
- `.header` / `.content` / `.footer` - Generic structural primitives

## Development

```bash
# Install dependencies
npm install

# Watch semantic CSS
npm run dev

# Watch Tailwind utilities
npm run dev:tw

# Build all
npm run build

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
│   ├── themes/
│   │   ├── dark.css            # Dark theme + auto prefers-color-scheme
│   │   ├── erplora.css         # ERPlora brand theme
│   │   └── ocean.css           # Ocean theme
│   └── components/
│       ├── structure.css       # Generic .header/.content/.footer
│       ├── app.css             # .app container
│       ├── page.css            # .page CSS Grid layout
│       └── drawer.css          # .drawer responsive sidebar
├── dist/                       # Build output
│   ├── ux.css / ux.min.css     # Semantic classes
│   ├── tw.css / tw.min.css     # Tailwind utilities
│   └── ux-full.css / .min.css  # Both combined
├── docs/                       # Astro SSG documentation
└── .github/workflows/
    └── deploy.yml              # GitHub Pages deployment
```

## License

MIT - ERPlora
