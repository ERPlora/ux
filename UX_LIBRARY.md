# UX Component Library — AI Context Reference

> **For AI systems** (Claude, GPT, Copilot, Cursor) to generate correct HTML using this library.
> **For developers** using the library via CDN in Django, HTMX, React, Vue, or vanilla JS projects.

---

## Quick Start

```html
<!-- ONE link. Zero JS. Zero Node. Zero build step. -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/ERPlora/ux@3/dist/ux-full.min.css">
```

Three CSS files available:

| File | Contains | Use case |
|------|----------|----------|
| `ux.min.css` | Semantic classes + Tailwind utilities | `<button class="btn btn-primary">` or `<div class="flex gap-4">` |
| `tw.min.css` | Tailwind utilities + tokens only | Pure utility-class approach |
| `ux-full.min.css` | **Both combined** | Mix semantic + Tailwind freely **(recommended)** |

**All three files include Tailwind utility classes** (flex, grid, padding, margin, text, colors, positioning, sizing, borders, shadows, transforms, etc.) pre-compiled. No Tailwind CLI needed.

```html
<!-- Django template -->
{% load static %}
<link rel="stylesheet" href="{% static 'css/ux-full.min.css' %}">

<!-- Mix semantic and Tailwind freely -->
<div class="card mt-4">
  <div class="card-body">
    <h2 class="card-title text-primary">Title</h2>
    <p class="text-sm text-base-content/70">Subtitle</p>
  </div>
</div>

<!-- Or pure Tailwind -->
<div class="flex flex-col bg-base-100 rounded-box shadow-md overflow-hidden mt-4">
  <div class="flex flex-col flex-1 p-5">
    <h2 class="font-semibold text-lg text-primary">Title</h2>
    <p class="text-sm text-base-content/70">Subtitle</p>
  </div>
</div>
```

---

## Design Tokens

All colors use OKLCH. Available as CSS custom properties AND as Tailwind classes.

### Colors

| Token | Tailwind class | Purpose |
|-------|---------------|---------|
| `--color-base-100` | `bg-base-100` | Page background (white / dark) |
| `--color-base-200` | `bg-base-200` | Subtle background |
| `--color-base-300` | `bg-base-300` / `border-base-300` | Borders, dividers |
| `--color-base-content` | `text-base-content` | Default text |
| `--color-primary` | `bg-primary` / `text-primary` / `border-primary` | Brand color |
| `--color-primary-content` | `text-primary-content` | Text on primary bg |
| `--color-secondary` | `bg-secondary` / `text-secondary` | Secondary actions |
| `--color-accent` | `bg-accent` / `text-accent` | Highlight |
| `--color-neutral` | `bg-neutral` / `text-neutral` | Neutral dark |
| `--color-info` | `bg-info` / `text-info` | Informational |
| `--color-success` | `bg-success` / `text-success` | Positive |
| `--color-warning` | `bg-warning` / `text-warning` | Caution |
| `--color-error` | `bg-error` / `text-error` | Destructive |

Every color has a `-content` variant for contrast text: `text-primary-content`, `text-error-content`, etc.

**Opacity modifiers work**: `bg-primary/10`, `bg-error/20`, `text-base-content/50`, `bg-black/5`, `bg-white/80`.

### Sizing & Shape

| Token | Tailwind class | Value |
|-------|---------------|-------|
| `--radius-field` | `rounded-field` | `0.5rem` — inputs, buttons |
| `--radius-box` | `rounded-box` | `1rem` — cards, modals |
| `--border` | `border` | `1px` |

### Glass Morphism

| Token | Value |
|-------|-------|
| `--color-glass-bg` | `rgba(255,255,255,0.45)` |
| `--color-glass-border` | `rgba(255,255,255,0.18)` |
| `--blur-glass` | `20px` |

### Animation

| Token | Value |
|-------|-------|
| `--ease-ios` | `cubic-bezier(0.32, 0.72, 0, 1)` |
| `--ease-spring` | `cubic-bezier(0.28, 0.84, 0.42, 1)` |

---

## Themes

```html
<html data-theme="dark">    <!-- Dark mode -->
<html data-theme="erplora"> <!-- ERPlora brand -->
<html data-theme="ocean">   <!-- Ocean blue tint -->
<html>                       <!-- Light (default), auto-dark via prefers-color-scheme -->
```

---

## Custom Tailwind Utilities

These work in both `ux.min.css` and `tw.min.css`:

| Class | Effect |
|-------|--------|
| `glass` | Frosted glass (backdrop-filter + translucent bg + border) |
| `touch-target` | `min-height: 44px; min-width: 44px` |
| `touch-target-sm` | `min-height: 36px; min-width: 36px` |
| `safe-top` | `padding-top: env(safe-area-inset-top)` |
| `safe-bottom` | `padding-bottom: env(safe-area-inset-bottom)` |
| `safe-x` | Safe area left + right padding |
| `transition-spring` | Spring easing, 300ms |
| `transition-ios` | iOS easing, 350ms |
| `scrollbar-hide` | Hide scrollbar (all browsers) |
| `rounded-box` | `border-radius: var(--radius-box)` (1rem) |
| `rounded-field` | `border-radius: var(--radius-field)` (0.5rem) |

---

## Available Tailwind Utilities

All these are pre-compiled in the CSS files. No build step needed.

### Grid System
```html
<!-- Basic grid -->
<div class="grid grid-cols-3 gap-4">
  <div>1</div> <div>2</div> <div>3</div>
</div>

<!-- Responsive grid -->
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  <div>...</div>
</div>

<!-- Spanning -->
<div class="grid grid-cols-12 gap-4">
  <div class="col-span-8">Main</div>
  <div class="col-span-4">Sidebar</div>
</div>

<!-- Placement -->
<div class="grid grid-cols-4 gap-4">
  <div class="col-start-2 col-end-4">Centered</div>
</div>
```

**Available classes:**
- `grid`, `inline-grid`
- `grid-cols-{1-12}`, `grid-cols-none`, `grid-cols-subgrid`
- `col-span-{1-12}`, `col-span-full`
- `col-start-{1-13}`, `col-end-{1-13}`
- `grid-rows-{1-6}`, `grid-rows-none`, `grid-rows-subgrid`
- `row-span-{1-6}`, `row-span-full`
- `row-start-{1-7}`, `row-end-{1-7}`
- `grid-flow-row`, `grid-flow-col`, `grid-flow-dense`
- `auto-cols-{auto,min,max,fr}`, `auto-rows-{auto,min,max,fr}`
- `gap-{0-16}`, `gap-x-{0-8}`, `gap-y-{0-8}`
- `place-items-{start,end,center,stretch,baseline}`
- `place-content-{start,end,center,stretch,between,around,evenly}`
- `place-self-{auto,start,end,center,stretch}`
- All with `sm:`, `md:`, `lg:`, `xl:` responsive prefixes

### Flexbox
- `flex`, `inline-flex`, `flex-row`, `flex-col`, `flex-row-reverse`, `flex-col-reverse`
- `flex-wrap`, `flex-nowrap`, `flex-1`, `flex-auto`, `flex-none`
- `grow`, `grow-0`, `shrink`, `shrink-0`
- `items-{start,end,center,stretch,baseline}`
- `justify-{start,end,center,between,around,evenly}`
- `self-{auto,start,end,center,stretch}`
- `order-{first,last,none,1-12}`

### Spacing
- Padding: `p-{0-16}`, `px-*`, `py-*`, `pt-*`, `pb-*`, `pl-*`, `pr-*`
- Margin: `m-{0-8}`, `mx-*`, `my-*`, `mt-*`, `mb-*`, `ml-*`, `mr-*`, `m-auto`, `mx-auto`
- Space between: `space-x-{0-8}`, `space-y-{0-8}`

### Sizing
- Width: `w-{0-64}`, `w-full`, `w-screen`, `w-auto`, `w-min`, `w-max`, `w-fit`, `w-{1/2,1/3,2/3,1/4,3/4}`
- Height: `h-{0-64}`, `h-full`, `h-screen`, `h-dvh`, `h-auto`, `h-min`, `h-max`, `h-fit`
- Min/Max: `min-w-*`, `min-h-*`, `max-w-{none,xs,sm,md,lg,xl,2xl-7xl,full,prose}`, `max-h-*`
- Size (both): `size-{0-24}`, `size-full`

