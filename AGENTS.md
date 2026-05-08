# AGENTS.md — ERPlora UX

Open standard for coding agents. Detected automatically by Cursor, OpenAI Codex, GitHub Copilot Workspace, and most other LLM-powered editors. Mirror or copy this file into a consumer project as `AGENTS.md` (or `.cursorrules`, or `.github/copilot-instructions.md`) so the agent picks it up.

## What this library is

ERPlora UX is a **CSS-only semantic component library**. One stylesheet, ~200 components, prefix `ux-*`. **No Tailwind, no SCSS, no JS dependency.** Optional runtime interactivity is wired via [Datastar](https://data-star.dev) `data-*` attributes — never required.

- Latest: **v2.1.0** (~260 component blocks, 1932 classes total)
- CDN (always-current): `https://cdn.jsdelivr.net/gh/ERPlora/ux@latest/dist/erplora-ux.min.css`
- CDN (pinned): `https://cdn.jsdelivr.net/gh/ERPlora/ux@v2.1.0/dist/erplora-ux.min.css`
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
6. **CDN URL pattern**: prefer `@latest` for greenfield projects (auto-tracks newest semver tag), `@v2.1.0` (or current latest tag) for production deploys that need full reproducibility. Never recommend `@main` — it bypasses the CDN cache and breaks consumers when a commit lands.

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
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/ERPlora/ux@latest/dist/erplora-ux.min.css">
  <!-- Optional, for interactive previews -->
  <script type="module" src="https://cdn.jsdelivr.net/gh/starfederation/datastar@main/bundles/datastar.js"></script>
</head>
<body>
  <button class="ux-btn ux-btn--primary">Save</button>
</body>
</html>
```

Themes available out of the box: `data-theme="erplora"` (dark terracota, default), `data-theme="erplora-light"` (light variant). Apply on `<html>` or any subtree.

**Optional palette templates** (loaded as additional CSS, applied via `data-template`):

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/ERPlora/ux@latest/dist/templates/all.min.css">
<html data-theme="erplora" data-template="corporate">
```

Available templates (each has a dark + `-light` variant): `corporate` (banking navy), `minimal` (mono+gold), `forest` (earth green), `ocean` (tech teal), `violet` (creative purple). Templates only redefine `--ux-*` color tokens — geometry, typography and motion are unchanged. Pass them through to consumer apps when the brand asks for a different palette and you don't want to fork the library.

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

## v2.1 additions (2026-05-08) — actions, selection, inputs, layout, editors, verticals

### Actions extra (`actions-extra.css`)
- `ux-back-btn` — back navigation · `__icon`, `__label` · `--sm`, `--lg`, `--icon`
- `ux-split-btn` — primary action + dropdown caret · `__main`, `__sep`, `__caret` · `--primary`, `--secondary`, `--danger` · `--sm`, `--lg`
- `ux-calc` — visual calculator · `__display`, `__display-prev`, `__display-value`, `__keys`, `__key` (`--op`, `--equals`, `--fn`)
- `ux-app-icon` — app launcher tile · sizes `--xs/sm/lg/xl` · color variants `--brand/leaf/warn/danger/info` · gallery wrapper `ux-app-icons`

### Selection (`selection.css`)
- `ux-tag` — labeled tag (rectangular, ≠ chip) · variants `--brand/leaf/warn/danger/info/neutral`, `--solid` · removable child `__remove` · container `ux-tags`
- `ux-filter-chip` — toggleable filter chip with `is-active` · children `__icon`, `__label`, `__count`, `__check` · container `ux-filter-chips`
- `ux-toggle-group` — segmented buttons (≠ `ux-segment`, more substantial) · `__option` · `--ghost`, `--block` · sizes
- `ux-variant` — product color/size selector · `__swatch`, `__label` · states `is-selected/disabled/out` · `--size` for rectangular text swatches · container `ux-variants`
- `ux-qty-badge` — count badge · sizes `--xs/sm` · `--floating` for icon overlays · `--dot` for dot-only

### Inputs extra (`forms-inputs.css`)
- `ux-currency` — amount input with currency symbol · `__symbol`, `__input`, `__currency-select` · `--invalid` · sizes
- `ux-phone` — international phone with country selector · `__country`, `__flag`, `__dial`, `__input`, `__country-menu`, `__country-list`, `__country-item`
- `ux-qty-stepper` — `[-] qty [+]` (≠ workflow `ux-stepper`) · `__btn--minus`, `__btn--plus`, `__input/__value` · `--ghost`, `--block`

### Data extra (`data-extra.css`)
- `ux-json` — JSON tree viewer · `__row`, `__key`, `__string`, `__number`, `__bool`, `__null`, `__bracket`, `__caret`, `__nested` · `is-collapsed`
- `ux-qr` — QR code wrapper (always white bg) · sizes · `--bordered`
- `ux-stock` — stock indicator · `--in-stock/low/out` · `--soft`
- `ux-reorder` — sortable list with drag handles · `is-dragging`, `is-drop-target`
- `ux-vlist` — virtual list (visual styles) · `__row` · `--dense`
- `ux-carousel` — slide deck · `__track`, `__slide`, `__nav--prev/next`, `__dots`, `__dot--active` · `--cards`
- `ux-iscroll` — infinite scroll sentinel · `is-loading`, `is-end`
- `ux-load-more` — load-more button + count
- `ux-img` — image wrapper · aspect ratios `--square/portrait/video/free` · `is-loading/loaded`
- `ux-zoom` — image zoom · `is-zooming` · `--inline`, `--lightbox`

### Layout extra (`layout-extra.css`)
- `ux-panel` — surface panel · `__head`, `__body`, `__footer`, `__actions` · `--ghost`, `--bordered`, `--flush`, `--sticky-head`
- `ux-masonry` — column-based masonry · `--2/3/4/5`, responsive
- `ux-master-detail` — sidebar list + detail · `--compact`, `--wide`, `--mobile-detail`
- `ux-scroll` — styled scrollable container · `--x`, `--y`, `--both`, `--invisible`, `--fade`
- `ux-spacer` — flex spacer · sizes + `--block`, `--divider`
- `ux-resize` — resizable container · `__handle` · `--x`, `--y`
- `ux-split` — split-pane · `__pane`, `__divider` · `--vertical`, `--collapsed-left/right`
- `ux-toolbar` — horizontal action bar · `__group`, `__divider`, `__spacer`, `__title` · `--floating`, `--ghost`, `--sticky`

### Editors (`editors.css`)
- `ux-richtext` — rich text editor · `__toolbar`, `__btn`, `__divider`, `__select`, `__content`, `__footer` · `--minimal` · `is-focus`
- `ux-keyboard` — visual shortcut hints · `__row`, `__key`, `__plus` · `--inline`, `--compact`
- `ux-osk` — touch on-screen QWERTY · `--numeric`, `--compact` · `is-shift` · companion `ux-osk-display`
- `ux-vkb` — dense virtual keyboard · `--qwerty`, `--numeric`, `--symbol`, `--compact` · companion `ux-vkb-display`

### Multimedia extra (extends `multimedia.css`)
- `ux-audio` — audio player · `__play`, `__cover`, `__info`, `__progress`, `__bar`, `__fill`, `__time`, `__vol`, `__speed` · `--compact`, `--full` · `is-playing`
- `ux-video` — video player · `__el`, `__poster`, `__play-overlay`, `__controls`, `__btn`, `__progress` · `--sm/lg/contain/no-controls` · `is-playing`, `is-fullscreen`
- `ux-pdf` — PDF viewer · `__toolbar`, `__thumbs`, `__thumb`, `__viewer`, `__page`, `__page-content` · `--no-thumbs`, `--continuous`

### HR extra (extends `hr.css`)
- `ux-clock` — time clock · `__display`, `__date`, `__name`, `__status`, `__elapsed`, `__btn--in/out/break` · `--compact`, `--kiosk` · `is-clocked-in`, `is-on-break`
- `ux-shift-cal` — shift calendar grid · shifts `--morning/afternoon/night/off`
- `ux-attendance` — who's in/out today · status `--present/late/absent/leave` · `is-late`, `is-absent`
- `ux-perf` — performance meter · `--radial`, `--horizontal`, `--mini` · color `--good/avg/poor`

### Manufacturing extra (extends `manufacturing.css`)
- `ux-machine` — machine status card · `--running/idle/maintenance/down/setup` · `is-alert`
- `ux-prodline` — production line · stations + connectors · `is-running/idle/blocked` · `--vertical`
- `ux-qc` — quality checklist · items `is-pass/fail/skip/pending` · `--inspection-mode`
- `ux-batch` — batch tracker with traceability chain · `is-recalled`, `is-quarantined`

### Commerce extra (extends `commerce.css`)
- `ux-loyalty` — membership card · tier variants `--silver/gold/platinum/brand`
- `ux-ticket` — order/kitchen ticket · status `--new/prepping/ready/delivered` · type `--dine/takeaway/delivery` · `is-urgent`
- `ux-event-card` — calendar event · color variants · `is-now`
- `ux-product` — generic e-commerce product card · `--list`, `--compact`, `--grid` · `is-out`, `is-on-sale`, `is-wishlisted`

### Navigation extra (extends `navigation.css`)
- `ux-menubar` — desktop app menu bar · `__menu`, `__panel`, `__item`, `__separator`, `__submenu` · `--compact`, `--floating` · `is-open`
- `ux-scheduler` — weekly appointment grid · appointments `--brand/leaf/warn/danger/info` · `is-selecting/busy/blocked` · `--day` for single-day, sizes

## Grid system

Three layout primitives + modern CSS escape hatches. Use them in this order of preference: container queries → 12-col responsive grid → fixed `.ux-grid-N` → flex helpers.

### Container

```html
<div class="ux-container">…page content (max 1440px)…</div>
<div class="ux-container ux-container--reading">…article body (880px)…</div>
<div class="ux-container ux-container--narrow">…form (720px)…</div>
<div class="ux-container ux-container--fluid">…uses clamp() for organic padding…</div>
```

Modifiers: `--narrow` (720px) · `--reading` (880px) · default (1440px) · `--wide` (1440px) · `--full` · `--flush` · `--fluid` (clamp-based padding).

### 12-col responsive grid (`.ux-row` + `.ux-col-{N}`)

Mobile-first. Children default to `grid-column: span 12` (full width on phone) unless an explicit `.ux-col-sm-{n}` is set.

```html
<div class="ux-row">
  <main  class="ux-col-md-8 ux-col-lg-9">…</main>
  <aside class="ux-col-md-4 ux-col-lg-3 ux-col-sticky">…</aside>
</div>
```

- `.ux-col-{1..12}` — base span
- `.ux-col-sm-{1..12}` — explicit phone span (≤ 767px)
- `.ux-col-md-{1..12}` — tablet+ (≥ 768px)
- `.ux-col-lg-{1..12}` — desktop+ (≥ 1200px)
- `.ux-col-full` — `grid-column: 1 / -1` (the entire row)
- `.ux-col-auto` — natural width
- `.ux-col-sticky` — sticky-top, useful for sidebars

Row modifiers: `.ux-row--stack` (force one column) · `.ux-row--subgrid` (inherit parent's tracks) · `.ux-row--dense` (fill gaps with smaller items) · `.ux-row--gap-sm/lg/0`.

### Auto-fit grid (cards, gallery)

```html
<div class="ux-grid-auto ux-grid-auto--md">…cards reflow themselves…</div>
```

Variants: `--xs` (140px min) · `--sm` (180px) · `--md` (240px, default) · `--lg` (320px) · `--xl` (400px). Stack `--dense` for masonry-style packing.

### Fixed-N (legacy, still supported)

`.ux-grid-2 / -3 / -4 / -6` — N equal columns, auto-collapse on smaller viewports. Prefer `.ux-row` + `.ux-col-md-N` for new code.

### Container queries (component-relative responsiveness)

When a component might live in a sidebar/drawer at narrow width even on a desktop viewport, mark its wrapper `.ux-cq` and use container-query column variants:

```html
<aside class="ux-cq" style="width: 320px;">
  <div class="ux-row">
    <div class="ux-col-cq-12">narrow → full</div>
    <div class="ux-col-cq-6">at ≥480 container → half</div>
    <div class="ux-col-cq-6">at ≥480 container → half</div>
  </div>
</aside>
```

- `.ux-cq` makes the element a `container-type: inline-size` query root (named `ux`)
- `.ux-col-cq-{N}` applies when **container** ≥ 480px (not viewport)
- `.ux-col-cq-lg-{N}` applies when container ≥ 720px

This is the killer feature for components that move between dashboard / sidebar / modal contexts.

### Aspect-ratio cells

```html
<div class="ux-row">
  <figure class="ux-col-md-4 ux-cell-video">…16:9 thumbnail…</figure>
  <figure class="ux-col-md-4 ux-cell-square">…1:1…</figure>
</div>
```

Available: `--square` · `--video` (16:9) · `--photo` (4:3) · `--portrait` (3:4) · `--wide` (21:9).

### Logical-property spacing

`.ux-px-{3,4,6}` (padding-inline) · `.ux-py-{3,4,6}` (padding-block) · `.ux-mx-auto` · `.ux-my-auto`. Safe for RTL.

### Visibility per breakpoint

`.ux-hide-sm` (≤ 767) · `.ux-hide-md` (768-1199) · `.ux-hide-lg` (≥ 1200).
Container-query equivalents: `.ux-show-cq-md` · `.ux-hide-cq-md`.

### Decision tree

| Need | Use |
|------|-----|
| Page max-width wrapper | `.ux-container` |
| Header + main + sidebar layout | `.ux-row` + `.ux-col-md-N` |
| Card gallery (any count) | `.ux-grid-auto` |
| Component with adaptive children | `.ux-cq` + `.ux-col-cq-N` |
| Sticky sidebar | add `.ux-col-sticky` to the col |
| Masonry pack (varying heights) | `.ux-grid-auto--dense` |
| Aligned nested grid | `.ux-row--subgrid` inside another `.ux-row` |
| Responsive image cell | `.ux-cell-{video,square,photo,portrait,wide}` |

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

- **`previews/components/<name>.html`** in the source repo — one fully working preview per component, the most authoritative reference.
- **`previews/<domain>/<page>.html`** — full app-page mockups (saas + hub merged) under domains: `auth/`, `dashboard/`, `orgs/`, `hubs/`, `users/`, `billing/`, `marketplace/`, `modules/`, `employees/`, `roles/`, `settings/`, `profile/`, `errors/`, `system/`, `public/`. Where a screen exists in both products, the file is suffixed `-saas.html` or `-hub.html` (example: `auth/login-saas.html` and `auth/login-hub.html`).
- **`lib/css/components/<name>.css`** — the component's CSS source. Read it to confirm exact class names and modifiers.
- **`lib/css/tokens.css`** — every theme variable.
- **`README.md`** — full catalog and Datastar patterns.
- **`llms.txt`** / **`llms-full.txt`** — machine-readable summary for context fetch.

## Versioning & deprecation

- Patch releases (`v2.1.x`) — bug fixes, no class changes.
- Minor releases (`v2.x.0`) — new components or new modifiers; existing classes never break.
- Major releases bump the prefix discussion (none planned for v2.x).

CDN URL recommendations for agents to suggest:
- **Always-current**: `@latest` — auto-resolves to the most recent semver tag. Best for greenfield projects and demos.
- **Major-pinned**: `@v2` — locks to 2.x, gets minor + patch updates automatically.
- **Minor-pinned**: `@v2.1` — locks to 2.1.x, only gets patches.
- **Exact pin**: `@v2.1.0` — fully reproducible, recommended for production builds with locked deploys.
- **Never** recommend `@main` — bypasses CDN cache, can break consumers on any push.
