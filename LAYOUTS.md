# Sistema de Layouts UX Library

## Resumen

| Layout | Archivo | Descripción | Uso |
|--------|---------|-------------|-----|
| `ux-admin` | `ux-admin.js` | Panel administrativo con sidebar | Hub, Cloud admin |
| `ux-screen` | `ux-screen.js` | Pantalla móvil estilo iOS | Páginas internas |
| `ux-website` | `ux-website.js` | Sitio web tradicional | Cloud landing, docs |
| `ux-scroll` | `ux-scroll.js` | Contenedor scrollable | Dentro de layouts |

---

## 1. Layout Admin (`ux-admin`)

Panel administrativo con navbar, sidebar colapsable y bottom navigation.

```
┌────────────────────────────────────────────┐
│ .ux-admin__navbar                          │ ← 3.5rem (56px)
├──────────┬─────────────────────────────────┤
│ .ux-admin│                                 │
│ __sidebar│  .ux-admin__main                │
│          │                                 │
│ (15.6rem)│  (contenido principal)          │
│          │                                 │
├──────────┴─────────────────────────────────┤
│ .ux-admin__tabbar (móvil < 768px)          │ ← 3.5rem (56px)
└────────────────────────────────────────────┘
```

### Clases

| Clase | Descripción |
|-------|-------------|
| `.ux-admin` | Contenedor principal |
| `.ux-admin__navbar` | Navbar superior fijo |
| `.ux-admin__sidebar` | Sidebar lateral (drawer en móvil) |
| `.ux-admin__main` | Área de contenido principal |
| `.ux-admin__tabbar` | Bottom navigation (solo móvil) |
| `.ux-admin--collapsed` | Sidebar colapsado |
| `.ux-admin--open` | Sidebar abierto (móvil) |

### Archivo: `ux-shell.js` → renombrar a `ux-admin.js`

---

## 2. Layout Screen (`ux-screen`)

Pantalla estilo iOS/Ionic para páginas internas del admin.

```
┌─────────────────────────────────────┐
│ .ux-screen__header                  │ ← 3.5rem (56px)
│ [←Back]     Título        [Actions] │
├─────────────────────────────────────┤
│                                     │
│ .ux-screen__content                 │ ← flex: 1, overflow-y: auto
│                                     │
│ (contenido scrollable)              │
│                                     │
├─────────────────────────────────────┤
│ .ux-screen__footer                  │ ← 3.5rem (56px), :empty oculto
│ [Tab1] [Tab2] [Tab3] [Tab4]         │
└─────────────────────────────────────┘
```

### Clases

| Clase | Descripción |
|-------|-------------|
| `.ux-screen` | Contenedor principal (100% height) |
| `.ux-screen__header` | Header con back button, título, actions |
| `.ux-screen__title` | Título centrado |
| `.ux-screen__back` | Slot para back button |
| `.ux-screen__actions` | Slot para action buttons |
| `.ux-screen__content` | Área scrollable |
| `.ux-screen__footer` | Footer/tabbar (oculto si vacío) |

### Archivo: `ux-screen.js` (CREAR NUEVO)

---

## 3. Layout Website (`ux-website`)

Sitio web tradicional para landing pages y documentación.

```
┌─────────────────────────────────────┐
│ .ux-website__navbar                 │ ← 4rem (64px), sticky opcional
│ [Logo]      [Nav Links]    [CTA]    │
├─────────────────────────────────────┤
│                                     │
│ .ux-website__main                   │ ← flex: 1, scroll natural
│                                     │
│ (contenido de página)               │
│                                     │
├─────────────────────────────────────┤
│ .ux-website__footer                 │ ← auto height
│ Links | Copyright | Social          │
└─────────────────────────────────────┘
```

### Clases

| Clase | Descripción |
|-------|-------------|
| `.ux-website` | Contenedor principal (min-height: 100vh) |
| `.ux-website__navbar` | Navbar superior |
| `.ux-website__navbar--sticky` | Navbar sticky |
| `.ux-website__brand` | Logo/marca |
| `.ux-website__nav` | Links de navegación |
| `.ux-website__actions` | CTA buttons |
| `.ux-website__toggle` | Burger menu (móvil) |
| `.ux-website__main` | Contenido principal |
| `.ux-website__footer` | Footer |

### Archivo: `ux-website.js` (CREAR NUEVO)

---

## 4. Layout Scroll (`ux-scroll`)

Contenedor scrollable genérico para usar dentro de otros layouts.

### Clases existentes (en `ux-content.js` → renombrar a `ux-scroll.js`)