### Typography
- Size: `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl` to `text-5xl`
- Weight: `font-thin`, `font-light`, `font-normal`, `font-medium`, `font-semibold`, `font-bold`, `font-extrabold`
- Leading: `leading-none`, `leading-tight`, `leading-snug`, `leading-normal`, `leading-relaxed`, `leading-loose`
- Tracking: `tracking-tighter`, `tracking-tight`, `tracking-normal`, `tracking-wide`, `tracking-wider`, `tracking-widest`
- Align: `text-left`, `text-center`, `text-right`, `text-justify`
- Style: `uppercase`, `lowercase`, `capitalize`, `italic`, `truncate`, `underline`, `no-underline`, `line-through`

### Colors (Tailwind classes with theme tokens)
- Background: `bg-base-100`, `bg-base-200`, `bg-base-300`, `bg-primary`, `bg-secondary`, `bg-accent`, `bg-neutral`, `bg-info`, `bg-success`, `bg-warning`, `bg-error`, `bg-white`, `bg-black`, `bg-transparent`
- Text: `text-base-content`, `text-primary`, `text-primary-content`, `text-secondary`, `text-accent`, `text-info`, `text-success`, `text-warning`, `text-error`, `text-white`, `text-black`
- Border: `border-base-300`, `border-primary`, `border-secondary`, `border-error`, `border-success`, etc.
- Opacity: `bg-primary/10`, `bg-error/20`, `text-base-content/50`, `bg-black/5`, `bg-white/80`

### Borders & Radius
- `border`, `border-0`, `border-2`, `border-t`, `border-b`, `border-l`, `border-r`
- `border-solid`, `border-dashed`, `border-dotted`, `border-none`
- `rounded-none`, `rounded-sm`, `rounded`, `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-2xl`, `rounded-3xl`, `rounded-full`
- Custom: `rounded-field` (0.5rem), `rounded-box` (1rem)
- Ring: `ring-{0-8}`, `ring-primary`, `ring-error`, etc.

### Shadows, Opacity, Effects
- `shadow-none`, `shadow-xs`, `shadow-sm`, `shadow`, `shadow-md`, `shadow-lg`, `shadow-xl`, `shadow-2xl`
- `opacity-{0,5,10,15,20,25,30,40,50,60,70,75,80,90,95,100}`
- `blur-sm`, `blur`, `blur-md`, `blur-lg`, `backdrop-blur-sm`, `backdrop-blur`, `backdrop-blur-md`, `backdrop-blur-lg`

### Display, Position, Overflow
- `block`, `inline`, `inline-block`, `hidden`, `flex`, `inline-flex`, `grid`, `inline-grid`
- `static`, `relative`, `absolute`, `fixed`, `sticky`
- `top-0`, `bottom-0`, `left-0`, `right-0`, `inset-0`, `inset-x-0`, `inset-y-0`
- `z-{0,10,20,30,40,50}`, `z-auto`
- `overflow-{auto,hidden,visible,scroll,clip}`, `overflow-x-*`, `overflow-y-*`

### Transitions & Transforms
- `transition-all`, `transition-colors`, `transition-opacity`, `transition-transform`
- `duration-{75,100,150,200,300,500,700,1000}`
- `scale-{0,50,75,90,95,100,105,110,125,150}`
- `translate-x-*`, `translate-y-*`, `rotate-*`

### Interactivity
- `cursor-pointer`, `cursor-default`, `cursor-not-allowed`, `cursor-grab`
- `pointer-events-none`, `pointer-events-auto`
- `select-none`, `select-text`, `select-all`
- `touch-none`, `touch-auto`, `touch-manipulation`

### Accessibility
- `sr-only`, `not-sr-only`

---

## Color Composition System

Eight color classes that work on ANY component. They set `--c`, `--c-fg`, `--c-border` CSS variables.

```html
<!-- With semantic classes -->
<button class="btn color-primary">Primary</button>
<span class="badge color-success">Active</span>
<div class="alert color-warning">Caution</div>

<!-- Direct Tailwind equivalent for colors -->
<button class="... bg-primary text-primary-content">Primary</button>
<span class="... bg-success text-success-content">Active</span>
<div class="... bg-warning/10 text-warning border-warning/30">Caution</div>
```

Available: `.color-primary`, `.color-secondary`, `.color-accent`, `.color-neutral`, `.color-info`, `.color-success`, `.color-warning`, `.color-error`

Many components also have direct modifiers: `btn-primary`, `badge-success`, `alert-info`, etc.

---

## HTMX Patterns

### State Management

Components use `data-state` for open/close. HTMX controls this via `hx-on::` events.

```html
<!-- Open modal after loading content -->
<button class="btn btn-primary"
        hx-get="/api/user/1"
        hx-target="#modal-content"
        hx-on::after-swap="document.getElementById('user-modal').dataset.state='open'">
  View User
</button>

<!-- Close on click -->
<button hx-on::click="this.closest('[data-state]').dataset.state='closed'">Close</button>
```

### Loading States

```html
<!-- Button with loading indicator -->
<button class="btn btn-primary"
        hx-post="/api/save"
        hx-target="#result"
        hx-indicator="#save-spinner">
  <span id="save-spinner" class="spinner spinner-sm htmx-indicator"></span>
  Save
</button>

<!-- Skeleton loading -->
<div hx-get="/api/data" hx-trigger="load" hx-indicator="#skeleton">
  <div id="skeleton" class="htmx-indicator">
    <div class="skeleton h-4 w-full mb-2"></div>
    <div class="skeleton h-4 w-3/4"></div>
  </div>
</div>
```

### Form Submission

```html
<form hx-post="/api/users" hx-target="#result" hx-swap="innerHTML">
  <div class="form-group">
    <label class="form-group-label">Email</label>
    <input type="email" name="email" class="input" placeholder="email@example.com">
  </div>
  <div class="form-group">
    <label class="form-group-label">Name</label>
    <input type="text" name="name" class="input">
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

### Inline Editing

```html
<!-- Display mode -->
<div hx-get="/edit/field/1" hx-trigger="click" hx-swap="outerHTML" class="cursor-pointer hover:bg-base-200 px-3 py-2 rounded-field">
  Click to edit: John Doe
</div>

<!-- Edit mode (returned by server) -->
<form hx-put="/save/field/1" hx-swap="outerHTML" class="flex gap-2">
  <input name="value" value="John Doe" class="input input-sm" autofocus>
  <button type="submit" class="btn btn-sm btn-primary">Save</button>
  <button type="button" class="btn btn-sm" hx-get="/display/field/1" hx-swap="outerHTML">Cancel</button>
</form>
```

### Search with Autocomplete

```html
<div class="searchbar">
  <div class="searchbar-container">
    <span class="searchbar-icon">
      <svg class="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
    </span>
    <input class="searchbar-input"
           name="q"
           placeholder="Search..."
           hx-get="/api/search"
           hx-trigger="input changed delay:300ms"
           hx-target="#search-results">
  </div>
</div>
<div id="search-results"></div>
```

### Infinite Scroll

```html
<div id="item-list">
  <!-- Items here -->
  <div hx-get="/api/items?page=2"
       hx-trigger="intersect once"
       hx-swap="afterend"
       class="flex justify-center p-4">
    <span class="spinner"></span>
  </div>
</div>
```

### Confirm Before Action

```html
<button class="btn btn-error btn-sm"
        hx-delete="/api/item/1"
        hx-target="closest tr"
        hx-swap="outerHTML"
        hx-confirm="Are you sure you want to delete this item?">
  Delete
</button>
```

### Toast Notifications via HTMX

```html
<!-- Server returns toast HTML, append to container -->
<button hx-post="/api/save"
        hx-target="#toast-container"
        hx-swap="beforeend">
  Save
</button>

<div id="toast-container" class="toast toast-top toast-end"></div>

<!-- Server response example: -->
<div class="toast-item color-success" style="animation: fadeInDown 0.3s ease"
     _="on load wait 3s then remove me">
  <span class="toast-icon">&#10003;</span>
  <div class="toast-content">
    <div class="toast-title">Saved</div>
    <div class="toast-message">Record updated successfully</div>
  </div>
