# UX v3 Architecture

## Vision

A CSS component library with **our own semantic classes** (inspired by DaisyUI/FlyonUI simplicity), compiled with **Tailwind v4** to static CSS distributed via CDN. Zero dependencies for consumers.

**Key principle**: `<ul class="menu">` just works. `<button class="btn btn-primary">` just works. No utility classes needed for basic usage, but Tailwind utilities also available as an alternative.

---

## 1. How It Works

### Dual Output: Semantic + Tailwind

We distribute **3 CSS files** from the same design tokens:

| File | Size | Content | Usage |
|------|------|---------|-------|
| `ux.min.css` | ~50KB | Semantic classes + tokens + custom utilities | `<button class="btn btn-primary">` |
| `tw.min.css` | ~varies | Tailwind utility classes + tokens | `<button class="inline-flex items-center h-11 px-4 bg-primary text-white rounded-lg...">` |
| `ux-full.min.css` | ~both | Both combined | Mix semantic + utilities freely |

**Users choose their approach:**

```html
<!-- Option A: Semantic classes (simpler HTML, recommended) -->
<link rel="stylesheet" href="cdn/ux.min.css">
<button class="btn btn-primary">Save</button>

<!-- Option B: Tailwind utilities (more control, copy from any source) -->
<link rel="stylesheet" href="cdn/tw.min.css">
<button class="inline-flex items-center justify-center h-11 px-4
               bg-primary text-white rounded-lg font-semibold
               hover:bg-primary/90 active:scale-[0.97] transition-all">Save</button>

<!-- Option C: Both (mix freely) -->
<link rel="stylesheet" href="cdn/ux-full.min.css">
<button class="btn btn-primary mt-4">Save</button>  <!-- semantic + utility -->
```

### Build Pipeline

```
src/css/ux.css ──────────────────────► dist/ux.css ──► dist/ux.min.css
  @import "tailwindcss"                 (semantic classes + tokens)
  @theme { design tokens }
  @layer components { .btn {...} }
  @utility glass {...}

src/css/tw.css ──────────────────────► dist/tw.css ──► dist/tw.min.css
  @import "tailwindcss" source(none)    (Tailwind utilities only)
  @theme { same design tokens }
  @source "../components/**/*.html"

cat ux.css tw.css ───────────────────► dist/ux-full.min.css
                                        (both combined)
```

### The Component Pattern (inspired by DaisyUI)

```css
/* src/css/components/button.css */
@layer components {
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.375rem;
    height: var(--size, 2.75rem);
    padding-inline: var(--btn-p, 1rem);
    font-weight: 600;
    background-color: var(--btn-bg, var(--color-base-200));
    color: var(--btn-fg, var(--color-base-content));
    border: 1px solid var(--btn-border, transparent);
    border-radius: var(--radius-field);
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background-color: color-mix(in oklab, var(--btn-bg, var(--color-base-200)), #000 7%);
    }
    &:active {
      transform: scale(0.97);
    }
  }

  /* Modifiers only override CSS custom properties */
  .btn-primary {
    --btn-bg: var(--color-primary);
    --btn-fg: var(--color-primary-content);
    --btn-border: var(--color-primary);
  }
}
```

### Runtime (Django/HTMX - all 3 environments)

```html
<!-- ONE link. Zero JS. Zero build. Zero Tailwind. -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/ERPlora/ux@3/dist/ux.min.css">

<!-- Semantic classes - simple like DaisyUI -->
<button class="btn btn-primary">Save</button>

<ul class="menu">
  <li><a class="active">Home</a></li>
  <li><a>Settings</a></li>
</ul>

<div class="card">
  <div class="card-body">
    <h2 class="card-title">Title</h2>
    <p>Content</p>
  </div>
</div>

<!-- Bootstrap grid for layout -->
<div class="row">
  <div class="col-md-6">...</div>
  <div class="col-md-6">...</div>
</div>
```

---

## 2. Design Principles

1. **Simplicity first**: `<ul class="menu">` auto-styles `li` and `a` children via `:where()` descendant selectors
2. **CSS custom properties for modifiers**: `.btn-primary` only overrides `--btn-bg` and `--btn-fg`, everything else adapts
3. **`color-mix()` for derived colors**: hover/active states computed from base color, not hardcoded
4. **Zero specificity descendants**: `:where(li > a)` inside components so Tailwind utilities always win
5. **Touch-first**: 44px minimum touch targets, mobile breakpoint at 767px
6. **Theming via CSS variables**: `data-theme="dark"` swaps all color tokens at runtime
7. **Bootstrap grid preserved**: responsive layout system we already use across 3 environments
8. **No prefix on class names**: `btn` not `ux-btn` (same convention as DaisyUI/FlyonUI)

---

## 3. Theme System

### Color Tokens (CSS custom properties)

```css
@theme {
  /* Base colors - surfaces and text */
  --color-base-100: #ffffff;
  --color-base-200: #f9fafb;
  --color-base-300: #f3f4f6;
  --color-base-content: #1f2937;

  /* Semantic colors */
  --color-primary: oklch(0.55 0.22 250);
  --color-primary-content: #ffffff;
  --color-secondary: oklch(0.55 0.20 280);
  --color-secondary-content: #ffffff;
  --color-accent: oklch(0.70 0.18 155);
  --color-accent-content: #ffffff;
  --color-neutral: oklch(0.30 0.02 260);
  --color-neutral-content: #ffffff;

  /* State colors */
  --color-info: oklch(0.62 0.18 230);
  --color-info-content: #ffffff;
  --color-success: oklch(0.72 0.20 142);
  --color-success-content: #ffffff;
  --color-warning: oklch(0.80 0.18 85);
  --color-warning-content: #1f2937;
  --color-error: oklch(0.63 0.24 29);
  --color-error-content: #ffffff;

  /* Component sizing */
  --size-field: 0.25rem;
  --radius-field: 0.5rem;
  --radius-box: 1rem;
  --border: 1px;
  --depth: 1;

  /* Glass morphism */
  --color-glass-bg: rgba(255, 255, 255, 0.45);
  --color-glass-border: rgba(255, 255, 255, 0.18);
  --blur-glass: 20px;
  --shadow-glass: 0 8px 32px rgba(0, 0, 0, 0.08);

  /* Animation */
  --ease-ios: cubic-bezier(0.32, 0.72, 0, 1);
  --ease-spring: cubic-bezier(0.28, 0.84, 0.42, 1);
}
```

