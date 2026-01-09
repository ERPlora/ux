# UX Library - Component Roadmap

Esta lista define los componentes necesarios para satisfacer las necesidades de ERPlora y sus módulos.

---

## Estado de Componentes

### Leyenda
- ✅ Implementado y documentado
- 🟡 Implementado, falta documentación
- ⬜ Pendiente de implementar

---

## 1. FORMULARIOS (Forms)

### Inputs Básicos
- ✅ Input (text, email, password, number)
- ✅ Textarea
- ✅ Checkbox
- ✅ Radio
- ✅ Toggle (switch)
- ✅ Select (native)
- ✅ Range (slider)
- ✅ Searchbar
- ✅ Rating (stars)

### Inputs Avanzados
- ✅ Datetime picker
- ✅ Upload (file)
- ✅ Color picker
- ✅ Autocomplete / Combobox
- ✅ Tag input (multi-select chips)
- ⬜ Rich text editor (WYSIWYG)
- ✅ Signature pad
- ✅ OTP input (código verificación)
- ✅ Currency input (con formato)
- ✅ Phone input (con código país)
- ✅ Quantity stepper (+/- buttons)

### Estructuras de Formulario
- ✅ Form group (label + input + helper + error)
- ✅ Form section (fieldset con título)
- ✅ Inline form (horizontal)
- ✅ Form validation states
- ✅ Form wizard / Multi-step form

---

## 2. BOTONES Y ACCIONES (Buttons & Actions)

### Botones
- ✅ Button (variants: primary, secondary, outline, ghost, danger)
- ✅ Button sizes (sm, md, lg)
- ✅ Button with icon
- ✅ Button loading state
- ✅ FAB (Floating Action Button)
- ✅ Button group
- ✅ Split button (button + dropdown)
- ✅ Icon button (solo icono)

### Chips y Tags
- ✅ Chip
- ✅ Badge
- ✅ Tag (removable chip)
- ✅ Status indicator (dot + label)

---

## 3. NAVEGACIÓN (Navigation)

### Barras de Navegación
- ✅ Navbar (top)
- ✅ Toolbar
- ✅ Tabs
- ✅ Tab bar (bottom, iOS style)
- ✅ Segment (toggle entre vistas)
- ✅ Breadcrumbs
- ✅ Back button

### Menús
- ✅ Menu (sidebar)
- ✅ Dropdown menu
- ✅ Context menu (right-click)
- ✅ Command palette (⌘K)
- ✅ Mega menu

### Paginación
- ✅ Pagination
- ✅ Infinite scroll
- ✅ Load more button

---

## 4. LAYOUT Y CONTENEDORES (Layout & Containers)

### Contenedores
- ✅ Card
- ✅ Content (page wrapper)
- ✅ Section (con header)
- ✅ Panel (collapsible)
- ✅ Divider (horizontal/vertical)
- ✅ Spacer

### Layouts Complejos
- ✅ Master-Detail (two-panel)
- ✅ Split pane
- ⬜ Dashboard grid
- ✅ Kanban board
- ✅ Timeline layout
- ⬜ Masonry grid

### Listas
- ✅ List
- ✅ List item (con slots: start, content, end)
- ✅ Reorder (drag & drop)
- ✅ Virtual list (para grandes datasets)
- ✅ Tree view (hierarchical)

---

## 5. OVERLAYS Y MODALES (Overlays & Modals)

### Modales
- ✅ Modal (dialog)
- ✅ Alert (confirmación)
- ✅ Sheet (bottom/side)
- ✅ Drawer (sidebar modal)
- ✅ Lightbox (image viewer)
- ✅ Full-screen modal

### Popups
- ✅ Popover
- ✅ Tooltip
- ✅ Toast (notifications)
- ✅ Notification center
- ✅ Snackbar (con acción)

---

## 6. DATOS Y TABLAS (Data Display)

### Tablas
- ✅ Datatable (básica)
- ✅ Datatable sortable
- ✅ Datatable filterable
- ✅ Datatable selectable (checkbox rows)
- ✅ Datatable expandable rows
- ✅ Datatable sticky header
- ✅ Datatable responsive (cards en mobile)
- ⬜ Datatable export (CSV, Excel)
- ⬜ Datatable column resize
- ⬜ Datatable column visibility

### Visualización
- ✅ Stats card (KPI)
- ⬜ Chart wrapper (para Chart.js)
- ✅ Sparkline
- ✅ Progress circle (donut)
- ✅ Progress bar
- ✅ Gauge / Meter
- ✅ Diff viewer (comparación)
- ✅ Code block (syntax highlight)
- ✅ JSON viewer