</div>
```

### Tabs with HTMX

```html
<div class="tabs tabs-border">
  <button class="tab tab-active"
          hx-get="/tab/overview"
          hx-target="#tab-content"
          hx-on::after-request="
            this.parentElement.querySelectorAll('.tab').forEach(t => t.classList.remove('tab-active'));
            this.classList.add('tab-active');
          ">Overview</button>
  <button class="tab"
          hx-get="/tab/details"
          hx-target="#tab-content"
          hx-on::after-request="
            this.parentElement.querySelectorAll('.tab').forEach(t => t.classList.remove('tab-active'));
            this.classList.add('tab-active');
          ">Details</button>
</div>
<div id="tab-content" class="p-4">
  <!-- Tab content loaded here -->
</div>
```

### Table with Sort + Pagination

```html
<div class="datatable">
  <div class="datatable-header">
    <h2 class="datatable-title">Users</h2>
    <input class="datatable-search" placeholder="Search..."
           hx-get="/api/users"
           hx-trigger="input changed delay:300ms"
           hx-target="#users-body"
           name="q">
  </div>
  <div class="datatable-body">
    <table class="datatable-table">
      <thead class="datatable-thead">
        <tr>
          <th class="datatable-th datatable-th-sortable"
              hx-get="/api/users?sort=name"
              hx-target="#users-body">Name</th>
          <th class="datatable-th datatable-th-sortable"
              hx-get="/api/users?sort=email"
              hx-target="#users-body">Email</th>
        </tr>
      </thead>
      <tbody id="users-body" class="datatable-tbody">
        <!-- Rows loaded by HTMX -->
      </tbody>
    </table>
  </div>
  <div id="users-pagination" class="datatable-footer"></div>
</div>
```

---

## Component Reference

### Naming Convention

- **No prefix**: `.btn` not `.ux-button`
- **Children use hyphen**: `.card-body` not `.card__body`
- **Modifiers as separate classes**: `.btn .btn-primary .btn-lg`
- **States**: `.active`, `.disabled`, `[data-state="open"]`, `[open]`

### Universal Modifiers (work across many components)

**Colors**: `-primary`, `-secondary`, `-accent`, `-neutral`, `-info`, `-success`, `-warning`, `-error`
**Styles**: `-outline`, `-soft`, `-ghost`, `-link`, `-flat`, `-filled`
**Sizes**: `-xs`, `-sm`, `-lg`, `-xl`

---

### Actions

#### btn
```html
<!-- Semantic -->
<button class="btn btn-primary">Save</button>
<button class="btn btn-error btn-outline btn-sm">Delete</button>
<button class="btn btn-success btn-soft">Approve</button>
<button class="btn btn-ghost">Cancel</button>
<button class="btn glass">Glass</button>

<!-- Tailwind equivalent -->
<button class="relative inline-flex items-center justify-center gap-1.5 h-11 px-4 font-medium leading-none whitespace-nowrap rounded-field cursor-pointer select-none bg-primary text-primary-content">Save</button>
<button class="relative inline-flex items-center justify-center gap-1.5 h-9 px-3 text-sm font-medium leading-none whitespace-nowrap rounded-field cursor-pointer select-none border border-error text-error bg-transparent">Delete</button>
```
Modifiers: `btn-primary`, `btn-secondary`, `btn-accent`, `btn-neutral`, `btn-info`, `btn-success`, `btn-warning`, `btn-error`, `btn-outline`, `btn-soft`, `btn-ghost`, `btn-link`, `btn-loading`, `btn-disabled`, `btn-block`, `btn-circle`, `btn-square`
Sizes: `btn-xs` (h-7), `btn-sm` (h-9), default (h-11), `btn-lg` (h-13)
Glass: `btn glass`

#### btn-group
```html
<div class="btn-group">
  <button class="btn btn-primary">Left</button>
  <button class="btn btn-primary">Center</button>
  <button class="btn btn-primary">Right</button>
</div>
```

#### icon-btn
```html
<button class="icon-btn"><svg>...</svg></button>
<button class="icon-btn icon-btn-filled color-primary"><svg>...</svg></button>
```
Modifiers: `icon-btn-filled`, `icon-btn-outline`, `icon-btn-soft`
Sizes: `icon-btn-xs`, `icon-btn-sm`, `icon-btn-lg`, `icon-btn-xl`

#### fab
```html
<div class="fab fab-bottom-end">
  <button class="fab-btn color-primary"><svg>...</svg></button>
</div>
```
Positions: `fab-bottom-end`, `fab-bottom-start`, `fab-bottom-center`, `fab-top-end`, `fab-top-start`

#### split-button
```html
<div class="split-button">
  <button class="split-button-main btn btn-primary">Save</button>
  <button class="split-button-toggle btn btn-primary">&#9660;</button>
  <div class="split-button-dropdown">
    <button class="split-button-item">Save as draft</button>
    <button class="split-button-item">Save & close</button>
  </div>
</div>
```

---

### Data Display

#### badge
```html
<!-- Semantic -->
<span class="badge badge-primary">New</span>
<span class="badge badge-outline badge-error">3</span>
<span class="badge badge-soft badge-success">Active</span>

<!-- Tailwind equivalent -->
<span class="inline-flex items-center justify-center gap-1 h-5 px-2 text-xs font-semibold leading-none whitespace-nowrap rounded-full bg-primary text-primary-content">New</span>
<span class="inline-flex items-center justify-center gap-1 h-5 px-2 text-xs font-semibold leading-none whitespace-nowrap rounded-full border border-error text-error bg-transparent">3</span>
```
Modifiers: `badge-outline`, `badge-soft`, `badge-ghost`, `badge-dot`, `badge-pulse`, `badge-bounce`
Sizes: `badge-xs`, `badge-sm`, `badge-lg`, `badge-xl`

#### avatar
```html
<!-- Semantic -->
<div class="avatar avatar-lg">
  <img src="user.jpg" alt="User" class="rounded-full">
</div>

<!-- Tailwind equivalent -->
<div class="relative inline-flex items-center justify-center w-12 h-12 rounded-full font-semibold uppercase overflow-visible shrink-0">
  <img src="user.jpg" alt="User" class="rounded-full w-full h-full object-cover">
</div>
```
Children: `avatar-status`, `avatar-group`
Status: `avatar-status-online`, `avatar-status-offline`, `avatar-status-busy`, `avatar-status-away`
Sizes: `avatar-xs`, `avatar-sm`, `avatar-lg`, `avatar-xl`

#### chip
```html
<!-- Semantic -->
<span class="chip chip-filled color-primary">Vue</span>
<span class="chip chip-outline">React</span>
<span class="chip chip-interactive">Removable <button class="chip-close">&times;</button></span>

<!-- Tailwind equivalent -->
<span class="inline-flex items-center gap-1 h-7 px-3 text-sm font-medium leading-none whitespace-nowrap rounded-full bg-primary text-primary-content">Vue</span>
<span class="inline-flex items-center gap-1 h-7 px-3 text-sm font-medium leading-none whitespace-nowrap rounded-full border border-base-300 text-base-content bg-transparent">React</span>
```
Children: `chip-icon`, `chip-avatar`, `chip-close`, `chip-group`, `chip-group-scroll`

#### card
```html
<!-- Semantic -->
<div class="card">
  <figure><img src="image.jpg" alt=""></figure>
  <div class="card-body">
    <h2 class="card-title">Title</h2>
    <p>Content here</p>
    <div class="card-actions">
      <button class="btn btn-primary btn-sm">Action</button>
    </div>
  </div>
</div>

<!-- Tailwind equivalent -->
<div class="flex flex-col bg-base-100 rounded-box shadow-md overflow-hidden">
  <figure><img src="image.jpg" alt="" class="w-full"></figure>
  <div class="flex flex-col flex-1 p-5 gap-2">
    <h2 class="font-semibold text-lg">Title</h2>
    <p>Content here</p>
    <div class="flex items-center gap-2 mt-auto">
      <button class="btn btn-primary btn-sm">Action</button>
    </div>
  </div>
</div>
```
Children: `card-header`, `card-title`, `card-subtitle`, `card-body`, `card-media`, `card-footer`, `card-actions`
Modifiers: `card-bordered`, `card-flat`, `card-elevated`, `card-side`, `card-clickable`, `card-dash`
Sizes: `card-sm`, `card-lg`
Grid: `card-grid`, `card-grid-sm`
Glass: `card glass`

#### table
```html
<!-- Semantic -->
<div class="table-wrapper table-responsive">
  <table class="table table-striped table-hover">
    <thead><tr><th>Name</th><th>Email</th></tr></thead>
    <tbody><tr><td>John</td><td>john@email.com</td></tr></tbody>
  </table>
