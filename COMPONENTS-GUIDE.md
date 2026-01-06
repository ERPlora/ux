# UX Library - Guia Completa de Componentes

Guia de referencia para implementar todos los componentes de UX Library. Optimizado para HTMX + Alpine.js.

---

## Instalacion

```html
<!-- Core (REQUERIDO siempre primero) -->
<script src="components/ux-core.js"></script>

<!-- Componentes individuales -->
<script src="components/ux-button.js"></script>
<script src="components/ux-modal.js"></script>

<!-- O bundle completo -->
<script src="dist/ux.min.js"></script>

<!-- Alpine.js (requerido para componentes interactivos) -->
<script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>

<!-- Bootstrap Grid (opcional, para layout) -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap-grid.min.css" rel="stylesheet">
```

---

## Temas y Dark Mode

```html
<!-- Light mode (default) -->
<html>

<!-- Dark mode manual -->
<html class="ux-dark">

<!-- Force light (ignora sistema) -->
<html class="ux-light">

<!-- Temas de color -->
<html class="ux-theme-ocean">    <!-- Default: sky blue -->
<html class="ux-theme-emerald">  <!-- Green -->
<html class="ux-theme-purple">   <!-- Purple -->
<html class="ux-theme-sunset">   <!-- Orange -->
<html class="ux-theme-rose">     <!-- Pink -->
<html class="ux-theme-teal">     <!-- Teal -->
<html class="ux-theme-amber">    <!-- Amber -->
<html class="ux-theme-slate">    <!-- Gray -->
<html class="ux-theme-indigo">   <!-- Indigo -->
<html class="ux-theme-cyan">     <!-- Cyan -->
<html class="ux-theme-crimson">  <!-- Red -->
<html class="ux-theme-forest">   <!-- Dark green -->
```

---

## Colores Semanticos

Usar con clases `ux-color-*`:

```html
<button class="ux-button ux-color-primary">Primary</button>
<button class="ux-button ux-color-secondary">Secondary</button>
<button class="ux-button ux-color-success">Success</button>
<button class="ux-button ux-color-warning">Warning</button>
<button class="ux-button ux-color-danger">Danger</button>
<button class="ux-button ux-color-dark">Dark</button>
<button class="ux-button ux-color-medium">Medium</button>
<button class="ux-button ux-color-light">Light</button>
```

---

# COMPONENTES BASICOS (Solo CSS)

## Button

```html
<!-- Variantes -->
<button class="ux-button">Default (Primary)</button>
<button class="ux-button ux-button--secondary">Secondary</button>
<button class="ux-button ux-button--outline">Outline</button>
<button class="ux-button ux-button--clear">Clear/Ghost</button>
<button class="ux-button ux-button--glass">Glass</button>

<!-- Tamanos -->
<button class="ux-button ux-button--sm">Small</button>
<button class="ux-button">Default</button>
<button class="ux-button ux-button--lg">Large</button>

<!-- Estados -->
<button class="ux-button" disabled>Disabled</button>
<button class="ux-button ux-button--loading">Loading...</button>

<!-- Con icono -->
<button class="ux-button">
  <svg>...</svg>
  <span>Con Icono</span>
</button>

<!-- Solo icono -->
<button class="ux-button ux-button--icon">
  <svg>...</svg>
</button>

<!-- Block (full width) -->
<button class="ux-button ux-button--block">Full Width</button>

<!-- Colores -->
<button class="ux-button ux-color-success">Success</button>
<button class="ux-button ux-color-danger">Danger</button>
<button class="ux-button ux-button--outline ux-color-warning">Warning Outline</button>
```

## Badge

```html
<!-- Basico -->
<span class="ux-badge">Default</span>
<span class="ux-badge ux-color-success">Success</span>
<span class="ux-badge ux-color-danger">Error</span>

<!-- Con outline -->
<span class="ux-badge ux-badge--outline">Outline</span>
<span class="ux-badge ux-badge--outline ux-color-primary">Primary</span>

<!-- Glass -->
<span class="ux-badge ux-badge--glass">Glass</span>

<!-- Tamanos -->
<span class="ux-badge ux-badge--sm">Small</span>
<span class="ux-badge ux-badge--lg">Large</span>

<!-- Dot (notificacion) -->
<span class="ux-badge ux-badge--dot"></span>
```

## Chip

```html
<!-- Basico -->
<span class="ux-chip">Chip</span>

<!-- Con icono -->
<span class="ux-chip">
  <svg class="ux-chip__icon">...</svg>
  Label
</span>

<!-- Deletable -->
<span class="ux-chip">
  Tag
  <button class="ux-chip__close">&times;</button>
</span>

<!-- Selectable (con Alpine) -->
<span class="ux-chip"
      :class="{ 'ux-chip--selected': selected }"
      @click="selected = !selected">
  Selectable
</span>

<!-- Colores -->
<span class="ux-chip ux-color-primary">Primary</span>
<span class="ux-chip ux-color-success">Success</span>

<!-- Glass -->
<span class="ux-chip ux-chip--glass">Glass</span>
```

## Spinner

```html
<!-- Basico -->
<div class="ux-spinner"></div>

<!-- Tamanos -->
<div class="ux-spinner ux-spinner--sm"></div>
<div class="ux-spinner ux-spinner--lg"></div>

<!-- Colores -->
<div class="ux-spinner ux-color-primary"></div>
<div class="ux-spinner ux-color-success"></div>

<!-- Dentro de boton -->
<button class="ux-button ux-button--loading">
  <span class="ux-spinner ux-spinner--sm"></span>
  Loading...
</button>
```

## Progress

```html
<!-- Basico -->
<div class="ux-progress">
  <div class="ux-progress__bar" style="width: 60%"></div>
</div>

<!-- Con Alpine (dinamico) -->
<div class="ux-progress" x-data="{ progress: 45 }">
  <div class="ux-progress__bar" :style="{ width: progress + '%' }"></div>
</div>

<!-- Colores -->
<div class="ux-progress ux-color-success">
  <div class="ux-progress__bar" style="width: 80%"></div>
</div>

<!-- Indeterminado -->
<div class="ux-progress ux-progress--indeterminate">
  <div class="ux-progress__bar"></div>
</div>

<!-- Glass -->
<div class="ux-progress ux-progress--glass">
  <div class="ux-progress__bar" style="width: 50%"></div>
</div>
```

## Avatar

```html
<!-- Con imagen -->
<div class="ux-avatar">
  <img src="user.jpg" alt="User">
</div>

<!-- Con iniciales -->
<div class="ux-avatar">
  <span class="ux-avatar__initials">JD</span>
</div>

<!-- Tamanos -->
<div class="ux-avatar ux-avatar--xs">...</div>
<div class="ux-avatar ux-avatar--sm">...</div>
<div class="ux-avatar">...</div>  <!-- Default -->
<div class="ux-avatar ux-avatar--lg">...</div>
<div class="ux-avatar ux-avatar--xl">...</div>

<!-- Con status indicator -->
<div class="ux-avatar">
  <img src="user.jpg" alt="User">
  <span class="ux-avatar__status ux-avatar__status--online"></span>
</div>

<!-- Status options: --online, --offline, --busy, --away -->

<!-- Grupo de avatars -->
<div class="ux-avatar-group">
  <div class="ux-avatar"><img src="1.jpg"></div>
  <div class="ux-avatar"><img src="2.jpg"></div>
  <div class="ux-avatar"><span class="ux-avatar__initials">+5</span></div>
</div>
```

## Img

