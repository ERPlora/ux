# Guia de Implementacion - iOS 26 Liquid Glass

Esta guia documenta como actualizar los componentes UX Library al nuevo estilo "Liquid Glass" de iOS 26/iPadOS 26 (WWDC 2025).

## Principios de Diseno Liquid Glass

### Caracteristicas Principales
1. **Transparencia con blur** - Elementos semi-transparentes con backdrop-filter
2. **Refraccion y reflexion** - Bordes sutiles que simulan cristal
3. **Contenido fluido** - El contenido puede pasar por debajo de elementos UI
4. **Animaciones spring** - Transiciones elasticas naturales

### Variables CSS Base

```css
:root {
  /* Liquid Glass Materials */
  --ux-glass-blur: 20px;
  --ux-glass-saturation: 180%;
  --ux-glass-bg-light: rgba(255, 255, 255, 0.72);
  --ux-glass-bg-dark: rgba(28, 28, 30, 0.72);
  --ux-glass-border-light: rgba(255, 255, 255, 0.18);
  --ux-glass-border-dark: rgba(255, 255, 255, 0.08);
  --ux-glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);

  /* Liquid Glass Radii */
  --ux-glass-radius-sm: 10px;
  --ux-glass-radius-md: 16px;
  --ux-glass-radius-lg: 22px;
  --ux-glass-radius-xl: 28px;

  /* Spring Animations */
  --ux-spring-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ux-spring-smooth: cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
```

---

## Componentes a Actualizar

### 1. ux-shell.js - Sidebar

**Estado Actual:**
```css
.ux-shell__sidebar {
  background-color: var(--ux-surface);
  border-right: 1px solid var(--ux-border-color);
}

.ux-shell__sidebar-item--active {
  background-color: rgba(var(--ux-primary-rgb), 0.1);
  /* Sin border-radius */
}
```

**Nuevo Estilo Liquid Glass:**
```css
.ux-shell__sidebar {
  background: var(--ux-glass-bg-light);
  backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
  -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
  border-right: 1px solid var(--ux-glass-border-light);
  box-shadow: var(--ux-glass-shadow);
}

.ux-shell__sidebar-nav {
  padding: var(--ux-space-sm) var(--ux-space-sm);
}

.ux-shell__sidebar-item {
  margin: 2px 0;
  padding: var(--ux-space-sm) var(--ux-space-md);
  border-radius: var(--ux-glass-radius-sm);
  transition: all 0.2s var(--ux-spring-smooth);
}

.ux-shell__sidebar-item--active {
  background: var(--ux-glass-bg-light);
  backdrop-filter: blur(10px);
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
  color: var(--ux-primary);
}

.ux-shell__sidebar-section-title {
  text-transform: none; /* Sentence case, no uppercase */
  font-weight: 600;
  font-size: var(--ux-font-size-sm);
  color: var(--ux-text-secondary);
  padding: var(--ux-space-md) var(--ux-space-md) var(--ux-space-xs);
}

/* Dark mode */
.ux-dark .ux-shell__sidebar {
  background: var(--ux-glass-bg-dark);
  border-right-color: var(--ux-glass-border-dark);
}

.ux-dark .ux-shell__sidebar-item--active {
  background: rgba(255, 255, 255, 0.12);
}
```

**Cambios Clave:**
- [ ] Añadir backdrop-filter blur al sidebar
- [ ] Border-radius 10px en items activos
- [ ] Padding lateral reducido para items (margen del borde)
- [ ] Titulos de seccion en sentence-case
- [ ] Box-shadow con highlight interno

---

### 2. ux-navbar.js - Navigation Bar

**Estado Actual:**
```css
.ux-navbar {
  background-color: var(--ux-surface);
  border-bottom: 1px solid var(--ux-border-color);
}
```

**Nuevo Estilo Liquid Glass:**
```css
.ux-navbar {
  background: var(--ux-glass-bg-light);
  backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
  -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
  border-bottom: 0.5px solid var(--ux-glass-border-light);
}

/* Variante solida (sin transparencia) */
.ux-navbar--solid {
  background: var(--ux-surface);
  backdrop-filter: none;
}

/* Large title estilo iOS */
.ux-navbar--large {
  padding-bottom: var(--ux-space-lg);
}

.ux-navbar--large .ux-navbar__title {
  font-size: 34px;
  font-weight: 700;
  letter-spacing: -0.4px;
}
```

