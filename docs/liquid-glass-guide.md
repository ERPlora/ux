# iOS 26 Liquid Glass - Guia de Uso

Esta guia documenta el sistema "Liquid Glass" implementado en UX Library, inspirado en iOS 26/iPadOS 26 (WWDC 2025).

## Estado: COMPLETADO

Todos los componentes ahora soportan la variante `--glass`.

---

## Variables CSS

```css
:root {
  /* Liquid Glass Materials */
  --ux-glass-blur: 20px;
  --ux-glass-blur-heavy: 40px;
  --ux-glass-saturation: 180%;
  --ux-glass-bg: rgba(255, 255, 255, 0.72);
  --ux-glass-bg-thick: rgba(255, 255, 255, 0.85);
  --ux-glass-bg-thin: rgba(255, 255, 255, 0.5);
  --ux-glass-border: rgba(255, 255, 255, 0.18);
  --ux-glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  --ux-glass-highlight: inset 0 1px 0 rgba(255, 255, 255, 0.5);
}
```

---

## Selector Universal

El sistema usa un selector universal que aplica automaticamente el efecto glass:

```css
[class*="--glass"] {
  background: var(--ux-glass-bg);
  backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
  -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
  border-color: var(--ux-glass-border);
}
```

Solo necesitas agregar `--glass` a cualquier componente para activar el efecto.

---

## Componentes Disponibles

### Navigation

```html
<nav class="ux-navbar--glass">Glass Navbar</nav>
<div class="ux-toolbar--glass">Glass Toolbar</div>
<div class="ux-tabs--glass">Glass Tabs</div>
<div class="ux-segment--glass">Glass Segment</div>
<nav class="ux-breadcrumbs--glass">Glass Breadcrumbs</nav>
<div class="ux-menu--glass">Glass Menu</div>
```

### Overlay

```html
<div class="ux-modal--glass">Glass Modal</div>
<div class="ux-sheet--glass">Glass Sheet</div>
<div class="ux-alert--glass">Glass Alert</div>
<div class="ux-toast--glass">Glass Toast</div>
<div class="ux-popover--glass">Glass Popover</div>
<div class="ux-picker--glass">Glass Picker</div>
```

### Layout

```html
<div class="ux-card--glass">Glass Card</div>
<ul class="ux-list--glass">Glass List</ul>
<aside class="ux-panel--glass">Glass Panel</aside>
<div class="ux-accordion--glass">Glass Accordion</div>
```

### Form Elements

```html
<input class="ux-input--glass" placeholder="Glass Input">
<textarea class="ux-textarea--glass">Glass Textarea</textarea>
<div class="ux-select--glass">Glass Select</div>
<div class="ux-searchbar--glass">Glass Searchbar</div>
<label class="ux-checkbox--glass">Glass Checkbox</label>
<label class="ux-radio--glass">Glass Radio</label>
<label class="ux-toggle--glass">Glass Toggle</label>
<div class="ux-range--glass">Glass Range</div>
<span class="ux-chip--glass">Glass Chip</span>
```

### Feedback

```html
<span class="ux-badge--glass">Glass Badge</span>
<div class="ux-progress--glass">Glass Progress</div>
<div class="ux-skeleton--glass">Glass Skeleton</div>
<button class="ux-fab__button--glass">Glass FAB</button>
```

### Interactive

```html
<table class="ux-datatable--glass">Glass DataTable</table>
<div class="ux-datetime--glass">Glass DateTime</div>
<div class="ux-carousel--glass">Glass Carousel</div>
```

---

## Ejemplos de Uso

### Card con Glass

```html
<div class="ux-card ux-card--glass">
  <div class="ux-card__header ux-card__header--bordered">
    <h3>Glass Card</h3>
  </div>
  <div class="ux-card__content">
    Contenido con efecto frosted glass
  </div>
</div>
```

### Modal con Glass

```html
<div x-data="uxModal()">
  <button @click="open()" class="ux-button">Abrir Modal Glass</button>

  <template x-teleport="body">
    <div class="ux-modal ux-modal--glass" x-show="isOpen">
      <div class="ux-modal__header">
        <h2>Modal Glass</h2>
      </div>
      <div class="ux-modal__content">
        Contenido con blur intenso
      </div>
    </div>
  </template>
</div>
```

### Navbar con Glass