```html
<!-- Basico con lazy loading -->
<div class="ux-img">
  <img src="photo.jpg" alt="Photo" loading="lazy">
</div>

<!-- Aspect ratios -->
<div class="ux-img ux-img--square">...</div>
<div class="ux-img ux-img--16-9">...</div>
<div class="ux-img ux-img--4-3">...</div>
<div class="ux-img ux-img--1-1">...</div>

<!-- Object fit -->
<div class="ux-img ux-img--cover">...</div>
<div class="ux-img ux-img--contain">...</div>

<!-- Con skeleton mientras carga -->
<div class="ux-img" x-data="{ loaded: false }">
  <div class="ux-skeleton" x-show="!loaded"></div>
  <img src="photo.jpg" @load="loaded = true" :class="{ 'opacity-0': !loaded }">
</div>
```

---

# FORMULARIOS

## Input

```html
<!-- Basico -->
<div class="ux-input">
  <input type="text" placeholder="Nombre">
</div>

<!-- Con label -->
<div class="ux-input">
  <label class="ux-input__label">Email</label>
  <input type="email" placeholder="correo@ejemplo.com">
</div>

<!-- Con icono izquierda -->
<div class="ux-input ux-input--has-icon-start">
  <span class="ux-input__icon-start"><svg>...</svg></span>
  <input type="text" placeholder="Buscar...">
</div>

<!-- Con icono derecha -->
<div class="ux-input ux-input--has-icon-end">
  <input type="text" placeholder="Password">
  <span class="ux-input__icon-end"><svg>...</svg></span>
</div>

<!-- Estados -->
<div class="ux-input ux-input--error">
  <input type="text">
  <span class="ux-input__error">Campo requerido</span>
</div>

<div class="ux-input ux-input--success">
  <input type="text" value="Valido">
</div>

<div class="ux-input ux-input--disabled">
  <input type="text" disabled>
</div>

<!-- Tamanos -->
<div class="ux-input ux-input--sm">...</div>
<div class="ux-input ux-input--lg">...</div>

<!-- Glass -->
<div class="ux-input ux-input--glass">
  <input type="text" placeholder="Glass input">
</div>
```

## Textarea

```html
<!-- Basico -->
<div class="ux-textarea">
  <textarea placeholder="Escribe aqui..." rows="4"></textarea>
</div>

<!-- Con label -->
<div class="ux-textarea">
  <label class="ux-textarea__label">Comentario</label>
  <textarea rows="4"></textarea>
</div>

<!-- Auto-resize con Alpine -->
<div class="ux-textarea" x-data>
  <textarea
    rows="2"
    x-ref="textarea"
    @input="$refs.textarea.style.height = 'auto'; $refs.textarea.style.height = $refs.textarea.scrollHeight + 'px'"
  ></textarea>
</div>

<!-- Estados -->
<div class="ux-textarea ux-textarea--error">...</div>
<div class="ux-textarea ux-textarea--disabled">...</div>

<!-- Glass -->
<div class="ux-textarea ux-textarea--glass">...</div>
```

## Checkbox

```html
<!-- Basico -->
<label class="ux-checkbox">
  <input type="checkbox">
  <span class="ux-checkbox__box"></span>
  <span class="ux-checkbox__label">Acepto terminos</span>
</label>

<!-- Checked -->
<label class="ux-checkbox">
  <input type="checkbox" checked>
  <span class="ux-checkbox__box"></span>
  <span class="ux-checkbox__label">Seleccionado</span>
</label>

<!-- Disabled -->
<label class="ux-checkbox ux-checkbox--disabled">
  <input type="checkbox" disabled>
  <span class="ux-checkbox__box"></span>
  <span class="ux-checkbox__label">Deshabilitado</span>
</label>

<!-- Colores -->
<label class="ux-checkbox ux-color-success">...</label>
<label class="ux-checkbox ux-color-danger">...</label>

<!-- Tamanos -->
<label class="ux-checkbox ux-checkbox--sm">...</label>
<label class="ux-checkbox ux-checkbox--lg">...</label>

<!-- Glass -->
<label class="ux-checkbox ux-checkbox--glass">...</label>

<!-- Con Alpine para binding -->
<label class="ux-checkbox" x-data="{ checked: false }">
  <input type="checkbox" x-model="checked">
  <span class="ux-checkbox__box"></span>
  <span class="ux-checkbox__label" x-text="checked ? 'Si' : 'No'"></span>
</label>
```

## Radio

```html
<!-- Grupo basico -->
<div class="ux-radio-group" x-data="{ selected: 'option1' }">
  <label class="ux-radio">
    <input type="radio" name="options" value="option1" x-model="selected">
    <span class="ux-radio__circle">
      <span class="ux-radio__dot"></span>
    </span>
    <span class="ux-radio__label">Opcion 1</span>
  </label>

  <label class="ux-radio">
    <input type="radio" name="options" value="option2" x-model="selected">
    <span class="ux-radio__circle">
      <span class="ux-radio__dot"></span>
    </span>
    <span class="ux-radio__label">Opcion 2</span>
  </label>
</div>

<!-- Colores -->
<label class="ux-radio ux-color-success">...</label>

<!-- Tamanos -->
<label class="ux-radio ux-radio--sm">...</label>
<label class="ux-radio ux-radio--lg">...</label>

<!-- Glass -->
<label class="ux-radio ux-radio--glass">...</label>
```

## Toggle (Switch)

```html
<!-- Basico -->
<label class="ux-toggle">
  <input type="checkbox">
  <span class="ux-toggle__track">
    <span class="ux-toggle__thumb"></span>
  </span>
</label>

<!-- Con label -->
<label class="ux-toggle">
  <input type="checkbox">
  <span class="ux-toggle__track">
    <span class="ux-toggle__thumb"></span>
  </span>
  <span class="ux-toggle__label">Notificaciones</span>
</label>

<!-- Label a la izquierda -->
<label class="ux-toggle ux-toggle--label-start">
  <span class="ux-toggle__label">Dark Mode</span>
  <input type="checkbox">
  <span class="ux-toggle__track">
    <span class="ux-toggle__thumb"></span>
  </span>
</label>

<!-- Colores -->
<label class="ux-toggle ux-color-success">...</label>
<label class="ux-toggle ux-color-danger">...</label>

<!-- Tamanos -->
<label class="ux-toggle ux-toggle--sm">...</label>
<label class="ux-toggle ux-toggle--lg">...</label>

<!-- Glass -->
<label class="ux-toggle ux-toggle--glass">...</label>

<!-- Con Alpine -->
<label class="ux-toggle" x-data="{ enabled: false }">
  <input type="checkbox" x-model="enabled">
  <span class="ux-toggle__track">
    <span class="ux-toggle__thumb"></span>
  </span>
  <span class="ux-toggle__label" x-text="enabled ? 'ON' : 'OFF'"></span>
</label>
```

## Range (Slider)

```html
<!-- Basico con Alpine -->
<div class="ux-range" x-data="uxRange({ value: 50, min: 0, max: 100 })">
  <div class="ux-range__wrapper">
    <div class="ux-range__track-container">
      <div class="ux-range__track">
        <div class="ux-range__fill" :style="{ width: percentage + '%' }"></div>
      </div>
      <input type="range"
             class="ux-range__input"
             :min="min"
             :max="max"
             x-model="value">
      <div class="ux-range__thumb" :style="{ left: percentage + '%' }"></div>
    </div>
  </div>
</div>

<!-- Con valor visible -->
<div class="ux-range" x-data="uxRange({ value: 50 })">
  <div class="ux-range__header">
    <span>Volumen</span>
    <span x-text="value"></span>
  </div>
  <div class="ux-range__wrapper">
    <!-- ... slider ... -->
  </div>
</div>

<!-- Con min/max labels -->
<div class="ux-range" x-data="uxRange({ value: 50, min: 0, max: 100 })">
  <div class="ux-range__wrapper">
    <span class="ux-range__min" x-text="min"></span>
    <div class="ux-range__track-container">...</div>
    <span class="ux-range__max" x-text="max"></span>
  </div>
</div>

<!-- Colores -->
<div class="ux-range ux-color-success">...</div>

<!-- Glass -->
<div class="ux-range ux-range--glass">...</div>
```