| Clase | Descripción |
|-------|-------------|
| `.ux-scroll` | Contenedor scrollable básico |
| `.ux-scroll--x` | Scroll horizontal |
| `.ux-scroll--hidden` | Ocultar scrollbar |

---

## Variables CSS

```css
:root {
  /* Layout Admin */
  --ux-admin-navbar-height: 3.5rem;      /* 56px */
  --ux-admin-sidebar-width: 15.625rem;   /* 250px */
  --ux-admin-sidebar-collapsed: 3.5rem;  /* 56px */
  --ux-admin-tabbar-height: 3.5rem;      /* 56px */

  /* Layout Screen */
  --ux-screen-header-height: 3.5rem;     /* 56px */
  --ux-screen-footer-height: 3.5rem;     /* 56px */

  /* Layout Website */
  --ux-website-navbar-height: 4rem;      /* 64px */
}
```

---

## Convención de Unidades

| Unidad | Uso |
|--------|-----|
| `rem` | Tamaños estructurales (heights, widths, spacing) |
| `em` | Espaciado interno de componentes |
| `%` | Layouts fluidos |
| `px` | Bordes finos (1px), sombras |

### Tabla de conversión (base 16px)

| rem | px |
|-----|-----|
| 0.25rem | 4px |
| 0.5rem | 8px |
| 0.75rem | 12px |
| 1rem | 16px |
| 1.5rem | 24px |
| 2rem | 32px |
| 3rem | 48px |
| 3.5rem | 56px |
| 4rem | 64px |

---

## Integración con Bootstrap Grid

Los layouts definen la **estructura externa**. Bootstrap Grid se usa para el **contenido interno**.

```html
<div class="ux-screen">
    <header class="ux-screen__header">...</header>

    <main class="ux-screen__content">
        <div class="container-fluid">
            <div class="row g-4">
                <div class="col-12 col-md-6 col-lg-4">Card 1</div>
                <div class="col-12 col-md-6 col-lg-4">Card 2</div>
                <div class="col-12 col-md-6 col-lg-4">Card 3</div>
            </div>
        </div>
    </main>

    <footer class="ux-screen__footer"></footer>
</div>
```

### Usar de Bootstrap

- ✅ `container`, `container-fluid`
- ✅ `row`, `col-*`
- ✅ `g-*` (gutters)
- ✅ `offset-*`

### NO usar de Bootstrap

- ❌ `navbar`, `nav` → usar layouts UX
- ❌ `card` → usar `ux-card`
- ❌ `btn` → usar `ux-button`
- ❌ `form-*` → usar `ux-input`, `ux-select`

---

## Responsive Breakpoints

Alineados con Bootstrap 5:

| Breakpoint | Rango | Comportamiento |
|------------|-------|----------------|
| xs | < 576px | Móvil pequeño |
| sm | ≥ 576px | Móvil grande |
| md | ≥ 768px | Tablet - sidebar visible |
| lg | ≥ 992px | Desktop |
| xl | ≥ 1200px | Desktop grande |

### Por layout

- **ux-admin**: Sidebar drawer en < 768px, expandido en ≥ 768px
- **ux-screen**: Full width siempre
- **ux-website**: Burger menu en < 768px

---

## Archivos a Modificar

| Archivo Actual | Archivo Nuevo | Acción |
|----------------|---------------|--------|
| `ux-shell.js` | `ux-admin.js` | Renombrar + actualizar clases |
| `ux-content.js` | `ux-scroll.js` | Renombrar |
| - | `ux-screen.js` | Crear nuevo |
| - | `ux-website.js` | Crear nuevo |

---

## Backward Compatibility

Mantener aliases temporalmente:

```css
/* Deprecado - usar nuevos nombres */
.ux-shell { /* alias → .ux-admin */ }
.ux-shell__navbar { /* alias → .ux-admin__navbar */ }
.ux-shell__sidebar { /* alias → .ux-admin__sidebar */ }
.ux-shell__main { /* alias → .ux-admin__main */ }

.ux-page { /* alias → .ux-screen */ }
.ux-content { /* alias → .ux-scroll */ }
```

---

## Orden de Implementación

1. **FASE 1**: Crear `ux-screen.js`
2. **FASE 2**: Crear `ux-website.js`
3. **FASE 3**: Renombrar `ux-shell.js` → `ux-admin.js`
4. **FASE 4**: Renombrar `ux-content.js` → `ux-scroll.js`
5. **FASE 5**: Añadir aliases de backward compatibility
6. **FASE 6**: Actualizar `ux.js` con nuevos imports
7. **FASE 7**: Probar con página del Hub (Settings)