**Cambios Clave:**
- [ ] Backdrop blur por defecto
- [ ] Borde mas fino (0.5px)
- [ ] Variante --solid para cuando no quieres transparencia
- [ ] Soporte para large titles

---

### 3. ux-modal.js / ux-sheet.js - Overlays

**Estado Actual:**
```css
.ux-modal__content {
  background-color: var(--ux-surface);
  border-radius: var(--ux-border-radius-lg);
  box-shadow: var(--ux-shadow-xl);
}
```

**Nuevo Estilo Liquid Glass:**
```css
.ux-modal__content {
  background: var(--ux-glass-bg-light);
  backdrop-filter: blur(40px) saturate(var(--ux-glass-saturation));
  -webkit-backdrop-filter: blur(40px) saturate(var(--ux-glass-saturation));
  border-radius: var(--ux-glass-radius-xl);
  border: 0.5px solid var(--ux-glass-border-light);
  box-shadow:
    0 25px 50px rgba(0, 0, 0, 0.15),
    0 0 0 0.5px rgba(255, 255, 255, 0.1) inset;
}

.ux-modal__backdrop {
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
}

/* Sheet con handle */
.ux-sheet__handle {
  width: 36px;
  height: 5px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 2.5px;
  margin: var(--ux-space-sm) auto;
}
```

**Cambios Clave:**
- [ ] Mayor blur (40px) para modales
- [ ] Border-radius mas grande (28px)
- [ ] Backdrop con blur sutil
- [ ] Borde interno brillante (inset shadow)

---

### 4. ux-tabs.js / ux-segment.js - Tab Bars

**Estado Actual:**
```css
.ux-tabs__tab--active {
  color: var(--ux-primary);
  border-bottom: 2px solid var(--ux-primary);
}

.ux-segment__button--active {
  background-color: var(--ux-surface);
  box-shadow: var(--ux-shadow-sm);
}
```

**Nuevo Estilo Liquid Glass:**
```css
/* Segment Control con Liquid Glass */
.ux-segment {
  background: rgba(118, 118, 128, 0.12);
  border-radius: var(--ux-glass-radius-sm);
  padding: 2px;
}

.ux-segment__button {
  border-radius: calc(var(--ux-glass-radius-sm) - 2px);
  transition: all 0.2s var(--ux-spring-bounce);
}

.ux-segment__button--active {
  background: var(--ux-glass-bg-light);
  backdrop-filter: blur(10px);
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.12),
    0 1px 2px rgba(0, 0, 0, 0.08);
}

/* Tab Bar flotante (bottom) */
.ux-tabs--bottom {
  background: var(--ux-glass-bg-light);
  backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
  border-top: 0.5px solid var(--ux-glass-border-light);
  padding-bottom: env(safe-area-inset-bottom);
}
```

**Cambios Clave:**
- [ ] Segment con fondo gris translucido
- [ ] Boton activo con cristal interno
- [ ] Tab bar con blur
- [ ] Animaciones spring

---

### 5. ux-card.js - Cards

**Estado Actual:**
```css
.ux-card {
  background-color: var(--ux-surface);
  border-radius: var(--ux-border-radius);
  box-shadow: var(--ux-shadow-sm);
}
```

**Nuevo Estilo Liquid Glass:**
```css
/* Card estandar (mantener solido) */
.ux-card {
  background-color: var(--ux-surface);
  border-radius: var(--ux-glass-radius-md);
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.06),
    0 1px 2px rgba(0, 0, 0, 0.04);
}

/* Card con efecto glass */
.ux-card--glass {
  background: var(--ux-glass-bg-light);
  backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
  -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
  border: 0.5px solid var(--ux-glass-border-light);
  box-shadow: var(--ux-glass-shadow);
}

/* Card grupos (iOS Settings style) */
.ux-card--grouped {
  border-radius: var(--ux-glass-radius-sm);
  overflow: hidden;
}

.ux-card--grouped .ux-list-item:not(:last-child) {
  border-bottom: 0.5px solid var(--ux-border-color);
}
```

