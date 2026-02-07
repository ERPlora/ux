# UX Component Library — AI Context Reference

> **For AI systems** (Claude, Codex, Copilot, Cursor) to generate correct HTML/CSS.
> **For developers** using the library via CDN in Django, HTMX, React, Vue, or vanilla JS projects.

---

## Quick Start

```html
<!-- ONE link. Zero JS. Zero Node. Zero build step. -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/ERPlora/ux@3/dist/ux-full.min.css">
```

Three CSS files are available:

| File | What it includes | When to use |
|------|-----------------|-------------|
| `ux.min.css` | Semantic classes + tokens | `<button class="btn btn-primary">` |
| `tw.min.css` | Tailwind utilities + tokens | `<button class="inline-flex items-center h-11 px-4 bg-primary text-primary-content rounded-lg font-semibold">` |
| `ux-full.min.css` | **Both combined** | Mix semantic + Tailwind freely (recommended for Django/HTMX) |

**Recommended for Django**: Use `ux-full.min.css` — you get all semantic component classes AND all Tailwind utility classes pre-compiled. No Node, no build step, no Tailwind CLI needed.

```html
<!-- Django template example -->
{% load static %}
<link rel="stylesheet" href="{% static 'css/ux-full.min.css' %}">

<!-- Now use semantic classes... -->
<button class="btn btn-primary">Save</button>

<!-- ...or Tailwind utilities... -->
<div class="flex gap-4 p-6 bg-base-200 rounded-box">

<!-- ...or mix both freely -->
<div class="card mt-4">
  <div class="card-body">
    <h2 class="card-title text-primary">Title</h2>
  </div>
</div>
```

---

## Design Tokens

All colors use OKLCH. Tokens are CSS custom properties available globally.

### Colors

| Token | Purpose | Light | Dark |
|-------|---------|-------|------|
| `--color-base-100` | Page background | white | dark gray |
| `--color-base-200` | Subtle background | light gray | slightly lighter |
| `--color-base-300` | Borders, dividers | medium gray | medium gray |
| `--color-base-content` | Default text | near-black | near-white |
| `--color-primary` | Brand / accent | blue | brighter blue |
| `--color-primary-content` | Text on primary | white | dark |
| `--color-secondary` | Secondary actions | purple | brighter purple |
| `--color-accent` | Highlight | green | brighter green |
| `--color-neutral` | Neutral dark | dark gray | medium gray |
| `--color-info` | Informational | blue | brighter blue |
| `--color-success` | Positive | green | brighter green |
| `--color-warning` | Caution | amber | brighter amber |
| `--color-error` | Destructive | red | brighter red |

Each semantic color has a `-content` variant for text contrast (e.g. `--color-success-content`).

### Sizing & Shape

| Token | Value | Purpose |
|-------|-------|---------|
| `--radius-field` | `0.5rem` | Input/button border-radius |
| `--radius-box` | `1rem` | Card/modal border-radius |
| `--border` | `1px` | Default border width |
| `--size-field` | `0.25rem` | Base unit for field heights |

### Glass Morphism

| Token | Value |
|-------|-------|
| `--color-glass-bg` | `rgba(255,255,255,0.45)` |
| `--color-glass-border` | `rgba(255,255,255,0.18)` |
| `--blur-glass` | `20px` |
| `--shadow-glass` | `0 8px 32px rgba(0,0,0,0.08)` |

### Animation Easings

| Token | Value |
|-------|-------|
| `--ease-ios` | `cubic-bezier(0.32, 0.72, 0, 1)` |
| `--ease-spring` | `cubic-bezier(0.28, 0.84, 0.42, 1)` |

---

## Themes

Switch themes with `data-theme` on `<html>`:

```html
<html data-theme="dark">    <!-- Dark mode -->
<html data-theme="erplora"> <!-- ERPlora brand -->
<html data-theme="ocean">   <!-- Ocean blue tint -->
<html>                       <!-- Light (default), auto-dark via prefers-color-scheme -->
```

---

## Color System

### Universal Color Composition

Eight color classes that work on any component:

```html
<button class="btn color-primary">Primary button</button>
<span class="badge color-success">Active</span>
<div class="alert color-warning">Caution</div>
```

Available: `.color-primary`, `.color-secondary`, `.color-accent`, `.color-neutral`, `.color-info`, `.color-success`, `.color-warning`, `.color-error`

These set `--c`, `--c-fg`, `--c-border` CSS variables that components consume.

### Direct Color Modifiers

Many components also have direct color modifiers:

```html
<button class="btn btn-primary">Uses btn-primary</button>
<span class="badge badge-success">Uses badge-success</span>
```

Both approaches work. Direct modifiers (e.g. `btn-primary`) are component-specific and override internal CSS custom properties.

---

## Glass Morphism

Add `.glass` to any component for frosted glass effect:

```html
<div class="card glass">Glass card</div>
<nav class="navbar glass">Glass navbar</nav>
<button class="btn glass">Glass button</button>
```

---

## Custom Utilities

These are available in both `ux.min.css` and `tw.min.css`:

| Class | Effect |
|-------|--------|
| `glass` | Frosted glass (backdrop-filter + translucent bg) |
| `touch-target` | `min-height: 44px; min-width: 44px` |
| `touch-target-sm` | `min-height: 36px; min-width: 36px` |
| `safe-top` | `padding-top: env(safe-area-inset-top)` |
| `safe-bottom` | `padding-bottom: env(safe-area-inset-bottom)` |
| `safe-x` | Safe area left + right padding |
| `transition-spring` | Spring easing, 300ms |
| `transition-ios` | iOS easing, 350ms |
| `scrollbar-hide` | Hide scrollbar (all browsers) |
| `rounded-box` | `border-radius: var(--radius-box)` |
| `rounded-field` | `border-radius: var(--radius-field)` |

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
<button class="btn">Default</button>
<button class="btn btn-primary">Primary</button>
<button class="btn btn-error btn-outline">Outline</button>
<button class="btn btn-success btn-soft">Soft</button>
<button class="btn btn-ghost">Ghost</button>
<button class="btn btn-sm">Small</button>
<button class="btn btn-lg">Large</button>
<button class="btn btn-circle"><svg>...</svg></button>
<button class="btn btn-square"><svg>...</svg></button>
<button class="btn btn-block">Full width</button>
<button class="btn glass">Glass</button>
```
Children: `.btn-icon`
Modifiers: `btn-primary`, `btn-secondary`, `btn-accent`, `btn-neutral`, `btn-info`, `btn-success`, `btn-warning`, `btn-error`, `btn-outline`, `btn-soft`, `btn-ghost`, `btn-link`, `btn-loading`, `btn-disabled`, `btn-block`, `btn-circle`, `btn-square`
Sizes: `btn-xs`, `btn-sm`, `btn-lg`, `btn-xl`
Glass: yes

#### btn-group
```html
<div class="btn-group">
  <button class="btn btn-primary">Left</button>
  <button class="btn btn-primary">Center</button>
  <button class="btn btn-primary">Right</button>
</div>
<div class="btn-group-vertical">...</div>
```

#### icon-btn
```html
<button class="icon-btn"><svg>...</svg></button>
<button class="icon-btn icon-btn-filled color-primary"><svg>...</svg></button>
<button class="icon-btn icon-btn-sm"><svg>...</svg></button>
```
Modifiers: `icon-btn-filled`, `icon-btn-outline`, `icon-btn-soft`, `icon-btn-disabled`, `icon-btn-loading`, `icon-btn-active`
Sizes: `icon-btn-xs`, `icon-btn-sm`, `icon-btn-lg`, `icon-btn-xl`
Children: `icon-btn-spinner`, `icon-btn-badge`, `icon-btn-count`

#### fab
```html
<div class="fab fab-bottom-end">
  <button class="fab-btn color-primary"><svg>...</svg></button>
</div>
```
Positions: `fab-bottom-end`, `fab-bottom-start`, `fab-bottom-center`, `fab-top-end`, `fab-top-start`
Children: `fab-btn`, `fab-list`, `fab-list-item`, `fab-mini-btn`, `fab-badge`, `fab-backdrop`

#### split-button
```html
<div class="split-button">
  <button class="split-button-main btn btn-primary">Save</button>
  <button class="split-button-toggle btn btn-primary">▼</button>
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
<span class="badge">Default</span>
<span class="badge badge-primary">Primary</span>
<span class="badge badge-outline badge-error">Error</span>
<span class="badge badge-soft badge-success">Success</span>
<span class="badge badge-dot badge-error"></span>
```
Modifiers: `badge-outline`, `badge-soft`, `badge-ghost`, `badge-dot`, `badge-pulse`, `badge-bounce`
Sizes: `badge-xs`, `badge-sm`, `badge-lg`, `badge-xl`
Glass: yes

#### avatar
```html
<div class="avatar">
  <img src="user.jpg" alt="User" class="rounded-full w-12">
</div>
<div class="avatar avatar-square avatar-lg">
  <img src="user.jpg" alt="User">
</div>
```
Children: `avatar-icon`, `avatar-status`, `avatar-group`, `avatar-group-more`
Status: `avatar-status-online`, `avatar-status-offline`, `avatar-status-busy`, `avatar-status-away`
Sizes: `avatar-xs`, `avatar-sm`, `avatar-lg`, `avatar-xl`

#### chip
```html
<span class="chip">Default</span>
<span class="chip chip-filled color-primary">Filled</span>
<span class="chip chip-outline">Outline</span>
<span class="chip chip-soft color-success">Soft</span>
<span class="chip chip-interactive">Clickable <button class="chip-close">×</button></span>
```
Children: `chip-icon`, `chip-avatar`, `chip-close`, `chip-group`, `chip-group-scroll`
Sizes: `chip-sm`, `chip-lg`

#### card
```html
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
```
Children: `card-header`, `card-title`, `card-subtitle`, `card-body`, `card-media`, `card-footer`, `card-actions`
Modifiers: `card-bordered`, `card-flat`, `card-elevated`, `card-side`, `card-clickable`, `card-dash`
Sizes: `card-sm`, `card-lg`
Layout: `card-grid`, `card-grid-sm`
Glass: yes

#### table
```html
<div class="table-wrapper table-responsive">
  <table class="table table-striped table-hover">
    <thead><tr><th>Name</th><th>Email</th></tr></thead>
    <tbody><tr><td>John</td><td>john@example.com</td></tr></tbody>
  </table>