## Select

```html
<!-- Basico con Alpine -->
<div class="ux-select" x-data="uxSelect({
  options: [
    { value: '1', label: 'Opcion 1' },
    { value: '2', label: 'Opcion 2' },
    { value: '3', label: 'Opcion 3' }
  ],
  value: ''
})" @click.outside="isOpen = false">

  <button class="ux-select__trigger" @click="toggle()">
    <span class="ux-select__value" x-text="selectedLabel || 'Seleccionar...'"></span>
    <svg class="ux-select__arrow">...</svg>
  </button>

  <div class="ux-select__dropdown" x-show="isOpen" x-transition>
    <template x-for="option in options" :key="option.value">
      <div class="ux-select__option"
           :class="{ 'ux-select__option--selected': value === option.value }"
           @click="select(option)">
        <span x-text="option.label"></span>
      </div>
    </template>
  </div>
</div>

<!-- Con busqueda -->
<div class="ux-select ux-select--searchable" x-data="uxSelect({ searchable: true, options: [...] })">
  <button class="ux-select__trigger" @click="toggle()">...</button>
  <div class="ux-select__dropdown" x-show="isOpen">
    <div class="ux-select__search">
      <input type="text" placeholder="Buscar..." x-model="searchQuery">
    </div>
    <template x-for="option in filteredOptions">...</template>
  </div>
</div>

<!-- Multiple -->
<div class="ux-select ux-select--multiple" x-data="uxSelect({ multiple: true, options: [...] })">
  ...
</div>

<!-- Glass -->
<div class="ux-select ux-select--glass">...</div>
```

## Searchbar

```html
<!-- Basico -->
<div class="ux-searchbar">
  <span class="ux-searchbar__icon">
    <svg><!-- search icon --></svg>
  </span>
  <input type="search" class="ux-searchbar__input" placeholder="Buscar...">
</div>

<!-- Con boton cancelar (iOS style) -->
<div class="ux-searchbar" x-data="{ query: '', focused: false }">
  <span class="ux-searchbar__icon"><svg>...</svg></span>
  <input type="search"
         class="ux-searchbar__input"
         placeholder="Buscar..."
         x-model="query"
         @focus="focused = true"
         @blur="focused = false">
  <button class="ux-searchbar__cancel"
          x-show="focused || query"
          @click="query = ''; $refs.input.blur()">
    Cancelar
  </button>
</div>

<!-- Tamanos -->
<div class="ux-searchbar ux-searchbar--sm">...</div>
<div class="ux-searchbar ux-searchbar--lg">...</div>

<!-- Glass -->
<div class="ux-searchbar ux-searchbar--glass">...</div>
```

---

# LAYOUT

## Card

```html
<!-- Basico -->
<div class="ux-card">
  <div class="ux-card__content">
    Contenido de la card
  </div>
</div>

<!-- Con header -->
<div class="ux-card">
  <div class="ux-card__header">
    <h3 class="ux-card__title">Titulo</h3>
    <p class="ux-card__subtitle">Subtitulo</p>
  </div>
  <div class="ux-card__content">
    Contenido
  </div>
</div>

<!-- Con header bordeado -->
<div class="ux-card">
  <div class="ux-card__header ux-card__header--bordered">
    <h3 class="ux-card__title">Titulo</h3>
  </div>
  <div class="ux-card__content">...</div>
</div>

<!-- Con imagen -->
<div class="ux-card">
  <div class="ux-card__media">
    <img src="image.jpg" alt="Image">
  </div>
  <div class="ux-card__content">...</div>
</div>

<!-- Con footer -->
<div class="ux-card">
  <div class="ux-card__content">...</div>
  <div class="ux-card__footer">
    <button class="ux-button ux-button--sm">Accion</button>
  </div>
</div>

<!-- Variantes -->
<div class="ux-card ux-card--outlined">...</div>
<div class="ux-card ux-card--flat">...</div>
<div class="ux-card ux-card--glass">...</div>

<!-- Clickable -->
<div class="ux-card ux-card--clickable" @click="...">...</div>
```

## List

```html
<!-- Basico -->
<ul class="ux-list">
  <li class="ux-list__item">Item 1</li>
  <li class="ux-list__item">Item 2</li>
  <li class="ux-list__item">Item 3</li>
</ul>

<!-- Con iconos/avatars -->
<ul class="ux-list">
  <li class="ux-list__item">
    <div class="ux-list__item-start">
      <div class="ux-avatar ux-avatar--sm">
        <img src="user.jpg">
      </div>
    </div>
    <div class="ux-list__item-content">
      <div class="ux-list__item-title">Usuario</div>
      <div class="ux-list__item-subtitle">Descripcion</div>
    </div>
    <div class="ux-list__item-end">
      <svg><!-- chevron --></svg>
    </div>
  </li>
</ul>

<!-- Inset (con padding izquierdo) -->
<ul class="ux-list ux-list--inset">...</ul>

<!-- Con dividers -->
<ul class="ux-list ux-list--dividers">...</ul>

<!-- Items clickables -->
<ul class="ux-list">
  <li class="ux-list__item ux-list__item--clickable" @click="...">
    Clickable item
  </li>
</ul>

<!-- Glass -->
<ul class="ux-list ux-list--glass">...</ul>

<!-- Con header de seccion -->
<ul class="ux-list">
  <li class="ux-list__header">Seccion A</li>
  <li class="ux-list__item">Item 1</li>
  <li class="ux-list__item">Item 2</li>
  <li class="ux-list__header">Seccion B</li>
  <li class="ux-list__item">Item 3</li>
</ul>
```

## Content

```html
<!-- Contenedor principal con safe areas -->
<div class="ux-content">
  <!-- Tu contenido aqui -->
</div>

<!-- Con padding -->
<div class="ux-content ux-padding">...</div>

<!-- Scroll interno -->
<div class="ux-content ux-content--scroll">...</div>

<!-- Full height -->
<div class="ux-content ux-content--fullscreen">...</div>
```

---

# NAVEGACION

## Navbar

```html
<!-- Basico -->
<nav class="ux-navbar">
  <div class="ux-navbar__content">
    <div class="ux-navbar__start">
      <button class="ux-navbar__button">
        <svg><!-- menu icon --></svg>
      </button>
    </div>
    <div class="ux-navbar__center">
      <span class="ux-navbar__title">Titulo</span>
    </div>
    <div class="ux-navbar__end">
      <button class="ux-navbar__button">
        <svg><!-- more icon --></svg>
      </button>
    </div>
  </div>
</nav>

<!-- Con back button -->
<nav class="ux-navbar">
  <div class="ux-navbar__content">
    <div class="ux-navbar__start">
      <a href="#" class="ux-navbar__button">
        <span class="ux-navbar__back">
          <span class="ux-navbar__back-icon"><svg>...</svg></span>
          <span class="ux-navbar__back-text">Atras</span>
        </span>
      </a>
    </div>
    <div class="ux-navbar__center">
      <span class="ux-navbar__title">Detalle</span>
    </div>
  </div>
</nav>

<!-- Sticky -->
<nav class="ux-navbar ux-navbar--sticky">...</nav>

<!-- Glass -->
<nav class="ux-navbar ux-navbar--glass">...</nav>

<!-- Con subtitulo -->
<nav class="ux-navbar">
  <div class="ux-navbar__content">
    <div class="ux-navbar__center">
      <span class="ux-navbar__title">Titulo</span>
      <span class="ux-navbar__subtitle">Subtitulo</span>
    </div>
  </div>
</nav>
```

## Toolbar