### Dark Theme

```css
@layer base {
  [data-theme="dark"] {
    --color-base-100: oklch(0.15 0.02 260);
    --color-base-200: oklch(0.20 0.02 260);
    --color-base-300: oklch(0.25 0.02 260);
    --color-base-content: oklch(0.93 0.00 0);

    --color-glass-bg: rgba(30, 30, 30, 0.72);
    --color-glass-border: rgba(255, 255, 255, 0.1);
  }
}
```

### Custom Themes (per environment)

```css
@layer base {
  [data-theme="erplora"] {
    --color-primary: oklch(0.58 0.22 230);
    --color-secondary: oklch(0.60 0.18 170);
    --color-accent: oklch(0.78 0.16 85);
  }

  [data-theme="ocean"] {
    --color-primary: oklch(0.55 0.20 230);
    --color-base-100: oklch(0.98 0.01 230);
  }

  [data-theme="forest"] {
    --color-primary: oklch(0.55 0.20 155);
    --color-base-100: oklch(0.98 0.01 140);
  }
}
```

### Runtime Theme Switching

```html
<!-- Alpine.js -->
<div x-data="{ theme: localStorage.getItem('theme') || 'light' }"
     x-init="document.documentElement.setAttribute('data-theme', theme)">
  <select x-model="theme"
          @change="document.documentElement.setAttribute('data-theme', theme);
                   localStorage.setItem('theme', theme)">
    <option value="light">Light</option>
    <option value="dark">Dark</option>
    <option value="erplora">ERPlora</option>
  </select>
</div>
```

---

## 4. Component Library (All Defined in `@layer components`)

### Naming Convention

| Pattern | Example | Purpose |
|---------|---------|---------|
| Base class | `btn`, `card`, `menu` | Component container |
| Color modifier | `btn-primary`, `badge-success` | Sets `--*-bg` and `--*-fg` |
| Style modifier | `btn-outline`, `btn-ghost`, `btn-soft` | Changes visual style |
| Size modifier | `btn-sm`, `btn-lg`, `btn-xl` | Changes `--size` and `--*-fs` |
| Shape modifier | `btn-circle`, `btn-square`, `btn-block` | Changes shape |
| Child element | `card-body`, `card-title`, `modal-box` | Child structure |
| State | `active`, `disabled`, `loading` | Active/disabled/loading state |

### Component List

#### Actions
| Class | Usage |
|-------|-------|
| `btn` | `<button class="btn btn-primary">` |
| `dropdown` | `<details class="dropdown">` |
| `swap` | Toggle between two states |

#### Data Display
| Class | Usage |
|-------|-------|
| `avatar` | `<div class="avatar">` with img or placeholder |
| `badge` | `<span class="badge badge-primary">` |
| `card` | `<div class="card">` + `card-body`, `card-title`, `card-actions` |
| `carousel` | Image/content slider |
| `chat` | Chat bubbles |
| `kbd` | `<kbd class="kbd">` keyboard key |
| `stat` | Statistics display |
| `table` | `<table class="table">` + `table-zebra`, `table-pin-rows` |
| `timeline` | Vertical timeline |
| `accordion` | `<details class="accordion">` collapsible sections |

#### Navigation
| Class | Usage |
|-------|-------|
| `breadcrumbs` | `<div class="breadcrumbs">` |
| `dock` | Bottom dock navigation |
| `menu` | `<ul class="menu">` auto-styles `li > a` |
| `navbar` | `<div class="navbar">` + `navbar-start`, `navbar-center`, `navbar-end` |
| `pagination` | Page navigation |
| `steps` | Step indicator |
| `tabs` | `<div class="tabs">` + `tab-active` |

#### Feedback
| Class | Usage |
|-------|-------|
| `alert` | `<div class="alert alert-success">` |
| `loading` | `<span class="loading loading-spinner">` |
| `progress` | `<progress class="progress">` |
| `skeleton` | Loading placeholder |
| `toast` | `<div class="toast toast-end">` |
| `tooltip` | `<div class="tooltip" data-tip="text">` |

#### Data Input
| Class | Usage |
|-------|-------|
| `checkbox` | `<input type="checkbox" class="checkbox">` |
| `input` | `<input class="input">` |
| `radio` | `<input type="radio" class="radio">` |
| `range` | `<input type="range" class="range">` |
| `rating` | Star rating |
| `select` | `<select class="select">` |
| `textarea` | `<textarea class="textarea">` |
| `toggle` | `<input type="checkbox" class="toggle">` |
| `file-input` | `<input type="file" class="file-input">` |

#### Layout
| Class | Usage |
|-------|-------|
| `divider` | `<div class="divider">OR</div>` |
| `drawer` | `<div class="drawer">` sidebar layout |
| `hero` | Hero section |
| `indicator` | Corner indicator/badge |
| `join` | Group elements (button groups) |
| `stack` | Stacked cards |
| `modal` | `<dialog class="modal">` + `modal-box` |
| `sheet` | Bottom sheet (mobile) |

#### Modifiers (work across components)

**Colors**: `-primary`, `-secondary`, `-accent`, `-neutral`, `-info`, `-success`, `-warning`, `-error`

**Styles**: `-outline`, `-soft`, `-ghost`, `-link`