</div>
```
Modifiers: `table-striped`, `table-hover`, `table-bordered`, `table-compact`, `table-relaxed`, `table-fixed`
Wrappers: `table-wrapper`, `table-responsive`

#### stat
```html
<div class="stats-grid stats-grid-3">
  <div class="stat">
    <div class="stat-label">Revenue</div>
    <div class="stat-value">$12,450</div>
    <div class="stat-footer"><span class="stat-trend stat-trend-up">+12%</span></div>
  </div>
</div>
```
Children: `stat-header`, `stat-label`, `stat-icon`, `stat-value`, `stat-footer`, `stat-trend`, `stat-desc`, `stat-progress`
Modifiers: `stat-horizontal`, `stat-centered`, `stat-sm`, `stat-lg`
Grid: `stats-grid`, `stats-grid-2`, `stats-grid-3`, `stats-grid-4`, `stats-grid-auto`
Trends: `stat-trend-up`, `stat-trend-down`, `stat-trend-neutral`

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
Modifiers: `timeline-simple`, `timeline-compact`, `timeline-horizontal`, `timeline-alternating`, `timeline-activity`

#### accordion
```html
<div class="accordion">
  <div class="accordion-item">
    <button class="accordion-header">
      <span class="accordion-title">Section 1</span>
      <span class="accordion-chevron">▼</span>
    </button>
    <div class="accordion-body"><p>Content</p></div>
  </div>
</div>
```
Modifiers: `accordion-inset`, `accordion-outline`, `accordion-flat`, `accordion-arrow`, `accordion-plus`
Sizes: `accordion-sm`, `accordion-lg`
Glass: yes

#### tree
```html
<div class="tree">
  <ul class="tree-list">
    <li class="tree-node">
      <div class="tree-item">
        <button class="tree-toggle">▶</button>
        <span class="tree-icon tree-icon-folder">📁</span>
        <span class="tree-label">Folder</span>
      </div>
      <ul class="tree-list tree-list-nested">
        <li class="tree-node">
          <div class="tree-item">
            <span class="tree-icon tree-icon-file">📄</span>
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
<div class="tabs tabs-border">
  <button class="tab tab-active">Tab 1</button>
  <button class="tab">Tab 2</button>
  <button class="tab">Tab 3</button>
</div>
```
Modifiers: `tabs-border`, `tabs-box`, `tabs-lift`, `tabs-scroll`
Sizes: `tabs-xs`, `tabs-sm`, `tabs-lg`
Active: `.tab-active`
Glass: yes

#### menu
```html
<ul class="menu bg-base-200 rounded-box w-56">
  <li class="menu-title">Section</li>
  <li><a class="active">Home</a></li>
  <li><a>Settings</a></li>
  <li>
    <details>
      <summary>More</summary>
      <ul>
        <li><a>Sub item</a></li>
      </ul>
    </details>
  </li>
</ul>
```
Children: `menu-item`, `menu-icon`, `menu-label`, `menu-shortcut`, `menu-badge`, `menu-divider`, `menu-header`
Active: `.menu-item-active` or `.active` on the `<a>`
Sizes: `menu-sm`, `menu-lg`
Glass: yes

#### breadcrumbs
```html
<div class="breadcrumbs">
  <a href="/">Home</a>
  <a href="/products">Products</a>
  <span>Current</span>
</div>
```
Modifiers: `breadcrumbs-arrow`, `breadcrumbs-dot`
Glass: yes

#### pagination
```html
<div class="pagination">
  <button class="pagination-btn pagination-prev">←</button>
  <button class="pagination-btn pagination-active">1</button>
  <button class="pagination-btn">2</button>
  <button class="pagination-btn">3</button>
  <button class="pagination-btn pagination-next">→</button>
</div>
```
Modifiers: `pagination-bordered`
Sizes: `pagination-sm`, `pagination-lg`

#### segment
```html
<div class="segment">
  <button class="segment-btn segment-btn-selected">Day</button>
  <button class="segment-btn">Week</button>
  <button class="segment-btn">Month</button>
</div>
```
Modifiers: `segment-primary`, `segment-outline`, `segment-rounded`, `segment-scrollable`
Sizes: `segment-sm`, `segment-lg`
Glass: yes

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
            <span class="sidebar-menu-icon">🏠</span>
            <span class="sidebar-label">Home</span>
          </a>
          <a class="sidebar-menu-button">
            <span class="sidebar-menu-icon">⚙</span>
            <span class="sidebar-label">Settings</span>
          </a>
        </nav>
      </div>
    </div>
  </aside>
  <main class="sidebar-inset-content">...</main>
</div>
```
Modifiers: `sidebar-right`, `sidebar-floating`, `sidebar-inset`, `sidebar-collapsed`
States: `[data-state="collapsed"]`, `[data-state="expanded"]`

#### mega-menu
```html
<div class="mega-menu">
  <button class="mega-menu-trigger">Products <span class="mega-menu-trigger-icon">▼</span></button>
  <div class="mega-menu-panel">
    <div class="mega-menu-grid mega-menu-grid-3">
      <div class="mega-menu-section">
        <h3 class="mega-menu-section-title">Category</h3>
        <ul class="mega-menu-section-list">
          <li><a class="mega-menu-item">Item 1</a></li>
        </ul>
      </div>
    </div>
  </div>
</div>
```
Glass: yes

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
<input type="text" class="input" placeholder="Default input">
<input type="text" class="input input-sm" placeholder="Small">
<input type="text" class="input input-lg" placeholder="Large">
<input type="email" class="input input-error" placeholder="Error state">
```
Modifiers: `input-filled`, `input-ghost`, `input-underline`, `input-error`, `input-success`
Sizes: `input-sm`, `input-lg`
Glass: yes
Wrappers: `input-group`, `input-floating`, `input-label`, `input-helper`

#### textarea
```html
<textarea class="textarea" placeholder="Write here..."></textarea>
```
Modifiers: `textarea-filled`, `textarea-ghost`, `textarea-error`, `textarea-success`, `textarea-no-resize`
Sizes: `textarea-sm`, `textarea-lg`

#### select
```html
<select class="select">
  <option>Option 1</option>
  <option>Option 2</option>