</div>

<!-- Tailwind equivalent -->
<div class="w-full overflow-x-auto rounded-box border border-base-300">
  <table class="w-full text-sm">
    <thead>
      <tr class="border-b border-base-300 bg-base-200/50">
        <th class="px-4 py-2.5 text-left font-semibold whitespace-nowrap">Name</th>
        <th class="px-4 py-2.5 text-left font-semibold whitespace-nowrap">Email</th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-b border-base-200 hover:bg-base-200/30">
        <td class="px-4 py-2.5">John</td>
        <td class="px-4 py-2.5">john@email.com</td>
      </tr>
    </tbody>
  </table>
</div>
```
Modifiers: `table-striped`, `table-hover`, `table-bordered`, `table-compact`, `table-relaxed`, `table-fixed`

#### stat
```html
<div class="stats-grid stats-grid-3">
  <div class="stat">
    <div class="stat-label">Revenue</div>
    <div class="stat-value text-primary">$12,450</div>
    <div class="stat-footer"><span class="stat-trend stat-trend-up">+12%</span></div>
  </div>
</div>

<!-- Tailwind equivalent -->
<div class="grid grid-cols-3 gap-4">
  <div class="flex flex-col bg-base-100 rounded-box p-5 border border-base-300">
    <span class="text-sm text-base-content/60">Revenue</span>
    <span class="text-2xl font-bold text-primary mt-1">$12,450</span>
    <span class="text-xs text-success mt-2">+12%</span>
  </div>
</div>
```
Children: `stat-label`, `stat-value`, `stat-footer`, `stat-trend`, `stat-desc`, `stat-icon`
Trends: `stat-trend-up`, `stat-trend-down`, `stat-trend-neutral`
Grid: `stats-grid`, `stats-grid-2`, `stats-grid-3`, `stats-grid-4`

#### timeline
```html
<div class="timeline">
  <div class="timeline-item">
    <div class="timeline-marker"><div class="timeline-marker-dot color-success"></div></div>
    <div class="timeline-content">
      <div class="timeline-title">Order placed</div>
      <div class="timeline-time">2 hours ago</div>
    </div>
  </div>
</div>
```
Modifiers: `timeline-simple`, `timeline-compact`, `timeline-horizontal`, `timeline-alternating`

#### accordion
```html
<!-- Semantic -->
<div class="accordion">
  <div class="accordion-item">
    <button class="accordion-header">
      <span class="accordion-title">Section 1</span>
      <span class="accordion-chevron">&#9660;</span>
    </button>
    <div class="accordion-body"><p>Content</p></div>
  </div>
</div>

<!-- Tailwind equivalent -->
<div class="flex flex-col w-full rounded-2xl overflow-hidden border border-base-300">
  <div class="border-b border-base-300">
    <button class="flex items-center w-full min-h-11 px-4 py-3 bg-transparent border-none cursor-pointer text-left">
      <span class="flex-1 font-medium">Section 1</span>
      <span class="text-xs opacity-50">&#9660;</span>
    </button>
    <div class="px-4 pb-4 text-sm leading-relaxed"><p>Content</p></div>
  </div>
</div>
```
Modifiers: `accordion-inset`, `accordion-outline`, `accordion-flat`, `accordion-arrow`, `accordion-plus`

#### tree
```html
<div class="tree">
  <ul class="tree-list">
    <li class="tree-node">
      <div class="tree-item">
        <button class="tree-toggle">&#9654;</button>
        <span class="tree-icon tree-icon-folder">&#128193;</span>
        <span class="tree-label">Folder</span>
      </div>
      <ul class="tree-list tree-list-nested">
        <li class="tree-node">
          <div class="tree-item">
            <span class="tree-icon tree-icon-file">&#128196;</span>
            <span class="tree-label">File.txt</span>
          </div>
        </li>
      </ul>
    </li>
  </ul>
</div>
```

---

### Navigation

#### tabs
```html
<!-- Semantic -->
<div class="tabs tabs-border">
  <button class="tab tab-active">Tab 1</button>
  <button class="tab">Tab 2</button>
</div>

<!-- Tailwind equivalent -->
<div class="flex flex-wrap items-end gap-0 w-full border-b border-base-300">
  <button class="inline-flex items-center justify-center gap-1.5 h-10 px-4 font-medium leading-none whitespace-nowrap cursor-pointer select-none border-b-2 border-primary text-primary">Tab 1</button>
  <button class="inline-flex items-center justify-center gap-1.5 h-10 px-4 font-medium leading-none whitespace-nowrap cursor-pointer select-none opacity-60 border-b-2 border-transparent">Tab 2</button>
</div>
```
Modifiers: `tabs-border`, `tabs-box`, `tabs-lift`, `tabs-scroll`
Sizes: `tabs-xs`, `tabs-sm`, `tabs-lg`
Active: `.tab-active`
Glass: `tabs glass`

#### menu
```html
<ul class="menu bg-base-200 rounded-box w-56">
  <li class="menu-title">Section</li>
  <li><a class="menu-item active">Home</a></li>
  <li><a class="menu-item">Settings</a></li>
</ul>

<!-- Tailwind equivalent -->
<ul class="min-w-48 rounded-box p-1 bg-base-200">
  <li class="px-3 py-1.5 text-xs font-semibold text-base-content/50 uppercase tracking-wider">Section</li>
  <li><a class="flex items-center gap-2 w-full rounded-field px-3 py-2 text-sm cursor-pointer bg-primary/10 text-primary font-medium">Home</a></li>
  <li><a class="flex items-center gap-2 w-full rounded-field px-3 py-2 text-sm cursor-pointer hover:bg-base-200">Settings</a></li>
</ul>
```
Children: `menu-item`, `menu-icon`, `menu-label`, `menu-shortcut`, `menu-badge`, `menu-divider`

#### breadcrumbs
```html
<div class="breadcrumbs">
  <a href="/">Home</a>
  <a href="/products">Products</a>
  <span>Current</span>
</div>
```
Modifiers: `breadcrumbs-arrow`, `breadcrumbs-dot`

#### pagination
```html
<div class="pagination">
  <button class="pagination-btn pagination-prev">&larr;</button>
  <button class="pagination-btn pagination-active">1</button>
  <button class="pagination-btn">2</button>
  <button class="pagination-btn pagination-next">&rarr;</button>
</div>
```
Sizes: `pagination-sm`, `pagination-lg`

#### segment
```html
<div class="segment">
  <button class="segment-btn segment-btn-selected">Day</button>
  <button class="segment-btn">Week</button>
  <button class="segment-btn">Month</button>
</div>
```
Modifiers: `segment-primary`, `segment-outline`, `segment-rounded`
Sizes: `segment-sm`, `segment-lg`

#### sidebar
```html
<div class="sidebar-wrapper">
  <aside class="sidebar">
    <div class="sidebar-header"><span class="sidebar-logo">Logo</span></div>
    <div class="sidebar-content">
      <div class="sidebar-group">
        <span class="sidebar-group-label">Menu</span>
        <nav class="sidebar-menu">
          <a class="sidebar-menu-button is-active">
            <span class="sidebar-menu-icon">&#127968;</span>
            <span class="sidebar-label">Home</span>
          </a>
        </nav>
      </div>
    </div>
  </aside>
  <main class="sidebar-inset-content">...</main>
</div>

<!-- Tailwind equivalent sidebar link -->
<a class="flex items-center w-full p-2 text-sm font-medium text-base-content bg-transparent rounded-field cursor-pointer hover:bg-base-200/50 no-underline">
  <span class="flex items-center justify-center size-5 mr-3">&#127968;</span>
  <span>Home</span>
