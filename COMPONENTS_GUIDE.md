# UX Component Library - Complete Component Guide

> **Zero-dependency, framework-agnostic CSS component library** with iOS/Ionic-style design.
>
> Total Components: **164 pages** | **1400+ examples** | Last Updated: 2026-02-02
>
> **Architecture:**
> - **Pure CSS** - All styling works without JavaScript
> - **Vanilla JS Components** - Optional JS classes for interactive components (modal, tabs, accordion, etc.)
> - **Web Components** - Framework-agnostic custom elements (`<ux-modal>`, `<ux-toast>`, `<ux-sheet>`, `<ux-alert>`)
> - **Alpine.js Support** - Full Alpine.js components with utilities ($debounce, $throttle, x-focus-trap, etc.)
> - **Framework agnostic** - Works with HTMX, React, Vue, Radix UI, vanilla JS
> - **State selectors** - Supports `data-state`, ARIA attributes, and `.is-*` classes
>
> **Files:**
> - `dist/ux.min.css` - Minified CSS bundle (~1.1MB)
> - `dist/ux.min.js` - Vanilla JS + Web Components (~40KB)
> - `docs/alpine-components.js` - Alpine.js components (~300KB)
>
> **Documentation:** [https://erplora.github.io/ux/docs/](https://erplora.github.io/ux/docs/)

---

## Quick Start

```html
<!-- CSS only - works with any framework -->
<link rel="stylesheet" href="dist/ux.min.css">

<!-- Optional: Vanilla JS components (modal, tabs, accordion, toast, etc.) -->
<script src="dist/ux.min.js"></script>

<!-- Optional: Alpine.js components (for demos) -->
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
<script src="docs/alpine-components.js"></script>
```

### Using Vanilla JS Components

```html
<!-- Auto-init via data attributes -->
<div id="my-modal" class="ux-modal-backdrop" data-ux="js" data-state="closed">
  <div class="ux-modal">
    <button data-ux-close>Close</button>
  </div>
</div>
<button onclick="UX.get('#my-modal').open()">Open Modal</button>

<!-- Manual init -->
<script>
  const modal = UX.create('modal', '#my-modal');
  modal.open();
</script>
```

---

## State Management

Components use CSS selectors that respond to multiple state attributes:

```html
<!-- Any of these work to show the modal -->
<div class="ux-modal-backdrop" data-state="open">      <!-- data-state -->
<div class="ux-modal-backdrop" aria-hidden="false">    <!-- ARIA -->
<div class="ux-modal-backdrop is-open">                <!-- class -->
```

**Common States:**
| State | data-state | ARIA | Class |
|-------|------------|------|-------|
| Open | `open` | `aria-hidden="false"` | `.is-open` |
| Closed | `closed` | `aria-hidden="true"` | - |
| Expanded | `expanded` | `aria-expanded="true"` | `.is-open` |
| Selected | `selected` | `aria-selected="true"` | `.is-selected` |

---

## Table of Contents

1. [Core](#1-core)
2. [Forms - Basic Inputs](#2-forms---basic-inputs)
3. [Forms - Advanced Inputs](#3-forms---advanced-inputs)
4. [Forms - Structure](#4-forms---structure)
5. [Buttons & Actions](#5-buttons--actions)
6. [Navigation](#6-navigation)
7. [Layout & Containers](#7-layout--containers)
8. [Overlays & Modals](#8-overlays--modals)
9. [Data Display](#9-data-display)
10. [Multimedia](#10-multimedia)
11. [Feedback & States](#11-feedback--states)
12. [POS / Retail](#12-pos--retail)
13. [HR / Employees](#13-hr--employees)
14. [Manufacturing](#14-manufacturing)
15. [Utilities](#15-utilities)

---

## Quick Reference - Color Composition

Components use a composition system for colors. Apply colors with utility classes:

```html
<!-- Filled -->
<button class="ux-button ux-color-primary">Primary</button>
<button class="ux-button ux-color-success">Success</button>
<button class="ux-button ux-color-danger">Danger</button>

<!-- Soft (tinted background) -->
<span class="ux-badge ux-color-warning--soft">Warning</span>

<!-- Outline (border only) -->
<button class="ux-button ux-color-primary--outline">Outline</button>
```

**Available Colors:** `primary`, `secondary`, `tertiary`, `success`, `warning`, `danger`, `dark`, `light`, `medium`

---

## Quick Reference - Common Modifiers

| Modifier | Description |
|----------|-------------|
| `--sm` | Small size |
| `--lg` | Large size |
| `--xl` | Extra large size |
| `--glass` | iOS Liquid Glass effect |
| `--outline` | Border-only style |
| `--disabled` | Disabled state |
| `--loading` | Loading state |

---

## 1. Core

### css/core/variables.css
Foundation CSS variables. Provides:
- CSS Variables (colors, spacing, typography, z-index)
- Color composition classes (`.ux-color-*`)
- Glass morphism system
- Dark mode support
- Theme classes

**Global Classes:**
- `.ux-color-{color}` - Filled color
- `.ux-color-{color}--soft` - Tinted background
- `.ux-color-{color}--outline` - Border only
- `.ux-dark` - Force dark mode
- `.ux-light` - Force light mode
- `.ux-theme-{name}` - Apply theme (ocean, emerald, purple, sunset, rose, teal, amber, slate, indigo, cyan, crimson, forest)

### css/core/utilities.css
Utility classes for spacing, flexbox, text, and more.

### js/ux-helpers.js (Optional)
Lightweight JavaScript utilities:
- `UX.setState(el, state)` - Set data-state
- `UX.modal.open(selector)` / `UX.modal.close(selector)` - Modal control
- `UX.lockScroll()` / `UX.unlockScroll()` - Scroll locking
- `UX.trapFocus(element)` - Focus trap
- `UX.announce(message)` - Screen reader announcements

---

## 2. Forms - Basic Inputs

### ux-input.css
Text input fields with floating labels.

| Class | Description |
|-------|-------------|
| `.ux-input` | Base input element |
| `.ux-input--sm` | Small input |
| `.ux-input--lg` | Large input |
| `.ux-input--filled` | Filled background style |
| `.ux-input--outline` | Outline style |
| `.ux-input--underline` | Underline only |
| `.ux-input--glass` | Glass effect |
| `.ux-input-group` | Input with label wrapper |
| `.ux-input-group--floating` | Floating label |
| `.ux-input-group--horizontal` | Horizontal layout |
| `.ux-input-group--error` | Error state |
| `.ux-input-group--success` | Success state |
| `.ux-input-wrapper` | Icon wrapper |
| `.ux-input-wrapper--icon-start` | Icon at start |
| `.ux-input-wrapper--icon-end` | Icon at end |
| `.ux-input-wrapper--clearable` | With clear button |

**Elements:** `__label`, `__helper`, `__error`, `__counter`, `__icon`, `__clear`

---

### ux-textarea.css
Multi-line text input.

| Class | Description |
|-------|-------------|
| `.ux-textarea` | Base textarea |
| `.ux-textarea--sm` | Small |
| `.ux-textarea--lg` | Large |
| `.ux-textarea--glass` | Glass effect |
| `.ux-textarea--autosize` | Auto-resize height |

---

### ux-checkbox.css
Checkbox input with custom styling.

| Class | Description |
|-------|-------------|
| `.ux-checkbox` | Checkbox wrapper |
| `.ux-checkbox--sm` | Small |
| `.ux-checkbox--lg` | Large |
| `.ux-checkbox--glass` | Glass effect |
| `.ux-checkbox--indeterminate` | Indeterminate state |

**Elements:** `__input`, `__checkmark`, `__label`

---

### ux-radio.css
Radio button input.

| Class | Description |
|-------|-------------|
| `.ux-radio` | Radio wrapper |
| `.ux-radio--sm` | Small |
| `.ux-radio--lg` | Large |
| `.ux-radio--glass` | Glass effect |
| `.ux-radio-group` | Group container |
| `.ux-radio-group--horizontal` | Horizontal layout |

**Elements:** `__input`, `__checkmark`, `__label`

---

### ux-toggle.css
Toggle/switch input.

| Class | Description |
|-------|-------------|
| `.ux-toggle` | Toggle wrapper |
| `.ux-toggle--sm` | Small |
| `.ux-toggle--lg` | Large |
| `.ux-toggle--glass` | Glass effect |
| `.ux-toggle--disabled` | Disabled state |

**Elements:** `__input`, `__track`, `__thumb`, `__label`

---

### ux-select.css
Native select dropdown with custom styling.

| Class | Description |
|-------|-------------|
| `.ux-select` | Select wrapper |
| `.ux-select--sm` | Small |
| `.ux-select--lg` | Large |
| `.ux-select--glass` | Glass effect |
| `.ux-select--multiple` | Multiple selection |

**Elements:** `__native`, `__icon`

---

### ux-range.css
Range slider input.

| Class | Description |
|-------|-------------|
| `.ux-range` | Range wrapper |
| `.ux-range--sm` | Small |
| `.ux-range--lg` | Large |
| `.ux-range--glass` | Glass effect |
| `.ux-range--dual` | Dual thumb |
| `.ux-range--vertical` | Vertical orientation |

**Elements:** `__input`, `__track`, `__fill`, `__thumb`, `__label`, `__value`

---

### ux-searchbar.css
Search input with icon.

| Class | Description |
|-------|-------------|
| `.ux-searchbar` | Searchbar wrapper |
| `.ux-searchbar--sm` | Small |
| `.ux-searchbar--lg` | Large |
| `.ux-searchbar--glass` | Glass effect |
| `.ux-searchbar--animated` | Animated expand |

**Elements:** `__input`, `__icon`, `__clear`, `__cancel`

---

### ux-rating.css
Star rating input.

| Class | Description |
|-------|-------------|
| `.ux-rating` | Rating wrapper |
| `.ux-rating--sm` | Small |
| `.ux-rating--lg` | Large |
| `.ux-rating--readonly` | Read-only display |
| `.ux-rating--half` | Half-star support |

**Elements:** `__star`, `__star--filled`, `__star--half`, `__value`

---

## 3. Forms - Advanced Inputs

### ux-datetime.css
Date and time picker.

| Class | Description |
|-------|-------------|
| `.ux-datetime` | Datetime wrapper |
| `.ux-datetime--glass` | Glass effect |
| `.ux-datetime--inline` | Inline calendar |

**Alpine Component:** `uxDatetime(options)`

---

### ux-color-picker.css
Color selection input.

| Class | Description |
|-------|-------------|
| `.ux-color-picker` | Color picker wrapper |
| `.ux-color-picker--glass` | Glass effect |
| `.ux-color-picker--inline` | Inline display |

**Elements:** `__preview`, `__input`, `__palette`, `__slider`

**Alpine Component:** `uxColorPicker(options)`

---

### ux-autocomplete.css
Autocomplete/combobox input.

| Class | Description |
|-------|-------------|
| `.ux-autocomplete` | Autocomplete wrapper |
| `.ux-autocomplete--glass` | Glass effect |
| `.ux-autocomplete--loading` | Loading state |

**Elements:** `__input`, `__dropdown`, `__item`, `__item--highlighted`, `__empty`

**Alpine Component:** `uxAutocomplete(options)`

---

### ux-tag-input.css
Multi-select with chips/tags.

| Class | Description |
|-------|-------------|
| `.ux-tag-input` | Tag input wrapper |
| `.ux-tag-input--glass` | Glass effect |

**Elements:** `__tags`, `__tag`, `__tag-remove`, `__input`

**Alpine Component:** `uxTagInput(options)`

---

### ux-otp-input.css
OTP/verification code input.

| Class | Description |
|-------|-------------|
| `.ux-otp-input` | OTP wrapper |
| `.ux-otp-input--sm` | Small |
| `.ux-otp-input--lg` | Large |
| `.ux-otp-input--glass` | Glass effect |
| `.ux-otp-input--error` | Error state |
| `.ux-otp-input--success` | Success state |

**Elements:** `__field`, `__separator`

**Alpine Component:** `uxOtpInput(options)`

---

### ux-currency-input.css
Currency formatted input.

| Class | Description |
|-------|-------------|
| `.ux-currency-input` | Currency input wrapper |
| `.ux-currency-input--glass` | Glass effect |

**Elements:** `__symbol`, `__input`

**Alpine Component:** `uxCurrencyInput(options)`

---

### ux-phone-input.css
Phone number with country code.

| Class | Description |
|-------|-------------|
| `.ux-phone-input` | Phone input wrapper |
| `.ux-phone-input--glass` | Glass effect |

**Elements:** `__country`, `__flag`, `__code`, `__input`

**Alpine Component:** `uxPhoneInput(options)`

---

### ux-signature-pad.css
Digital signature capture.

| Class | Description |
|-------|-------------|
| `.ux-signature-pad` | Signature pad wrapper |
| `.ux-signature-pad--glass` | Glass effect |

**Elements:** `__canvas`, `__actions`, `__clear`

**Alpine Component:** `uxSignaturePad(options)`

---

### ux-quantity-stepper.css
Quantity with +/- buttons.

| Class | Description |
|-------|-------------|
| `.ux-quantity-stepper` | Stepper wrapper |
| `.ux-quantity-stepper--sm` | Small |
| `.ux-quantity-stepper--lg` | Large |
| `.ux-quantity-stepper--glass` | Glass effect |
| `.ux-quantity-stepper--vertical` | Vertical layout |

**Elements:** `__button`, `__input`, `__value`

---

### ux-rich-text.css
WYSIWYG rich text editor.

| Class | Description |
|-------|-------------|
| `.ux-rich-text` | Editor wrapper |
| `.ux-rich-text--glass` | Glass effect |
| `.ux-rich-text--minimal` | Minimal toolbar |
| `.ux-rich-text--full` | Full toolbar |

**Elements:** `__toolbar`, `__button`, `__separator`, `__content`, `__source`, `__counter`

**Alpine Component:** `uxRichText(options)`

---

### ux-upload.css
File upload input.

| Class | Description |
|-------|-------------|
| `.ux-upload` | Upload wrapper |
| `.ux-upload--glass` | Glass effect |
| `.ux-upload--dragover` | Drag state |
| `.ux-upload-button` | Upload button style |
| `.ux-upload-area` | Drop zone style |

**Elements:** `__input`, `__preview`, `__progress`, `__remove`

---

### ux-date-range-picker.css
Date range selection.

| Class | Description |
|-------|-------------|
| `.ux-date-range-picker` | Picker wrapper |
| `.ux-date-range-picker--glass` | Glass effect |

**Alpine Component:** `uxDateRangePicker(options)`

---

## 4. Forms - Structure

### ux-form.css
Form layout and validation.

| Class | Description |
|-------|-------------|
| `.ux-form` | Form wrapper |
| `.ux-form--horizontal` | Horizontal layout |
| `.ux-form--inline` | Inline layout |
| `.ux-form-section` | Form section |
| `.ux-form-row` | Form row |
| `.ux-form-actions` | Action buttons |

---

### ux-form-wizard.css
Multi-step form wizard.

| Class | Description |
|-------|-------------|
| `.ux-form-wizard` | Wizard wrapper |
| `.ux-form-wizard--glass` | Glass effect |
| `.ux-form-wizard--vertical` | Vertical steps |

**Elements:** `__steps`, `__step`, `__step--active`, `__step--completed`, `__content`, `__actions`

**Alpine Component:** `uxFormWizard(options)`

---

## 5. Buttons & Actions

### ux-button.css
Button component with variants.

| Class | Description |
|-------|-------------|
| `.ux-button` | Base button |
| `.ux-button--outline` | Outline style |
| `.ux-button--clear` | Clear/ghost style |
| `.ux-button--glass` | Glass effect |
| `.ux-button--sm` | Small |
| `.ux-button--lg` | Large |
| `.ux-button--block` | Full width |
| `.ux-button--round` | Rounded/pill |
| `.ux-button--icon` | Icon-only button |
| `.ux-button--loading` | Loading state |
| `.ux-button--disabled` | Disabled state |

**Elements:** `__icon`, `__spinner`

---

### ux-icon-button.css
Icon-only button.

| Class | Description |
|-------|-------------|
| `.ux-icon-button` | Icon button |
| `.ux-icon-button--sm` | Small |
| `.ux-icon-button--lg` | Large |
| `.ux-icon-button--glass` | Glass effect |

---

### ux-icon-btn.css
Compact icon-only buttons for actions in tables, toolbars, and cards.

| Class | Description |
|-------|-------------|
| `.ux-icon-btn` | Base icon button |
| `.ux-icon-btn--xs` | Extra small (24px) |
| `.ux-icon-btn--sm` | Small (32px) |
| `.ux-icon-btn--lg` | Large (44px) |
| `.ux-icon-btn--xl` | Extra large (52px) |
| `.ux-icon-btn--primary` | Primary color |
| `.ux-icon-btn--success` | Success color |
| `.ux-icon-btn--warning` | Warning color |
| `.ux-icon-btn--danger` | Danger color |
| `.ux-icon-btn--info` | Info color |
| `.ux-icon-btn--active` | Active/selected state |
| `.ux-icon-btn--filled` | Filled background |
| `.ux-icon-btn--outlined` | Outlined border |
| `.ux-icon-btn--rounded` | Fully rounded (circle) |
| `.ux-icon-btn--glass` | Glass morphism |
| `.ux-icon-btn--badge` | Enable badge positioning |
| `.ux-icon-btn--loading` | Loading spinner state |

**Elements:** `__badge`, `__badge--dot`

**Group:** `.ux-icon-btn-group`, `.ux-icon-btn-group--divided`

---

### ux-menu-button.css
Hamburger menu button for navigation drawers and sidebars.

| Class | Description |
|-------|-------------|
| `.ux-menu-button` | Base menu button |
| `.ux-menu-button--sm` | Small |
| `.ux-menu-button--lg` | Large |
| `.ux-menu-button--glass` | Glass effect |
| `.ux-menu-button--filled` | Filled background |
| `.ux-menu-button--outlined` | Outlined border |
| `.ux-menu-button--rounded` | Fully rounded |
| `.ux-menu-button--open` | X animation state |

**Elements:** `__icon`, `__lines`, `__line`, `__label`

**State:** Add `data-state="open"` or `aria-expanded="true"` to animate hamburger to X.

---

### ux-button-group.css
Group of buttons.

| Class | Description |
|-------|-------------|
| `.ux-button-group` | Button group |
| `.ux-button-group--vertical` | Vertical layout |
| `.ux-button-group--sm` | Small buttons |
| `.ux-button-group--lg` | Large buttons |
| `.ux-button-group--glass` | Glass effect |

---

### ux-toggle-group.css
Group of toggle buttons.

| Class | Description |
|-------|-------------|
| `.ux-toggle-group` | Toggle group wrapper |
| `.ux-toggle-group--outline` | Outline style |
| `.ux-toggle-group--sm` | Small |
| `.ux-toggle-group--lg` | Large |
| `.ux-toggle-group--full` | Full width |
| `.ux-toggle-group--vertical` | Vertical layout |
| `.ux-toggle-group--spaced` | Gap between items |
| `.ux-toggle-group--primary` | Primary color active |
| `.ux-toggle-group--soft` | Soft color active |
| `.ux-toggle-group--glass` | Glass effect |
| `.ux-toggle-group--icon-only` | Icon-only items |
| `.ux-toggle-group--equal` | Equal width items |
| `.ux-toggle-group--segment` | iOS segment style |
| `.ux-toggle-group__item` | Toggle item |
| `.ux-toggle-group__icon` | Item icon |

**State:** `data-state="on"`, `aria-pressed="true"`, `.is-active`

**Data attributes:** `data-type="single|multiple"`

---

### ux-split-button.css
Button with dropdown.

| Class | Description |
|-------|-------------|
| `.ux-split-button` | Split button wrapper |
| `.ux-split-button--sm` | Small |
| `.ux-split-button--lg` | Large |

**Elements:** `__main`, `__toggle`, `__dropdown`

**Alpine Component:** `uxSplitButton(options)`

---

### ux-fab.css
Floating action button.

| Class | Description |
|-------|-------------|
| `.ux-fab` | FAB button |
| `.ux-fab--sm` | Small |
| `.ux-fab--extended` | Extended with label |
| `.ux-fab--glass` | Glass effect |
| `.ux-fab-container` | FAB container |
| `.ux-fab-container--top-left` | Position |
| `.ux-fab-container--top-right` | Position |
| `.ux-fab-container--bottom-left` | Position |
| `.ux-fab-container--bottom-right` | Position |

**Elements:** `__icon`, `__label`, `__actions`

---

### ux-chip.css
Chip/tag component.

| Class | Description |
|-------|-------------|
| `.ux-chip` | Base chip |
| `.ux-chip--sm` | Small |
| `.ux-chip--lg` | Large |
| `.ux-chip--outline` | Outline style |
| `.ux-chip--filled` | Filled style |
| `.ux-chip--glass` | Glass effect |
| `.ux-chip--clickable` | Clickable |
| `.ux-chip--selected` | Selected state |
| `.ux-chip--removable` | With remove button |

**Elements:** `__icon`, `__label`, `__remove`

---

### ux-badge.css
Badge/counter component.

| Class | Description |
|-------|-------------|
| `.ux-badge` | Base badge |
| `.ux-badge--xs` | Extra small |
| `.ux-badge--sm` | Small |
| `.ux-badge--lg` | Large |
| `.ux-badge--xl` | Extra large |
| `.ux-badge--dot` | Dot indicator |
| `.ux-badge--outline` | Outline style |
| `.ux-badge--soft` | Soft/tinted |
| `.ux-badge--glass` | Glass effect |
| `.ux-badge--pulse` | Pulse animation |
| `.ux-badge-container` | Badge wrapper |
| `.ux-badge-container--top-left` | Position |
| `.ux-badge-container--bottom-right` | Position |

---

### ux-tag.css
Removable tag.

| Class | Description |
|-------|-------------|
| `.ux-tag` | Base tag |
| `.ux-tag--sm` | Small |
| `.ux-tag--lg` | Large |
| `.ux-tag--outline` | Outline style |
| `.ux-tag--glass` | Glass effect |

**Elements:** `__label`, `__remove`

---

### ux-status-indicator.css
Status dot with label.

| Class | Description |
|-------|-------------|
| `.ux-status-indicator` | Status wrapper |
| `.ux-status-indicator--online` | Online status |
| `.ux-status-indicator--offline` | Offline status |
| `.ux-status-indicator--busy` | Busy status |
| `.ux-status-indicator--away` | Away status |
| `.ux-status-indicator--sm` | Small |
| `.ux-status-indicator--lg` | Large |

**Elements:** `__dot`, `__label`

---

## 6. Navigation

### ux-navbar.css
Top navigation bar.

| Class | Description |
|-------|-------------|
| `.ux-navbar` | Navbar wrapper |
| `.ux-navbar--safe-area` | Safe area padding |
| `.ux-navbar--translucent` | Translucent effect |
| `.ux-navbar--glass` | Glass effect |
| `.ux-navbar--transparent` | Transparent |
| `.ux-navbar--primary` | Primary color |
| `.ux-navbar--dark` | Dark color |
| `.ux-navbar--stacked` | Stacked layout |
| `.ux-navbar--large-title` | Large title style |
| `.ux-navbar--fixed` | Fixed position |
| `.ux-navbar--sticky` | Sticky position |
| `.ux-navbar--shadow` | Drop shadow |
| `.ux-navbar--sm` | Small height |
| `.ux-navbar--lg` | Large height |

**Elements:** `__start`, `__center`, `__end`, `__title`, `__subtitle`, `__button`, `__back`

---

### ux-toolbar.css
Action toolbar.

| Class | Description |
|-------|-------------|
| `.ux-toolbar` | Toolbar wrapper |
| `.ux-toolbar--glass` | Glass effect |
| `.ux-toolbar--sm` | Small |
| `.ux-toolbar--bottom` | Bottom position |

**Elements:** `__start`, `__center`, `__end`, `__button`, `__title`

---

### ux-tabs.css
Tab navigation.

| Class | Description |
|-------|-------------|
| `.ux-tabs` | Tabs container |
| `.ux-tab-bar` | Tab bar |
| `.ux-tab-bar--translucent` | Translucent |
| `.ux-tab-bar--glass` | Glass effect |
| `.ux-tab-bar--primary` | Primary color |
| `.ux-tab-bar--scrollable` | Scrollable tabs |
| `.ux-tab-bar--pills` | Pill style |
| `.ux-tab-bar--bottom` | Bottom tab bar |
| `.ux-tab-bar--sm` | Small |
| `.ux-tab-bar--lg` | Large |
| `.ux-tab-button` | Tab button |
| `.ux-tab-button--selected` | Selected state |
| `.ux-tab-button--disabled` | Disabled state |
| `.ux-tab-content` | Content container |
| `.ux-tab-panel` | Tab panel |

**Elements:** `__icon`, `__label`, `__badge`, `__indicator`

**Alpine Component:** `uxTabs(options)`

---

### ux-segment.css
Segment control (iOS style).

| Class | Description |
|-------|-------------|
| `.ux-segment` | Segment wrapper |
| `.ux-segment--glass` | Glass effect |
| `.ux-segment--sm` | Small |
| `.ux-segment--lg` | Large |
| `.ux-segment--block` | Full width |
| `.ux-segment-button` | Segment button |
| `.ux-segment-button--selected` | Selected state |

**Alpine Component:** `uxSegment(options)`

---

### ux-breadcrumbs.css
Breadcrumb navigation.

| Class | Description |
|-------|-------------|
| `.ux-breadcrumbs` | Breadcrumbs wrapper |
| `.ux-breadcrumbs--glass` | Glass effect |
| `.ux-breadcrumb` | Breadcrumb item |
| `.ux-breadcrumb--active` | Current item |

**Elements:** `__separator`, `__icon`, `__label`

---

### ux-back-button.css
Back navigation button.

| Class | Description |
|-------|-------------|
| `.ux-back-button` | Back button |
| `.ux-back-button--text` | With text label |

**Elements:** `__icon`, `__text`

---

### ux-menu.css
Sidebar menu.

| Class | Description |
|-------|-------------|
| `.ux-menu` | Menu wrapper |
| `.ux-menu--glass` | Glass effect |
| `.ux-menu--collapsed` | Collapsed state |
| `.ux-menu-item` | Menu item |
| `.ux-menu-item--active` | Active item |
| `.ux-menu-item--disabled` | Disabled item |
| `.ux-menu-group` | Item group |
| `.ux-menu-divider` | Divider |

**Elements:** `__icon`, `__label`, `__badge`, `__arrow`

---

### ux-dropdown.css
Dropdown menu.

| Class | Description |
|-------|-------------|
| `.ux-dropdown` | Dropdown wrapper |
| `.ux-dropdown--glass` | Glass effect |
| `.ux-dropdown__trigger` | Trigger element |
| `.ux-dropdown__menu` | Menu container |
| `.ux-dropdown__item` | Menu item |
| `.ux-dropdown__divider` | Divider |

**Alpine Component:** `uxDropdown(options)`

---

### ux-context-menu.css
Right-click context menu.

| Class | Description |
|-------|-------------|
| `.ux-context-menu` | Context menu |
| `.ux-context-menu--glass` | Glass effect |
| `.ux-context-menu__item` | Menu item |
| `.ux-context-menu__divider` | Divider |
| `.ux-context-menu__submenu` | Submenu |

**Alpine Component:** `uxContextMenu(options)`

---

### ux-command.css
Command palette (⌘K).

| Class | Description |
|-------|-------------|
| `.ux-command` | Command palette |
| `.ux-command--glass` | Glass effect |

**Elements:** `__input`, `__list`, `__item`, `__group`, `__empty`, `__shortcut`

**Alpine Component:** `uxCommand(options)`

---

### ux-mega-menu.css
Mega menu for complex navigation.

| Class | Description |
|-------|-------------|
| `.ux-mega-menu` | Mega menu wrapper |
| `.ux-mega-menu--glass` | Glass effect |

**Elements:** `__trigger`, `__panel`, `__section`, `__title`, `__list`, `__item`

**Alpine Component:** `uxMegaMenu(options)`

---

### ux-pagination.css
Page navigation.

| Class | Description |
|-------|-------------|
| `.ux-pagination` | Pagination wrapper |
| `.ux-pagination--sm` | Small |
| `.ux-pagination--lg` | Large |
| `.ux-pagination--glass` | Glass effect |
| `.ux-pagination__button` | Page button |
| `.ux-pagination__button--active` | Active page |

**Alpine Component:** `uxPagination(options)`

---

### ux-infinite-scroll.css
Infinite scroll loading.

| Class | Description |
|-------|-------------|
| `.ux-infinite-scroll` | Scroll wrapper |

**Elements:** `__loader`, `__end`

**Alpine Component:** `uxInfiniteScroll(options)`

---

### ux-load-more.css
Load more button.

| Class | Description |
|-------|-------------|
| `.ux-load-more` | Load more wrapper |

**Elements:** `__button`, `__loader`, `__count`

**Alpine Component:** `uxLoadMore(options)`

---

### ux-menubar.css
Horizontal menu bar with dropdowns (desktop app style).

| Class | Description |
|-------|-------------|
| `.ux-menubar` | Menu bar wrapper |
| `.ux-menubar--glass` | Glass effect |
| `.ux-menubar--compact` | Compact size |
| `.ux-menubar__menu` | Menu container |
| `.ux-menubar__trigger` | Menu trigger button |
| `.ux-menubar__content` | Dropdown content |
| `.ux-menubar__item` | Menu item |
| `.ux-menubar__item--destructive` | Destructive style |
| `.ux-menubar__item--inset` | Inset padding |
| `.ux-menubar__checkbox` | Checkbox item |
| `.ux-menubar__radio` | Radio item |
| `.ux-menubar__indicator` | Check indicator |
| `.ux-menubar__label` | Section label |
| `.ux-menubar__separator` | Separator line |
| `.ux-menubar__sub` | Submenu container |
| `.ux-menubar__sub-trigger` | Submenu trigger |
| `.ux-menubar__sub-content` | Submenu content |
| `.ux-menubar__shortcut` | Keyboard shortcut |
| `.ux-menubar__icon` | Item icon |

**State:** `data-state="open"`, `aria-expanded="true"`, `.is-active`

---

## 7. Layout & Containers

### ux-card.css
Card container.

| Class | Description |
|-------|-------------|
| `.ux-card` | Base card |
| `.ux-card--outline` | Outline border |
| `.ux-card--flat` | No shadow |
| `.ux-card--elevated` | Elevated shadow |
| `.ux-card--inset` | Inset style |
| `.ux-card--glass` | Glass effect |
| `.ux-card--clickable` | Clickable card |
| `.ux-card--horizontal` | Horizontal layout |
| `.ux-card--sm` | Small |
| `.ux-card--lg` | Large |
| `.ux-card--loading` | Loading state |
| `.ux-card--icon` | Icon card style |
| `.ux-card--app` | App card style |

**Elements:** `__header`, `__media`, `__body`, `__content`, `__footer`, `__actions`, `__title`, `__subtitle`, `__avatar`, `__icon`, `__badge`

---

### ux-content.css
Page content wrapper and scroll components.

| Class | Description |
|-------|-------------|
| `.ux-content` | Content wrapper |
| `.ux-content--padding` | With padding |
| `.ux-content--fullscreen` | Fullscreen |
| `.ux-split-pane` | Split pane layout |
| `.ux-split-pane--collapsed` | Collapsed sidebar |

---

### ux-section.css
Content section with header.

| Class | Description |
|-------|-------------|
| `.ux-section` | Section wrapper |
| `.ux-section--glass` | Glass effect |
| `.ux-section--collapsible` | Collapsible |

**Elements:** `__header`, `__title`, `__subtitle`, `__actions`, `__content`

---

### ux-panel.css
Collapsible panel.

| Class | Description |
|-------|-------------|
| `.ux-panel` | Panel wrapper |
| `.ux-panel--glass` | Glass effect |
| `.ux-panel--collapsed` | Collapsed state |

**Elements:** `__header`, `__title`, `__toggle`, `__content`

**Alpine Component:** `uxPanel(options)`, `uxPanelDetail(options)`

---

### ux-accordion.css
Accordion component.

| Class | Description |
|-------|-------------|
| `.ux-accordion` | Accordion wrapper |
| `.ux-accordion--glass` | Glass effect |
| `.ux-accordion-item` | Accordion item |
| `.ux-accordion-item--open` | Open state |

**Elements:** `__header`, `__title`, `__icon`, `__content`

**Alpine Component:** `uxAccordion(options)`

---

### ux-divider.css
Horizontal/vertical divider.

| Class | Description |
|-------|-------------|
| `.ux-divider` | Horizontal divider |
| `.ux-divider--vertical` | Vertical divider |
| `.ux-divider--inset` | Inset margin |
| `.ux-divider--text` | With text |

---

### ux-spacer.css
Flexible spacer.

| Class | Description |
|-------|-------------|
| `.ux-spacer` | Flex spacer |
| `.ux-spacer--xs` | Extra small gap |
| `.ux-spacer--sm` | Small gap |
| `.ux-spacer--md` | Medium gap |
| `.ux-spacer--lg` | Large gap |
| `.ux-spacer--xl` | Extra large gap |

---

### ux-table.css
Basic CSS table styles.

| Class | Description |
|-------|-------------|
| `.ux-table` | Table base class |
| `.ux-table-wrapper` | Wrapper with rounded corners |
| `.ux-table-responsive` | Horizontal scroll container |
| `.ux-table--striped` | Alternating row backgrounds |
| `.ux-table--hover` | Row hover effect |
| `.ux-table--bordered` | Borders on all cells |
| `.ux-table--compact` | Reduced padding |
| `.ux-table--relaxed` | Increased padding |
| `.ux-table--fixed` | Fixed column widths |
| `.ux-table--glass` | Glass morphism variant |
| `.ux-table-wrapper--glass` | Glass wrapper |

**Cell utilities:** `.text-center`, `.text-right`, `.text-nowrap`

---

### ux-list.css
List component.

| Class | Description |
|-------|-------------|
| `.ux-list` | List wrapper |
| `.ux-list--inset` | Inset margin |
| `.ux-list--glass` | Glass effect |
| `.ux-list-item` | List item |
| `.ux-list-item--clickable` | Clickable item |
| `.ux-list-item--selected` | Selected state |
| `.ux-list-item--disabled` | Disabled state |
| `.ux-list-header` | List header |
| `.ux-list-divider` | List divider |

**Elements:** `__start`, `__content`, `__end`, `__title`, `__subtitle`, `__note`

---

### ux-virtual-list.css
Virtualized list for large datasets.

| Class | Description |
|-------|-------------|
| `.ux-virtual-list` | Virtual list wrapper |

**Alpine Component:** `uxVirtualList(options)`

---

### ux-tree.css
Hierarchical tree view.

| Class | Description |
|-------|-------------|
| `.ux-tree` | Tree wrapper |
| `.ux-tree--glass` | Glass effect |
| `.ux-tree-item` | Tree item |
| `.ux-tree-item--expanded` | Expanded state |
| `.ux-tree-item--selected` | Selected state |

**Elements:** `__toggle`, `__icon`, `__label`, `__children`

**Alpine Component:** `uxTree(options)`

---

### ux-reorder.css
Drag and drop reorder.

| Class | Description |
|-------|-------------|
| `.ux-reorder` | Reorder wrapper |
| `.ux-reorder-item` | Reorder item |
| `.ux-reorder-item--dragging` | Dragging state |

**Elements:** `__handle`

**Alpine Component:** `uxReorder(options)`

---

### ux-master-detail.css
Master-detail two-panel layout.

| Class | Description |
|-------|-------------|
| `.ux-master-detail` | Layout wrapper |
| `.ux-master-detail--stacked` | Stacked on mobile |

**Elements:** `__master`, `__detail`, `__placeholder`

**Alpine Component:** `uxMasterDetail(options)`

---

### ux-split-pane-right.css
Split pane with right panel.

| Class | Description |
|-------|-------------|
| `.ux-split-pane-right` | Split pane wrapper |

**Elements:** `__main`, `__panel`

**Alpine Component:** `uxSplitPaneRight(options)`

---

### ux-shell.css
Application shell layout.

| Class | Description |
|-------|-------------|
| `.ux-shell` | Shell wrapper |
| `.ux-shell--sidebar` | Enable sidebar layout |
| `.ux-shell--toolbar` | Enable toolbar layout |
| `.ux-shell--bottom-nav` | Enable bottom navigation (mobile) |
| `.ux-shell--sidebar-collapsed` | Collapsed sidebar (desktop) |
| `.ux-shell--sidebar-open` | Sidebar open as drawer (mobile) |
| `.ux-shell--glass` | Glass morphism variant |

**Elements:**

| Class | Description |
|-------|-------------|
| `.ux-shell__navbar` | Top navbar (56px) |
| `.ux-shell__navbar-toggle` | Hamburger menu button |
| `.ux-shell__navbar-brand` | Brand/logo text |
| `.ux-shell__navbar-actions` | Right side actions |
| `.ux-shell__toolbar` | Contextual toolbar (48px) |
| `.ux-shell__sidebar` | Side navigation (250px / 56px collapsed) |
| `.ux-shell__sidebar-header` | Header with logo and title |
| `.ux-shell__sidebar-logo` | Logo (expands when collapsed) |
| `.ux-shell__sidebar-title` | Title (hides when collapsed) |
| `.ux-shell__sidebar-nav` | Navigation container |
| `.ux-shell__sidebar-item` | Navigation item |
| `.ux-shell__sidebar-item--active` | Active state |
| `.ux-shell__sidebar-item-icon` | Item icon |
| `.ux-shell__sidebar-item-text` | Item text |
| `.ux-shell__sidebar-backdrop` | Overlay backdrop (mobile) |
| `.ux-shell__main` | Main content area |
| `.ux-shell__bottom-nav` | Bottom navigation (mobile only) |
| `.ux-shell__bottom-nav-item` | Bottom nav item |
| `.ux-shell__bottom-nav-item--active` | Active state |

**Alpine Component:** `uxShell(options)`

---

### ux-dashboard-grid.css
Dashboard widget grid.

| Class | Description |
|-------|-------------|
| `.ux-dashboard-grid` | Grid wrapper |
| `.ux-dashboard-widget` | Widget item |
| `.ux-dashboard-widget--dragging` | Dragging state |

**Elements:** `__header`, `__content`, `__handle`

**Alpine Component:** `uxDashboardGrid(options)`

---

### ux-kanban.css
Kanban board.

| Class | Description |
|-------|-------------|
| `.ux-kanban` | Kanban wrapper |
| `.ux-kanban--glass` | Glass effect |
| `.ux-kanban-column` | Kanban column |
| `.ux-kanban-card` | Kanban card |
| `.ux-kanban-card--dragging` | Dragging state |

**Elements:** `__header`, `__title`, `__count`, `__content`, `__footer`

**Alpine Component:** `uxKanban(options)`

---

### ux-timeline.css
Timeline layout.

| Class | Description |
|-------|-------------|
| `.ux-timeline` | Timeline wrapper |
| `.ux-timeline--glass` | Glass effect |
| `.ux-timeline--alternate` | Alternating sides |
| `.ux-timeline-item` | Timeline item |
| `.ux-timeline-item--success` | Success state |
| `.ux-timeline-item--warning` | Warning state |
| `.ux-timeline-item--danger` | Danger state |

**Elements:** `__marker`, `__content`, `__time`, `__title`, `__description`

---

### ux-masonry.css
Masonry grid layout.

| Class | Description |
|-------|-------------|
| `.ux-masonry` | Masonry wrapper |
| `.ux-masonry--2-cols` | 2 columns |
| `.ux-masonry--3-cols` | 3 columns |
| `.ux-masonry--4-cols` | 4 columns |
| `.ux-masonry--5-cols` | 5 columns |
| `.ux-masonry-item` | Masonry item |

**Alpine Component:** `uxMasonry(options)`

---

### ux-aspect-ratio.css
Maintains aspect ratio for content.

| Class | Description |
|-------|-------------|
| `.ux-aspect-ratio` | Base wrapper |
| `.ux-aspect-ratio--square` | 1:1 ratio |
| `.ux-aspect-ratio--video` | 16:9 ratio |
| `.ux-aspect-ratio--16-9` | 16:9 ratio |
| `.ux-aspect-ratio--4-3` | 4:3 ratio |
| `.ux-aspect-ratio--3-2` | 3:2 ratio |
| `.ux-aspect-ratio--21-9` | 21:9 ratio |
| `.ux-aspect-ratio--portrait` | 3:4 ratio |
| `.ux-aspect-ratio--golden` | Golden ratio |
| `.ux-aspect-ratio--custom` | Custom via `--ux-aspect-ratio` |
| `.ux-aspect-ratio--contain` | Object-fit contain |
| `.ux-aspect-ratio--fill` | Object-fit fill |

**Elements:** `__content`

---

### ux-resizable.css
Resizable panels with drag handles.

| Class | Description |
|-------|-------------|
| `.ux-resizable` | Panel group |
| `.ux-resizable--vertical` | Vertical layout |
| `.ux-resizable--sm` | Small handle |
| `.ux-resizable--lg` | Large handle |
| `.ux-resizable--glass` | Glass effect |
| `.ux-resizable--disabled` | Disabled state |
| `.ux-resizable__panel` | Panel |
| `.ux-resizable__handle` | Drag handle |
| `.ux-resizable__handle--hidden` | Invisible handle |
| `.ux-resizable__handle--bordered` | Border style |
| `.ux-resizable__handle--dotted` | Dotted style |
| `.ux-resizable__grip` | Visual grip icon |
| `.ux-resizable__collapse-button` | Collapse button |

---

### ux-scroll-area.css
Custom scrollbar styling.

| Class | Description |
|-------|-------------|
| `.ux-scroll-area` | Scroll container |
| `.ux-scroll-area--sm` | Small scrollbar |
| `.ux-scroll-area--lg` | Large scrollbar |
| `.ux-scroll-area--auto-hide` | Auto-hide scrollbar |
| `.ux-scroll-area--always-visible` | Always show scrollbar |
| `.ux-scroll-area--inset` | Inset scrollbar |
| `.ux-scroll-area--track-visible` | Visible track |
| `.ux-scroll-area--snap-x` | Horizontal snap |
| `.ux-scroll-area--snap-y` | Vertical snap |
| `.ux-scroll-area--horizontal-only` | Horizontal scroll only |
| `.ux-scroll-area--vertical-only` | Vertical scroll only |
| `.ux-scroll-area--glass` | Glass effect |
| `.ux-scrollbar` | Utility for any element |
| `.ux-scrollbar--thin` | Thin scrollbar |
| `.ux-scrollbar--hidden` | Hidden scrollbar |

**Elements:** `__viewport`, `__scrollbar`, `__thumb`

---

### ux-sidebar.css
Complex sidebar navigation.

| Class | Description |
|-------|-------------|
| `.ux-sidebar-wrapper` | Layout wrapper |
| `.ux-sidebar` | Sidebar component |
| `.ux-sidebar--right` | Right side |
| `.ux-sidebar--floating` | Floating style |
| `.ux-sidebar--inset` | Inset style |
| `.ux-sidebar--glass` | Glass effect |
| `.ux-sidebar-gap` | Content spacer |
| `.ux-sidebar-inset` | Main content area |
| `.ux-sidebar-trigger` | Toggle button |
| `.ux-sidebar-backdrop` | Mobile backdrop |

**State:** `data-state="collapsed|expanded"`, `.is-collapsed`

**Elements:** `__header`, `__logo`, `__content`, `__footer`, `__group`, `__group-label`, `__menu`, `__menu-item`, `__menu-button`, `__icon`, `__label`, `__badge`, `__chevron`, `__submenu`, `__separator`, `__user`, `__user-avatar`, `__user-info`, `__user-name`, `__user-email`, `__rail`

---

## 8. Overlays & Modals

### ux-modal.css
Modal dialog.

| Class | Description |
|-------|-------------|
| `.ux-modal` | Modal wrapper |
| `.ux-modal--glass` | Glass effect |
| `.ux-modal--full-height` | Full height |
| `.ux-modal--side` | Side modal |
| `.ux-modal--left` | Left side |
| `.ux-modal--right` | Right side |
| `.ux-modal-backdrop` | Backdrop overlay |

**Elements:** `__header`, `__title`, `__subtitle`, `__close`, `__content`, `__footer`, `__handle`

**Alpine Component:** `uxModal(options)`

---

### ux-sheet.css
Bottom/side sheet.

| Class | Description |
|-------|-------------|
| `.ux-sheet` | Sheet wrapper |
| `.ux-sheet--glass` | Glass effect |
| `.ux-sheet--full` | Full height |
| `.ux-sheet--left` | Left side |
| `.ux-sheet--right` | Right side |

**Elements:** `__handle`, `__header`, `__content`, `__footer`

**Alpine Component:** `uxSheet(options)`

---

### ux-drawer.css
Sidebar drawer.

| Class | Description |
|-------|-------------|
| `.ux-drawer` | Drawer wrapper |
| `.ux-drawer--glass` | Glass effect |
| `.ux-drawer--left` | Left side |
| `.ux-drawer--right` | Right side |
| `.ux-drawer--open` | Open state |

**Elements:** `__header`, `__content`, `__footer`

**Alpine Component:** `uxDrawer(options)`

---

### ux-alert.css
Alert dialog.

| Class | Description |
|-------|-------------|
| `.ux-alert` | Alert wrapper |
| `.ux-alert--glass` | Glass effect |
| `.ux-alert--success` | Success variant |
| `.ux-alert--warning` | Warning variant |
| `.ux-alert--danger` | Danger variant |
| `.ux-alert--info` | Info variant |

**Elements:** `__icon`, `__title`, `__message`, `__actions`

**Alpine Component:** `uxAlert(options)`

---

### ux-fullscreen-modal.css
Fullscreen modal.

| Class | Description |
|-------|-------------|
| `.ux-fullscreen-modal` | Fullscreen modal |
| `.ux-fullscreen-modal--glass` | Glass effect |

**Elements:** `__header`, `__close`, `__content`

**Alpine Component:** `uxFullscreenModal(options)`

---

### ux-lightbox.css
Image lightbox viewer.

| Class | Description |
|-------|-------------|
| `.ux-lightbox` | Lightbox wrapper |

**Elements:** `__image`, `__nav`, `__close`, `__counter`

**Alpine Component:** `uxLightbox(options)`

---

### ux-popover.css
Popover and dropdown.

| Class | Description |
|-------|-------------|
| `.ux-popover` | Popover wrapper |
| `.ux-popover--glass` | Glass effect |
| `.ux-popover--dropdown` | Dropdown style |
| `.ux-popover--top` | Top position |
| `.ux-popover--bottom` | Bottom position |
| `.ux-popover--left` | Left position |
| `.ux-popover--right` | Right position |

**Elements:** `__arrow`, `__content`

**Alpine Component:** `uxPopover(options)`

---

### ux-hover-card.css
Card that appears on hover over trigger.

| Class | Description |
|-------|-------------|
| `.ux-hover-card` | Wrapper |
| `.ux-hover-card--top` | Top position |
| `.ux-hover-card--left` | Left position |
| `.ux-hover-card--right` | Right position |
| `.ux-hover-card--align-start` | Start alignment |
| `.ux-hover-card--align-end` | End alignment |
| `.ux-hover-card--sm` | Small size |
| `.ux-hover-card--lg` | Large size |
| `.ux-hover-card--glass` | Glass effect |
| `.ux-hover-card--delay` | Delayed show |
| `.ux-hover-card--instant` | No animation |
| `.ux-hover-card__trigger` | Hover trigger |
| `.ux-hover-card__content` | Card content |
| `.ux-hover-card__header` | Card header |
| `.ux-hover-card__avatar` | Avatar image |
| `.ux-hover-card__info` | Info wrapper |
| `.ux-hover-card__title` | Title |
| `.ux-hover-card__subtitle` | Subtitle |
| `.ux-hover-card__description` | Description |
| `.ux-hover-card__footer` | Footer |
| `.ux-hover-card__meta` | Meta info |
| `.ux-hover-card__arrow` | Arrow pointer |

**State:** `data-state="open"`, `.ux-hover-card--open`, `:hover`

---

### ux-tooltip.css
Tooltip component.

| Class | Description |
|-------|-------------|
| `.ux-tooltip` | Tooltip wrapper |
| `.ux-tooltip--top` | Top position |
| `.ux-tooltip--bottom` | Bottom position |
| `.ux-tooltip--left` | Left position |
| `.ux-tooltip--right` | Right position |

**Alpine Directive:** `x-tooltip`

---

### ux-toast.css
Toast notifications.

| Class | Description |
|-------|-------------|
| `.ux-toast` | Toast notification |
| `.ux-toast--success` | Success variant |
| `.ux-toast--warning` | Warning variant |
| `.ux-toast--danger` | Danger variant |
| `.ux-toast--glass` | Glass effect |
| `.ux-toast--sm` | Small |
| `.ux-toast--lg` | Large |
| `.ux-toast-container` | Container |
| `.ux-toast-container--top` | Top position |
| `.ux-toast-container--bottom` | Bottom position |
| `.ux-toast-container--center` | Center position |

**Elements:** `__icon`, `__content`, `__message`, `__title`, `__action`, `__close`, `__progress`

**Alpine Component:** `uxToast(options)`

---

### ux-snackbar.css
Snackbar with action.

| Class | Description |
|-------|-------------|
| `.ux-snackbar` | Snackbar wrapper |
| `.ux-snackbar--glass` | Glass effect |

**Elements:** `__message`, `__action`, `__close`

**Alpine Component:** `uxSnackbar(options)`

---

### ux-notifications.css
Notification center.

| Class | Description |
|-------|-------------|
| `.ux-notifications` | Notification center |
| `.ux-notification` | Notification item |
| `.ux-notification--unread` | Unread state |

**Elements:** `__header`, `__list`, `__item`, `__title`, `__message`, `__time`, `__actions`

**Alpine Component:** `uxNotifications(options)`

---

### ux-loading.css
Loading overlay.

| Class | Description |
|-------|-------------|
| `.ux-loading` | Loading overlay |
| `.ux-loading--glass` | Glass effect |
| `.ux-loading--fullscreen` | Fullscreen |

**Elements:** `__spinner`, `__message`

**Alpine Component:** `uxLoading(options)`

---

### ux-picker.css
iOS-style picker.

| Class | Description |
|-------|-------------|
| `.ux-picker` | Picker wrapper |
| `.ux-picker--glass` | Glass effect |

**Elements:** `__header`, `__columns`, `__column`, `__item`, `__highlight`

**Alpine Component:** `uxPicker(options)`

---

## 9. Data Display

### ux-datatable.css
Data table with features.

| Class | Description |
|-------|-------------|
| `.ux-datatable` | Table wrapper |
| `.ux-datatable--glass` | Glass effect |
| `.ux-datatable--striped` | Striped rows |
| `.ux-datatable--bordered` | Bordered cells |
| `.ux-datatable--hover` | Hover effect |
| `.ux-datatable--compact` | Compact spacing |
| `.ux-datatable--responsive` | Auto cards on mobile |
| `.ux-datatable--cards` | Force cards view (any screen) |
| `.ux-datatable--table-forced` | Force table view (any screen) |
| `.ux-datatable--resizable` | Resizable columns |

**View Toggle Elements:**

| Class | Description |
|-------|-------------|
| `.ux-datatable__view-toggle` | Toggle container |
| `.ux-datatable__view-toggle-btn` | Toggle button |
| `.ux-datatable__view-toggle-btn--active` | Active state |

**Elements:** `__header`, `__body`, `__row`, `__cell`, `__sort`, `__checkbox`, `__expand`, `__empty`, `__pagination`, `__resize-handle`, `__column-toggle`

**Features:** Sortable, filterable, selectable, expandable, sticky header, export, column resize, column visibility, **view toggle (table/cards)**

**Alpine Component:** `uxDatatable(options)`
- `viewMode: 'table' | 'cards'` - Current view mode
- `showViewToggle: true` - Show toggle buttons (default: true)
- `setViewMode(mode)` - Set view mode
- `toggleViewMode()` - Toggle between table and cards

---

### ux-stats.css
Stats/KPI card.

| Class | Description |
|-------|-------------|
| `.ux-stats` | Stats wrapper |
| `.ux-stats--glass` | Glass effect |
| `.ux-stat` | Individual stat |
| `.ux-stat--success` | Success trend |
| `.ux-stat--danger` | Danger trend |

**Elements:** `__label`, `__value`, `__trend`, `__icon`, `__chart`

---

### ux-kpi-card.css
Dashboard KPI cards with value, change indicator, and progress bar.

| Class | Description |
|-------|-------------|
| `.ux-kpi-card` | KPI card wrapper |
| `.ux-kpi-card--glass` | Glass effect |
| `.ux-kpi-card--sm` | Small size |
| `.ux-kpi-card--lg` | Large size |
| `.ux-kpi-card--primary` | Primary color |
| `.ux-kpi-card--success` | Success color |
| `.ux-kpi-card--warning` | Warning color |
| `.ux-kpi-card--danger` | Danger color |
| `.ux-kpi-card--info` | Info color |
| `.ux-kpi-card--purple` | Purple color |

**Elements:** `__header`, `__icon`, `__change`, `__change--up`, `__change--down`, `__label`, `__value`, `__progress`, `__progress-bar`, `__target`

---

### ux-bar-chart.css
CSS-only bar chart for simple visualizations.

| Class | Description |
|-------|-------------|
| `.ux-bar-chart` | Chart container |
| `.ux-bar-chart--horizontal` | Horizontal bars |
| `.ux-bar-chart--sm` | Small (160px) |
| `.ux-bar-chart--lg` | Large (320px) |
| `.ux-bar-chart--compact` | Mini sparkline style |
| `.ux-bar-chart--grid` | Show grid lines |
| `.ux-bar-chart--glass` | Glass effect |
| `.ux-bar-chart--primary` | Primary color |
| `.ux-bar-chart--success` | Success color |
| `.ux-bar-chart--warning` | Warning color |
| `.ux-bar-chart--danger` | Danger color |

**Elements:** `__item`, `__value`, `__value-main`, `__value-sub`, `__bar`, `__bar--no-dot`, `__label`

---

### ux-sparkline.css
Sparkline chart.

| Class | Description |
|-------|-------------|
| `.ux-sparkline` | Sparkline wrapper |
| `.ux-sparkline--success` | Success color |
| `.ux-sparkline--warning` | Warning color |
| `.ux-sparkline--danger` | Danger color |

**Alpine Component:** `uxSparkline(options)`

---

### ux-chart.css
Wrapper for Chart.js with UX theme integration. Also supports external SVG charts (matplotlib).

| Class | Description |
|-------|-------------|
| `.ux-chart` | Chart container |
| `.ux-chart--bordered` | Adds border |
| `.ux-chart--padded` | Adds internal padding |
| `.ux-chart--sm` | Height 200px |
| `.ux-chart--md` | Height 300px |
| `.ux-chart--lg` | Height 400px |
| `.ux-chart--xl` | Height 500px |
| `.ux-chart--svg` | For external SVG charts (matplotlib) |

**CSS Variables:**
- `--ux-chart-1` through `--ux-chart-10`: Data series colors
- `--ux-chart-bg`: Chart background
- `--ux-chart-grid`: Grid lines color
- `--ux-chart-text`: Text color

**Alpine Component:** `uxChart(config)`
- `config.type`: Chart type (line, bar, pie, doughnut, radar)
- `config.data`: Chart.js data object
- `config.options`: Chart.js options

**Methods:**
- `updateData(data)`: Update chart data reactively
- `setConfig(config)`: Replace entire config
- `destroy()`: Destroy Chart.js instance

**Helpers:**
- `UX.chart.getColors()`: Get theme color palette
- `UX.chart.getDefaults()`: Get Chart.js defaults with UX theme

**HTMX Integration:** Server returns `<script type="application/json">` with config + `<canvas>`

---

### ux-progress.css
Progress bar.

| Class | Description |
|-------|-------------|
| `.ux-progress` | Progress wrapper |
| `.ux-progress--sm` | Small |
| `.ux-progress--lg` | Large |
| `.ux-progress--striped` | Striped style |
| `.ux-progress--animated` | Animated stripes |
| `.ux-progress--indeterminate` | Indeterminate |

**Elements:** `__bar`, `__label`

---

### ux-progress-circle.css
Circular progress.

| Class | Description |
|-------|-------------|
| `.ux-progress-circle` | Circle wrapper |
| `.ux-progress-circle--sm` | Small |
| `.ux-progress-circle--lg` | Large |
| `.ux-progress-circle--xl` | Extra large |

**Elements:** `__svg`, `__track`, `__fill`, `__value`, `__label`

**Alpine Component:** `uxProgressCircle(options)`

---

### ux-progress-steps.css
Step progress indicator.

| Class | Description |
|-------|-------------|
| `.ux-progress-steps` | Steps wrapper |
| `.ux-progress-steps--vertical` | Vertical layout |
| `.ux-progress-step` | Step item |
| `.ux-progress-step--completed` | Completed state |
| `.ux-progress-step--active` | Active state |
| `.ux-progress-step--error` | Error state |

**Elements:** `__marker`, `__line`, `__content`, `__title`, `__description`

---

### ux-gauge.css
Gauge/meter component.

| Class | Description |
|-------|-------------|
| `.ux-gauge` | Gauge wrapper |
| `.ux-gauge--sm` | Small |
| `.ux-gauge--lg` | Large |

**Elements:** `__svg`, `__track`, `__fill`, `__value`, `__label`, `__min`, `__max`

**Alpine Component:** `uxGauge(options)`

---

### ux-diff-viewer.css
Diff comparison viewer.

| Class | Description |
|-------|-------------|
| `.ux-diff-viewer` | Diff wrapper |
| `.ux-diff-viewer--glass` | Glass effect |
| `.ux-diff-viewer--split` | Split view |
| `.ux-diff-viewer--unified` | Unified view |

**Elements:** `__header`, `__content`, `__line`, `__line--added`, `__line--removed`, `__line--unchanged`

**Alpine Component:** `uxDiffViewer(options)`

---

### ux-code-block.css
Code block with syntax highlighting.

| Class | Description |
|-------|-------------|
| `.ux-code-block` | Code wrapper |
| `.ux-code-block--glass` | Glass effect |
| `.ux-code-block--line-numbers` | Show line numbers |

**Elements:** `__header`, `__language`, `__copy`, `__content`, `__line`, `__line-number`

**Alpine Component:** `uxCodeBlock(options)`

---

### ux-json-viewer.css
JSON tree viewer.

| Class | Description |
|-------|-------------|
| `.ux-json-viewer` | JSON wrapper |
| `.ux-json-viewer--glass` | Glass effect |

**Elements:** `__key`, `__value`, `__toggle`, `__type`

**Alpine Component:** `uxJsonViewer(options)`

---

### ux-calendar.css
Calendar month view.

| Class | Description |
|-------|-------------|
| `.ux-calendar` | Calendar wrapper |
| `.ux-calendar--glass` | Glass effect |

**Elements:** `__header`, `__nav`, `__title`, `__weekdays`, `__days`, `__day`, `__day--today`, `__day--selected`, `__day--disabled`, `__events`

**Alpine Component:** `uxCalendar(options)`

---

### ux-calendar-views.css
Calendar week/day views.

| Class | Description |
|-------|-------------|
| `.ux-calendar-week` | Week view |
| `.ux-calendar-day` | Day view |

**Alpine Components:** `uxCalendarWeek(options)`, `uxCalendarDay(options)`

---

### ux-scheduler.css
Scheduler/booking component.

| Class | Description |
|-------|-------------|
| `.ux-scheduler` | Scheduler wrapper |
| `.ux-scheduler--glass` | Glass effect |

**Elements:** `__header`, `__view-toggle`, `__navigation`, `__grid`, `__time-slot`, `__booking`

**Alpine Component:** `uxScheduler(options)`

---

### ux-event-card.css
Event card for calendars.

| Class | Description |
|-------|-------------|
| `.ux-event-card` | Event card wrapper |
| `.ux-event-card--glass` | Glass effect |
| `.ux-event-card--success` | Success variant |
| `.ux-event-card--warning` | Warning variant |
| `.ux-event-card--danger` | Danger variant |

**Elements:** `__time`, `__title`, `__location`, `__attendees`

---

## 10. Multimedia

### ux-img.css
Image with lazy loading.

| Class | Description |
|-------|-------------|
| `.ux-img` | Image wrapper |
| `.ux-img--cover` | Cover fit |
| `.ux-img--contain` | Contain fit |
| `.ux-img--rounded` | Rounded corners |
| `.ux-img--circle` | Circle shape |

**Elements:** `__placeholder`, `__error`

---

### ux-avatar.css
Avatar component.

| Class | Description |
|-------|-------------|
| `.ux-avatar` | Avatar wrapper |
| `.ux-avatar--xs` | Extra small |
| `.ux-avatar--sm` | Small |
| `.ux-avatar--md` | Medium |
| `.ux-avatar--lg` | Large |
| `.ux-avatar--xl` | Extra large |
| `.ux-avatar--2xl` | Double extra large |
| `.ux-avatar--square` | Square shape |
| `.ux-avatar--rounded` | Rounded square |
| `.ux-avatar--clickable` | Clickable |
| `.ux-avatar-group` | Avatar group |

**Elements:** `__status`, `__icon`, `__badge`

---

### ux-image-gallery.css
Image gallery grid.

| Class | Description |
|-------|-------------|
| `.ux-image-gallery` | Gallery wrapper |
| `.ux-image-gallery--masonry` | Masonry layout |

**Elements:** `__item`, `__image`, `__overlay`, `__caption`

**Alpine Component:** `uxImageGallery(options)`

---

### ux-image-crop.css
Image cropping tool.

| Class | Description |
|-------|-------------|
| `.ux-image-crop` | Crop wrapper |
| `.ux-image-crop--glass` | Glass effect |

**Elements:** `__preview`, `__crop-area`, `__handles`, `__toolbar`

**Alpine Component:** `uxImageCrop(options)`

---

### ux-image-zoom.css
Image zoom with lens.

| Class | Description |
|-------|-------------|
| `.ux-image-zoom` | Zoom wrapper |

**Elements:** `__image`, `__lens`, `__result`

**Alpine Component:** `uxImageZoom(options)`

---

### ux-carousel.css
Carousel/slider.

| Class | Description |
|-------|-------------|
| `.ux-carousel` | Carousel wrapper |
| `.ux-carousel--fade` | Fade transition |
| `.ux-carousel--glass` | Glass controls |

**Elements:** `__slides`, `__slide`, `__prev`, `__next`, `__pagination`, `__dot`

**Alpine Component:** `uxCarousel(options)`

---

### ux-video-player.css
Video player with controls.

| Class | Description |
|-------|-------------|
| `.ux-video-player` | Player wrapper |
| `.ux-video-player--glass` | Glass controls |

**Elements:** `__video`, `__controls`, `__play`, `__progress`, `__time`, `__volume`, `__fullscreen`

**Alpine Component:** `uxVideoPlayer(options)`

---

### ux-audio-player.css
Audio player with playlist.

| Class | Description |
|-------|-------------|
| `.ux-audio-player` | Player wrapper |
| `.ux-audio-player--glass` | Glass effect |
| `.ux-audio-player--minimal` | Minimal style |

**Elements:** `__controls`, `__play`, `__progress`, `__time`, `__volume`, `__playlist`, `__track`, `__waveform`

**Alpine Component:** `uxAudioPlayer(options)`

---

### ux-pdf-viewer.css
PDF document viewer.

| Class | Description |
|-------|-------------|
| `.ux-pdf-viewer` | Viewer wrapper |
| `.ux-pdf-viewer--glass` | Glass toolbar |

**Elements:** `__toolbar`, `__canvas`, `__pagination`, `__zoom`

**Alpine Component:** `uxPdfViewer(options)`

---

### ux-qr-code.css
QR code generator.

| Class | Description |
|-------|-------------|
| `.ux-qr-code` | QR code wrapper |

**Elements:** `__canvas`, `__label`

**Alpine Component:** `uxQrCode(options)`

---

### ux-barcode-scanner.css
Camera barcode scanner.

| Class | Description |
|-------|-------------|
| `.ux-barcode-scanner` | Scanner wrapper |

**Elements:** `__video`, `__overlay`, `__target`, `__result`

**Alpine Component:** `uxBarcodeScanner(options)`

---

## 11. Feedback & States

### ux-spinner.css
Loading spinner.

| Class | Description |
|-------|-------------|
| `.ux-spinner` | Spinner |
| `.ux-spinner--sm` | Small |
| `.ux-spinner--lg` | Large |
| `.ux-spinner--xl` | Extra large |

---

### ux-status-badge.css
Badge with status dot indicator for showing state (active, inactive, pending, etc.)

| Class | Description |
|-------|-------------|
| `.ux-status-badge` | Base badge |
| `.ux-status-badge--active` | Active state (green) |
| `.ux-status-badge--inactive` | Inactive state (gray) |
| `.ux-status-badge--pending` | Pending state (amber) |
| `.ux-status-badge--error` | Error state (red) |
| `.ux-status-badge--info` | Info state (blue) |
| `.ux-status-badge--online` | Online state (green) |
| `.ux-status-badge--offline` | Offline state (gray) |
| `.ux-status-badge--away` | Away state (yellow) |
| `.ux-status-badge--busy` | Busy state (red) |
| `.ux-status-badge--sm` | Small size |
| `.ux-status-badge--lg` | Large size |
| `.ux-status-badge--pulse` | Animated pulsing dot |
| `.ux-status-badge--dot-only` | Show only dot (no text) |
| `.ux-status-badge--solid` | Solid filled background |
| `.ux-status-badge--outlined` | Outlined variant |
| `.ux-status-badge--glass` | Glass morphism |

**Elements:** `__dot`, `__icon`

---

### ux-skeleton.css
Skeleton loader.

| Class | Description |
|-------|-------------|
| `.ux-skeleton` | Skeleton element |
| `.ux-skeleton--text` | Text line |
| `.ux-skeleton--circle` | Circle shape |
| `.ux-skeleton--rect` | Rectangle shape |
| `.ux-skeleton--card` | Card skeleton |

---

### ux-refresher.css
Pull to refresh.

| Class | Description |
|-------|-------------|
| `.ux-refresher` | Refresher wrapper |

**Elements:** `__content`, `__spinner`, `__icon`

**Alpine Component:** `uxRefresher(options)`

---

### ux-state.css
Empty/error/success states.

| Class | Description |
|-------|-------------|
| `.ux-state` | State wrapper |
| `.ux-state--empty` | Empty state |
| `.ux-state--error` | Error state |
| `.ux-state--success` | Success state |
| `.ux-state--offline` | Offline state |

**Elements:** `__icon`, `__title`, `__message`, `__action`

---

### ux-banner.css
Dismissable banner.

| Class | Description |
|-------|-------------|
| `.ux-banner` | Banner wrapper |
| `.ux-banner--success` | Success variant |
| `.ux-banner--warning` | Warning variant |
| `.ux-banner--danger` | Danger variant |
| `.ux-banner--info` | Info variant |
| `.ux-banner--glass` | Glass effect |

**Elements:** `__icon`, `__content`, `__title`, `__message`, `__actions`, `__close`

---

### ux-callout.css
Info callout box.

| Class | Description |
|-------|-------------|
| `.ux-callout` | Callout wrapper |
| `.ux-callout--success` | Success variant |
| `.ux-callout--warning` | Warning variant |
| `.ux-callout--danger` | Danger variant |
| `.ux-callout--info` | Info variant |
| `.ux-callout--glass` | Glass effect |

**Elements:** `__icon`, `__content`, `__title`

---

### ux-pwa.css
PWA utilities.

| Class | Description |
|-------|-------------|
| `.ux-pwa-install` | Install prompt |
| `.ux-offline-indicator` | Offline indicator |

**Alpine Component:** `uxPwa(options)`

---

## 12. POS / Retail

### ux-numpad.css
Numeric keypad.

| Class | Description |
|-------|-------------|
| `.ux-numpad` | Numpad wrapper |
| `.ux-numpad--glass` | Glass effect |
| `.ux-numpad--pin` | PIN pad mode |

**Elements:** `__display`, `__keys`, `__key`, `__key--action`

**Alpine Component:** `uxNumpad(options)`

---

### ux-calculator.css
Calculator component.

| Class | Description |
|-------|-------------|
| `.ux-calculator` | Calculator wrapper |
| `.ux-calculator--glass` | Glass effect |

**Elements:** `__display`, `__keys`, `__key`, `__key--operator`, `__key--equals`

**Alpine Component:** `uxCalculator(options)`

---

### ux-product-card.css
POS product card.

| Class | Description |
|-------|-------------|
| `.ux-product-card` | Product card |
| `.ux-product-card--glass` | Glass effect |
| `.ux-product-card--out-of-stock` | Out of stock |

**Elements:** `__image`, `__badge`, `__name`, `__price`, `__original-price`, `__stock`

---

### ux-category-tabs.css
Horizontal scrolling category tabs.

| Class | Description |
|-------|-------------|
| `.ux-category-tabs` | Tabs wrapper |
| `.ux-category-tabs--glass` | Glass effect |
| `.ux-category-tab` | Tab item |
| `.ux-category-tab--selected` | Selected state |

**Elements:** `__icon`, `__label`

---

### ux-cart.css
Shopping cart components.

| Class | Description |
|-------|-------------|
| `.ux-cart` | Cart wrapper |
| `.ux-cart--glass` | Glass effect |
| `.ux-cart-item` | Cart item |
| `.ux-cart-summary` | Cart summary |

**Elements:** `__image`, `__name`, `__price`, `__quantity`, `__remove`, `__subtotal`, `__tax`, `__total`

---

### ux-order-ticket.css
Order ticket display.

| Class | Description |
|-------|-------------|
| `.ux-order-ticket` | Ticket wrapper |
| `.ux-order-ticket--glass` | Glass effect |

**Elements:** `__header`, `__number`, `__time`, `__items`, `__item`, `__footer`, `__total`

---

### ux-payment.css
Payment method selector.

| Class | Description |
|-------|-------------|
| `.ux-payment` | Payment wrapper |
| `.ux-payment--glass` | Glass effect |
| `.ux-payment-method` | Payment method |
| `.ux-payment-method--selected` | Selected state |

**Elements:** `__icon`, `__label`, `__amount`, `__split`, `__tip`

**Alpine Component:** `uxPayment(options)`

---

### ux-receipt.css
Receipt preview.

| Class | Description |
|-------|-------------|
| `.ux-receipt` | Receipt wrapper |

**Elements:** `__header`, `__logo`, `__info`, `__items`, `__item`, `__subtotal`, `__tax`, `__total`, `__payment`, `__footer`, `__barcode`

---

### ux-stock-indicator.css
Stock level indicator.

| Class | Description |
|-------|-------------|
| `.ux-stock-indicator` | Stock indicator |
| `.ux-stock-indicator--in-stock` | In stock |
| `.ux-stock-indicator--low` | Low stock |
| `.ux-stock-indicator--out` | Out of stock |

**Elements:** `__dot`, `__label`, `__count`

---

### ux-quantity-badge.css
Quantity badge overlay.

| Class | Description |
|-------|-------------|
| `.ux-quantity-badge` | Badge wrapper |

**Elements:** `__value`

---

### ux-variant-selector.css
Product variant selector (size, color).

| Class | Description |
|-------|-------------|
| `.ux-variant-selector` | Selector wrapper |
| `.ux-variant-option` | Variant option |
| `.ux-variant-option--selected` | Selected state |
| `.ux-variant-option--disabled` | Disabled/out of stock |
| `.ux-variant-option--color` | Color swatch |

**Elements:** `__label`, `__swatch`, `__name`

---

### ux-virtual-keyboard.css
On-screen keyboard.

| Class | Description |
|-------|-------------|
| `.ux-virtual-keyboard` | Keyboard wrapper |
| `.ux-virtual-keyboard--glass` | Glass effect |
| `.ux-virtual-keyboard--numeric` | Numeric only |

**Elements:** `__row`, `__key`, `__key--special`, `__key--space`

**Alpine Component:** `uxVirtualKeyboard(options)`

---

## 13. HR / Employees

### ux-employee-card.css
Employee information card.

| Class | Description |
|-------|-------------|
| `.ux-employee-card` | Card wrapper |
| `.ux-employee-card--glass` | Glass effect |
| `.ux-employee-card--horizontal` | Horizontal layout |

**Elements:** `__avatar`, `__name`, `__title`, `__department`, `__status`, `__contact`, `__actions`

---

### ux-time-clock.css
Time clock for check-in/out.

| Class | Description |
|-------|-------------|
| `.ux-time-clock` | Time clock wrapper |
| `.ux-time-clock--glass` | Glass effect |

**Elements:** `__time`, `__date`, `__status`, `__button`, `__history`

**Alpine Component:** `uxTimeClock(options)`

---

### ux-shift-calendar.css
Shift/schedule calendar.

| Class | Description |
|-------|-------------|
| `.ux-shift-calendar` | Calendar wrapper |
| `.ux-shift-calendar--glass` | Glass effect |

**Elements:** `__header`, `__week`, `__day`, `__shift`, `__shift--morning`, `__shift--afternoon`, `__shift--night`

**Alpine Component:** `uxShiftCalendar(options)`

---

### ux-attendance-list.css
Attendance list view.

| Class | Description |
|-------|-------------|
| `.ux-attendance-list` | List wrapper |
| `.ux-attendance-list--glass` | Glass effect |
| `.ux-attendance-item` | List item |
| `.ux-attendance-item--present` | Present status |
| `.ux-attendance-item--absent` | Absent status |
| `.ux-attendance-item--late` | Late status |

**Elements:** `__avatar`, `__name`, `__time`, `__status`, `__actions`

**Alpine Component:** `uxAttendanceList(options)`

---

### ux-leave-request.css
Leave request card.

| Class | Description |
|-------|-------------|
| `.ux-leave-request` | Request wrapper |
| `.ux-leave-request--glass` | Glass effect |
| `.ux-leave-request--pending` | Pending status |
| `.ux-leave-request--approved` | Approved status |
| `.ux-leave-request--rejected` | Rejected status |

**Elements:** `__header`, `__type`, `__dates`, `__days`, `__reason`, `__status`, `__actions`

---

### ux-org-chart.css
Organization chart.

| Class | Description |
|-------|-------------|
| `.ux-org-chart` | Chart wrapper |
| `.ux-org-chart--glass` | Glass effect |
| `.ux-org-node` | Chart node |
| `.ux-org-node--expanded` | Expanded state |

**Elements:** `__avatar`, `__name`, `__title`, `__toggle`, `__children`

**Alpine Component:** `uxOrgChart(options)`

---

### ux-performance-meter.css
Employee performance meter.

| Class | Description |
|-------|-------------|
| `.ux-performance-meter` | Meter wrapper |
| `.ux-performance-meter--glass` | Glass effect |

**Elements:** `__gauge`, `__score`, `__label`, `__categories`, `__category`, `__trend`

**Alpine Component:** `uxPerformanceMeter(options)`

---

## 14. Manufacturing

### ux-work-order.css
Work order card.

| Class | Description |
|-------|-------------|
| `.ux-work-order` | Work order wrapper |
| `.ux-work-order--glass` | Glass effect |
| `.ux-work-order--pending` | Pending status |
| `.ux-work-order--in-progress` | In progress |
| `.ux-work-order--completed` | Completed |
| `.ux-work-order--on-hold` | On hold |

**Elements:** `__header`, `__number`, `__product`, `__quantity`, `__progress`, `__dates`, `__priority`, `__actions`

---

### ux-machine-status.css
Machine status indicator.

| Class | Description |
|-------|-------------|
| `.ux-machine-status` | Status wrapper |
| `.ux-machine-status--glass` | Glass effect |
| `.ux-machine-status--running` | Running state |
| `.ux-machine-status--idle` | Idle state |
| `.ux-machine-status--maintenance` | Maintenance |
| `.ux-machine-status--error` | Error state |

**Elements:** `__icon`, `__name`, `__status`, `__metrics`, `__uptime`

---

### ux-production-line.css
Production line status.

| Class | Description |
|-------|-------------|
| `.ux-production-line` | Line wrapper |
| `.ux-production-line--glass` | Glass effect |

**Elements:** `__header`, `__stations`, `__station`, `__station--active`, `__station--error`, `__metrics`, `__efficiency`

**Alpine Component:** `uxProductionLine(options)`

---

### ux-quality-check.css
Quality check form.

| Class | Description |
|-------|-------------|
| `.ux-quality-check` | Form wrapper |
| `.ux-quality-check--glass` | Glass effect |

**Elements:** `__header`, `__checklist`, `__item`, `__item--pass`, `__item--fail`, `__measurements`, `__photos`, `__summary`

**Alpine Component:** `uxQualityCheck(options)`

---

### ux-batch-tracker.css
Batch/lot tracker.

| Class | Description |
|-------|-------------|
| `.ux-batch-tracker` | Tracker wrapper |
| `.ux-batch-tracker--glass` | Glass effect |

**Elements:** `__header`, `__batch-id`, `__timeline`, `__event`, `__details`, `__documents`

**Alpine Component:** `uxBatchTracker(options)`

---

### ux-bom-tree.css
Bill of Materials tree.

| Class | Description |
|-------|-------------|
| `.ux-bom-tree` | Tree wrapper |
| `.ux-bom-tree--glass` | Glass effect |
| `.ux-bom-item` | BOM item |
| `.ux-bom-item--expanded` | Expanded state |

**Elements:** `__toggle`, `__icon`, `__name`, `__quantity`, `__unit`, `__cost`, `__children`

**Alpine Component:** `uxBomTree(options)`

---

### ux-gantt.css
Gantt chart.

| Class | Description |
|-------|-------------|
| `.ux-gantt` | Gantt wrapper |
| `.ux-gantt--glass` | Glass effect |

**Elements:** `__header`, `__timeline`, `__rows`, `__row`, `__task`, `__task-bar`, `__dependency`, `__today`

**Alpine Component:** `uxGantt(options)`

---

## 15. Utilities

### ux-utilities.css
CSS utility classes.

**Spacing:**
- `.ux-m-{size}` - Margin (xs, sm, md, lg, xl)
- `.ux-p-{size}` - Padding
- `.ux-mt-{size}`, `.ux-mr-{size}`, `.ux-mb-{size}`, `.ux-ml-{size}` - Directional margin
- `.ux-pt-{size}`, `.ux-pr-{size}`, `.ux-pb-{size}`, `.ux-pl-{size}` - Directional padding
- `.ux-mx-auto` - Horizontal center
- `.ux-gap-{size}` - Flex/grid gap

**Flexbox:**
- `.ux-flex` - Display flex
- `.ux-flex-row`, `.ux-flex-col` - Direction
- `.ux-flex-wrap` - Wrap
- `.ux-items-{align}` - Align items (start, center, end, stretch)
- `.ux-justify-{align}` - Justify content
- `.ux-flex-1` - Flex grow

**Text:**
- `.ux-text-{size}` - Font size (xs, sm, base, lg, xl, 2xl)
- `.ux-text-{align}` - Alignment (left, center, right)
- `.ux-text-{color}` - Color (primary, secondary, success, warning, danger, muted)
- `.ux-font-{weight}` - Weight (light, normal, medium, semibold, bold)
- `.ux-truncate` - Text truncation
- `.ux-line-clamp-{n}` - Line clamping

**Colors:**
- `.ux-bg-{color}` - Background color
- `.ux-border-{color}` - Border color

---

### ux-alpine-utils.css
Alpine.js utility plugins.

**Directives:**
- `x-focus-trap` - Trap focus within element
- `x-click-outside` - Detect clicks outside element
- `x-scroll-lock` - Lock body scroll
- `x-clipboard` - Copy to clipboard

**Magics:**
- `$clipboard(text)` - Copy text to clipboard
- `$debounce(fn, ms)` - Debounce function
- `$throttle(fn, ms)` - Throttle function

---

### ux-swipe.css
Touch gesture directives.

**Directives:**
- `x-swipe` - Swipe detection
- `x-swipe.left`, `x-swipe.right`, `x-swipe.up`, `x-swipe.down` - Directional swipes
- `x-drag` - Drag handling
- `x-pull-refresh` - Pull to refresh gesture
- `x-long-press` - Long press detection
- `x-pinch` - Pinch zoom gesture
- `x-tap` - Tap with ghost click prevention

---

### ux-onscreen-keyboard.css
Multi-language virtual keyboard for web applications, POS, and tablets.

**Supported Languages:**
- **Latin:** English, Spanish, French, German, Italian, Portuguese, Romanian, Dutch, Polish
- **Nordic:** Swedish, Norwegian, Finnish
- **Central European:** Czech, Slovak, Hungarian
- **Cyrillic:** Russian, Ukrainian, Bulgarian, Serbian, Macedonian
- **Greek:** Greek

| Class | Description |
|-------|-------------|
| `.ux-onscreen-keyboard` | Base keyboard container |
| `.ux-onscreen-keyboard--compact` | Smaller keys for mobile |
| `.ux-onscreen-keyboard--lg` | Larger keys for tablets |
| `.ux-onscreen-keyboard--glass` | iOS Liquid Glass effect |
| `.ux-onscreen-keyboard--inline` | No border (for modals) |
| `.ux-onscreen-keyboard__header` | Language selector header |
| `.ux-onscreen-keyboard__row` | Row of keys |
| `.ux-onscreen-keyboard__key` | Individual key button |
| `.ux-onscreen-keyboard__key--special` | Special keys (shift, etc) |
| `.ux-onscreen-keyboard__key--enter` | Enter key |
| `.ux-onscreen-keyboard__key--backspace` | Backspace key |
| `.ux-onscreen-keyboard__key--space` | Space bar |
| `.ux-onscreen-keyboard__lang-picker` | Language dropdown |

**Alpine Component:**
```javascript
x-data="uxOnscreenKeyboard({
  languages: ['en', 'es', 'fr', 'de'],
  defaultLanguage: 'en',
  showLanguageSelector: true,
  targetSelector: '#my-input',
  onInput: (key) => {},
  onEnter: (value) => {}
})"
```

**Events:**
- `@osk:input` - Character inserted
- `@osk:enter` - Enter pressed
- `@osk:backspace` - Backspace pressed
- `@osk:language` - Language changed

---

### ux-scroll.css
Scroll-related Alpine components.

**Components:**
- `uxScroll(options)` - Scroll container with events
- `uxPage(options)` - Page with scroll management
- `uxScrollTop(options)` - Scroll to top button
- `uxCollapsibleHeader(options)` - Header that collapses on scroll

---

## Component Statistics

| Category | Count |
|----------|-------|
| Core | 1 |
| Forms - Basic | 9 |
| Forms - Advanced | 12 |
| Forms - Structure | 2 |
| Buttons & Actions | 9 |
| Navigation | 14 |
| Layout & Containers | 18 |
| Overlays & Modals | 13 |
| Data Display | 15 |
| Multimedia | 11 |
| Feedback & States | 7 |
| POS / Retail | 12 |
| HR / Employees | 7 |
| Manufacturing | 7 |
| Utilities | 5 |
| Other | 6 |
| **Total** | **148** |

### By JavaScript Requirement

| Type | Count | Components |
|------|-------|------------|
| **CSS-only** | ~50 | avatar, badge, button, card, divider, icon-button, list, navbar, progress, spacer, spinner, table, toolbar, etc. |
| **Vanilla JS classes** | 12 | accordion, alert, drawer, dropdown, modal, sheet, tabs, toast, tooltip, quantity-stepper, signature-pad, password-toggle |
| **Alpine.js components** | ~90 | calendar, datatable, carousel, command, picker, etc. |
| **Alpine directives** | 6 | x-swipe, x-drag, x-long-press, x-tap, x-pinch, x-pull-refresh |

> **Note:** Vanilla JS components (UXModal, UXSheet, UXTabs, etc.) work without Alpine.js.
> Alpine.js components are provided in `docs/alpine-components.js` for documentation demos.

---

## Updating This Guide

When adding a new component:

1. Add component file to `components/ux-{name}.js`
2. Add documentation to `docs/{name}.html`
3. Update this guide with the new component in the appropriate category
4. Update the component count in statistics
5. Update the "Last Updated" date at the top

---

*Last Updated: 2026-01-29*