</select>
```
Modifiers: `select-filled`, `select-ghost`, `select-error`, `select-success`
Sizes: `select-sm`, `select-lg`

#### checkbox
```html
<label class="checkbox">
  <input type="checkbox" class="checkbox-input">
  <span class="checkbox-box"><span class="checkbox-mark"></span></span>
  <span class="checkbox-label">Accept terms</span>
</label>
```
Modifiers: `checkbox-round`, `checkbox-disabled`
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
Sizes: `radio-sm`, `radio-lg`
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
Glass: yes

#### range
```html
<input type="range" class="range" min="0" max="100" value="50">
```
Sizes: `range-sm`, `range-lg`

#### searchbar
```html
<div class="searchbar">
  <div class="searchbar-container">
    <span class="searchbar-icon">🔍</span>
    <input type="text" class="searchbar-input" placeholder="Search...">
    <button class="searchbar-clear">×</button>
  </div>
</div>
```
Modifiers: `searchbar-rounded`, `searchbar-outline`, `searchbar-filled`
Sizes: `searchbar-sm`, `searchbar-lg`

#### rating
```html
<div class="rating">
  <div class="rating-stars">
    <button class="rating-star rating-star-filled">★</button>
    <button class="rating-star rating-star-filled">★</button>
    <button class="rating-star rating-star-filled">★</button>
    <button class="rating-star">★</button>
    <button class="rating-star">★</button>
  </div>
  <span class="rating-value">3.0</span>
</div>
```
Modifiers: `rating-readonly`, `rating-disabled`
Sizes: `rating-sm`, `rating-lg`, `rating-xl`

#### upload
```html
<div class="upload">
  <div class="upload-dropzone">
    <input type="file" class="upload-input">
    <div class="upload-icon">📤</div>
    <div class="upload-text">Drag & drop files here</div>
    <div class="upload-hint">or <span class="upload-browse">browse</span></div>
  </div>
  <div class="upload-files">
    <div class="upload-file">
      <div class="upload-file-info">
        <span class="upload-file-name">document.pdf</span>
      </div>
    </div>
  </div>
</div>
```
Modifiers: `upload-compact`, `upload-button`, `upload-avatar`

#### tag-input
```html
<div class="tag-input">
  <div class="tag-input-wrapper">
    <span class="tag">Vue <button class="tag-remove">×</button></span>
    <span class="tag">React <button class="tag-remove">×</button></span>
    <input class="tag-input-field" placeholder="Add tag...">
  </div>
</div>
```
Sizes: `tag-input-sm`, `tag-input-lg`

#### autocomplete
```html
<div class="autocomplete">
  <input class="autocomplete-input" placeholder="Search...">
  <div class="autocomplete-dropdown autocomplete-dropdown-open">
    <div class="autocomplete-list">
      <div class="autocomplete-item">Option 1</div>
      <div class="autocomplete-item autocomplete-item-active">Option 2</div>
    </div>
  </div>
</div>
```
Sizes: `autocomplete-sm`, `autocomplete-lg`

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
Modifiers: `otp-underline`, `otp-rounded`, `otp-secure`, `otp-error`, `otp-success`
Sizes: `otp-sm`, `otp-lg`

#### datetime
```html
<div class="datetime">
  <button class="datetime-trigger">
    <span class="datetime-value">Feb 7, 2026</span>
    <span class="datetime-icon">📅</span>
  </button>
</div>
```
Sizes: `datetime-sm`, `datetime-lg`
Glass: yes

#### color-picker
```html
<div class="color-picker">
  <button class="color-picker-trigger">
    <span class="color-picker-swatch"><span class="color-picker-swatch-color" style="background:#3b82f6"></span></span>
    <span class="color-picker-value">#3b82f6</span>
  </button>
</div>
```

#### quantity-stepper
```html
<div class="quantity-stepper">
  <button class="quantity-stepper-btn quantity-stepper-btn-minus">−</button>
  <input class="quantity-stepper-input" value="1">
  <button class="quantity-stepper-btn quantity-stepper-btn-plus">+</button>
</div>
```
Modifiers: `quantity-stepper-vertical`, `quantity-stepper-round`, `quantity-stepper-compact`
Sizes: `quantity-stepper-sm`, `quantity-stepper-lg`

#### currency-input, phone-input, signature-pad, rich-text
```html
<div class="currency-input">
  <span class="currency-input-symbol currency-input-symbol-prefix">$</span>
  <input class="currency-input-field" placeholder="0.00">
</div>

<div class="phone-input">
  <button class="phone-input-country">🇺🇸 +1</button>
  <input class="phone-input-field" placeholder="(555) 000-0000">