**Sizes**: `-xs`, `-sm`, `-md`, `-lg`, `-xl`

---

## 5. Component Examples (CSS Implementation)

### Button

```css
@layer components {
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    gap: 0.375rem;
    height: var(--size, calc(var(--size-field) * 10));
    padding-inline: var(--btn-p, 1rem);
    font-weight: 600;
    font-size: var(--btn-fs, 0.875rem);
    line-height: 1;
    border-radius: var(--radius-field);
    background-color: var(--btn-bg, var(--color-base-200));
    color: var(--btn-fg, var(--color-base-content));
    border: var(--border) solid var(--btn-border, color-mix(in oklab, var(--btn-bg, var(--color-base-200)), #000 5%));
    cursor: pointer;
    user-select: none;
    outline-offset: 2px;
    transition: background-color 0.2s, border-color 0.2s, color 0.2s, box-shadow 0.2s;

    @media (hover: hover) {
      &:hover {
        background-color: color-mix(in oklab, var(--btn-bg, var(--color-base-200)), #000 7%);
      }
    }
    &:active {
      transform: scale(0.97);
    }
    &:focus-visible {
      outline: 2px solid var(--color-primary);
    }
    &:disabled, &.btn-disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  }

  /* Colors - override CSS custom properties only */
  .btn-primary   { --btn-bg: var(--color-primary);   --btn-fg: var(--color-primary-content);   --btn-border: var(--color-primary); }
  .btn-secondary { --btn-bg: var(--color-secondary); --btn-fg: var(--color-secondary-content); --btn-border: var(--color-secondary); }
  .btn-accent    { --btn-bg: var(--color-accent);    --btn-fg: var(--color-accent-content);    --btn-border: var(--color-accent); }
  .btn-neutral   { --btn-bg: var(--color-neutral);   --btn-fg: var(--color-neutral-content);   --btn-border: var(--color-neutral); }
  .btn-info      { --btn-bg: var(--color-info);      --btn-fg: var(--color-info-content);      --btn-border: var(--color-info); }
  .btn-success   { --btn-bg: var(--color-success);   --btn-fg: var(--color-success-content);   --btn-border: var(--color-success); }
  .btn-warning   { --btn-bg: var(--color-warning);   --btn-fg: var(--color-warning-content);   --btn-border: var(--color-warning); }
  .btn-error     { --btn-bg: var(--color-error);     --btn-fg: var(--color-error-content);     --btn-border: var(--color-error); }

  /* Style variants */
  .btn-outline {
    --btn-bg: transparent;
    --btn-fg: var(--color-base-content);
    &.btn-primary   { --btn-fg: var(--color-primary);   --btn-border: var(--color-primary); }
    &.btn-success   { --btn-fg: var(--color-success);   --btn-border: var(--color-success); }
    &.btn-error     { --btn-fg: var(--color-error);     --btn-border: var(--color-error); }
    /* etc. */
  }

  .btn-ghost {
    --btn-bg: transparent;
    --btn-border: transparent;
  }

  .btn-soft {
    &.btn-primary { --btn-bg: color-mix(in oklab, var(--color-primary), transparent 85%); --btn-fg: var(--color-primary); --btn-border: transparent; }
    &.btn-success { --btn-bg: color-mix(in oklab, var(--color-success), transparent 85%); --btn-fg: var(--color-success); --btn-border: transparent; }
    &.btn-error   { --btn-bg: color-mix(in oklab, var(--color-error), transparent 85%);   --btn-fg: var(--color-error);   --btn-border: transparent; }
  }

  /* Sizes */
  .btn-xs { --size: calc(var(--size-field) * 6);  --btn-p: 0.5rem;  --btn-fs: 0.6875rem; }
  .btn-sm { --size: calc(var(--size-field) * 8);  --btn-p: 0.75rem; --btn-fs: 0.75rem; }
  .btn-lg { --size: calc(var(--size-field) * 12); --btn-p: 1.25rem; --btn-fs: 1rem; }
  .btn-xl { --size: calc(var(--size-field) * 14); --btn-p: 1.5rem;  --btn-fs: 1.125rem; }

  /* Shapes */
  .btn-circle  { border-radius: 9999px; width: var(--size); padding: 0; }
  .btn-square  { width: var(--size); padding: 0; }
  .btn-block   { display: flex; width: 100%; }
  .btn-wide    { min-width: 12rem; }
}
```

### Menu

```css
@layer components {
  .menu {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 0.25rem;
    padding: 0.5rem;
    font-size: 0.875rem;
    --menu-active-bg: var(--color-primary);
    --menu-active-fg: var(--color-primary-content);

    /* Auto-style list items - zero specificity with :where() */
    :where(li) {
      position: relative;
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
    }

    /* Style anchors/buttons inside li (but not nested ul) */
    :where(li > *:not(ul, details, .menu-title)) {
      display: grid;
      grid-auto-flow: column;
      grid-auto-columns: minmax(auto, max-content) auto max-content;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 0.75rem;
      border-radius: var(--radius-field);
      cursor: pointer;
      text-decoration: none;
      color: inherit;
      transition: background-color 0.2s, color 0.2s;
    }

    :where(li > *:not(ul, details, .menu-title)):hover {
      background-color: color-mix(in oklab, var(--color-base-content), transparent 90%);
    }

    /* Active state */
    :where(li > *:not(ul, details)).active,
    :where(li > *:not(ul, details)).menu-active {
      background-color: var(--menu-active-bg);
      color: var(--menu-active-fg);
    }

    /* Nested submenus */
    :where(li ul) {
      position: relative;
      margin-inline-start: 1rem;
      padding-inline-start: 0.5rem;
      &::before {
        content: "";
        position: absolute;
        inset-block: 0.75rem;
        inset-inline-start: 0;
        width: var(--border);
        background-color: color-mix(in oklab, var(--color-base-content), transparent 90%);
      }
    }

    /* Section title */
    :where(.menu-title) {
      padding: 0.25rem 0.75rem;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      opacity: 0.5;
      cursor: default;
    }

    /* Disabled */
    :where(.menu-disabled) {
      opacity: 0.4;
      pointer-events: none;
    }
  }

  /* Direction */
  .menu-horizontal {
    flex-direction: row;
    :where(li ul) {
      margin-inline-start: 0;
    }
  }

  /* Sizes */
  .menu-xs { font-size: 0.75rem;  :where(li > *:not(ul, details, .menu-title)) { padding: 0.25rem 0.5rem; } }
  .menu-sm { font-size: 0.8125rem; :where(li > *:not(ul, details, .menu-title)) { padding: 0.375rem 0.625rem; } }
  .menu-lg { font-size: 1rem;     :where(li > *:not(ul, details, .menu-title)) { padding: 0.625rem 1rem; } }
  .menu-xl { font-size: 1.125rem; :where(li > *:not(ul, details, .menu-title)) { padding: 0.75rem 1.25rem; } }
}
```