**Cambios Clave:**
- [ ] Nuevo border-radius 16px
- [ ] Variante --glass para efecto cristal
- [ ] Sombras mas suaves
- [ ] Grouped cards para listas

---

### 6. ux-button.js - Buttons

**Estado Actual:**
```css
.ux-button--primary {
  background-color: var(--ux-primary);
  color: var(--ux-primary-contrast);
}
```

**Nuevo Estilo Liquid Glass:**
```css
.ux-button {
  border-radius: var(--ux-glass-radius-sm);
  transition: all 0.15s var(--ux-spring-smooth);
}

.ux-button:active {
  transform: scale(0.97);
}

/* Boton con efecto glass */
.ux-button--glass {
  background: var(--ux-glass-bg-light);
  backdrop-filter: blur(10px);
  border: 0.5px solid var(--ux-glass-border-light);
  color: var(--ux-primary);
}

.ux-button--glass:hover {
  background: rgba(255, 255, 255, 0.85);
}

/* Pill button (rounded) */
.ux-button--pill {
  border-radius: 100px;
}
```

**Cambios Clave:**
- [ ] Border-radius 10px por defecto
- [ ] Animacion scale al presionar
- [ ] Nueva variante --glass
- [ ] Variante --pill para botones redondos

---

### 7. ux-input.js / ux-select.js - Form Controls

**Estado Actual:**
```css
.ux-input__field {
  background-color: var(--ux-surface-secondary);
  border-radius: var(--ux-border-radius);
}
```

**Nuevo Estilo Liquid Glass:**
```css
.ux-input__field {
  background: rgba(118, 118, 128, 0.12);
  border-radius: var(--ux-glass-radius-sm);
  border: none;
  padding: 11px 16px;
}

.ux-input__field:focus {
  background: rgba(118, 118, 128, 0.18);
  box-shadow: 0 0 0 3px rgba(var(--ux-primary-rgb), 0.3);
}

/* Input con label flotante */
.ux-input--floating .ux-input__label {
  font-size: 12px;
  color: var(--ux-text-secondary);
  margin-bottom: 4px;
}

/* Input en card (iOS Settings style) */
.ux-input--inset {
  background: transparent;
  border-bottom: 0.5px solid var(--ux-border-color);
  border-radius: 0;
  padding: 11px 0;
}
```

**Cambios Clave:**
- [ ] Fondo gris translucido (no blanco)
- [ ] Focus ring con color primary
- [ ] Variante --inset para formularios en cards

---

### 8. ux-toast.js - Notifications

**Estado Actual:**
```css
.ux-toast {
  background-color: var(--ux-surface);
  box-shadow: var(--ux-shadow-lg);
}
```

**Nuevo Estilo Liquid Glass:**
```css
.ux-toast {
  background: var(--ux-glass-bg-light);
  backdrop-filter: blur(40px) saturate(200%);
  -webkit-backdrop-filter: blur(40px) saturate(200%);
  border-radius: var(--ux-glass-radius-lg);
  border: 0.5px solid var(--ux-glass-border-light);
  box-shadow:
    0 10px 40px rgba(0, 0, 0, 0.12),
    0 0 0 0.5px rgba(255, 255, 255, 0.1) inset;
  padding: 14px 20px;
}

/* Toast con icono */
.ux-toast__icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: var(--ux-space-md);
}

.ux-toast--success .ux-toast__icon {
  background: rgba(52, 199, 89, 0.15);
  color: var(--ux-success);
}
```

**Cambios Clave:**
- [ ] Blur alto (40px) para prominencia
- [ ] Border-radius grande (22px)
- [ ] Iconos con fondo circular

---

### 9. ux-popover.js / ux-menu.js - Popovers