</div>
```

#### form-group
```html
<div class="form-group">
  <label class="form-group-label">Email <span class="form-group-label-required">*</span></label>
  <input type="email" class="input" placeholder="email@example.com">
  <span class="form-group-helper">We'll never share your email</span>
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
<div class="modal-backdrop" data-state="open">
  <div class="modal">
    <div class="modal-header">
      <h2 class="modal-title">Title</h2>
      <button class="modal-close">×</button>
    </div>
    <div class="modal-body">Content</div>
    <div class="modal-footer">
      <button class="btn">Cancel</button>
      <button class="btn btn-primary">Save</button>
    </div>
  </div>
</div>
```
Sizes: `modal-sm`, `modal-lg`, `modal-xl`, `modal-fullscreen`
State: `data-state="open"` / `data-state="closed"` on `.modal-backdrop`
Glass: yes

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
Also: `side-sheet` (left/right), `action-sheet`

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
<div class="dropdown">
  <button class="dropdown-trigger btn">Options ▼</button>
  <div class="dropdown-menu">
    <button class="dropdown-item">Edit</button>
    <button class="dropdown-item">Duplicate</button>
    <div class="dropdown-divider"></div>
    <button class="dropdown-item dropdown-item-danger">Delete</button>
  </div>
</div>
```
Positions: `dropdown-menu-top`, `dropdown-menu-right`, `dropdown-menu-left`
Glass: yes

#### popover
```html
<div class="popover popover-open popover-bottom">
  <div class="popover-content">Popover content</div>
  <div class="popover-arrow"></div>
</div>
```
Positions: `popover-top`, `popover-bottom`, `popover-left`, `popover-right`
Sizes: `popover-sm`, `popover-lg`
Glass: yes

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
      <span class="command-search-icon">🔍</span>
      <input class="command-input" placeholder="Type a command...">
    </div>
    <div class="command-results">
      <div class="command-group">
        <div class="command-group-title">Actions</div>
        <div class="command-item command-item-active">
          <span class="command-item-icon">📝</span>
          <span class="command-item-title">New document</span>
          <span class="command-item-shortcut">⌘N</span>
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
<div class="alert color-info">
  <span class="alert-icon">ℹ</span>
  <div class="alert-content">
    <div class="alert-title">Info</div>
    <div class="alert-description">This is an informational alert.</div>
  </div>
</div>
```
Styles: `alert-soft`, `alert-outline`, `alert-filled`, `alert-compact`
Glass: yes

#### toast
```html
<div class="toast toast-top toast-end">
  <div class="toast-item color-success">
    <span class="toast-icon">✓</span>
    <div class="toast-content">
      <div class="toast-title">Success</div>
      <div class="toast-message">Record saved</div>
    </div>
    <button class="toast-close">×</button>
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
  <span class="banner-icon">ℹ</span>
  <div class="banner-content">
    <div class="banner-title">Update available</div>
    <div class="banner-message">A new version is ready.</div>
  </div>
  <button class="banner-close">×</button>
</div>
```
Colors: `banner-info`, `banner-success`, `banner-warning`, `banner-error`
Filled: `banner-info-filled`, `banner-success-filled`, etc.
Modifiers: `banner-sticky`, `banner-fixed`, `banner-inline`

#### callout
```html
<div class="callout callout-warning">
  <span class="callout-icon">⚠</span>
  <div class="callout-content">
    <div class="callout-title">Warning</div>
    <div class="callout-text">This action cannot be undone.</div>
  </div>
</div>
```
Colors: `callout-info`, `callout-success`, `callout-warning`, `callout-error`, `callout-neutral`
Sizes: `callout-sm`, `callout-lg`

#### progress
```html
<div class="progress color-primary">
  <div class="progress-bar" style="width: 60%"></div>
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
Sizes: `progress-circle-xs`, `progress-circle-sm`, `progress-circle-lg`, `progress-circle-xl`

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
Sizes: `gauge-sm`, `gauge-lg`, `gauge-xl`

#### loading / skeleton / spinner
```html
<span class="loading loading-dots"></span>
<div class="skeleton skeleton-text w-full"></div>
<div class="spinner spinner-lg"></div>
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

#### dashboard-grid
```html
<div class="dashboard-grid dashboard-grid-cols-4">
  <div class="dashboard-grid-item dashboard-grid-item-sm">Widget 1</div>
  <div class="dashboard-grid-item dashboard-grid-item-md">Widget 2</div>
  <div class="dashboard-grid-item dashboard-grid-item-lg">Widget 3</div>
</div>
```
Columns: `dashboard-grid-cols-2`, `dashboard-grid-cols-3`, `dashboard-grid-cols-4`, `dashboard-grid-cols-6`
Sizes: `dashboard-grid-item-sm`, `dashboard-grid-item-md`, `dashboard-grid-item-lg`, `dashboard-grid-item-full`, `dashboard-grid-item-tall`

#### grid
CSS grid utilities (work like Tailwind grid):
```html
<div class="grid-cols-3 gap-4">
  <div class="col-span-2">Wide</div>
  <div>Normal</div>