</a>
```
Modifiers: `sidebar-right`, `sidebar-floating`, `sidebar-inset`, `sidebar-collapsed`
States: `[data-state="collapsed"]`, `[data-state="expanded"]`

#### stepper
```html
<div class="stepper">
  <div class="stepper-header">
    <div class="stepper-step stepper-step-completed"><div class="stepper-circle">1</div><div class="stepper-label">Info</div></div>
    <div class="stepper-step stepper-step-active"><div class="stepper-circle">2</div><div class="stepper-label">Details</div></div>
    <div class="stepper-step"><div class="stepper-circle">3</div><div class="stepper-label">Confirm</div></div>
  </div>
  <div class="stepper-content">
    <div class="stepper-panel stepper-panel-active">Step 2 content</div>
  </div>
</div>
```
Modifiers: `stepper-vertical`, `stepper-compact`, `stepper-dots`

---

### Forms

#### input
```html
<!-- Semantic -->
<input type="text" class="input" placeholder="Default input">
<input type="text" class="input input-sm" placeholder="Small">
<input type="email" class="input input-error" placeholder="Error state">

<!-- Tailwind equivalent -->
<input type="text" class="w-full h-11 px-3 text-base bg-base-100 border border-base-300 rounded-field outline-none transition-colors focus:border-primary" placeholder="Default input">
<input type="text" class="w-full h-9 px-3 text-sm bg-base-100 border border-base-300 rounded-field outline-none focus:border-primary" placeholder="Small">
<input type="email" class="w-full h-11 px-3 text-base bg-base-100 border border-error rounded-field outline-none text-error" placeholder="Error state">
```
Modifiers: `input-filled`, `input-ghost`, `input-underline`, `input-error`, `input-success`
Sizes: `input-sm`, `input-lg`
Glass: `input glass`
Wrappers: `input-group`, `input-floating`, `input-label`, `input-helper`

#### textarea
```html
<textarea class="textarea" placeholder="Write here..."></textarea>

<!-- Tailwind equivalent -->
<textarea class="w-full min-h-20 px-3 py-2.5 text-base bg-base-100 border border-base-300 rounded-field outline-none resize-y focus:border-primary" placeholder="Write here..."></textarea>
```
Modifiers: `textarea-filled`, `textarea-ghost`, `textarea-error`, `textarea-success`

#### select
```html
<select class="select">
  <option>Option 1</option>
  <option>Option 2</option>
</select>

<!-- Tailwind equivalent -->
<select class="w-full h-11 px-3 text-base bg-base-100 border border-base-300 rounded-field outline-none cursor-pointer appearance-none focus:border-primary">
  <option>Option 1</option>
</select>
```
Modifiers: `select-filled`, `select-ghost`, `select-error`, `select-success`

#### checkbox
```html
<label class="checkbox">
  <input type="checkbox" class="checkbox-input">
  <span class="checkbox-box"><span class="checkbox-mark"></span></span>
  <span class="checkbox-label">Accept terms</span>
</label>
```
Modifiers: `checkbox-round`
Sizes: `checkbox-sm`, `checkbox-lg`
Group: `checkbox-group`, `checkbox-group-horizontal`

#### radio
```html
<label class="radio">
  <input type="radio" name="opt" class="radio-input">
  <span class="radio-circle"><span class="radio-dot"></span></span>
  <span class="radio-label">Option A</span>
</label>
```
Cards: `radio-card`, `radio-card-selected`, `radio-card-group`

#### toggle
```html
<label class="toggle">
  <input type="checkbox" class="toggle-input">
  <span class="toggle-track"><span class="toggle-thumb"></span></span>
  <span class="toggle-label">Dark mode</span>
</label>
```
Sizes: `toggle-sm`, `toggle-lg`

#### range
```html
<input type="range" class="range" min="0" max="100" value="50">
```
Sizes: `range-sm`, `range-lg`

#### searchbar
```html
<div class="searchbar">
  <div class="searchbar-container">
    <span class="searchbar-icon">&#128269;</span>
    <input type="text" class="searchbar-input" placeholder="Search...">
    <button class="searchbar-clear">&times;</button>
  </div>
</div>

<!-- Tailwind equivalent -->
<div class="relative flex items-center w-full p-2">
  <div class="flex items-center gap-2 w-full bg-base-200/50 rounded-field px-3 h-10">
    <span class="size-5 shrink-0 text-base-content/40">&#128269;</span>
    <input type="text" class="flex-1 w-full text-base bg-transparent border-none outline-none" placeholder="Search...">
    <button class="size-5 shrink-0 cursor-pointer text-base-content/40">&times;</button>
  </div>
</div>
```
Modifiers: `searchbar-rounded`, `searchbar-outline`, `searchbar-filled`
Sizes: `searchbar-sm`, `searchbar-lg`

#### rating
```html
<div class="rating">
  <div class="rating-stars">
    <button class="rating-star rating-star-filled">&#9733;</button>
    <button class="rating-star rating-star-filled">&#9733;</button>
    <button class="rating-star rating-star-filled">&#9733;</button>
    <button class="rating-star">&#9733;</button>
    <button class="rating-star">&#9733;</button>
  </div>
</div>
```
Modifiers: `rating-readonly`
Sizes: `rating-sm`, `rating-lg`, `rating-xl`

#### upload
```html
<div class="upload">
  <div class="upload-dropzone">
    <input type="file" class="upload-input">
    <div class="upload-icon">&#128228;</div>
    <div class="upload-text">Drag & drop files here</div>
    <div class="upload-hint">or <span class="upload-browse">browse</span></div>
  </div>
</div>
```
Modifiers: `upload-compact`, `upload-button`, `upload-avatar`

#### tag-input
```html
<div class="tag-input">
  <div class="tag-input-wrapper">
    <span class="tag">Vue <button class="tag-remove">&times;</button></span>
    <input class="tag-input-field" placeholder="Add tag...">
  </div>
</div>
```

#### autocomplete
```html
<div class="autocomplete">
  <input class="autocomplete-input" placeholder="Search...">
  <div class="autocomplete-dropdown autocomplete-dropdown-open">
    <div class="autocomplete-list">
      <div class="autocomplete-item autocomplete-item-active">Option 1</div>
    </div>
  </div>
</div>
```

#### otp-input
```html
<div class="otp">
  <input class="otp-field" maxlength="1">
  <input class="otp-field" maxlength="1">
  <span class="otp-separator">-</span>
  <input class="otp-field" maxlength="1">
  <input class="otp-field" maxlength="1">
</div>
```
Modifiers: `otp-underline`, `otp-rounded`, `otp-error`, `otp-success`

#### quantity-stepper
```html
<div class="quantity-stepper">
  <button class="quantity-stepper-btn quantity-stepper-btn-minus">&minus;</button>
  <input class="quantity-stepper-input" value="1">
  <button class="quantity-stepper-btn quantity-stepper-btn-plus">+</button>
</div>
```
Modifiers: `quantity-stepper-vertical`, `quantity-stepper-round`, `quantity-stepper-compact`

#### form-group
```html
<!-- Semantic -->
<div class="form-group">
  <label class="form-group-label">Email <span class="form-group-label-required">*</span></label>
  <input type="email" class="input" placeholder="email@example.com">
  <span class="form-group-helper">We'll never share your email</span>
</div>

<!-- Tailwind equivalent -->
<div class="flex flex-col gap-1 mb-4">
  <label class="text-sm font-medium leading-snug flex items-center gap-1">Email <span class="text-error">*</span></label>
  <input type="email" class="input" placeholder="email@example.com">
  <span class="text-xs text-base-content/50">We'll never share your email</span>
</div>
```
Modifiers: `form-group-horizontal`, `form-group-has-error`, `form-group-has-success`
Layout: `form-section`, `form-row`, `form-actions`, `form-actions-sticky`

#### form-wizard
```html
<div class="form-wizard">
  <div class="form-wizard-steps">
    <div class="form-wizard-step form-wizard-step-completed">...</div>
    <div class="form-wizard-step form-wizard-step-active">...</div>
    <div class="form-wizard-step">...</div>
  </div>
  <div class="form-wizard-content">
    <div class="form-wizard-panel form-wizard-panel-active">Step content</div>
  </div>
</div>
```

---

### Overlays

#### modal
```html
<!-- Semantic -->
<div class="modal-backdrop" data-state="open">
  <div class="modal">
    <div class="modal-header">
      <h2 class="modal-title">Title</h2>
      <button class="modal-close">&times;</button>
    </div>
    <div class="modal-body">Content</div>
    <div class="modal-footer">
      <button class="btn">Cancel</button>
      <button class="btn btn-primary">Save</button>
    </div>
  </div>