### Calendario
- ✅ Calendar (month view)
- ✅ Calendar (week view)
- ✅ Calendar (day view)
- ✅ Date range picker
- ⬜ Event card
- ⬜ Scheduler / Booking

---

## 7. MULTIMEDIA (Media)

### Imágenes
- ✅ Image (lazy load)
- ✅ Avatar
- ✅ Avatar group (stacked)
- ✅ Image gallery
- ⬜ Image crop
- ⬜ Image zoom

### Otros
- ✅ Carousel / Slider
- ⬜ Video player
- ⬜ Audio player
- ⬜ PDF viewer
- ✅ QR code generator
- ⬜ Barcode scanner (camera)

---

## 8. FEEDBACK Y ESTADOS (Feedback & States)

### Loading
- ✅ Spinner
- ✅ Skeleton
- ✅ Loading overlay
- ✅ Progress steps
- ✅ Refresher (pull to refresh)

### Estados
- ✅ Empty state
- ✅ Error state
- ✅ Success state
- ✅ Offline indicator
- ✅ Connection status

### Notificaciones
- ✅ Toast
- ✅ Alert (inline)
- ✅ Banner (dismissable)
- ✅ Callout (info box)

---

## 9. INTERACCIÓN MÓVIL (Mobile Interactions)

- ✅ Swipe actions (slide to reveal)
- ✅ Pull to refresh
- ⬜ Haptic feedback wrapper
- ⬜ Gesture handler
- ⬜ Pinch to zoom
- ⬜ Long press menu

---

## 10. POS / RETAIL ESPECÍFICOS

### Teclado y Entrada
- ✅ Numpad (teclado numérico)
- ✅ PIN pad (entrada de PIN)
- ✅ Calculator
- ✅ Quick amount buttons (€5, €10, €20)

### Productos
- ✅ Product card (POS style)
- ✅ Product grid (categorías)
- ✅ Category tabs (horizontal scroll)
- ✅ Cart item
- ✅ Cart summary
- ✅ Order ticket

### Pagos
- ✅ Payment method selector
- ✅ Split payment
- ✅ Change calculator
- ✅ Receipt preview
- ✅ Tip selector

### Inventario
- ✅ Stock indicator (low/out)
- ⬜ Quantity badge
- ⬜ Variant selector (size, color)

---

## 11. HR / EMPLEADOS ESPECÍFICOS

- ⬜ Employee card
- ⬜ Shift calendar
- ⬜ Time clock (entrada/salida)
- ⬜ Attendance list
- ⬜ Leave request card
- ⬜ Org chart
- ⬜ Performance meter

---

## 12. FABRICACIÓN / PRODUCCIÓN ESPECÍFICOS

- ⬜ Work order card
- ⬜ Production line status
- ⬜ Machine status indicator
- ⬜ Quality check form
- ⬜ Batch/Lot tracker
- ⬜ BOM (Bill of Materials) tree
- ⬜ Gantt chart (simple)

---

## 13. UTILIDADES (Utilities)

### CSS Utilities
- ✅ Spacing (margin, padding)
- ✅ Flexbox helpers
- ✅ Text utilities
- ✅ Color utilities
- ⬜ Grid system (12-col)
- ⬜ Visibility helpers
- ⬜ Print utilities

### Alpine.js Plugins
- ⬜ Focus trap
- ⬜ Click outside
- ⬜ Scroll lock
- ⬜ Clipboard
- ⬜ Debounce/Throttle

---

## Prioridades para MVP

### Alta Prioridad (Crítico para Admin Panel)
1. ✅ Datatable avanzada (sort, filter, select)
2. ✅ Form validation states
3. ✅ Empty/Error states
4. ✅ Dropdown menu
5. ✅ Stats card (KPI)
6. ✅ Section component

### Media Prioridad (Mejora UX)
1. ✅ Autocomplete
2. ✅ Tag input
3. ✅ Calendar básico
4. ✅ Avatar group
5. ✅ Command palette

### Alta Prioridad (Crítico para POS)
1. ✅ Numpad
2. ✅ Product card POS
3. ✅ Cart components
4. ✅ Payment selector
5. ✅ Receipt preview

---

## Notas de Implementación

- Todos los componentes deben soportar **dark mode**
- Priorizar **mobile-first** design
- Usar **CSS custom properties** para theming
- Integración con **Alpine.js** para interactividad
- Compatibilidad con **HTMX** para carga dinámica
- Seguir patrón **BEM** para nomenclatura CSS
- Documentar cada componente con ejemplos

---

Última actualización: 2026-01-09