```html
<!-- Basico -->
<div class="ux-toolbar">
  <div class="ux-toolbar__content">
    <button class="ux-button ux-button--clear">
      <svg>...</svg>
    </button>
    <button class="ux-button ux-button--clear">
      <svg>...</svg>
    </button>
    <div class="ux-toolbar__spacer"></div>
    <button class="ux-button ux-button--clear">
      <svg>...</svg>
    </button>
  </div>
</div>

<!-- Posiciones -->
<div class="ux-toolbar ux-toolbar--top">...</div>
<div class="ux-toolbar ux-toolbar--bottom">...</div>

<!-- Glass -->
<div class="ux-toolbar ux-toolbar--glass">...</div>
```

## Tabs (Tab Bar)

```html
<!-- Tab bar basico -->
<div class="ux-tabs" x-data="{ activeTab: 'home' }">
  <div class="ux-tabs__bar">
    <button class="ux-tabs__tab"
            :class="{ 'ux-tabs__tab--active': activeTab === 'home' }"
            @click="activeTab = 'home'">
      <svg class="ux-tabs__tab-icon">...</svg>
      <span class="ux-tabs__tab-label">Home</span>
    </button>
    <button class="ux-tabs__tab"
            :class="{ 'ux-tabs__tab--active': activeTab === 'search' }"
            @click="activeTab = 'search'">
      <svg class="ux-tabs__tab-icon">...</svg>
      <span class="ux-tabs__tab-label">Buscar</span>
    </button>
    <button class="ux-tabs__tab"
            :class="{ 'ux-tabs__tab--active': activeTab === 'profile' }"
            @click="activeTab = 'profile'">
      <svg class="ux-tabs__tab-icon">...</svg>
      <span class="ux-tabs__tab-label">Perfil</span>
    </button>
  </div>
</div>

<!-- Con badge -->
<button class="ux-tabs__tab">
  <div class="ux-tabs__tab-icon-wrapper">
    <svg class="ux-tabs__tab-icon">...</svg>
    <span class="ux-badge ux-badge--dot ux-color-danger"></span>
  </div>
  <span class="ux-tabs__tab-label">Notificaciones</span>
</button>

<!-- Glass -->
<div class="ux-tabs ux-tabs--glass">...</div>
```

## Segment

```html
<!-- Basico -->
<div class="ux-segment" x-data="{ selected: 'all' }">
  <button class="ux-segment__button"
          :class="{ 'ux-segment__button--active': selected === 'all' }"
          @click="selected = 'all'">
    Todos
  </button>
  <button class="ux-segment__button"
          :class="{ 'ux-segment__button--active': selected === 'active' }"
          @click="selected = 'active'">
    Activos
  </button>
  <button class="ux-segment__button"
          :class="{ 'ux-segment__button--active': selected === 'completed' }"
          @click="selected = 'completed'">
    Completados
  </button>
</div>

<!-- Con indicador animado -->
<div class="ux-segment ux-segment--animated" x-data="uxSegment({ value: 'all' })">
  <div class="ux-segment__indicator" :style="indicatorStyle"></div>
  <button class="ux-segment__button" @click="select('all')" x-ref="all">Todos</button>
  <button class="ux-segment__button" @click="select('active')" x-ref="active">Activos</button>
</div>

<!-- Glass -->
<div class="ux-segment ux-segment--glass">...</div>
```

## Menu (Dropdown)

```html
<!-- Basico -->
<div class="ux-menu" x-data="{ open: false }" :class="{ 'ux-menu--open': open }" @click.outside="open = false">
  <button class="ux-button" @click="open = !open">
    Opciones
    <svg><!-- chevron down --></svg>
  </button>
  <div class="ux-menu__content ux-menu__content--bottom">
    <ul class="ux-menu__list">
      <li><a href="#" class="ux-menu__item" @click="open = false">Opcion 1</a></li>
      <li><a href="#" class="ux-menu__item" @click="open = false">Opcion 2</a></li>
      <li class="ux-menu__divider"></li>
      <li><a href="#" class="ux-menu__item ux-menu__item--danger" @click="open = false">Eliminar</a></li>
    </ul>
  </div>
</div>

<!-- Con iconos -->
<a href="#" class="ux-menu__item">
  <span class="ux-menu__item-icon"><svg>...</svg></span>
  <span class="ux-menu__item-label">Copiar</span>
  <span class="ux-menu__item-end">
    <span class="ux-menu__item-shortcut">Cmd+C</span>
  </span>
</a>

<!-- Posiciones -->
<div class="ux-menu__content ux-menu__content--bottom">...</div>
<div class="ux-menu__content ux-menu__content--top">...</div>
<div class="ux-menu__content ux-menu__content--right">...</div>

<!-- Glass -->
<div class="ux-menu ux-menu--glass">...</div>
```

## Breadcrumbs

```html
<nav class="ux-breadcrumbs">
  <ol class="ux-breadcrumbs__list">
    <li class="ux-breadcrumbs__item">
      <a href="#" class="ux-breadcrumbs__link">Home</a>
    </li>
    <li class="ux-breadcrumbs__separator">/</li>
    <li class="ux-breadcrumbs__item">
      <a href="#" class="ux-breadcrumbs__link">Productos</a>
    </li>
    <li class="ux-breadcrumbs__separator">/</li>
    <li class="ux-breadcrumbs__item ux-breadcrumbs__item--active">
      <span>Detalle</span>
    </li>
  </ol>
</nav>

<!-- Glass -->
<nav class="ux-breadcrumbs ux-breadcrumbs--glass">...</nav>
```

## Back Button

```html
<!-- Basico -->
<button class="ux-back-button" onclick="history.back()">
  <svg class="ux-back-button__icon">
    <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2"/>
  </svg>
  <span class="ux-back-button__text">Atras</span>
</button>

<!-- Solo icono -->
<button class="ux-back-button ux-back-button--icon-only">
  <svg class="ux-back-button__icon">...</svg>
</button>
```

---

# OVERLAYS

## Modal

```html
<!-- Con Alpine -->
<div x-data="uxModal()">
  <!-- Trigger -->
  <button class="ux-button" @click="open()">Abrir Modal</button>

  <!-- Modal -->
  <template x-teleport="body">
    <div class="ux-modal"
         :class="{ 'ux-modal--open': isOpen }"
         x-show="isOpen"
         x-transition>
      <div class="ux-modal__backdrop" @click="close()"></div>
      <div class="ux-modal__container">
        <div class="ux-modal__header">
          <h2 class="ux-modal__title">Titulo</h2>
          <button class="ux-modal__close" @click="close()">
            <svg>...</svg>
          </button>
        </div>
        <div class="ux-modal__content">
          Contenido del modal
        </div>
        <div class="ux-modal__footer">
          <button class="ux-button ux-button--secondary" @click="close()">Cancelar</button>
          <button class="ux-button" @click="close()">Aceptar</button>
        </div>
      </div>
    </div>
  </template>
</div>

<!-- Tamanos -->
<div class="ux-modal__container ux-modal__container--sm">...</div>
<div class="ux-modal__container ux-modal__container--lg">...</div>
<div class="ux-modal__container ux-modal__container--fullscreen">...</div>

<!-- Glass -->
<div class="ux-modal ux-modal--glass">...</div>
```

## Sheet (Bottom Sheet)

```html
<!-- Con Alpine -->
<div x-data="uxSheet()">
  <button class="ux-button" @click="open()">Abrir Sheet</button>

  <template x-teleport="body">
    <div class="ux-sheet"
         :class="{ 'ux-sheet--open': isOpen }"
         x-show="isOpen">
      <div class="ux-sheet__backdrop" @click="close()"></div>
      <div class="ux-sheet__container">
        <div class="ux-sheet__handle"></div>
        <div class="ux-sheet__header">
          <h2 class="ux-sheet__title">Titulo</h2>
        </div>
        <div class="ux-sheet__content">
          Contenido
        </div>
      </div>
    </div>
  </template>
</div>

<!-- Alturas -->
<div class="ux-sheet__container ux-sheet__container--sm">...</div>  <!-- 25% -->
<div class="ux-sheet__container ux-sheet__container--md">...</div>  <!-- 50% -->
<div class="ux-sheet__container ux-sheet__container--lg">...</div>  <!-- 75% -->
<div class="ux-sheet__container ux-sheet__container--full">...</div> <!-- 100% -->

<!-- Glass -->
<div class="ux-sheet ux-sheet--glass">...</div>
```