**Usage:**
```html
<ul class="menu bg-base-200 rounded-box w-56">
  <li class="menu-title">Navigation</li>
  <li><a class="active">Home</a></li>
  <li><a>Settings</a></li>
  <li>
    <details>
      <summary>More</summary>
      <ul>
        <li><a>Sub item 1</a></li>
        <li><a>Sub item 2</a></li>
      </ul>
    </details>
  </li>
</ul>
```

### Card

```css
@layer components {
  .card {
    display: flex;
    flex-direction: column;
    background-color: var(--color-base-100);
    border-radius: var(--radius-box);
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  .card-body    { display: flex; flex-direction: column; gap: 0.5rem; padding: 1.25rem; flex: 1; }
  .card-title   { display: flex; align-items: center; gap: 0.5rem; font-size: 1.125rem; font-weight: 600; }
  .card-actions { display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center; }
  .card-compact { :where(.card-body) { padding: 0.75rem; } }
  .card-bordered { border: var(--border) solid var(--color-base-300); box-shadow: none; }
  .card-side    { flex-direction: row; }
}
```

### Modal (using native `<dialog>`)

```css
@layer components {
  .modal {
    position: fixed;
    inset: 0;
    display: grid;
    place-items: center;
    background-color: transparent;
    z-index: 500;
    opacity: 0;
    visibility: hidden;
    overflow-y: auto;
    overscroll-behavior: contain;
    transition: opacity 0.2s, visibility 0.2s;

    &[open], &.modal-open {
      opacity: 1;
      visibility: visible;
    }

    &::backdrop {
      background-color: rgba(0, 0, 0, 0.4);
      animation: fade-in 0.2s;
    }

    @media (max-width: 767px) {
      place-items: end center;
      :where(.modal-box) {
        width: 100%;
        max-width: 100%;
        border-radius: var(--radius-box) var(--radius-box) 0 0;
        animation: slide-up 0.3s var(--ease-spring);
      }
    }
  }

  .modal-box {
    background-color: var(--color-base-100);
    border-radius: var(--radius-box);
    padding: 1.5rem;
    max-width: 32rem;
    width: calc(100% - 2rem);
    max-height: calc(100vh - 5rem);
    overflow-y: auto;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }

  .modal-action {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    margin-top: 1.5rem;
  }
}
```

**Usage:**
```html
<button onclick="my_modal.showModal()" class="btn btn-primary">Open</button>

<dialog id="my_modal" class="modal">
  <div class="modal-box">
    <h3 class="text-lg font-bold">Title</h3>
    <p class="py-4">Content</p>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
```

### Input

```css
@layer components {
  .input {
    height: calc(var(--size-field) * 10);
    padding-inline: 0.75rem;
    font-size: 0.875rem;
    background-color: var(--color-base-100);
    border: var(--border) solid var(--color-base-300);
    border-radius: var(--radius-field);
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    width: 100%;

    &:focus {
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px color-mix(in oklab, var(--color-primary), transparent 80%);
    }
    &::placeholder { color: color-mix(in oklab, var(--color-base-content), transparent 60%); }
  }

  .input-bordered { border-color: var(--color-base-300); }
  .input-ghost    { background-color: transparent; border-color: transparent; &:focus { background-color: var(--color-base-100); } }
  .input-sm { height: calc(var(--size-field) * 8); font-size: 0.8125rem; padding-inline: 0.625rem; }
  .input-lg { height: calc(var(--size-field) * 12); font-size: 1rem; padding-inline: 1rem; }

  .input-primary { &:focus { border-color: var(--color-primary); box-shadow: 0 0 0 3px color-mix(in oklab, var(--color-primary), transparent 80%); } }
  .input-success { &:focus { border-color: var(--color-success); box-shadow: 0 0 0 3px color-mix(in oklab, var(--color-success), transparent 80%); } }
  .input-error   { border-color: var(--color-error); &:focus { box-shadow: 0 0 0 3px color-mix(in oklab, var(--color-error), transparent 80%); } }
}
```

### More Components (same pattern)

Each component follows the same architecture:
- **Base class**: layout + defaults via CSS custom properties
- **Color modifiers**: override `--*-bg` and `--*-fg`
- **Style modifiers**: change visual approach (outline, ghost, soft)
- **Size modifiers**: override `--size`, `--*-fs`, padding
- **Descendant selectors**: use `:where()` for zero-specificity auto-styling

Components to build: `alert`, `avatar`, `badge`, `breadcrumbs`, `chat`, `checkbox`, `divider`, `dock`, `drawer`, `dropdown`, `hero`, `indicator`, `join`, `kbd`, `loading`, `navbar`, `pagination`, `progress`, `radio`, `range`, `rating`, `select`, `skeleton`, `stat`, `steps`, `table`, `tabs`, `textarea`, `timeline`, `toast`, `toggle`, `tooltip`, `sheet`, `accordion`, `carousel`, `file-input`, `stack`, `swap`.