</div>
```
Responsive: `sm:grid-cols-2`, `md:grid-cols-3`, `lg:grid-cols-4`

#### masonry
```html
<div class="masonry masonry-cols-3 masonry-gap-md">
  <div class="masonry-item">...</div>
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
      <input class="datatable-search" placeholder="Search...">
    </div>
  </div>
  <div class="datatable-body">
    <table class="datatable-table">
      <thead class="datatable-thead">
        <tr><th class="datatable-th datatable-th-sortable">Name</th></tr>
      </thead>
      <tbody class="datatable-tbody">
        <tr class="datatable-tr"><td class="datatable-td">John</td></tr>
      </tbody>
    </table>
  </div>
  <div class="datatable-footer">
    <div class="datatable-info">Showing 1-10 of 50</div>
  </div>
</div>
```
Modifiers: `datatable-striped`, `datatable-bordered`, `datatable-compact`, `datatable-sm`, `datatable-lg`
Views: `datatable-cards` (card view), `datatable-responsive`
Glass: yes

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
    <button class="calendar-nav calendar-nav-btn">←</button>
    <span class="calendar-title">February 2026</span>
    <button class="calendar-nav calendar-nav-btn">→</button>
  </div>
  <div class="calendar-weekdays">
    <span class="calendar-weekday">Mo</span>...
  </div>
  <div class="calendar-days">
    <button class="calendar-day calendar-day-today">7</button>
    <button class="calendar-day calendar-day-selected">14</button>
  </div>
</div>
```

#### json-viewer
```html
<div class="json-viewer">
  <div class="json-viewer-header">
    <span class="json-viewer-title">Response</span>
  </div>
  <div class="json-viewer-content">
    <div class="json-viewer-tree">...</div>
  </div>
</div>
```

#### code-block
```html
<div class="code-block">
  <div class="code-block-header">
    <span class="code-block-lang">javascript</span>
    <button class="code-block-btn">Copy</button>
  </div>
  <div class="code-block-content">
    <pre><code>const x = 1;</code></pre>
  </div>
</div>
```

#### diff-viewer
```html
<div class="diff">
  <div class="diff-header">
    <span class="diff-title">Changes</span>
    <div class="diff-stats"><span class="diff-stat-added">+12</span> <span class="diff-stat-removed">-3</span></div>
  </div>
  <div class="diff-content">...</div>
</div>
```

#### kpi-card
```html
<div class="kpi-card">
  <div class="kpi-card-header">
    <span class="kpi-card-icon">💰</span>
    <span class="kpi-card-change kpi-card-change-up">+12%</span>
  </div>
  <div class="kpi-card-label">Revenue</div>
  <div class="kpi-card-value">$45,200</div>
</div>
```
Sizes: `kpi-card-sm`, `kpi-card-lg`, `kpi-card-compact`

---

### Multimedia

#### carousel
```html
<div class="carousel">
  <div class="carousel-viewport">
    <div class="carousel-track">
      <div class="carousel-slide">Slide 1</div>
      <div class="carousel-slide">Slide 2</div>
    </div>
  </div>
  <button class="carousel-nav carousel-nav-prev">←</button>
  <button class="carousel-nav carousel-nav-next">→</button>
  <div class="carousel-pagination">
    <button class="carousel-dot carousel-dot-active"></button>
    <button class="carousel-dot"></button>
  </div>
</div>
```
Slides visible: `carousel-show-1` through `carousel-show-6`
Gap: `carousel-gap-xs`, `carousel-gap-sm`, `carousel-gap-md`, `carousel-gap-lg`
Glass: yes

#### img
```html
<div class="img img-rounded">
  <img class="img-element" src="photo.jpg" alt="">
  <div class="img-skeleton"></div>
</div>
```
Shapes: `img-rounded`, `img-circle`
Fit: `img-contain`, `img-cover`, `img-fill`
Aspect: `img-square`, `img-video`, `img-portrait`, `img-landscape`, `img-wide`
Sizes: `img-xs`, `img-sm`, `img-md`, `img-lg`, `img-xl`
States: `img-loaded`, `img-error`
Animation: `img-fade`, `img-zoom`

#### audio-player, video-player
```html
<div class="audio-player">
  <div class="audio-player-info">
    <div class="audio-player-title">Song Title</div>
    <div class="audio-player-artist">Artist</div>
  </div>
  <div class="audio-player-controls">
    <button class="audio-player-btn">⏮</button>
    <button class="audio-player-btn audio-player-btn-play">▶</button>
    <button class="audio-player-btn">⏭</button>
  </div>
</div>
```
Modifiers: `audio-player-mini`, `audio-player-compact`
Video: `video-player`, `video-player-16-9`, `video-player-4-3`

---

### POS / Retail

#### numpad
```html
<div class="numpad">
  <div class="numpad-display">
    <span class="numpad-display-value">0.00</span>
  </div>
  <div class="numpad-grid">
    <button class="numpad-key">1</button>
    <button class="numpad-key">2</button>
    <button class="numpad-key">3</button>
    <button class="numpad-key">4</button>
    <button class="numpad-key">5</button>
    <button class="numpad-key">6</button>
    <button class="numpad-key">7</button>
    <button class="numpad-key">8</button>
    <button class="numpad-key">9</button>
    <button class="numpad-key numpad-key-action">C</button>
    <button class="numpad-key">0</button>
    <button class="numpad-key numpad-key-primary">OK</button>
  </div>
</div>
```
Modifiers: `numpad-full-width`, `numpad-compact`
Sizes: `numpad-sm`, `numpad-lg`
Glass: yes