</div>

<!-- Tailwind equivalent -->
<div class="fixed inset-0 flex items-center justify-center z-400 bg-black/50" data-state="open">
  <div class="relative flex flex-col w-full max-w-lg bg-base-100 rounded-box shadow-xl overflow-hidden">
    <div class="flex items-center justify-between shrink-0 px-5 py-4 border-b border-base-300">
      <h2 class="m-0 text-lg font-semibold text-base-content">Title</h2>
      <button class="inline-flex items-center justify-center size-8 rounded-lg cursor-pointer border-none bg-transparent hover:bg-base-200">&times;</button>
    </div>
    <div class="flex-1 overflow-y-auto px-5 py-4">Content</div>
    <div class="flex items-center justify-end gap-2 shrink-0 px-5 py-4 border-t border-base-300">
      <button class="btn">Cancel</button>
      <button class="btn btn-primary">Save</button>
    </div>
  </div>
</div>
```
Sizes: `modal-sm`, `modal-lg`, `modal-xl`, `modal-fullscreen`
State: `data-state="open"` / `data-state="closed"` on `.modal-backdrop`
Glass: `modal glass`

**HTMX pattern:**
```html
<button class="btn btn-primary"
        hx-get="/modal/edit/1"
        hx-target="#modal-content"
        hx-on::after-swap="document.getElementById('edit-modal').dataset.state='open'">
  Edit
</button>

<div id="edit-modal" class="modal-backdrop" data-state="closed">
  <div class="modal">
    <div class="modal-header">
      <h2 class="modal-title">Edit</h2>
      <button class="modal-close" hx-on::click="this.closest('[data-state]').dataset.state='closed'">&times;</button>
    </div>
    <div id="modal-content" class="modal-body"><!-- HTMX loads content here --></div>
    <div class="modal-footer">
      <button class="btn" hx-on::click="this.closest('[data-state]').dataset.state='closed'">Cancel</button>
      <button class="btn btn-primary"
              hx-post="/api/save/1"
              hx-target="#modal-content"
              hx-on::after-request="if(event.detail.successful) this.closest('[data-state]').dataset.state='closed'">
        Save
      </button>
    </div>
  </div>
</div>
```

**Confirm dialog pattern** (use `modal-sm` with centered icon):
```html
<!-- Alpine.js — place modal OUTSIDE any overflow:hidden parent (e.g. card) -->
<div x-data="{ confirm: false }">
  <button class="btn color-error" @click="confirm = true">Delete</button>

  <div class="modal-backdrop" :data-state="confirm ? 'open' : 'closed'">
    <div class="modal modal-sm">
      <div class="modal-body text-center py-8">
        <div class="inline-flex items-center justify-center size-14 rounded-full bg-error/10 text-error mb-4">
          <!-- icon -->
        </div>
        <h3 class="text-lg font-semibold mb-2">Delete Item?</h3>
        <p class="text-sm text-base-content/60">This action cannot be undone.</p>
      </div>
      <div class="modal-footer">
        <button class="btn btn-ghost flex-1" @click="confirm = false">Cancel</button>
        <button class="btn color-error flex-1" @click="confirm = false; performDelete()">Delete</button>
      </div>
    </div>
  </div>
</div>
```
> **Important:** The `modal-backdrop` must NOT be inside a container with `overflow: hidden` (like `.card`). Place it as a sibling, not a child.

#### sheet (bottom sheet)
```html
<div class="sheet-backdrop" data-state="open">
  <div class="sheet">
    <div class="sheet-handle"><div class="sheet-handle-bar"></div></div>
    <div class="sheet-header"><h3 class="sheet-title">Title</h3></div>
    <div class="sheet-content">Content</div>
  </div>
</div>
```
Sizes: `sheet-sm`, `sheet-md`, `sheet-lg`, `sheet-full`
Also: `side-sheet`, `action-sheet`
State: `data-state="open"` / `data-state="closed"`

#### drawer
```html
<div class="drawer drawer-start drawer-open">
  <div class="drawer-title">Menu</div>
  <nav>...</nav>
</div>
<div class="drawer-backdrop drawer-backdrop-open"></div>
```
Positions: `drawer-start`, `drawer-end`, `drawer-top`, `drawer-bottom`
Sizes: `drawer-sm`, `drawer-lg`, `drawer-xl`

#### dropdown
```html
<!-- Semantic -->
<div class="dropdown">
  <button class="dropdown-trigger btn">Options &#9660;</button>
  <div class="dropdown-menu">
    <button class="dropdown-item">Edit</button>
    <button class="dropdown-item">Duplicate</button>
    <div class="dropdown-divider"></div>
    <button class="dropdown-item dropdown-item-danger">Delete</button>
  </div>
</div>

<!-- Tailwind equivalent menu -->
<div class="relative inline-block">
  <button class="btn">Options &#9660;</button>
  <div class="absolute top-full mt-1 min-w-48 bg-base-100 border border-base-300 rounded-box shadow-lg p-1 overflow-y-auto z-50">
    <button class="flex items-center gap-2 w-full rounded-field px-3 py-2 text-sm text-left border-none bg-transparent cursor-pointer hover:bg-base-200">Edit</button>
    <button class="flex items-center gap-2 w-full rounded-field px-3 py-2 text-sm text-left border-none bg-transparent cursor-pointer hover:bg-base-200">Duplicate</button>
    <div class="h-px bg-base-300 my-1"></div>
    <button class="flex items-center gap-2 w-full rounded-field px-3 py-2 text-sm text-left border-none bg-transparent cursor-pointer text-error hover:bg-error/10">Delete</button>
  </div>
</div>
```
Positions: `dropdown-menu-top`, `dropdown-menu-right`, `dropdown-menu-left`

**HTMX dropdown pattern:**
```html
<div class="dropdown" hx-on::click.outside="this.querySelector('.dropdown-menu').classList.remove('dropdown-menu-open')">
  <button class="dropdown-trigger btn"
          hx-on::click="this.nextElementSibling.classList.toggle('dropdown-menu-open')">
    Actions &#9660;
  </button>
  <div class="dropdown-menu">
    <button class="dropdown-item" hx-post="/api/duplicate/1" hx-target="#list">Duplicate</button>
    <button class="dropdown-item dropdown-item-danger" hx-delete="/api/item/1" hx-target="closest tr" hx-confirm="Delete?">Delete</button>
  </div>
</div>
```

#### popover
```html
<div class="popover popover-open popover-bottom">
  <div class="popover-content">Popover content</div>
  <div class="popover-arrow"></div>
</div>
```
Positions: `popover-top`, `popover-bottom`, `popover-left`, `popover-right`
Sizes: `popover-sm`, `popover-lg`

#### tooltip
```html
<div class="tooltip tooltip-top" data-tip="Tooltip text">
  <button class="btn">Hover me</button>
</div>
```
Positions: `tooltip-top`, `tooltip-bottom`, `tooltip-left`, `tooltip-right`
Colors: `tooltip-primary`, `tooltip-info`, `tooltip-success`, `tooltip-warning`, `tooltip-error`

#### command (command palette)
```html
<div class="command-backdrop command-backdrop-open">
  <div class="command command-open">
    <div class="command-search">
      <span class="command-search-icon">&#128269;</span>
      <input class="command-input" placeholder="Type a command...">
    </div>
    <div class="command-results">
      <div class="command-group">
        <div class="command-group-title">Actions</div>
        <div class="command-item command-item-active">
          <span class="command-item-icon">&#128221;</span>
          <span class="command-item-title">New document</span>
          <span class="command-item-shortcut">&#8984;N</span>
        </div>
      </div>
    </div>
  </div>
</div>
```

---

### Feedback

#### alert
```html
<!-- Semantic -->
<div class="alert color-info">
  <span class="alert-icon">&#8505;</span>
  <div class="alert-content">
    <div class="alert-title">Info</div>
    <div class="alert-description">This is informational.</div>
  </div>
</div>

<!-- Tailwind equivalent -->
<div class="flex items-start gap-3 w-full rounded-box p-4 text-sm bg-info/10 text-info border border-info/20">
  <span class="size-5 shrink-0 mt-0.5">&#8505;</span>
  <div class="flex-1 min-w-0">
    <div class="font-semibold mb-0.5">Info</div>
    <div>This is informational.</div>
  </div>