## Alert

```html
<!-- Con Alpine -->
<div x-data="uxAlert()">
  <button @click="show({
    title: 'Confirmar',
    message: 'Estas seguro?',
    buttons: [
      { text: 'Cancelar', role: 'cancel' },
      { text: 'Aceptar', role: 'confirm', handler: () => console.log('OK') }
    ]
  })">
    Mostrar Alert
  </button>

  <template x-teleport="body">
    <div class="ux-alert" x-show="isOpen" x-transition>
      <div class="ux-alert__backdrop"></div>
      <div class="ux-alert__container">
        <div class="ux-alert__header">
          <h2 class="ux-alert__title" x-text="title"></h2>
        </div>
        <div class="ux-alert__message" x-text="message"></div>
        <div class="ux-alert__buttons">
          <template x-for="button in buttons">
            <button class="ux-alert__button"
                    :class="{ 'ux-alert__button--destructive': button.role === 'destructive' }"
                    @click="handleButton(button)">
              <span x-text="button.text"></span>
            </button>
          </template>
        </div>
      </div>
    </div>
  </template>
</div>

<!-- Glass -->
<div class="ux-alert ux-alert--glass">...</div>
```

## Toast

```html
<!-- Con Alpine (usando $dispatch) -->
<button @click="$dispatch('ux-toast', { message: 'Guardado correctamente', type: 'success' })">
  Mostrar Toast
</button>

<!-- Contenedor de toasts (agregar una vez en el body) -->
<div class="ux-toast-container" x-data="uxToastContainer()" @ux-toast.window="addToast($event.detail)">
  <template x-for="toast in toasts" :key="toast.id">
    <div class="ux-toast"
         :class="'ux-toast--' + toast.type"
         x-show="toast.visible"
         x-transition>
      <span class="ux-toast__message" x-text="toast.message"></span>
      <button class="ux-toast__close" @click="removeToast(toast.id)">&times;</button>
    </div>
  </template>
</div>

<!-- Tipos de toast -->
<div class="ux-toast ux-toast--success">...</div>
<div class="ux-toast ux-toast--error">...</div>
<div class="ux-toast ux-toast--warning">...</div>
<div class="ux-toast ux-toast--info">...</div>

<!-- Posiciones -->
<div class="ux-toast-container ux-toast-container--top">...</div>
<div class="ux-toast-container ux-toast-container--bottom">...</div>

<!-- Glass -->
<div class="ux-toast ux-toast--glass">...</div>
```

## Popover

```html
<!-- Con Alpine -->
<div class="ux-popover" x-data="{ open: false }" @click.outside="open = false">
  <button class="ux-button" @click="open = !open">
    Info
  </button>
  <div class="ux-popover__content ux-popover__content--bottom"
       x-show="open"
       x-transition>
    <div class="ux-popover__arrow"></div>
    <p>Contenido del popover</p>
  </div>
</div>

<!-- Posiciones -->
<div class="ux-popover__content ux-popover__content--top">...</div>
<div class="ux-popover__content ux-popover__content--bottom">...</div>
<div class="ux-popover__content ux-popover__content--left">...</div>
<div class="ux-popover__content ux-popover__content--right">...</div>

<!-- Como dropdown menu -->
<div class="ux-popover ux-popover--dropdown">
  <button @click="open = !open">Menu</button>
  <div class="ux-popover__content">
    <ul class="ux-list">
      <li class="ux-list__item ux-list__item--clickable">Opcion 1</li>
      <li class="ux-list__item ux-list__item--clickable">Opcion 2</li>
    </ul>
  </div>
</div>

<!-- Glass -->
<div class="ux-popover ux-popover--glass">...</div>
```

## Loading

```html
<!-- Overlay de carga -->
<div class="ux-loading" x-data="{ loading: false }" x-show="loading">
  <div class="ux-loading__backdrop"></div>
  <div class="ux-loading__container">
    <div class="ux-spinner"></div>
    <span class="ux-loading__text">Cargando...</span>
  </div>
</div>

<!-- Spinner inline -->
<div class="ux-loading ux-loading--inline">
  <div class="ux-spinner ux-spinner--sm"></div>
</div>
```

## Picker

```html
<!-- Date picker con Alpine -->
<div x-data="uxPicker({ type: 'date', value: '2024-01-15' })">
  <button class="ux-button" @click="open()">
    <span x-text="formattedValue"></span>
  </button>

  <template x-teleport="body">
    <div class="ux-picker" x-show="isOpen">
      <div class="ux-picker__backdrop" @click="close()"></div>
      <div class="ux-picker__container">
        <div class="ux-picker__header">
          <button @click="close()">Cancelar</button>
          <span class="ux-picker__title">Seleccionar Fecha</span>
          <button @click="confirm()">OK</button>
        </div>
        <div class="ux-picker__columns">
          <!-- Columnas de seleccion -->
        </div>
      </div>
    </div>
  </template>
</div>

<!-- Glass -->
<div class="ux-picker ux-picker--glass">...</div>
```

## Tooltip

```html
<!-- Hover tooltip -->
<span class="ux-tooltip" data-tooltip="Texto de ayuda">
  <button class="ux-button ux-button--icon">
    <svg>...</svg>
  </button>
</span>

<!-- Posiciones -->
<span class="ux-tooltip ux-tooltip--top" data-tooltip="Arriba">...</span>
<span class="ux-tooltip ux-tooltip--bottom" data-tooltip="Abajo">...</span>
<span class="ux-tooltip ux-tooltip--left" data-tooltip="Izquierda">...</span>
<span class="ux-tooltip ux-tooltip--right" data-tooltip="Derecha">...</span>

<!-- Con Alpine para control manual -->
<div class="ux-tooltip" x-data="{ show: false }">
  <button @mouseenter="show = true" @mouseleave="show = false">Hover me</button>
  <div class="ux-tooltip__content" x-show="show" x-transition>
    Contenido del tooltip
  </div>
</div>
```

---

# FEEDBACK

## Skeleton

```html
<!-- Linea de texto -->
<div class="ux-skeleton ux-skeleton--text"></div>

<!-- Lineas multiples -->
<div class="ux-skeleton ux-skeleton--text"></div>
<div class="ux-skeleton ux-skeleton--text" style="width: 80%"></div>
<div class="ux-skeleton ux-skeleton--text" style="width: 60%"></div>

<!-- Circulo (avatar) -->
<div class="ux-skeleton ux-skeleton--circle"></div>

<!-- Rectangulo (imagen) -->
<div class="ux-skeleton ux-skeleton--rect" style="height: 200px"></div>

<!-- Card skeleton -->
<div class="ux-card">
  <div class="ux-skeleton ux-skeleton--rect" style="height: 150px"></div>
  <div class="ux-card__content">
    <div class="ux-skeleton ux-skeleton--text" style="width: 60%"></div>
    <div class="ux-skeleton ux-skeleton--text"></div>
    <div class="ux-skeleton ux-skeleton--text" style="width: 40%"></div>
  </div>
</div>

<!-- Glass -->
<div class="ux-skeleton ux-skeleton--glass ux-skeleton--text"></div>
```

## FAB (Floating Action Button)