---

## 6. Specialized Components (POS, HR, Manufacturing)

Components that no existing library has. Built with our semantic classes + Tailwind utilities.

### POS / Retail

```html
<!-- Numpad -->
<div class="numpad">
  <button class="numpad-key">1</button>
  <button class="numpad-key">2</button>
  <button class="numpad-key">3</button>
  <button class="numpad-key">4</button>
  <button class="numpad-key">5</button>
  <button class="numpad-key">6</button>
  <button class="numpad-key">7</button>
  <button class="numpad-key">8</button>
  <button class="numpad-key">9</button>
  <button class="numpad-key col-span-2">0</button>
  <button class="numpad-key">.</button>
</div>

<!-- Product Card (POS) -->
<div class="product-card">
  <figure>
    <img src="product.jpg" alt="Café Latte" />
  </figure>
  <div class="product-card-body">
    <h3>Café Latte</h3>
    <p class="product-card-price">€3.50</p>
  </div>
</div>

<!-- Cart Item -->
<div class="cart-item">
  <span class="cart-item-qty">2x</span>
  <span class="cart-item-name">Café Latte</span>
  <span class="cart-item-price">€7.00</span>
  <button class="cart-item-remove">&times;</button>
</div>
```

**Full POS list**: `numpad`, `calculator`, `product-card`, `category-tabs`, `cart`, `cart-item`, `order-ticket`, `payment`, `receipt`, `stock-indicator`, `quantity-badge`, `variant-selector`, `virtual-keyboard`

### HR / Employees

```html
<!-- Employee Card -->
<div class="employee-card">
  <div class="avatar placeholder online">
    <div class="bg-primary text-primary-content w-12 rounded-full">
      <span>JD</span>
    </div>
  </div>
  <div class="employee-card-info">
    <h4>Juan Delgado</h4>
    <span>UX Designer</span>
    <span class="badge badge-xs badge-primary badge-soft">Design</span>
  </div>
</div>

<!-- Time Clock -->
<div class="time-clock">
  <div class="time-clock-display">09:42:15</div>
  <div class="time-clock-date">Thursday, Feb 6, 2026</div>
  <div class="time-clock-actions">
    <button class="btn btn-success">Clock In</button>
    <button class="btn btn-error btn-outline">Clock Out</button>
  </div>
</div>
```

**Full HR list**: `employee-card`, `time-clock`, `shift-calendar`, `attendance-list`, `leave-request`, `org-chart`, `performance-meter`

### Manufacturing / ERP

```html
<!-- Machine Status -->
<div class="machine-status">
  <div class="machine-status-header">
    <h3>CNC Mill #3</h3>
    <span class="badge badge-success badge-sm">Running</span>
  </div>
  <div class="machine-status-metrics">
    <div class="machine-status-metric">
      <span class="label">Speed</span>
      <span class="value">1200 RPM</span>
    </div>
    <div class="machine-status-metric">
      <span class="label">Temp</span>
      <span class="value">42°C</span>
    </div>
  </div>
  <progress class="progress progress-primary" value="72" max="100"></progress>
</div>
```

**Full Manufacturing list**: `work-order`, `machine-status`, `production-line`, `quality-check`, `batch-tracker`, `bom-tree`, `gantt`, `kds-order`, `dashboard-grid`, `kanban`, `gauge`, `sparkline`, `diff-viewer`, `barcode-scanner`

---

## 7. Custom Utilities (`@utility`)

```css
/* Glass morphism */
@utility glass {
  background: var(--color-glass-bg);
  backdrop-filter: blur(var(--blur-glass)) saturate(180%);
  -webkit-backdrop-filter: blur(var(--blur-glass)) saturate(180%);
  border: 0.5px solid var(--color-glass-border);
  box-shadow: var(--shadow-glass);
}

/* Touch targets */
@utility touch-target    { min-height: 44px; min-width: 44px; }
@utility touch-target-sm { min-height: 36px; min-width: 36px; }

/* Safe areas */
@utility safe-top    { padding-top: env(safe-area-inset-top, 0px); }
@utility safe-bottom { padding-bottom: env(safe-area-inset-bottom, 0px); }
@utility safe-x      { padding-left: env(safe-area-inset-left, 0px); padding-right: env(safe-area-inset-right, 0px); }

/* Animations */
@utility transition-spring { transition-timing-function: var(--ease-spring); transition-duration: 300ms; }
@utility transition-ios    { transition-timing-function: var(--ease-ios); transition-duration: 350ms; }

/* Scrollbar */
@utility scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
}

/* Rounded box (uses --radius-box) */
@utility rounded-box { border-radius: var(--radius-box); }
@utility rounded-field { border-radius: var(--radius-field); }
```

---

## 8. Icons (Iconify)

```bash
npm install -D @iconify/tailwind @iconify-json/mdi-light @iconify-json/lucide @iconify-json/heroicons
```

```html
<!-- In src/css/ux.css -->
@plugin "@iconify/tailwind" { prefixes: mdi-light, lucide, heroicons; }

<!-- Usage (icons compile to CSS mask-image, zero JS) -->
<span class="icon-[mdi-light--home]"></span>
<span class="icon-[lucide--settings] text-2xl text-primary"></span>

<!-- Inside buttons -->
<button class="btn btn-primary">
  <span class="icon-[mdi-light--content-save]"></span>
  Save
</button>

<!-- Inside menu -->
<ul class="menu">
  <li><a><span class="icon-[mdi-light--home]"></span> Home</a></li>
</ul>
```

---

## 9. Directory Structure

