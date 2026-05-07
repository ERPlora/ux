# AGENTS.md — ERPlora UX

Open standard for coding agents. Detected automatically by Claude Code, Cursor, OpenAI Codex, and most LLM-powered editors. Mirror or copy this file into a consumer project as `AGENTS.md` (or `.cursorrules`, or `.github/copilot-instructions.md`) so the agent picks it up.

## What this library is

ERPlora UX is a **CSS-only semantic component library**. One stylesheet, ~200 components, prefix `ux-*`. **No Tailwind, no SCSS, no JS dependency.** Optional runtime interactivity is wired via [Datastar](https://data-star.dev) `data-*` attributes — never required.

- Latest: **v2.0.0**
- CDN: `https://cdn.jsdelivr.net/gh/ERPlora/ux@v2.0.0/dist/erplora-ux.min.css`
- npm: `@erplora/ux` → import `@erplora/ux/min`
- Source: <https://github.com/ERPlora/ux>
- Showcase: <https://erplora.github.io/ux/>

## How an agent should use it

When the user is **building UI in a project that includes this library**, the agent should:

1. **Reach for `ux-*` semantic classes first.** Do not generate Tailwind utilities, BEM clones, or hand-rolled CSS for things this library already covers. Check the catalog below before inventing.
2. **Compose with BEM-light, never freestyle.** Pattern: `ux-{block} ux-{block}--{modifier} ux-{block}__{element}`. Use double underscore for elements, double dash for modifiers, single dash inside multi-word block names (`ux-cat-card`, `ux-tag-input`).
3. **Theme via custom properties, not new classes.** Override `--ux-*` variables on `:root` or any subtree. Never hardcode hex colors.
4. **Use runtime states with `is-*`**: `is-active`, `is-open`, `is-loading`, `is-disabled`, `is-selected`. Toggle these from JS/Datastar — they are not `--modifier`.
5. **Wire interactivity with Datastar `data-*` if present**, otherwise plain JS. Examples: `data-signals`, `data-show`, `data-bind-q`, `data-on-click`, `data-class-is-active`. The library never *requires* Datastar.
6. **Quote the CDN tag, not `@main`.** Always `@v2.0.0` (or the latest stable tag) so users get a frozen build.

### Anti-patterns the agent must avoid

- ❌ Mixing Tailwind utility classes with `ux-*` classes (`class="ux-btn px-4 bg-blue-500"`).
- ❌ Adding `style="..."` to override library defaults — override the `--ux-*` token instead.
- ❌ Renaming or aliasing `ux-*` classes in consumer code.
- ❌ Importing component CSS files individually from `lib/css/components/*.css` — always consume the bundle (`dist/erplora-ux.min.css`) unless the user explicitly asks for tree-shaking.
- ❌ Creating `<div class="card">` shadow components — use `<div class="ux-card">` directly.
- ❌ Suggesting React/Vue wrappers — this library is HTML + CSS. Components are markup, not framework objects.

## Quick install snippet (HTML)

```html
<!doctype html>
<html lang="en" data-theme="erplora">
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/ERPlora/ux@v2.0.0/dist/erplora-ux.min.css">
  <!-- Optional, for interactive previews -->
  <script type="module" src="https://cdn.jsdelivr.net/gh/starfederation/datastar@main/bundles/datastar.js"></script>
</head>
<body>
  <button class="ux-btn ux-btn--primary">Save</button>
</body>
</html>
```

Themes available out of the box: `data-theme="erplora"` (dark terracota, default), `data-theme="dark"`, `data-theme="light"`.

## Class catalog (block → notable variants & children)

This is the **block index**. For each, common variants (`--`) and children (`__`) are listed. The full machine-readable inventory lives in `llms-full.txt` and the canonical source is `lib/css/components/`.

### Layout

- `ux-app` — root grid · children: `__sidebar-overlay`, `__main`, `__body`, `__tabbar`
- `ux-sidebar` — vertical nav · children: `__head`, `__group`, `__item`, `__brand`
- `ux-topbar` — header bar · children: `__title`, `__actions`, `__search`
- `ux-tabbar` — bottom tab nav (mobile) · children: `__item`, `__icon`, `__label`, `__badge`, `__fab`
- `ux-menu-btn` — hamburger animation
- `ux-page-header` · `ux-section` · `ux-divider`
- `ux-grid-2` · `ux-grid-3` · `ux-grid-4` · `ux-grid-6` — column grids

### Buttons & atomics

- `ux-btn` — variants: `--primary`, `--secondary`, `--ghost`, `--outline`, `--danger`, `--link`, `--icon`, `--block`, `--loading` · sizes: `--sm`, `--lg` · child: `__icon` · group: `ux-btn-group`
- `ux-icon-btn` — square icon button
- `ux-fab` — floating action button
- `ux-badge` — variants: `--brand`, `--ok`, `--warn`, `--danger`, `--info`, `--solid`, `--solid-brand`, `--sm` · child: `__dot`
- `ux-pill` · `ux-chip` · `ux-tag-input` · `ux-status-dot`
- `ux-avatar` — sizes: `--xs`, `--sm`, `--lg`, `--xl` · variant: `--brand` · group: `ux-avatar-stack`
- `ux-kbd` — keyboard shortcut hint

### Surfaces

- `ux-card` — variants: `--elevated`, `--flat`, `--glass`, `--interactive` · children: `__header`, `__title`, `__sub`, `__body`, `__footer`, `__actions`, `__divider`
- `ux-kpi` — metric tile
- `ux-stats` · `ux-stat` — stat blocks
- `ux-empty` — empty-state placeholder
- `ux-section` · `ux-divider`

### Forms

- `ux-input` · `ux-input-group` · `ux-textarea` · `ux-select` · `ux-search`
- `ux-check` · `ux-check-group` · `ux-radio` · `ux-radio-group` · `ux-radio-card` · `ux-toggle` · `ux-toggle-row`
- `ux-range` · `ux-range-dual` · `ux-slider` · `ux-slider-block`
- `ux-form` · `ux-form-row` · `ux-form-section` · `ux-field`
- `ux-segment` · `ux-segmented` · `ux-stepper` · `ux-stepper-card` · `ux-stepper-compact`
- `ux-upload` · `ux-dropzone` · `ux-fileitem` · `ux-attachment` · `ux-attachments`

### Pickers & advanced inputs

- `ux-datepicker` · `ux-date-range` · `ux-timepicker` · `ux-cal-mini`
- `ux-colorpicker` · `ux-otp` · `ux-pinpad` · `ux-rating`
- `ux-autocomplete` · `ux-combo` (combobox) · `ux-tag-input`
- `ux-numpad` · `ux-numpad-display`
- `ux-signature` · `ux-sign`

### Data display

- `ux-table` · `ux-table-wrap` · `ux-table-scroll` · `ux-table-toolbar` · `ux-table-footer`
- `ux-dt-card` · `ux-dt-grid` · `ux-dt-toolbar` — DataTable view modes
- `ux-row-action` · `ux-row-actions` · `ux-cell-rich` · `ux-view-toggle`
- `ux-pager` · `ux-pagination` · `ux-paginator` · `ux-page-size`
- `ux-list` · `ux-tree`

### Charts & viz

- `ux-chart` — generic chart wrapper
- `ux-spark` · `ux-spark-bars` — sparklines
- `ux-bullet` — bullet chart with zones (`__zone--good`, `__zone--warn`, `__zone--danger`)
- `ux-gauge` · `ux-donut` · `ux-circ` · `ux-trend` · `ux-bump`
- `ux-hbar` · `ux-hbars` — horizontal bar chart
- `ux-heat` — heatmap
- `ux-funnel` — funnel chart

### Overlays & feedback

- `ux-modal` · `ux-modal-root` · `ux-backdrop`
- `ux-drawer` · `ux-drawer-root`
- `ux-sheet` · `ux-sheet-backdrop` (mobile bottom sheet)
- `ux-popover` · `ux-tooltip` · `ux-hover-card` · `ux-hover-trigger`
- `ux-toast` · `ux-toast-region`
- `ux-banner` · `ux-callout` · `ux-alert` — variants: `--brand`, `--ok`, `--warn`, `--danger`, `--info` · solid/inline modifiers available
- `ux-progress` · `ux-progress-block` · `ux-progress-segments` · `ux-loadbar` · `ux-spinner` · `ux-spinner-dots` · `ux-loading` · `ux-page-loading` · `ux-dots`
- `ux-skel` · `ux-skel-line` · `ux-skel-card` · `ux-skel-chart` · `ux-skel-table` · `ux-skel-stack` — skeletons

### Navigation

- `ux-tabs` · `ux-tab` · `ux-tabs-scroll` · `ux-mtab`
- `ux-crumbs` (breadcrumbs)
- `ux-navbar` · `ux-menu` · `ux-ctx-menu` (context menu)

### Workflow

- `ux-kanban` · `ux-kcard` (kanban card)
- `ux-cal` · `ux-cal-mini` · `ux-cal-week` (calendar views)
- `ux-chat` — message UI · `ux-timeline`
- `ux-cmdk` · `ux-cmdk-backdrop` (command palette ⌘K)
- `ux-wizard`

### Verticals — POS

- `ux-pos` · `ux-numpad` · `ux-numpad-display`
- `ux-receipt` · `ux-invoice` · `ux-payslip`
- `ux-pay-method` · `ux-pay-methods`
- `ux-cat-card` · `ux-cat-cards` · `ux-cat-chip` · `ux-cat-chips` · `ux-cat-grid` · `ux-cat-rail` · `ux-cat-scroll` · `ux-cat-tile` (product categories)
- `ux-kds` (kitchen display)
- `ux-scanner` (barcode)

### Verticals — Manufacturing

- `ux-bom` (bill of materials, indented `__name--lvl-1/2/3`)
- `ux-wo` (work order)
- `ux-gantt`
- `ux-oee` (overall equipment effectiveness)
- `ux-pmatrix` (process matrix)

### Verticals — HR

- `ux-emp` (employee card) · `ux-shift` · `ux-vac` (vacation)
- `ux-org` (org chart) · `ux-payslip`

### Verticals — Commerce

- `ux-cart` · `ux-checkout` · `ux-coupon` · `ux-address-card`

### Multimedia

- `ux-gallery` · `ux-lightbox` · `ux-cropper`
- Media players are not yet shipped as components.

### Mobile / system

- `ux-ptr` · `ux-refresher` (pull-to-refresh)
- `ux-swipe` · `ux-fly`
- `ux-coach` (onboarding spotlight) · `ux-notif`

### Code & docs

- `ux-code` · `ux-md` (markdown body) · `ux-diff` · `ux-mark`

### States

- `ux-empty` · `ux-error` · `ux-disabled` · `ux-loading` · `ux-page-loading`

## Color & status semantics

Status colors are stable across components. When the agent picks a variant, the meaning is:

| Modifier   | Meaning              | Token            |
|------------|----------------------|------------------|
| `--brand`  | Primary / accent     | `--ux-brand` (terracota) |
| `--ok`, `--leaf` | Success / paid / done | `--ux-leaf`     |
| `--warn`   | Warning / pending    | `--ux-warn`      |
| `--danger` | Error / overdue      | `--ux-danger`    |
| `--info`   | Informational        | `--ux-info`      |

## Token cheatsheet (most commonly overridden)

```css
:root {
  /* Brand */
  --ux-brand: #E8552A;
  --ux-brand-2: #B83A12;          /* hover/pressed */
  --ux-brand-3: #FF7A4D;          /* focus ring */

  /* Surfaces (dark theme) */
  --ux-bg: #0B0A09;               /* canvas */
  --ux-bg-1: #131210;             /* sidebar/topbar */
  --ux-bg-2: #1A1815;             /* cards */
  --ux-bg-3: #221F1B;             /* inputs / hover */

  /* Text */
  --ux-ink: #F5F1EA;
  --ux-ink-2: #C4BCB0;            /* secondary */
  --ux-ink-3: #8A8378;            /* muted */

  /* Status */
  --ux-leaf: #4F9D6E;
  --ux-warn: #D8A23A;
  --ux-danger: #D8553F;
  --ux-info: #5B8CD9;

  /* Spacing scale (4px) */
  --ux-space-1: 4px; --ux-space-2: 8px; --ux-space-3: 12px;
  --ux-space-4: 16px; --ux-space-5: 24px; --ux-space-6: 32px;

  /* Radii */
  --ux-radius-sm: 6px; --ux-radius-md: 10px; --ux-radius-lg: 14px;
  --ux-radius-pill: 999px;

  /* Motion */
  --ux-dur-fast: 120ms; --ux-dur-base: 200ms;
}
```

Per-component tokens use a `--_*` prefix (e.g. `--_btn-h`, `--_btn-bg`) — don't override those from outside; theme via the public `--ux-*` tokens instead.

## Working examples (canonical patterns)

### Button row

```html
<div class="ux-btn-group">
  <button class="ux-btn ux-btn--primary">Save</button>
  <button class="ux-btn ux-btn--secondary">Draft</button>
  <button class="ux-btn ux-btn--ghost">Cancel</button>
</div>
```

### Card with header / body / actions

```html
<article class="ux-card">
  <header class="ux-card__header">
    <h3 class="ux-card__title">Order #1024</h3>
    <span class="ux-badge ux-badge--ok">Paid</span>
  </header>
  <div class="ux-card__body">3 items · 47.80 €</div>
  <footer class="ux-card__actions">
    <button class="ux-btn ux-btn--ghost ux-btn--sm">View</button>
    <button class="ux-btn ux-btn--primary ux-btn--sm">Print</button>
  </footer>
</article>
```

### Form field

```html
<label class="ux-field">
  <span class="ux-field__label">Email</span>
  <input class="ux-input" type="email" placeholder="you@erplora.com">
  <span class="ux-field__hint">We never share your email.</span>
</label>
```

### Modal toggled by Datastar

```html
<button class="ux-btn ux-btn--primary" data-on-click="$open = true">Open</button>

<div class="ux-modal-root" data-signals="{open: false}" data-show="$open">
  <div class="ux-backdrop" data-on-click="$open = false"></div>
  <div class="ux-modal">
    <header class="ux-modal__head"><h3>Confirm</h3></header>
    <div class="ux-modal__body">Are you sure?</div>
    <footer class="ux-modal__foot">
      <button class="ux-btn ux-btn--ghost" data-on-click="$open = false">Cancel</button>
      <button class="ux-btn ux-btn--danger">Delete</button>
    </footer>
  </div>
</div>
```

### Tabs

```html
<div class="ux-tabs" data-signals="{tab: 'general'}">
  <button class="ux-tab" data-on-click="$tab = 'general'"
          data-class-is-active="$tab === 'general'">General</button>
  <button class="ux-tab" data-on-click="$tab = 'advanced'"
          data-class-is-active="$tab === 'advanced'">Advanced</button>
</div>
<section data-show="$tab === 'general'">…</section>
<section data-show="$tab === 'advanced'">…</section>
```

## Where to find more

- **`previews/<name>.html`** in the source repo — one fully working preview per component, the most authoritative reference.
- **`lib/css/components/<name>.css`** — the component's CSS source. Read it to confirm exact class names and modifiers.
- **`lib/css/tokens.css`** — every theme variable.
- **`README.md`** — full catalog and Datastar patterns.
- **`llms.txt`** / **`llms-full.txt`** — machine-readable summary for context fetch.

## Versioning & deprecation

- Patch releases (`v2.0.x`) — bug fixes, no class changes.
- Minor releases (`v2.x.0`) — new components or new modifiers; existing classes never break.
- Major releases bump the prefix discussion (none planned for v2.x).

When suggesting a CDN URL, always include the version: `@v2.0.0`. Never recommend `@main`.