</div>
```
Styles: `alert-soft`, `alert-outline`, `alert-filled`, `alert-compact`

#### toast
```html
<div class="toast toast-top toast-end">
  <div class="toast-item color-success">
    <span class="toast-icon">&#10003;</span>
    <div class="toast-content">
      <div class="toast-title">Success</div>
      <div class="toast-message">Record saved</div>
    </div>
    <button class="toast-close">&times;</button>
  </div>
</div>
```
Positions: `toast-top`/`toast-bottom` + `toast-start`/`toast-center`/`toast-end`

#### snackbar
```html
<div class="snackbar-container">
  <div class="snackbar snackbar-visible snackbar-success">
    <div class="snackbar-content">
      <span class="snackbar-message">Item saved</span>
      <button class="snackbar-action">Undo</button>
    </div>
  </div>
</div>
```

#### banner
```html
<div class="banner banner-info">
  <span class="banner-icon">&#8505;</span>
  <div class="banner-content">
    <div class="banner-title">Update available</div>
    <div class="banner-message">A new version is ready.</div>
  </div>
  <button class="banner-close">&times;</button>
</div>
```
Colors: `banner-info`, `banner-success`, `banner-warning`, `banner-error`
Modifiers: `banner-sticky`, `banner-fixed`, `banner-inline`

#### callout
```html
<div class="callout callout-warning">
  <span class="callout-icon">&#9888;</span>
  <div class="callout-content">
    <div class="callout-title">Warning</div>
    <div class="callout-text">This action cannot be undone.</div>
  </div>
</div>
```
Colors: `callout-info`, `callout-success`, `callout-warning`, `callout-error`, `callout-neutral`

#### progress
```html
<!-- Semantic -->
<div class="progress color-primary">
  <div class="progress-bar" style="width: 60%"></div>
</div>

<!-- Tailwind equivalent -->
<div class="w-full h-2 bg-base-300 rounded-full overflow-hidden">
  <div class="h-full bg-primary rounded-full" style="width: 60%"></div>
</div>
```
Modifiers: `progress-indeterminate`, `progress-striped`, `progress-animated`
Sizes: `progress-xs`, `progress-sm`, `progress-lg`, `progress-xl`

#### progress-circle
```html
<div class="progress-circle">
  <svg class="progress-circle-svg">
    <circle class="progress-circle-bg"></circle>
    <circle class="progress-circle-fill" style="--progress: 75"></circle>
  </svg>
  <div class="progress-circle-content">
    <span class="progress-circle-value">75%</span>
  </div>
</div>
```

#### gauge
```html
<div class="gauge">
  <svg class="gauge-svg">
    <path class="gauge-track"></path>
    <path class="gauge-fill" style="--gauge-value: 72"></path>
  </svg>
  <div class="gauge-value-container">
    <span class="gauge-value">72</span>
    <span class="gauge-unit">%</span>
  </div>
</div>
```

#### loading / skeleton / spinner
```html
<!-- Semantic -->
<span class="loading loading-dots"></span>
<div class="skeleton skeleton-text w-full"></div>
<div class="spinner spinner-lg"></div>

<!-- Tailwind equivalent skeleton -->
<div class="relative block w-full h-4 bg-base-300 rounded-field overflow-hidden animate-pulse"></div>
```

---

### Layout

#### structure
```html
<div class="app">
  <div class="page">
    <header class="header">...</header>
    <main class="content">...</main>
    <footer class="footer">...</footer>
  </div>
</div>
```

#### split-pane
```html
<div class="split-pane">
  <aside class="split-pane-side">Sidebar</aside>
  <main class="split-pane-main">Content</main>
</div>
```

#### master-detail
```html
<div class="master-detail">
  <div class="master-detail-master">
    <div class="master-detail-master-header">List</div>
    <div class="master-detail-master-content">...</div>
  </div>
  <div class="master-detail-detail">
    <div class="master-detail-detail-header">Detail</div>
    <div class="master-detail-detail-content">...</div>
  </div>
</div>
```

**HTMX master-detail pattern:**
```html
<div class="master-detail">
  <div class="master-detail-master">
    <div class="master-detail-master-content">
      <div class="list">
        <a class="list-item" hx-get="/api/user/1" hx-target="#detail-content">User 1</a>
        <a class="list-item" hx-get="/api/user/2" hx-target="#detail-content">User 2</a>
      </div>
    </div>
  </div>
  <div class="master-detail-detail">
    <div id="detail-content" class="master-detail-detail-content">
      Select an item
    </div>
  </div>
</div>
```

#### dashboard-grid
```html
<div class="dashboard-grid dashboard-grid-cols-4">
  <div class="dashboard-grid-item dashboard-grid-item-sm">Widget 1</div>
  <div class="dashboard-grid-item dashboard-grid-item-md">Widget 2</div>
  <div class="dashboard-grid-item dashboard-grid-item-lg">Widget 3</div>
</div>
```
Columns: `dashboard-grid-cols-2`, `dashboard-grid-cols-3`, `dashboard-grid-cols-4`, `dashboard-grid-cols-6`
Sizes: `dashboard-grid-item-sm` (1 col), `dashboard-grid-item-md` (2 col), `dashboard-grid-item-lg` (3 col), `dashboard-grid-item-full`, `dashboard-grid-item-tall` (2 rows)

#### grid (CSS grid utilities)
```html
<!-- Works like Tailwind grid -->
<div class="grid grid-cols-3 gap-4">
  <div class="col-span-2">Wide</div>
  <div>Normal</div>
</div>
```
Responsive: `sm:grid-cols-2`, `md:grid-cols-3`, `lg:grid-cols-4`, `xl:grid-cols-6`

#### masonry
```html
<div class="masonry masonry-cols-3 masonry-gap-md">
  <div class="masonry-item">...</div>
</div>
```

---

### Data Components

#### datatable
```html
<div class="datatable">
  <div class="datatable-header">
    <h2 class="datatable-title">Users</h2>
    <div class="datatable-toolbar">
      <input class="datatable-search" placeholder="Search..."
             hx-get="/api/users" hx-trigger="input changed delay:300ms" hx-target="#tbody" name="q">
    </div>
  </div>
  <div class="datatable-body">
    <table class="datatable-table">
      <thead class="datatable-thead">
        <tr><th class="datatable-th datatable-th-sortable">Name</th></tr>
      </thead>
      <tbody id="tbody" class="datatable-tbody">
        <tr class="datatable-tr"><td class="datatable-td">John</td></tr>
      </tbody>
    </table>
  </div>
  <div class="datatable-footer">
    <div class="datatable-info">Showing 1-10 of 50</div>
  </div>
</div>
```
Modifiers: `datatable-striped`, `datatable-bordered`, `datatable-compact`

#### kanban
```html
<div class="kanban">
  <div class="kanban-column">
    <div class="kanban-column-header">
      <h3 class="kanban-column-title">To Do</h3>
      <span class="kanban-column-count">3</span>
    </div>
    <div class="kanban-column-body">
      <div class="kanban-card">
        <div class="kanban-card-title">Task name</div>
        <div class="kanban-card-labels">
          <span class="kanban-card-label kanban-card-label-primary">Feature</span>
        </div>
      </div>
    </div>
  </div>
</div>
```

#### calendar
```html
<div class="calendar">
  <div class="calendar-header">
    <button class="calendar-nav calendar-nav-btn">&larr;</button>
    <span class="calendar-title">February 2026</span>
    <button class="calendar-nav calendar-nav-btn">&rarr;</button>
  </div>
  <div class="calendar-weekdays"><span class="calendar-weekday">Mo</span>...</div>
  <div class="calendar-days">
    <button class="calendar-day calendar-day-today">7</button>
    <button class="calendar-day calendar-day-selected">14</button>
  </div>
</div>
```

#### json-viewer, code-block, diff-viewer, kpi-card
All follow the `base-class` + `base-class-child` pattern. See source docs for details.

---

### Multimedia

#### carousel
```html
<div class="carousel carousel-show-3 carousel-gap-md">
  <div class="carousel-viewport">
    <div class="carousel-track">
      <div class="carousel-slide">Slide 1</div>
      <div class="carousel-slide">Slide 2</div>
    </div>
  </div>
  <button class="carousel-nav carousel-nav-prev">&larr;</button>
  <button class="carousel-nav carousel-nav-next">&rarr;</button>
  <div class="carousel-pagination">
    <button class="carousel-dot carousel-dot-active"></button>
    <button class="carousel-dot"></button>
  </div>