```
ux/
├── old/                                  # Previous v2 (SCSS/BEM) - archived
│   ├── src/scss/
│   ├── docs/
│   └── ...
│
├── src/
│   ├── css/
│   │   ├── ux.css                       # Entry point SEMANTIC: @import "tailwindcss" + @layer components
│   │   ├── tw.css                       # Entry point TAILWIND: @import "tailwindcss" source(none) + @source
│   │   ├── tokens.css                   # Shared @theme tokens (imported by both)
│   │   ├── components/                  # Component CSS (imported by ux.css)
│   │   │   ├── button.css
│   │   │   ├── menu.css
│   │   │   ├── card.css
│   │   │   ├── modal.css
│   │   │   ├── input.css
│   │   │   ├── badge.css
│   │   │   ├── navbar.css
│   │   │   ├── tabs.css
│   │   │   ├── alert.css
│   │   │   ├── toast.css
│   │   │   ├── toggle.css
│   │   │   ├── ...
│   │   │   ├── pos/                     # POS components
│   │   │   │   ├── numpad.css
│   │   │   │   ├── product-card.css
│   │   │   │   ├── cart.css
│   │   │   │   └── ...
│   │   │   ├── hr/                      # HR components
│   │   │   │   ├── employee-card.css
│   │   │   │   ├── time-clock.css
│   │   │   │   └── ...
│   │   │   └── manufacturing/           # Manufacturing components
│   │   │       ├── machine-status.css
│   │   │       ├── work-order.css
│   │   │       └── ...
│   │   ├── themes/                      # Theme definitions
│   │   │   ├── dark.css
│   │   │   ├── erplora.css
│   │   │   ├── ocean.css
│   │   │   └── forest.css
│   │   └── utilities.css                # Custom @utility definitions
│   │
│   ├── components/                      # HTML snippets (source of truth for docs)
│   │   ├── button/
│   │   │   ├── semantic.html            # <button class="btn btn-primary">
│   │   │   └── tailwind.html            # <button class="inline-flex items-center...">
│   │   ├── menu/
│   │   │   ├── semantic.html
│   │   │   └── tailwind.html
│   │   ├── card/
│   │   ├── modal/
│   │   ├── pos/
│   │   ├── hr/
│   │   └── manufacturing/
│   │
│   └── js/                              # JS helpers (unchanged)
│       ├── ux.js
│       ├── core/
│       └── components/
│
├── dist/                                # Build output → CDN
│   ├── ux.css                           # Semantic classes (dev)
│   ├── ux.min.css                       # Semantic classes (production)
│   ├── tw.css                           # Tailwind utilities (dev)
│   ├── tw.min.css                       # Tailwind utilities (production)
│   ├── ux-full.css                      # Both combined (dev)
│   ├── ux-full.min.css                  # Both combined (production)
│   ├── ux.js
│   ├── ux.min.js
│   └── ux.esm.js
│
├── docs/                                # Astro SSG documentation
│
├── tests/                               # Playwright tests
├── ARCHITECTURE.md
├── COMPONENTS_GUIDE.md
├── LICENSE
└── package.json
```

---

## 10. Entry Point CSS Files

### `src/css/tokens.css` (shared design tokens)

```css
/* Shared between ux.css and tw.css */
@theme {
  --color-base-100: #ffffff;
  --color-base-200: #f9fafb;
  --color-base-300: #f3f4f6;
  --color-base-content: #1f2937;

  --color-primary: oklch(0.55 0.22 250);
  --color-primary-content: #ffffff;
  --color-secondary: oklch(0.55 0.20 280);
  --color-secondary-content: #ffffff;
  --color-accent: oklch(0.70 0.18 155);
  --color-accent-content: #ffffff;
  --color-neutral: oklch(0.30 0.02 260);
  --color-neutral-content: #ffffff;

  --color-info: oklch(0.62 0.18 230);
  --color-info-content: #ffffff;
  --color-success: oklch(0.72 0.20 142);
  --color-success-content: #ffffff;
  --color-warning: oklch(0.80 0.18 85);
  --color-warning-content: #1f2937;
  --color-error: oklch(0.63 0.24 29);
  --color-error-content: #ffffff;

  --size-field: 0.25rem;
  --radius-field: 0.5rem;
  --radius-box: 1rem;
  --border: 1px;
  --depth: 1;

  --color-glass-bg: rgba(255, 255, 255, 0.45);
  --color-glass-border: rgba(255, 255, 255, 0.18);
  --blur-glass: 20px;
  --shadow-glass: 0 8px 32px rgba(0, 0, 0, 0.08);

  --ease-ios: cubic-bezier(0.32, 0.72, 0, 1);
  --ease-spring: cubic-bezier(0.28, 0.84, 0.42, 1);
}
```

### `src/css/ux.css` (semantic entry point → `dist/ux.css`)