```html
<!-- Basico -->
<button class="ux-fab">
  <svg class="ux-fab__icon">
    <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2"/>
  </svg>
</button>

<!-- Tamanos -->
<button class="ux-fab ux-fab--sm">...</button>
<button class="ux-fab ux-fab--lg">...</button>

<!-- Posiciones fijas -->
<button class="ux-fab ux-fab--fixed ux-fab--bottom-right">...</button>
<button class="ux-fab ux-fab--fixed ux-fab--bottom-left">...</button>
<button class="ux-fab ux-fab--fixed ux-fab--top-right">...</button>

<!-- Colores -->
<button class="ux-fab ux-color-success">...</button>
<button class="ux-fab ux-color-danger">...</button>

<!-- Extended (con label) -->
<button class="ux-fab ux-fab--extended">
  <svg class="ux-fab__icon">...</svg>
  <span class="ux-fab__label">Nuevo</span>
</button>

<!-- Glass -->
<button class="ux-fab ux-fab--glass">...</button>

<!-- FAB menu (speed dial) -->
<div class="ux-fab-container" x-data="{ open: false }">
  <div class="ux-fab-menu" x-show="open">
    <button class="ux-fab ux-fab--sm">...</button>
    <button class="ux-fab ux-fab--sm">...</button>
  </div>
  <button class="ux-fab" @click="open = !open">
    <svg :class="{ 'rotate-45': open }">...</svg>
  </button>
</div>
```

## Rating

```html
<!-- Basico con Alpine -->
<div class="ux-rating" x-data="uxRating({ value: 3, max: 5 })">
  <template x-for="i in max" :key="i">
    <button class="ux-rating__star"
            :class="{ 'ux-rating__star--filled': i <= value }"
            @click="value = i"
            @mouseenter="hover = i"
            @mouseleave="hover = 0">
      <svg><!-- star icon --></svg>
    </button>
  </template>
</div>

<!-- Read-only -->
<div class="ux-rating ux-rating--readonly" x-data="{ value: 4 }">
  <template x-for="i in 5">
    <span class="ux-rating__star" :class="{ 'ux-rating__star--filled': i <= value }">
      <svg>...</svg>
    </span>
  </template>
</div>

<!-- Tamanos -->
<div class="ux-rating ux-rating--sm">...</div>
<div class="ux-rating ux-rating--lg">...</div>

<!-- Colores -->
<div class="ux-rating ux-color-warning">...</div>
```

---

# INTERACTIVOS

## Accordion

```html
<!-- Basico con Alpine -->
<div class="ux-accordion" x-data="{ openItem: null }">
  <div class="ux-accordion__item" :class="{ 'ux-accordion__item--open': openItem === 1 }">
    <button class="ux-accordion__header" @click="openItem = openItem === 1 ? null : 1">
      <span class="ux-accordion__title">Seccion 1</span>
      <svg class="ux-accordion__icon">...</svg>
    </button>
    <div class="ux-accordion__content" x-show="openItem === 1" x-collapse>
      <div class="ux-accordion__body">
        Contenido de la seccion 1
      </div>
    </div>
  </div>

  <div class="ux-accordion__item" :class="{ 'ux-accordion__item--open': openItem === 2 }">
    <button class="ux-accordion__header" @click="openItem = openItem === 2 ? null : 2">
      <span class="ux-accordion__title">Seccion 2</span>
      <svg class="ux-accordion__icon">...</svg>
    </button>
    <div class="ux-accordion__content" x-show="openItem === 2" x-collapse>
      <div class="ux-accordion__body">
        Contenido de la seccion 2
      </div>
    </div>
  </div>
</div>

<!-- Multiple abiertos -->
<div class="ux-accordion" x-data="{ openItems: [] }">
  <div class="ux-accordion__item" :class="{ 'ux-accordion__item--open': openItems.includes(1) }">
    <button @click="openItems.includes(1) ? openItems = openItems.filter(i => i !== 1) : openItems.push(1)">
      ...
    </button>
  </div>
</div>

<!-- Glass -->
<div class="ux-accordion ux-accordion--glass">...</div>
```

## Carousel

```html
<!-- Basico con Alpine -->
<div class="ux-carousel" x-data="uxCarousel({ autoplay: true, interval: 5000 })">
  <div class="ux-carousel__container">
    <div class="ux-carousel__track" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
      <div class="ux-carousel__slide">
        <img src="slide1.jpg" alt="Slide 1">
      </div>
      <div class="ux-carousel__slide">
        <img src="slide2.jpg" alt="Slide 2">
      </div>
      <div class="ux-carousel__slide">
        <img src="slide3.jpg" alt="Slide 3">
      </div>
    </div>
  </div>

  <!-- Navigation arrows -->
  <button class="ux-carousel__prev" @click="prev()">
    <svg>...</svg>
  </button>
  <button class="ux-carousel__next" @click="next()">
    <svg>...</svg>
  </button>

  <!-- Dots -->
  <div class="ux-carousel__dots">
    <template x-for="(slide, index) in slides" :key="index">
      <button class="ux-carousel__dot"
              :class="{ 'ux-carousel__dot--active': currentIndex === index }"
              @click="goTo(index)">
      </button>
    </template>
  </div>
</div>
```

## Datetime

```html
<!-- Date input -->
<div class="ux-datetime" x-data="uxDatetime({ type: 'date', value: '' })">
  <div class="ux-input" @click="open()">
    <input type="text" readonly :value="formattedValue" placeholder="Seleccionar fecha">
    <span class="ux-input__icon-end"><svg>...</svg></span>
  </div>

  <template x-teleport="body">
    <div class="ux-datetime__picker" x-show="isOpen">
      <div class="ux-datetime__backdrop" @click="close()"></div>
      <div class="ux-datetime__container">
        <!-- Calendar UI -->
      </div>
    </div>
  </template>
</div>

<!-- Time input -->
<div class="ux-datetime" x-data="uxDatetime({ type: 'time' })">...</div>

<!-- DateTime -->
<div class="ux-datetime" x-data="uxDatetime({ type: 'datetime' })">...</div>

<!-- Glass -->
<div class="ux-datetime ux-datetime--glass">...</div>
```

## Datatable

```html
<!-- Tabla basica -->
<div class="ux-datatable" x-data="uxDatatable({
  data: [...],
  columns: [
    { key: 'name', label: 'Nombre', sortable: true },
    { key: 'email', label: 'Email' },
    { key: 'status', label: 'Estado' }
  ]
})">
  <table class="ux-datatable__table">
    <thead class="ux-datatable__head">
      <tr>
        <template x-for="col in columns" :key="col.key">
          <th class="ux-datatable__th"
              :class="{ 'ux-datatable__th--sortable': col.sortable }"
              @click="col.sortable && sort(col.key)">
            <span x-text="col.label"></span>
            <svg x-show="sortKey === col.key">...</svg>
          </th>
        </template>
      </tr>
    </thead>
    <tbody class="ux-datatable__body">
      <template x-for="row in paginatedData" :key="row.id">
        <tr class="ux-datatable__row">
          <template x-for="col in columns" :key="col.key">
            <td class="ux-datatable__td" x-text="row[col.key]"></td>
          </template>
        </tr>
      </template>
    </tbody>
  </table>

  <!-- Paginacion -->
  <div class="ux-datatable__pagination">
    <button @click="prevPage()" :disabled="currentPage === 1">Anterior</button>
    <span x-text="`${currentPage} de ${totalPages}`"></span>
    <button @click="nextPage()" :disabled="currentPage === totalPages">Siguiente</button>
  </div>
</div>

<!-- Glass -->
<div class="ux-datatable ux-datatable--glass">...</div>
```

## Stepper