#### product-card
```html
<div class="product-card">
  <div class="product-card-image-wrapper">
    <img class="product-card-image" src="product.jpg" alt="">
    <div class="product-card-badges">
      <span class="product-card-badge product-card-badge-sale">-20%</span>
    </div>
  </div>
  <div class="product-card-content">
    <h3 class="product-card-name">Café Latte</h3>
    <div class="product-card-price-wrapper">
      <span class="product-card-price">$3.50</span>
    </div>
  </div>
</div>
```
Grid: `product-grid product-grid-3`
Modifiers: `product-card-horizontal`, `product-card-selected`, `product-card-out-of-stock`

#### cart
```html
<div class="cart">
  <div class="cart-header">
    <h3 class="cart-title">Cart</h3>
    <span class="cart-count">3</span>
  </div>
  <div class="cart-items">
    <div class="cart-item">
      <div class="cart-item-content">
        <span class="cart-item-name">Café Latte</span>
        <span class="cart-item-price">$3.50</span>
      </div>
      <div class="cart-item-qty">
        <button class="cart-item-qty-btn">-</button>
        <span class="cart-item-qty-value">2</span>
        <button class="cart-item-qty-btn">+</button>
      </div>
    </div>
  </div>
  <div class="cart-summary">
    <div class="cart-summary-row cart-summary-row-total">
      <span class="cart-summary-label">Total</span>
      <span class="cart-summary-value">$10.50</span>
    </div>
  </div>
</div>
```

#### order-ticket
```html
<div class="order-ticket order-ticket-preparing">
  <div class="order-ticket-header">
    <span class="order-ticket-order-number">#042</span>
    <span class="order-ticket-status"><span class="order-ticket-status-dot"></span> Preparing</span>
  </div>
  <div class="order-ticket-items">
    <div class="order-ticket-item">
      <span class="order-ticket-item-qty">2x</span>
      <span class="order-ticket-item-name">Margherita Pizza</span>
    </div>
  </div>
</div>
```
States: `order-ticket-pending`, `order-ticket-preparing`, `order-ticket-ready`, `order-ticket-completed`
Grid: `order-ticket-grid`

#### payment
```html
<div class="payment">
  <div class="payment-methods">
    <div class="payment-method payment-method-selected">
      <span class="payment-method-icon">💳</span>
      <span class="payment-method-name">Card</span>
    </div>
    <div class="payment-method">
      <span class="payment-method-icon">💵</span>
      <span class="payment-method-name">Cash</span>
    </div>
  </div>
</div>
```

#### receipt
```html
<div class="receipt receipt-80mm">
  <div class="receipt-header">
    <div class="receipt-company">Store Name</div>
    <div class="receipt-address">123 Main St</div>
  </div>
  <div class="receipt-divider"></div>
  <div class="receipt-items">
    <div class="receipt-item">
      <span class="receipt-item-name">Item 1</span>
      <span class="receipt-item-total">$5.00</span>
    </div>
  </div>
  <div class="receipt-totals">
    <div class="receipt-total-row receipt-total-row-grand">
      <span class="receipt-total-label">Total</span>
      <span class="receipt-total-value">$15.00</span>
    </div>
  </div>
</div>
```
Paper sizes: `receipt-58mm`, `receipt-80mm`, `receipt-a4`

#### category-tabs
```html
<div class="category-tabs">
  <button class="category-tabs-item category-tabs-item-active">
    <span class="category-tabs-icon">☕</span>
    <span class="category-tabs-label">Drinks</span>
  </button>
  <button class="category-tabs-item">
    <span class="category-tabs-icon">🍕</span>
    <span class="category-tabs-label">Food</span>
  </button>
</div>
```
Modifiers: `category-tabs-pill`, `category-tabs-bordered`
Sizes: `category-tabs-sm`, `category-tabs-lg`

#### Also available: `calculator`, `stock-indicator`, `quantity-badge`, `variant-selector`, `virtual-keyboard`, `kds-order`, `onscreen-keyboard`, `reorder`

---

### HR / Employees

#### employee-card
```html
<div class="employee-card">
  <div class="employee-card-avatar">JD</div>
  <div class="employee-card-status employee-card-status-available"></div>
  <div class="employee-card-info">
    <div class="employee-card-name">Juan Delgado</div>
    <div class="employee-card-title">UX Designer</div>
    <div class="employee-card-department">Design</div>
  </div>
</div>
```
Grid: `employee-grid employee-grid-3`
Modifiers: `employee-card-horizontal`, `employee-card-compact`

#### time-clock
```html
<div class="time-clock">
  <div class="time-clock-display">
    <div class="time-clock-time">09:42:15</div>
    <div class="time-clock-date">Thursday, Feb 7, 2026</div>
  </div>
  <div class="time-clock-actions">
    <button class="btn btn-success btn-lg">Clock In</button>
  </div>
</div>
```

#### Also available: `shift-calendar`, `attendance-list`, `leave-request`, `org-chart`, `performance-meter`

---

### Manufacturing

#### machine-status
```html
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
      <span class="machine-status-metric-label">Speed</span>
    </div>
  </div>
</div>
```
Grid: `machine-grid machine-grid-3`
States: `machine-status-indicator-running`, `-idle`, `-maintenance`, `-offline`, `-error`