```css
@import "tailwindcss";

/* Shared tokens */
@import "./tokens.css";

/* Iconify icons */
@plugin "@iconify/tailwind" {
  prefixes: mdi-light, lucide, heroicons;
}

/* Themes */
@import "./themes/dark.css";
@import "./themes/erplora.css";
@import "./themes/ocean.css";
@import "./themes/forest.css";

/* Components (our semantic classes in @layer components) */
@import "./components/button.css";
@import "./components/menu.css";
@import "./components/card.css";
@import "./components/modal.css";
@import "./components/input.css";
@import "./components/badge.css";
@import "./components/navbar.css";
@import "./components/tabs.css";
@import "./components/alert.css";
@import "./components/toast.css";
@import "./components/toggle.css";
@import "./components/checkbox.css";
@import "./components/radio.css";
@import "./components/select.css";
@import "./components/textarea.css";
@import "./components/range.css";
@import "./components/progress.css";
@import "./components/avatar.css";
@import "./components/tooltip.css";
@import "./components/dropdown.css";
@import "./components/drawer.css";
@import "./components/accordion.css";
@import "./components/table.css";
@import "./components/loading.css";
@import "./components/skeleton.css";
@import "./components/divider.css";
@import "./components/breadcrumbs.css";
@import "./components/pagination.css";
@import "./components/steps.css";
@import "./components/stat.css";
@import "./components/hero.css";
@import "./components/dock.css";
@import "./components/sheet.css";
@import "./components/join.css";
@import "./components/kbd.css";
@import "./components/timeline.css";
@import "./components/chat.css";
@import "./components/rating.css";
@import "./components/carousel.css";
@import "./components/stack.css";
@import "./components/indicator.css";
@import "./components/swap.css";
@import "./components/file-input.css";

/* Specialized */
@import "./components/pos/numpad.css";
@import "./components/pos/product-card.css";
@import "./components/pos/cart.css";
@import "./components/pos/receipt.css";
@import "./components/hr/employee-card.css";
@import "./components/hr/time-clock.css";
@import "./components/manufacturing/machine-status.css";
@import "./components/manufacturing/work-order.css";

/* Custom utilities */
@import "./utilities.css";

/* Base styles */
@layer base {
  html {
    -webkit-tap-highlight-color: transparent;
    -webkit-font-smoothing: antialiased;
  }
}

/* Source scanning (also picks up utility classes used alongside semantic) */
@source "../components/**/*.html";
@source "../../docs/**/*.html";
```

### `src/css/tw.css` (Tailwind utilities entry point → `dist/tw.css`)

```css
/* Disable auto-scanning, only scan our HTML snippets */
@import "tailwindcss" source(none);

/* Same shared tokens - so bg-primary, text-error, etc. work */
@import "./tokens.css";

/* Iconify icons */
@plugin "@iconify/tailwind" {
  prefixes: mdi-light, lucide, heroicons;
}

/* Themes (same as ux.css - so data-theme works with utilities too) */
@import "./themes/dark.css";
@import "./themes/erplora.css";
@import "./themes/ocean.css";
@import "./themes/forest.css";

/* Custom utilities (glass, touch-target, etc.) */
@import "./utilities.css";

/* Base styles */
@layer base {
  html {
    -webkit-tap-highlight-color: transparent;
    -webkit-font-smoothing: antialiased;
  }
}

/* Scan HTML files - Tailwind extracts ONLY utility classes it recognizes */
/* (semantic classes like .btn, .card are silently ignored) */
@source "../components/**/*.html";
@source "../../docs/**/*.html";
```

---

## 11. Build Pipeline

### package.json

```json
{
  "name": "ux",
  "version": "3.0.0",
  "description": "Semantic CSS component library compiled with Tailwind v4. Dual output: semantic classes + Tailwind utilities.",
  "license": "MIT",
  "scripts": {
    "dev": "tailwindcss -i src/css/ux.css -o dist/ux.css --watch",
    "dev:tw": "tailwindcss -i src/css/tw.css -o dist/tw.css --watch",

    "build": "npm run build:css && npm run build:js",
    "build:css": "npm run build:semantic && npm run build:tw && npm run build:full",
    "build:semantic": "tailwindcss -i src/css/ux.css -o dist/ux.css && lightningcss --minify dist/ux.css -o dist/ux.min.css",
    "build:tw": "tailwindcss -i src/css/tw.css -o dist/tw.css && lightningcss --minify dist/tw.css -o dist/tw.min.css",
    "build:full": "cat dist/ux.css dist/tw.css > dist/ux-full.css && lightningcss --minify dist/ux-full.css -o dist/ux-full.min.css",
    "build:js": "vite build && terser dist/ux.js -o dist/ux.min.js --compress --mangle",

    "docs:dev": "cd docs && npm run dev",
    "docs:build": "cd docs && npm run build",
    "test": "playwright test"
  },
  "devDependencies": {
    "@tailwindcss/cli": "^4.0.0",
    "tailwindcss": "^4.0.0",
    "@iconify/tailwind": "^2.0.0",
    "@iconify-json/mdi-light": "^1.0.0",
    "@iconify-json/lucide": "^1.0.0",
    "@iconify-json/heroicons": "^1.0.0",
    "lightningcss-cli": "^1.30.1",
    "terser": "^5.46.0",
    "vite": "^7.3.1",
    "@playwright/test": "^1.57.0"
  }
}
```

### Build Output

```
dist/
├── ux.css          # Semantic classes (dev)            → <button class="btn btn-primary">
├── ux.min.css      # Semantic classes (production)
├── tw.css          # Tailwind utilities (dev)          → <button class="inline-flex items-center...">
├── tw.min.css      # Tailwind utilities (production)
├── ux-full.css     # Both combined (dev)               → Mix freely
├── ux-full.min.css # Both combined (production)
├── ux.js           # JS helpers
├── ux.min.js       # JS helpers (minified)
└── ux.esm.js       # JS helpers (ESM)
```

### What Gets Removed from v2

- `sass` dependency
- `src/scss/` directory (159 SCSS files) → moved to `old/`
- `build-modular.js`
- `vite.config.esm.js`, `vite.config.iife.js`
- BEM class naming (`.ux-button`, `.ux-modal__header`)
- Color composition system (`.ux-color-*`)

### What We Keep

- `src/js/` - JS helpers (UX.modal, UX.trapFocus, etc.)
- Bootstrap Grid
- Playwright tests (adapt selectors)
- CDN distribution model
- HTMX + Alpine.js integration pattern

---

## 12. Legal & Attribution

```
MIT License

Copyright (c) 2026 ERPlora

This project uses Tailwind CSS (MIT) by Tailwind Labs as its build engine.
This project uses Iconify (MIT) by Vjacheslav Trushkin for icon integration.

All component designs are original work inspired by common UI patterns.
```

---

## 13. Documentation (Astro SSG - style DaisyUI/FlyonUI)

### Component Page Layout