```html
<nav class="ux-navbar ux-navbar--glass">
  <div class="ux-navbar__start">
    <button class="ux-button--clear">Back</button>
  </div>
  <div class="ux-navbar__center">
    <h1 class="ux-navbar__title">Titulo</h1>
  </div>
  <div class="ux-navbar__end">
    <button class="ux-button--clear">Action</button>
  </div>
</nav>
```

### Form Elements Glass

```html
<div class="ux-input ux-input--glass">
  <input type="text" placeholder="Nombre">
</div>

<div class="ux-select ux-select--glass" x-data="uxSelect()">
  <button class="ux-select__trigger">Seleccionar...</button>
</div>

<label class="ux-checkbox ux-checkbox--glass">
  <input type="checkbox">
  <span class="ux-checkbox__box"></span>
  Acepto los terminos
</label>

<label class="ux-toggle ux-toggle--glass">
  <input type="checkbox">
  <span class="ux-toggle__track">
    <span class="ux-toggle__thumb"></span>
  </span>
  Activar notificaciones
</label>
```

---

## Dark Mode

El glass se adapta automaticamente a dark mode:

```css
.ux-dark,
@media (prefers-color-scheme: dark) {
  --ux-glass-bg: rgba(30, 30, 30, 0.72);
  --ux-glass-bg-thick: rgba(30, 30, 30, 0.85);
  --ux-glass-bg-thin: rgba(30, 30, 30, 0.5);
  --ux-glass-border: rgba(255, 255, 255, 0.1);
}
```

---

## Consideraciones de Rendimiento

### Backdrop Filter

- Los componentes con glass usan `backdrop-filter` que puede ser costoso en dispositivos antiguos
- Limitar capas con blur simultaneo (no mas de 3-4 elementos glass superpuestos)
- El fallback automatico usa un fondo opaco si el navegador no soporta `backdrop-filter`

### Fallback Automatico

```css
@supports not (backdrop-filter: blur(1px)) {
  [class*="--glass"] {
    background: var(--ux-glass-bg-thick);
  }
}
```

---

## Niveles de Blur

| Uso | Variable | Valor |
|-----|----------|-------|
| Elementos pequeños | `--ux-glass-blur` | 20px |
| Modales/Sheets | `--ux-glass-blur-heavy` | 40px |
| Elementos inline | Hardcoded | 10px |

---

## Lista de Componentes con Glass

| Componente | Clase Glass | Estado |
|------------|-------------|--------|
| Navbar | `ux-navbar--glass` | OK |
| Toolbar | `ux-toolbar--glass` | OK |
| Tabs | `ux-tabs--glass` | OK |
| Segment | `ux-segment--glass` | OK |
| Breadcrumbs | `ux-breadcrumbs--glass` | OK |
| Menu | `ux-menu--glass` | OK |
| Modal | `ux-modal--glass` | OK |
| Sheet | `ux-sheet--glass` | OK |
| Alert | `ux-alert--glass` | OK |
| Toast | `ux-toast--glass` | OK |
| Popover | `ux-popover--glass` | OK |
| Picker | `ux-picker--glass` | OK |
| Card | `ux-card--glass` | OK |
| List | `ux-list--glass` | OK |
| Panel | `ux-panel--glass` | OK |
| Accordion | `ux-accordion--glass` | OK |
| Input | `ux-input--glass` | OK |
| Textarea | `ux-textarea--glass` | OK |
| Select | `ux-select--glass` | OK |
| Searchbar | `ux-searchbar--glass` | OK |
| Checkbox | `ux-checkbox--glass` | OK |
| Radio | `ux-radio--glass` | OK |
| Toggle | `ux-toggle--glass` | OK |
| Range | `ux-range--glass` | OK |
| Chip | `ux-chip--glass` | OK |
| Badge | `ux-badge--glass` | OK |
| Progress | `ux-progress--glass` | OK |
| Skeleton | `ux-skeleton--glass` | OK |
| FAB | `ux-fab__button--glass` | OK |
| DataTable | `ux-datatable--glass` | OK |
| DateTime | `ux-datetime--glass` | OK |
| Carousel | `ux-carousel--glass` | OK |
| Button | `ux-button--glass` | OK |

**Total: 33 componentes con soporte glass**

---

## Referencias

- [Apple WWDC25 - New Design System](https://developer.apple.com/videos/play/wwdc2025/)
- [Apple HIG - Materials](https://developer.apple.com/design/human-interface-guidelines/materials)