```html
<!-- Stepper horizontal -->
<div class="ux-stepper" x-data="uxStepper({ steps: 4, current: 1 })">
  <div class="ux-stepper__header">
    <template x-for="step in steps" :key="step">
      <div class="ux-stepper__step"
           :class="{
             'ux-stepper__step--active': current === step,
             'ux-stepper__step--completed': current > step
           }">
        <div class="ux-stepper__indicator">
          <span x-show="current <= step" x-text="step"></span>
          <svg x-show="current > step"><!-- check icon --></svg>
        </div>
        <span class="ux-stepper__label">Paso <span x-text="step"></span></span>
      </div>
    </template>
  </div>

  <div class="ux-stepper__content">
    <div x-show="current === 1">Contenido paso 1</div>
    <div x-show="current === 2">Contenido paso 2</div>
    <div x-show="current === 3">Contenido paso 3</div>
    <div x-show="current === 4">Contenido paso 4</div>
  </div>

  <div class="ux-stepper__actions">
    <button class="ux-button ux-button--secondary" @click="prev()" :disabled="current === 1">
      Anterior
    </button>
    <button class="ux-button" @click="next()" x-show="current < steps">
      Siguiente
    </button>
    <button class="ux-button ux-color-success" x-show="current === steps" @click="complete()">
      Finalizar
    </button>
  </div>
</div>

<!-- Vertical -->
<div class="ux-stepper ux-stepper--vertical">...</div>
```

## Upload

```html
<!-- Drop zone -->
<div class="ux-upload" x-data="uxUpload({ multiple: true, accept: 'image/*' })">
  <div class="ux-upload__dropzone"
       :class="{ 'ux-upload__dropzone--dragover': isDragging }"
       @dragover.prevent="isDragging = true"
       @dragleave="isDragging = false"
       @drop.prevent="handleDrop($event)">
    <input type="file"
           class="ux-upload__input"
           :accept="accept"
           :multiple="multiple"
           @change="handleFiles($event)">
    <div class="ux-upload__content">
      <svg class="ux-upload__icon">...</svg>
      <p class="ux-upload__text">Arrastra archivos o haz clic</p>
      <p class="ux-upload__hint">PNG, JPG hasta 10MB</p>
    </div>
  </div>

  <!-- File list -->
  <div class="ux-upload__files" x-show="files.length">
    <template x-for="file in files" :key="file.id">
      <div class="ux-upload__file">
        <img x-show="file.preview" :src="file.preview" class="ux-upload__preview">
        <div class="ux-upload__file-info">
          <span class="ux-upload__file-name" x-text="file.name"></span>
          <span class="ux-upload__file-size" x-text="formatSize(file.size)"></span>
        </div>
        <button class="ux-upload__file-remove" @click="removeFile(file.id)">&times;</button>
      </div>
    </template>
  </div>
</div>

<!-- Button style -->
<div class="ux-upload ux-upload--button" x-data="uxUpload()">
  <button class="ux-button">
    <svg>...</svg>
    Subir archivo
  </button>
  <input type="file" class="ux-upload__input" @change="handleFiles($event)">
</div>

<!-- Avatar upload -->
<div class="ux-upload ux-upload--avatar" x-data="uxUpload({ accept: 'image/*' })">
  <div class="ux-avatar ux-avatar--xl">
    <img x-show="preview" :src="preview">
    <span x-show="!preview" class="ux-avatar__initials">+</span>
  </div>
  <input type="file" @change="handleFiles($event)">
</div>
```

---

# GESTOS

## Swipe

```html
<!-- Item con swipe actions -->
<div class="ux-swipe" x-data="uxSwipe()">
  <div class="ux-swipe__actions ux-swipe__actions--start">
    <button class="ux-swipe__action ux-color-success">
      <svg>...</svg>
    </button>
  </div>

  <div class="ux-swipe__content"
       x-ref="content"
       @touchstart="onTouchStart($event)"
       @touchmove="onTouchMove($event)"
       @touchend="onTouchEnd($event)">
    <div class="ux-list__item">
      Contenido deslizable
    </div>
  </div>

  <div class="ux-swipe__actions ux-swipe__actions--end">
    <button class="ux-swipe__action ux-color-danger">
      <svg>...</svg>
      Eliminar
    </button>
  </div>
</div>

<!-- Directiva x-swipe -->
<div x-data x-swipe.left="handleSwipeLeft()" x-swipe.right="handleSwipeRight()">
  Desliza izquierda o derecha
</div>
```

## Infinite Scroll

```html
<!-- Con Alpine -->
<div class="ux-infinite-scroll" x-data="uxInfiniteScroll()">
  <div class="ux-list">
    <template x-for="item in items" :key="item.id">
      <div class="ux-list__item" x-text="item.name"></div>
    </template>
  </div>

  <!-- Trigger -->
  <div class="ux-infinite-scroll__trigger"
       x-intersect="loadMore()"
       x-show="hasMore">
    <div class="ux-spinner"></div>
  </div>

  <div x-show="!hasMore" class="ux-infinite-scroll__end">
    No hay mas items
  </div>
</div>
```

## Refresher (Pull to Refresh)

```html
<!-- Con Alpine -->
<div class="ux-refresher" x-data="uxRefresher()" @touchmove="onTouchMove($event)">
  <div class="ux-refresher__indicator" :style="{ transform: `translateY(${pullDistance}px)` }">
    <div class="ux-spinner" x-show="isRefreshing"></div>
    <svg x-show="!isRefreshing" :style="{ transform: `rotate(${rotation}deg)` }">...</svg>
  </div>

  <div class="ux-refresher__content"
       @touchstart="onTouchStart($event)"
       @touchend="onTouchEnd()">
    <!-- Contenido -->
  </div>
</div>

<!-- Directiva x-pull-refresh -->
<div x-data x-pull-refresh="refresh()">
  Pull to refresh
</div>
```

## Reorder

```html
<!-- Lista reordenable -->
<div class="ux-reorder" x-data="uxReorder({ items: [...] })">
  <template x-for="(item, index) in items" :key="item.id">
    <div class="ux-reorder__item"
         draggable="true"
         @dragstart="onDragStart(index, $event)"
         @dragover.prevent="onDragOver(index)"
         @drop="onDrop(index)">
      <span class="ux-reorder__handle">
        <svg><!-- grip icon --></svg>
      </span>
      <span x-text="item.name"></span>
    </div>
  </template>
</div>
```

---

# OTROS

## PWA

```html
<!-- Detector de instalacion PWA -->
<div x-data="uxPwa()">
  <!-- Banner de instalacion -->
  <div class="ux-pwa-banner" x-show="showInstallBanner">
    <p>Instala la app para mejor experiencia</p>
    <button class="ux-button ux-button--sm" @click="install()">Instalar</button>
    <button class="ux-button ux-button--clear ux-button--sm" @click="dismissBanner()">Cerrar</button>
  </div>

  <!-- Indicador offline -->
  <div class="ux-pwa-offline" x-show="isOffline">
    Sin conexion
  </div>

  <!-- Update disponible -->
  <div class="ux-pwa-update" x-show="updateAvailable">
    <p>Nueva version disponible</p>
    <button @click="update()">Actualizar</button>
  </div>
</div>
```

## Scroll

```html
<!-- Scroll container con funcionalidades -->
<div class="ux-scroll" x-data="uxScroll()">
  <div class="ux-scroll__content" x-ref="content" @scroll="onScroll($event)">
    <!-- Contenido largo -->
  </div>

  <!-- Scroll to top button -->
  <button class="ux-scroll__top"
          x-show="showScrollTop"
          @click="scrollToTop()">
    <svg>...</svg>
  </button>
</div>

<!-- Con snap scroll (carrusel) -->
<div class="ux-scroll ux-scroll--snap-x">
  <div class="ux-scroll__content">
    <div class="ux-scroll__item">Item 1</div>
    <div class="ux-scroll__item">Item 2</div>
    <div class="ux-scroll__item">Item 3</div>
  </div>
</div>
```