Each component page shows **4 tabs** per variant:

```
┌──────────────────────────────────────────────┐
│  Preview │ Semantic │ Tailwind │ JS          │
├──────────────────────────────────────────────┤
│                                              │
│   [ Primary ]  [ Secondary ]  [ Accent ]     │
│   [ Success ]  [ Warning ]    [ Error ]      │
│                                              │
├──────────────────────────────────────────────┤
│  "Semantic" tab:                             │
│  ┌────────────────────────────────────────┐  │
│  │ <button class="btn btn-primary">      │  │
│  │   Save                                │  │
│  │ </button>                             │  │
│  │                                       │  │
│  │ Requires: ux.min.css                  │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  "Tailwind" tab:                             │
│  ┌────────────────────────────────────────┐  │
│  │ <button class="inline-flex items-     │  │
│  │   center justify-center h-11 px-4     │  │
│  │   bg-primary text-primary-content     │  │
│  │   rounded-[var(--radius-field)]       │  │
│  │   font-semibold hover:brightness-95   │  │
│  │   active:scale-[0.97] transition-all">│  │
│  │   Save                                │  │
│  │ </button>                             │  │
│  │                                       │  │
│  │ Requires: tw.min.css                  │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  "JS" tab:                                   │
│  ┌────────────────────────────────────────┐  │
│  │ // No JavaScript required             │  │
│  └────────────────────────────────────────┘  │
└──────────────────────────────────────────────┘
```

### Astro CodePreview Component

```astro
---
interface Props {
  title?: string;
  semantic: string;   // HTML with semantic classes
  tailwind: string;   // HTML with Tailwind utilities
  js?: string;        // Optional JS
}
const { title, semantic, tailwind, js } = Astro.props;
---

<div class="border border-base-300 rounded-xl overflow-hidden">
  {title && <h3 class="px-4 py-2 text-sm font-medium bg-base-200">{title}</h3>}

  <div x-data="{ tab: 'preview' }">
    <div class="tabs tabs-bordered bg-base-200 px-2">
      <button class="tab" :class="tab === 'preview' && 'tab-active'"
              @click="tab = 'preview'">Preview</button>
      <button class="tab" :class="tab === 'semantic' && 'tab-active'"
              @click="tab = 'semantic'">Semantic</button>
      <button class="tab" :class="tab === 'tailwind' && 'tab-active'"
              @click="tab = 'tailwind'">Tailwind</button>
      <button class="tab" :class="tab === 'js' && 'tab-active'"
              @click="tab = 'js'">JS</button>
    </div>

    <div x-show="tab === 'preview'" class="p-6 bg-base-100">
      <Fragment set:html={semantic} />
    </div>

    <div x-show="tab === 'semantic'" class="p-4 bg-neutral text-neutral-content">
      <pre><code>{semantic}</code></pre>
      <p class="text-xs opacity-60 mt-2">Requires: ux.min.css</p>
    </div>

    <div x-show="tab === 'tailwind'" class="p-4 bg-neutral text-neutral-content">
      <pre><code>{tailwind}</code></pre>
      <p class="text-xs opacity-60 mt-2">Requires: tw.min.css</p>
    </div>

    <div x-show="tab === 'js'" class="p-4 bg-neutral text-neutral-content">
      <pre><code>{js || '// No JavaScript required - pure CSS component'}</code></pre>
    </div>
  </div>
</div>
```

---

## 14. Migration Checklist

### Phase 1: Setup (Day 1)
- [ ] Move current src/scss/, docs/, build configs to `old/`
- [ ] Install tailwindcss v4, @tailwindcss/cli, @iconify/tailwind, icon packages
- [ ] Create `src/css/tokens.css` with shared @theme tokens
- [ ] Create `src/css/ux.css` (semantic entry) + `src/css/tw.css` (utility entry)
- [ ] Create `src/css/utilities.css` (glass, touch-target, etc.)
- [ ] Create first component CSS: button.css, card.css, menu.css
- [ ] Create HTML snippets: button/semantic.html + button/tailwind.html
- [ ] Run dual build → verify both `dist/ux.css` and `dist/tw.css` output
- [ ] Test: HTML with `ux.css` → `btn btn-primary` works
- [ ] Test: HTML with `tw.css` → `inline-flex bg-primary...` works

### Phase 2: Core Components (Week 1)
For each component: CSS semantic class + semantic.html + tailwind.html
- [ ] Actions: btn, dropdown, swap
- [ ] Forms: input, select, textarea, checkbox, radio, toggle, range, rating, file-input
- [ ] Display: badge, avatar, card, table, stat, accordion, chat, kbd, timeline
- [ ] Navigation: menu, navbar, tabs, breadcrumbs, pagination, steps, dock
- [ ] Feedback: alert, toast, tooltip, progress, loading, skeleton
- [ ] Layout: modal, sheet, drawer, divider, hero, join, stack, indicator, carousel
- [ ] Verify dark theme works for all
- [ ] Verify glass utility works for all

### Phase 3: Specialized Components (Week 2)
- [ ] POS: numpad, product-card, cart, receipt, calculator, payment
- [ ] HR: employee-card, time-clock, shift-calendar, attendance-list
- [ ] Manufacturing: machine-status, work-order, production-line, quality-check
- [ ] Data: datatable, kanban, gantt, dashboard-grid

### Phase 4: Documentation (Week 3)
- [ ] Build Astro docs with tabs: Preview | Semantic | Tailwind | JS
- [ ] Document all generic components
- [ ] Document all specialized components
- [ ] Icon browser page
- [ ] Deploy to GitHub Pages

### Phase 5: Polish & Deploy
- [ ] Update CLAUDE.md with new conventions
- [ ] Update COMPONENTS_GUIDE.md
- [ ] CDN deployment (jsDelivr)
- [ ] Playwright tests
- [ ] Cross-browser testing