#### work-order
```html
<div class="work-order">
  <div class="work-order-header">
    <span class="work-order-number">WO-2024-001</span>
    <span class="work-order-status work-order-status-in-progress">
      <span class="work-order-status-dot"></span> In Progress
    </span>
  </div>
  <div class="work-order-content">
    <div class="work-order-product">
      <div class="work-order-product-name">Widget Assembly</div>
    </div>
    <div class="work-order-progress">
      <div class="work-order-progress-bar">
        <div class="work-order-progress-fill" style="width: 65%"></div>
      </div>
    </div>
  </div>
</div>
```
Priority: `work-order-priority-low`, `-normal`, `-high`, `-urgent`
Grid: `work-order-grid`

#### Also available: `production-line`, `quality-check`, `batch-tracker`, `bom-tree`, `gantt`

---

### Other Components

#### system-monitor
```html
<div class="sys-monitor">
  <div class="sys-monitor-grid">
    <div class="sys-monitor-card sys-monitor-card-cpu">
      <div class="sys-monitor-card-header">
        <span class="sys-monitor-card-title">CPU</span>
      </div>
      <div class="sys-monitor-gauge">...</div>
    </div>
  </div>
</div>
```

#### status-badge / status-indicator
```html
<span class="status-badge status-badge-active">Active</span>
<span class="status-badge status-badge-error">Error</span>
<span class="status-badge status-badge-pending status-badge-pulse">Processing</span>

<span class="status-indicator status-indicator-success">
  <span class="status-indicator-dot"></span>
  <span class="status-indicator-label">Online</span>
</span>
```

#### hover-card
```html
<div class="hover-card">
  <a class="hover-card-trigger">@username</a>
  <div class="hover-card-content">
    <div class="hover-card-header">
      <img class="hover-card-avatar" src="user.jpg">
      <div class="hover-card-title">Username</div>
    </div>
    <div class="hover-card-description">Bio text here</div>
  </div>
</div>
```

#### toggle-group
```html
<div class="toggle-group">
  <button class="toggle-group-item toggle-group-item-active">Left</button>
  <button class="toggle-group-item">Center</button>
  <button class="toggle-group-item">Right</button>
</div>
```
Modifiers: `toggle-group-outline`, `toggle-group-full`, `toggle-group-vertical`
Sizes: `toggle-group-sm`, `toggle-group-lg`

#### filter-chip
```html
<div class="filter-chips">
  <button class="filter-chip filter-chip-active">Active</button>
  <button class="filter-chip">Pending</button>
  <button class="filter-chip">Closed</button>
</div>
```
Sizes: `filter-chip-sm`, `filter-chip-lg`
Modifiers: `filter-chip-outline`, `filter-chip-soft`

#### notifications
```html
<div class="notification-trigger">
  <button class="btn">🔔 <span class="notification-trigger-badge">3</span></button>
</div>
<div class="notification-panel notification-panel-open">
  <div class="notification-panel-header"><h3 class="notification-panel-title">Notifications</h3></div>
  <div class="notification-panel-content">
    <div class="notification-item notification-item-unread">
      <span class="notification-item-icon notification-item-icon-info">ℹ</span>
      <div class="notification-item-content">
        <div class="notification-item-title">New message</div>
        <div class="notification-item-time">2 min ago</div>
      </div>
    </div>
  </div>
</div>
```

#### virtual-list, loyalty-card, sparkline, bar-chart, chart, scheduler, event-card, lightbox, image-gallery, image-crop, image-zoom, barcode-scanner, pdf-viewer, qr-code
All follow the same `base-class` + `base-class-child` + `base-class-modifier` pattern.

---

## State Management

Components use multiple state selectors:

```html
<!-- data-state (recommended) -->
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

Grid responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`

```html
<div class="grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  <div>...</div>
</div>
```

---

## Framework Integration

### Django + HTMX
```html
<link rel="stylesheet" href="{% static 'css/ux-full.min.css' %}">

<button class="btn btn-primary"
        hx-get="/api/users/"
        hx-target="#user-list">
  Load Users
</button>

<div id="user-list"></div>
```

### Vanilla JS
```html
<!-- Toggle modal -->
<button onclick="document.getElementById('modal').dataset.state='open'" class="btn btn-primary">Open</button>

<div id="modal" class="modal-backdrop" data-state="closed">
  <div class="modal">
    <div class="modal-body">Content</div>
    <div class="modal-footer">
      <button onclick="this.closest('[data-state]').dataset.state='closed'" class="btn">Close</button>
    </div>
  </div>
</div>
```

### React
```jsx
<div className={`modal-backdrop`} data-state={isOpen ? 'open' : 'closed'}>
  <div className="modal">
    <div className="modal-body">{children}</div>
  </div>
</div>
```

### Vue
```html
<div class="modal-backdrop" :data-state="isOpen ? 'open' : 'closed'">
  <div class="modal">
    <div class="modal-body"><slot /></div>
  </div>
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

**POS**: numpad, calculator, product-card, cart, order-ticket, payment, receipt, stock-indicator, quantity-badge, variant-selector, virtual-keyboard, kds-order, category-tabs, keyboard, onscreen-keyboard

**HR**: employee-card, time-clock, shift-calendar, attendance-list, leave-request, org-chart, performance-meter

**Manufacturing**: work-order, machine-status, production-line, quality-check, batch-tracker, bom-tree, gantt

**System**: system-monitor, pwa, refresher, status-badge, status-indicator

**Colors**: color-primary, color-secondary, color-accent, color-neutral, color-info, color-success, color-warning, color-error