**Nuevo Estilo Liquid Glass:**
```css
.ux-popover__content,
.ux-menu {
  background: var(--ux-glass-bg-light);
  backdrop-filter: blur(40px) saturate(200%);
  -webkit-backdrop-filter: blur(40px) saturate(200%);
  border-radius: var(--ux-glass-radius-md);
  border: 0.5px solid var(--ux-glass-border-light);
  box-shadow:
    0 10px 40px rgba(0, 0, 0, 0.15),
    0 0 0 0.5px rgba(255, 255, 255, 0.08) inset;
  overflow: hidden;
}

.ux-menu__item {
  padding: 11px 16px;
  transition: background-color 0.1s;
}

.ux-menu__item:hover {
  background: rgba(0, 0, 0, 0.04);
}

.ux-menu__item:active {
  background: rgba(0, 0, 0, 0.08);
}

.ux-menu__separator {
  height: 0.5px;
  background: var(--ux-border-color);
  margin: 4px 0;
}
```

---

### 10. ux-alert.js - Alerts/Dialogs

**Nuevo Estilo Liquid Glass:**
```css
.ux-alert__content {
  background: var(--ux-glass-bg-light);
  backdrop-filter: blur(50px) saturate(200%);
  -webkit-backdrop-filter: blur(50px) saturate(200%);
  border-radius: 14px;
  border: 0.5px solid var(--ux-glass-border-light);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
  max-width: 270px;
  text-align: center;
}

.ux-alert__title {
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 4px;
}

.ux-alert__message {
  font-size: 13px;
  color: var(--ux-text-secondary);
  margin-bottom: var(--ux-space-md);
}

.ux-alert__actions {
  border-top: 0.5px solid var(--ux-border-color);
  display: flex;
}

.ux-alert__button {
  flex: 1;
  padding: 11px;
  font-size: 17px;
  color: var(--ux-primary);
  background: transparent;
  border: none;
}

.ux-alert__button:not(:last-child) {
  border-right: 0.5px solid var(--ux-border-color);
}

.ux-alert__button--destructive {
  color: var(--ux-danger);
}

.ux-alert__button--bold {
  font-weight: 600;
}
```

---

## Orden de Implementacion

### Fase 1: Core (Variables)
1. [ ] Añadir variables Liquid Glass a `ux-core.js`
2. [ ] Añadir animaciones spring
3. [ ] Actualizar border-radius variables

### Fase 2: Layout Principal
4. [ ] `ux-shell.js` - Sidebar con glass effect
5. [ ] `ux-navbar.js` - Navbar con blur
6. [ ] `ux-tabs.js` - Tab bar con glass

### Fase 3: Overlays
7. [ ] `ux-modal.js` - Modales con glass
8. [ ] `ux-sheet.js` - Sheets con glass
9. [ ] `ux-alert.js` - Alerts con glass
10. [ ] `ux-toast.js` - Toasts con glass
11. [ ] `ux-popover.js` - Popovers con glass

### Fase 4: Controles
12. [ ] `ux-button.js` - Botones actualizados
13. [ ] `ux-segment.js` - Segment control
14. [ ] `ux-input.js` - Inputs actualizados
15. [ ] `ux-select.js` - Selects actualizados

### Fase 5: Cards y Listas
16. [ ] `ux-card.js` - Cards con variante glass
17. [ ] `ux-list.js` - Listas actualizadas
18. [ ] `ux-menu.js` - Menus con glass

---

## Consideraciones de Rendimiento

### Backdrop Filter
- Usar `will-change: transform` solo durante animaciones
- Limitar capas con blur simultaneo
- Fallback para navegadores sin soporte:

```css
@supports not (backdrop-filter: blur(10px)) {
  .ux-glass-element {
    background: rgba(255, 255, 255, 0.95);
  }
}
```

### Animaciones Spring
- Usar CSS para transiciones simples
- Reservar JS para animaciones complejas (gesture-driven)

---

## Referencias

- [Apple WWDC25 - New Design System](https://developer.apple.com/videos/play/wwdc2025/356/)
- [Apple HIG - Sidebars](https://developer.apple.com/design/human-interface-guidelines/sidebars)
- [CSS-Tricks - Liquid Glass](https://css-tricks.com/getting-clarity-on-apples-liquid-glass/)
- [Apple Newsroom - Liquid Glass Announcement](https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/)