---

# UTILIDADES CSS

## Spacing

```html
<!-- Margin -->
<div class="ux-m-xs">margin: 0.25rem</div>
<div class="ux-m-sm">margin: 0.5rem</div>
<div class="ux-m-md">margin: 0.75rem</div>
<div class="ux-m-lg">margin: 1rem</div>
<div class="ux-m-xl">margin: 1.5rem</div>
<div class="ux-m-2xl">margin: 2rem</div>

<!-- Margin direccional -->
<div class="ux-mt-md">margin-top</div>
<div class="ux-mr-md">margin-right</div>
<div class="ux-mb-md">margin-bottom</div>
<div class="ux-ml-md">margin-left</div>
<div class="ux-mx-md">margin horizontal</div>
<div class="ux-my-md">margin vertical</div>

<!-- Padding (mismos sufijos) -->
<div class="ux-p-md">padding</div>
<div class="ux-pt-lg">padding-top</div>
<div class="ux-px-xl">padding horizontal</div>
```

## Typography

```html
<p class="ux-text-xs">Extra small</p>
<p class="ux-text-sm">Small</p>
<p class="ux-text-base">Base</p>
<p class="ux-text-md">Medium</p>
<p class="ux-text-lg">Large</p>
<p class="ux-text-xl">Extra large</p>
<p class="ux-text-2xl">2X large</p>
<p class="ux-text-3xl">3X large</p>

<!-- Font weight -->
<p class="ux-font-normal">Normal</p>
<p class="ux-font-medium">Medium</p>
<p class="ux-font-semibold">Semibold</p>
<p class="ux-font-bold">Bold</p>

<!-- Text color -->
<p class="ux-text-primary">Primary color</p>
<p class="ux-text-secondary">Secondary text</p>
<p class="ux-text-tertiary">Tertiary text</p>
<p class="ux-text-muted">Muted text</p>

<!-- Alignment -->
<p class="ux-text-left">Left</p>
<p class="ux-text-center">Center</p>
<p class="ux-text-right">Right</p>
```

## Display

```html
<div class="ux-hidden">Hidden</div>
<div class="ux-block">Block</div>
<div class="ux-inline">Inline</div>
<div class="ux-inline-block">Inline-block</div>
<div class="ux-flex">Flex</div>
<div class="ux-inline-flex">Inline-flex</div>
<div class="ux-grid">Grid</div>
```

## Flex

```html
<!-- Direction -->
<div class="ux-flex ux-flex-row">Row</div>
<div class="ux-flex ux-flex-col">Column</div>

<!-- Justify -->
<div class="ux-flex ux-justify-start">Start</div>
<div class="ux-flex ux-justify-center">Center</div>
<div class="ux-flex ux-justify-end">End</div>
<div class="ux-flex ux-justify-between">Space between</div>
<div class="ux-flex ux-justify-around">Space around</div>

<!-- Align -->
<div class="ux-flex ux-items-start">Start</div>
<div class="ux-flex ux-items-center">Center</div>
<div class="ux-flex ux-items-end">End</div>
<div class="ux-flex ux-items-stretch">Stretch</div>

<!-- Gap -->
<div class="ux-flex ux-gap-sm">Small gap</div>
<div class="ux-flex ux-gap-md">Medium gap</div>
<div class="ux-flex ux-gap-lg">Large gap</div>
```

---

# HTMX INTEGRATION

## Swap con animacion

```html
<!-- HTMX con transiciones UX -->
<div hx-get="/api/content"
     hx-trigger="click"
     hx-swap="innerHTML transition:true"
     class="ux-card">
  Click para cargar
</div>
```

## Loading states

```html
<!-- Mostrar spinner durante request -->
<button hx-get="/api/data"
        hx-indicator="#loading"
        class="ux-button">
  Cargar
</button>

<div id="loading" class="htmx-indicator">
  <div class="ux-spinner"></div>
</div>
```

## Toast desde servidor

```html
<!-- El servidor puede enviar headers para mostrar toast -->
<!-- HX-Trigger: {"ux-toast": {"message": "Guardado!", "type": "success"}} -->

<div @ux-toast.window="$dispatch('ux-toast', $event.detail)">
  <!-- App content -->
</div>
```

---

# COMPONENTES ALPINE REGISTRADOS

Estos componentes estan pre-registrados en `window.UX`:

```javascript
// Usar con x-data="nombreComponente(config)"

uxModal()           // Modal dialog
uxSheet()           // Bottom sheet
uxAlert()           // Alert dialog
uxToast()           // Toast notifications
uxSelect()          // Select dropdown
uxRange()           // Range slider
uxAccordion()       // Accordion
uxCarousel()        // Carousel/slider
uxDatetime()        // Date/time picker
uxDatatable()       // Data table
uxStepper()         // Multi-step wizard
uxUpload()          // File upload
uxRating()          // Star rating
uxInfiniteScroll()  // Infinite scroll
uxRefresher()       // Pull to refresh
uxReorder()         // Drag reorder
uxPicker()          // iOS-style picker
uxToggle()          // Toggle switch
uxRadioGroup()      // Radio group
uxTheme()           // Theme manager
```

---

# VARIABLES CSS PRINCIPALES

```css
/* Colores semanticos */
--ux-primary: #0ea5e9;
--ux-secondary: #22d3ee;
--ux-success: #22c55e;
--ux-warning: #f59e0b;
--ux-danger: #ef4444;

/* Backgrounds */
--ux-background: #ffffff;
--ux-surface: #ffffff;
--ux-surface-secondary: #f3f4f6;

/* Text */
--ux-text: #111827;
--ux-text-secondary: #4b5563;
--ux-text-muted: #9ca3af;

/* Borders */
--ux-border-color: #e5e7eb;
--ux-border-radius: 0.5rem;
--ux-border-radius-lg: 0.75rem;

/* Spacing */
--ux-space-xs: 0.25rem;
--ux-space-sm: 0.5rem;
--ux-space-md: 0.75rem;
--ux-space-lg: 1rem;
--ux-space-xl: 1.5rem;

/* Transitions */
--ux-transition-fast: 150ms;
--ux-transition-base: 200ms;
--ux-ease: cubic-bezier(0.25, 0.1, 0.25, 1);
--ux-ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);

/* Touch */
--ux-touch-target: 2.75rem;  /* 44px */

/* Z-index */
--ux-z-dropdown: 100;
--ux-z-sticky: 200;
--ux-z-fixed: 300;
--ux-z-modal-backdrop: 400;
--ux-z-modal: 500;
--ux-z-popover: 600;
--ux-z-tooltip: 700;
--ux-z-toast: 800;

/* Glass effect */
--ux-glass-blur: 20px;
--ux-glass-bg: rgba(255, 255, 255, 0.45);
--ux-glass-border: rgba(255, 255, 255, 0.18);
```

---

# RESUMEN RAPIDO

| Categoria | Componentes |
|-----------|-------------|
| **Basicos** | button, badge, chip, spinner, progress, avatar, img |
| **Formularios** | input, textarea, checkbox, radio, toggle, range, select, searchbar |
| **Layout** | card, list, content |
| **Navegacion** | navbar, toolbar, tabs, segment, menu, breadcrumbs, back-button |
| **Overlays** | modal, sheet, alert, toast, popover, loading, picker, tooltip |
| **Feedback** | skeleton, fab, rating |
| **Interactivos** | accordion, carousel, datetime, datatable, stepper, upload |
| **Gestos** | swipe, infinite-scroll, refresher, reorder |
| **Otros** | pwa, scroll |

---

**Total: 49 componentes**

Todos soportan:
- Dark mode automatico
- Variante `--glass` para efecto iOS Liquid Glass
- Clases `ux-color-*` para colores semanticos
- Touch-first design (min 44px targets)