</div>
```
Slides: `carousel-show-1` through `carousel-show-6`
Gap: `carousel-gap-xs`, `carousel-gap-sm`, `carousel-gap-md`, `carousel-gap-lg`

#### img
```html
<div class="img img-rounded">
  <img class="img-element" src="photo.jpg" alt="">
</div>
```
Shapes: `img-rounded`, `img-circle`
Fit: `img-contain`, `img-cover`, `img-fill`
Aspect: `img-square`, `img-video`, `img-portrait`, `img-landscape`

---

### POS / Retail

#### numpad
```html
<div class="numpad">
  <div class="numpad-display"><span class="numpad-display-value">0.00</span></div>
  <div class="numpad-grid">
    <button class="numpad-key">1</button>
    <button class="numpad-key">2</button>
    <!-- ... -->
    <button class="numpad-key numpad-key-action">C</button>
    <button class="numpad-key">0</button>
    <button class="numpad-key numpad-key-primary">OK</button>
  </div>
</div>
```

#### pinpad
```html
<div class="pinpad">
  <p class="pinpad-label">Enter your PIN</p>
  <div class="pinpad-dots">
    <div class="pinpad-dot pinpad-dot-filled"></div>
    <div class="pinpad-dot pinpad-dot-filled"></div>
    <div class="pinpad-dot"></div>
    <div class="pinpad-dot"></div>
  </div>
  <div class="pinpad-grid">
    <button class="pinpad-key">1</button>
    <button class="pinpad-key">2</button>
    <button class="pinpad-key">3</button>
    <!-- ... 4-9 -->
    <button class="pinpad-key pinpad-key-hidden"></button>
    <button class="pinpad-key">0</button>
    <button class="pinpad-key">⌫</button>
  </div>
</div>
```

Fullscreen: `pinpad-screen` with `data-state="open|closed"`
Avatar: `.pinpad-avatar` (with img or svg)
Title: `.pinpad-title`, `.pinpad-label`
States: `.pinpad-dot-filled`, `.pinpad-dot-error`, `.pinpad-dot-success`
Feedback: `.pinpad-error`, `.pinpad-success`, `.pinpad-loading`, `.pinpad-hint`
Sizes: `pinpad-sm`, `pinpad-lg`
Dark: `.pinpad-screen-dark` (for gradient backgrounds)

#### product-card
```html
<div class="product-grid product-grid-3">
  <div class="product-card">
    <div class="product-card-image-wrapper">
      <img class="product-card-image" src="product.jpg" alt="">
      <div class="product-card-badges">
        <span class="product-card-badge product-card-badge-sale">-20%</span>
      </div>
    </div>
    <div class="product-card-content">
      <h3 class="product-card-name">Caf&eacute; Latte</h3>
      <div class="product-card-price-wrapper">
        <span class="product-card-price">$3.50</span>
      </div>
    </div>
  </div>
</div>
```

**HTMX add-to-cart pattern:**
```html
<div class="product-card"
     hx-post="/api/cart/add"
     hx-vals='{"product_id": 1}'
     hx-target="#cart-count"
     hx-swap="innerHTML"
     hx-on::click="this.classList.add('product-card-selected'); setTimeout(() => this.classList.remove('product-card-selected'), 300)">
  <div class="product-card-content">
    <h3 class="product-card-name">Caf&eacute; Latte</h3>
    <span class="product-card-price">$3.50</span>
  </div>
</div>
```

#### cart, order-ticket, payment, receipt
See semantic class reference above. All follow the `base-class-child` pattern.

---

### HR / Employees

#### employee-card
```html
<div class="employee-grid employee-grid-3">
  <div class="employee-card">
    <div class="employee-card-avatar">JD</div>
    <div class="employee-card-status employee-card-status-available"></div>
    <div class="employee-card-info">
      <div class="employee-card-name">Juan Delgado</div>
      <div class="employee-card-title">UX Designer</div>
      <div class="employee-card-department">Design</div>
    </div>
  </div>
</div>
```

Also available: `time-clock`, `shift-calendar`, `attendance-list`, `leave-request`, `org-chart`, `performance-meter`

---

### Manufacturing

#### machine-status
```html
<div class="machine-grid machine-grid-3">
  <div class="machine-status">
    <div class="machine-status-header">
      <div class="machine-status-name">CNC Mill #3</div>
      <div class="machine-status-indicator machine-status-indicator-running">
        <span class="machine-status-indicator-dot"></span> Running
      </div>
    </div>
    <div class="machine-status-metrics">
      <div class="machine-status-metric">
        <span class="machine-status-metric-value">1200</span>
        <span class="machine-status-metric-unit">RPM</span>
      </div>
    </div>
  </div>
</div>
```
States: `-running`, `-idle`, `-maintenance`, `-offline`, `-error`

Also available: `work-order`, `production-line`, `quality-check`, `batch-tracker`, `bom-tree`, `gantt`

---

## State Management

```html
<!-- data-state (recommended for overlays) -->
<div class="modal-backdrop" data-state="open">

<!-- HTML native -->
<dialog class="modal" open>
<details class="accordion-item" open>

<!-- CSS class -->
<a class="menu-item active">
<button class="tab tab-active">
<div class="dropdown dropdown-open">
```

| State | Attribute | Class |
|-------|-----------|-------|
| Open | `data-state="open"` | `.is-open`, `[open]` |
| Active | `data-state="active"` | `.active`, `.is-active` |
| Selected | `aria-selected="true"` | `.is-selected` |
| Disabled | `aria-disabled="true"` | `.disabled`, `.is-disabled` |
| Loading | `data-state="loading"` | `.is-loading` |

---

## Responsive

- Mobile breakpoint: **767px**
- Modals become bottom sheets on mobile
- Touch targets: minimum 44px
- Safe areas: `safe-top`, `safe-bottom`, `safe-x` utilities
- Grid prefixes: `sm:` (640px), `md:` (768px), `lg:` (1024px), `xl:` (1280px)

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  <div>...</div>
</div>
```

---

## Complete Component List (152 components)

**Basic**: btn, btn-group, badge, avatar, chip, loading, skeleton, divider, fab, spinner, icon-btn, back-button, menu-button, split-button

**Forms**: input, textarea, select, checkbox, radio, toggle, range, searchbar, upload, tag-input, autocomplete, otp-input, picker, color-picker, datetime, date-range-picker, currency-input, phone-input, signature-pad, rich-text, quantity-stepper, rating, form (form-group), form-wizard

**Navigation**: tabs, tabbar, menu, breadcrumbs, pagination, segment, stepper, sidebar, mega-menu, menubar

**Layout**: card, list, table, accordion, tree, panel, section, master-detail, grid, split-pane, masonry, dashboard-grid, shell, structure, app, page, drawer

**Overlays**: modal, sheet, dropdown, popover, tooltip, context-menu, hover-card, command, notifications, lightbox

**Feedback**: alert, toast, snackbar, banner, callout, progress, progress-circle, progress-steps, gauge

**Data**: datatable, code-block, json-viewer, diff-viewer, pdf-viewer, kpi-card, sparkline, qr-code, bar-chart, chart, calendar, calendar-views, scheduler, kanban, event-card, virtual-list, loyalty-card

**Multimedia**: img, image-gallery, image-crop, image-zoom, carousel, audio-player, video-player, barcode-scanner

**Interaction**: toggle-group, filter-chip, scroll-area, infinite-scroll, load-more, swipe, reorder

**POS**: numpad, pinpad, calculator, product-card, cart, order-ticket, payment, receipt, stock-indicator, quantity-badge, variant-selector, virtual-keyboard, kds-order, category-tabs, keyboard, onscreen-keyboard

**HR**: employee-card, time-clock, shift-calendar, attendance-list, leave-request, org-chart, performance-meter

**Manufacturing**: work-order, machine-status, production-line, quality-check, batch-tracker, bom-tree, gantt

**System**: system-monitor, pwa, refresher, status-badge, status-indicator

**Colors**: color-primary, color-secondary, color-accent, color-neutral, color-info, color-success, color-warning, color-error
