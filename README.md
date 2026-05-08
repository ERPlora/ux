# ERPlora UX · v2.1.0

> Librería de componentes CSS-only para el ecosistema ERPlora.
> Sin Tailwind, sin build, sin dependencias para los consumidores.
> Interactividad opcional vía [Datastar](https://data-star.dev) con atributos `data-*`.

**Demo:** <https://erplora.github.io/ux/>
**CDN:** `https://cdn.jsdelivr.net/gh/ERPlora/ux@latest/dist/erplora-ux.min.css`

---

## Tabla de contenidos

- [Filosofía](#filosofía)
- [Instalación](#instalación)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Tokens y temas](#tokens-y-temas)
- [Catálogo de componentes](#catálogo-de-componentes)
- [Convenciones de clases](#convenciones-de-clases)
- [Interactividad con Datastar](#interactividad-con-datastar)
- [Build local](#build-local)
- [Deploy y publicación](#deploy-y-publicación)
- [Compatibilidad](#compatibilidad)
- [Roadmap](#roadmap)
- [Licencia](#licencia)

---

## Filosofía

1. **CSS puro, prefijo `ux-*`** — clases semánticas, sin Tailwind ni preprocesadores.
2. **Custom properties como API** — todos los tokens son variables CSS sobreescribibles.
3. **Cero JS obligatorio** — los componentes se ven y maquetan con CSS solo.
4. **Datastar opcional** para comportamiento (`data-on-click`, `data-show`, `data-bind`).
5. **Compatible con la librería antigua** — mismo prefijo `ux-*`.
6. **Una sola línea para consumir** — un `<link>` al CSS minificado vía CDN.

---

## Instalación

### Vía CDN (recomendado)

**Always-current** — recibe automáticamente la última versión publicada:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/ERPlora/ux@latest/dist/erplora-ux.min.css">
```

**Pinneado** (recomendado para producción para evitar cambios sorpresa):

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/ERPlora/ux@v2.1.0/dist/erplora-ux.min.css">
```

Otras opciones:
- `@v2` — siempre la última 2.x.y
- `@v2.1` — siempre la última 2.1.x
- Nunca uses `@main` — rompe el caché y los consumidores cuando se hace push.

Para interactividad opcional:

```html
<script type="module" src="https://cdn.jsdelivr.net/gh/starfederation/datastar@main/bundles/datastar.js"></script>
```

### Vía npm

```bash
npm i @erplora/ux
```

```js
import '@erplora/ux/min';
```

### Hello world

```html
<!doctype html>
<html lang="es" data-theme="erplora">
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/ERPlora/ux@latest/dist/erplora-ux.min.css">
</head>
<body>
  <button class="ux-btn ux-btn--primary">Aceptar</button>
  <div class="ux-card">
    <header class="ux-card__head"><h3>Pedido #1024</h3></header>
    <div class="ux-card__body">
      <span class="ux-badge ux-badge--leaf">Pagado</span>
      <p>3 productos · 47,80 €</p>
    </div>
  </div>
</body>
</html>
```

---

## Estructura del proyecto

```
ux/
├── index.html                    showcase navegable
├── previews/                     vistas por dominio
│   ├── components/                 demos de componentes individuales
│   ├── auth/                       login (saas + hub), 2FA, sesiones, …
│   ├── dashboard/                  saas, hub, hub-mobile
│   ├── orgs/, hubs/, users/        gestión SaaS
│   ├── billing/, marketplace/      facturación + tiendas (saas + hub)
│   ├── modules/, employees/, roles/, settings/, profile/
│   └── errors/, system/, public/
├── lib/css/
│   ├── tokens.css                paleta · spacing · radii · sombras · motion
│   ├── base.css                  reset moderno + tipografía
│   ├── utilities.css             helpers básicos
│   ├── ux.css                    bundle source (con @import)
│   └── components/               37 archivos CSS
├── dist/
│   ├── erplora-ux.css            concatenado (~300 KB)
│   └── erplora-ux.min.css        minificado (~230 KB)
├── build.mjs                     concat + minify (Node estándar)
├── package.json
├── README.md
└── .github/workflows/pages.yml   deploy automático
```

---

## Tokens y temas

Todos los tokens son custom properties en `lib/css/tokens.css`. Personalizar es sobreescribir:

```css
:root {
  --ux-brand: #e8552a;          /* terracota — color de marca */
  --ux-bg: #0e0c0b;             /* fondo principal */
  --ux-bg-1: #1a1614;           /* superficie 1 */
  --ux-bg-2: #221d1a;           /* superficie 2 */
  --ux-line: #2a2421;           /* bordes sutiles */
  --ux-text: #f4ede5;           /* texto primario */
  --ux-text-2: #b8aea3;         /* texto secundario */
  --ux-radius-sm: 6px;
  --ux-radius-md: 10px;
  --ux-radius-lg: 14px;
  --ux-space-1: 4px;
  --ux-space-2: 8px;
  --ux-space-3: 12px;
  --ux-space-4: 16px;
  --ux-dur-fast: 120ms;
  --ux-dur-base: 200ms;
}
```

Selectores de tema disponibles:

```html
<html data-theme="erplora">         <!-- por defecto, oscuro terracota -->
<html data-theme="erplora-light">   <!-- claro terracota -->
```

### Templates de paleta profesional

Además del tema base "erplora", la librería incluye **5 paletas profesionales adicionales** en `lib/templates/`. Cada una tiene variante dark y light en el mismo archivo. Se aplican vía atributo `data-template` (compatible con `data-theme`):

| Template     | Vibe                                  | Brand color                |
|--------------|---------------------------------------|----------------------------|
| `corporate`  | Banking, finance, enterprise SaaS     | Deep navy `#1E3A8A`        |
| `minimal`    | Editorial, luxury, design studios     | Pure black + gold accent   |
| `forest`     | Sustainable, agriculture, organic     | Forest green `#2F5233`     |
| `ocean`      | Modern tech, fintech, startups        | Teal/cyan `#0EA5E9`        |
| `violet`     | Creative agencies, design tools       | Deep violet `#7C3AED`      |

Carga uno o todos:

```html
<!-- Solo uno -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/ERPlora/ux@latest/dist/templates/corporate.min.css">

<!-- Todos en uno (≈9 KB minificado) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/ERPlora/ux@latest/dist/templates/all.min.css">
```

Aplica al `<html>` (o cualquier subárbol):

```html
<html data-theme="erplora" data-template="corporate">           <!-- dark + corporate -->
<html data-theme="erplora-light" data-template="corporate-light"> <!-- light + corporate -->
```

Sin `data-template` se usa la paleta base "erplora". Cada template **solo redefine los `--ux-*` de color** — toda la geometría, tipografía y motion permanecen.

---

## Catálogo de componentes

### Layout
`ux-app-shell` · `ux-sidebar` · `ux-topbar` · `ux-tab-bar` · `ux-menu-btn` · `ux-page`

### Átomos
`ux-btn` · `ux-badge` · `ux-pill` · `ux-avatar` · `ux-status-dot`

### Superficies
`ux-card` · `ux-kpi` · `ux-stats` · `ux-empty`

### Forms
`ux-input` · `ux-select` · `ux-textarea` · `ux-checkbox` · `ux-radio` · `ux-toggle` · `ux-range` · `ux-search` · `ux-form-row` · `ux-form-grid`

### Forms extra
`ux-slider` · `ux-upload` · `ux-fab` · `ux-segment` · `ux-stepper` · `ux-code-input`

### Pickers
`ux-datepicker` · `ux-timepicker` · `ux-color-picker` · `ux-otp` · `ux-pinpad` · `ux-rating` · `ux-autocomplete` · `ux-tag-input` · `ux-combobox`

### Data display
`ux-table` · `ux-dt` (DataTable con view-toggle list/grid, export, filtros, paginación) · `ux-sparkline`

### Charts
`ux-chart-line` · `ux-chart-bar` · `ux-chart-area` · `ux-chart-donut` · `ux-chart-stack` · `ux-heatmap` · `ux-gauge` · `ux-bullet`

### Overlays
`ux-modal` · `ux-drawer` · `ux-toast` · `ux-tooltip` · `ux-popover`

### Feedback
`ux-banner` · `ux-callout` · `ux-alert` · `ux-progress` · `ux-spinner` · `ux-skeleton` · `ux-loading-bar`

### Navegación
`ux-tabs` · `ux-breadcrumbs` · `ux-pagination` · `ux-nav-list`

### Workflow
`ux-kanban` · `ux-calendar` · `ux-chat` · `ux-timeline`

### POS
`ux-pos` · `ux-numpad` · `ux-payment` · `ux-receipt` · `ux-kds` · `ux-cat-card` · `ux-product-tile`

### Manufactura
`ux-bom` · `ux-work-order` · `ux-gantt` · `ux-oee` · `ux-quality-check`

### HR
`ux-employee-card` · `ux-time-clock` · `ux-leave-request` · `ux-payroll-row`

### Multimedia
`ux-player` · `ux-gallery` · `ux-uploader` · `ux-attachment`

### Forms avanzados
`ux-wizard` · `ux-query-builder` · `ux-matrix` · `ux-drag-form` · `ux-signature`

### Commerce
`ux-checkout` · `ux-cart-drawer` · `ux-address-card` · `ux-coupon`

### Mobile
`ux-pull-refresh` · `ux-sheet` · `ux-action-list`

### System overlays
`ux-cmdk` (Command palette ⌘K) · `ux-notif-center` · `ux-coach` · `ux-onboarding`

### Estados
`ux-skeleton` · `ux-spinner` · `ux-loading` · `ux-error-page` · `ux-disabled`

---

## Convenciones de clases

Estilo BEM ligero con prefijo `ux-`:

```
ux-{block}                  bloque base
ux-{block}__{element}       elemento hijo
ux-{block}--{modifier}      modificador
is-{state}                  estado runtime (active, open, loading…)
```

Ejemplo:

```html
<button class="ux-btn ux-btn--primary ux-btn--lg is-loading">
  <span class="ux-btn__icon">…</span>
  <span class="ux-btn__label">Guardar</span>
</button>
```

---

## Interactividad con Datastar

Datastar añade comportamiento declarativo con atributos `data-*`. La librería UX está pensada para encajar con él pero **no lo requiere**.

### Combobox con búsqueda real

```html
<div class="ux-combo" data-signals="{q: '', open: false}">
  <input class="ux-combo__input"
         data-bind-q
         data-on-focus="$open = true">
  <div class="ux-combo__menu" data-show="$open">
    <div class="ux-combo__option"
         data-show="'Norden Bikes'.toLowerCase().includes($q.toLowerCase())">
      Norden Bikes
    </div>
  </div>
</div>
```

### Modal abrible

```html
<button data-on-click="$modal = true">Abrir</button>

<div class="ux-modal" data-show="$modal" data-signals="{modal: false}">
  <div class="ux-modal__backdrop" data-on-click="$modal = false"></div>
  <div class="ux-modal__panel">
    <button data-on-click="$modal = false">Cerrar</button>
  </div>
</div>
```

### Tabs

```html
<div class="ux-tabs" data-signals="{tab: 'general'}">
  <button class="ux-tabs__tab" data-on-click="$tab = 'general'"
          data-class-is-active="$tab === 'general'">General</button>
  <button class="ux-tabs__tab" data-on-click="$tab = 'avanzado'"
          data-class-is-active="$tab === 'avanzado'">Avanzado</button>

  <div data-show="$tab === 'general'">…</div>
  <div data-show="$tab === 'avanzado'">…</div>
</div>
```

> Componentes individuales en `previews/components/*.html`. Páginas completas (mockups de app real, listas para copy-paste) organizadas por dominio en `previews/<domain>/<page>.html` — auth, dashboard, orgs, hubs, billing, marketplace, modules, settings, etc.

---

## Build local

Sin `npm install` necesario para el build básico (solo Node estándar):

```bash
git clone https://github.com/ERPlora/ux.git
cd ux
node build.mjs           # genera dist/erplora-ux.css + .min.css
node build.mjs --watch   # rebuild en cambios
```

Para minify de calidad con [lightningcss](https://lightningcss.dev):

```bash
npm i -D lightningcss-cli
npm run build:lightning
```

### Añadir un componente nuevo

1. Crea `lib/css/components/mi-componente.css` con clases `ux-mi-*`.
2. Añade el `@import` en `lib/css/ux.css`.
3. Añade la entrada al array `ORDER` en `build.mjs`.
4. Crea `previews/components/mi-componente.html` con un ejemplo.
5. Registra la entrada en el nav lateral de `index.html` (sección `doc__nav-link` + objeto routes).
6. `node build.mjs` y commit.

---

## Deploy y publicación

### GitHub Pages

El workflow `.github/workflows/pages.yml` se dispara en cada push a `main`:

1. Hace `node build.mjs` para regenerar `dist/`.
2. Copia `index.html`, `lib/`, `dist/`, `previews/` a un sitio estático.
3. Publica en `https://erplora.github.io/ux/`.

Activación: **Settings → Pages → Source: GitHub Actions**.

### Tag para CDN versionado

```bash
git tag v2.0.0
git push origin v2.0.0
```

A los pocos minutos:

```
https://cdn.jsdelivr.net/gh/ERPlora/ux@latest/dist/erplora-ux.min.css
```

### Migración desde la librería antigua (v3 con Tailwind)

```bash
git checkout main
git checkout -b legacy-v3-backup     # backup
git push origin legacy-v3-backup
git checkout main
git rm -rf .                         # vaciar
# copiar contenido nuevo desde este proyecto
git add .
git commit -m "v2.0.0 · CSS-only library"
git push origin main
```

Como ambas versiones usan prefijo `ux-*`, los consumidores existentes ven solo mejora visual sin renombrar nada.

---

## Soporte para IAs (Copilot · Codex · Cursor · etc.)

La librería incluye documentación machine-readable que las IAs de código consumen automáticamente:

| Archivo            | Propósito                                                                 | URL pública                                       |
| ------------------ | ------------------------------------------------------------------------- | ------------------------------------------------- |
| `AGENTS.md`        | Estándar [agents.md](https://agents.md) — instrucciones, patrones, anti-patrones, ejemplos. Lo detectan Cursor, OpenAI Codex, GitHub Copilot Workspace y otros. | `https://erplora.github.io/ux/AGENTS.md`          |
| `llms.txt`         | Estándar [llmstxt.org](https://llmstxt.org) — índice corto, links a recursos. Lo usan crawlers de IA y context-fetch. | `https://erplora.github.io/ux/llms.txt`           |
| `llms-full.txt`    | Inventario exhaustivo de las **1932 clases** (260+ bloques) agrupadas por componente, con tokens y utilities. Para inyectar en context window. | `https://erplora.github.io/ux/llms-full.txt`      |

### Cómo lo usa cada herramienta

- **Cursor / Codex CLI**: detectan `AGENTS.md` en la raíz del proyecto consumidor. Copia o symlink el archivo.
- **GitHub Copilot**: usa `.github/copilot-instructions.md` — copia `AGENTS.md` ahí.
- **Asistentes web (ChatGPT, etc.)**: pega `llms-full.txt` al principio del chat para autocompletado completo.
- **Cursor `@docs`**: añade `https://erplora.github.io/ux/llms.txt` como custom doc.

### Para mantenerlos sincronizados

`llms-full.txt` se regenera tras cambios en `lib/css/components/`:

```bash
for f in lib/css/components/*.css; do
  echo "## $(basename "$f" .css)"
  grep -hE '^\.ux-[a-z][a-z0-9_-]*' "$f" -o | sort -u
  echo ""
done
```

(combina con la cabecera explicativa actual de `llms-full.txt`).

---

## Compatibilidad

| Feature                    | Mínimo                              |
| -------------------------- | ----------------------------------- |
| Custom properties          | Chrome 49 · Safari 9 · Firefox 31   |
| `color-mix()`              | Chrome 111 · Safari 16.4 · FF 113   |
| `:has()`                   | Chrome 105 · Safari 15.4 · FF 121   |
| `aspect-ratio`             | Chrome 88 · Safari 15 · FF 89       |

Cobertura objetivo: navegadores modernos (últimas 2 versiones) — coherente con stack ERPlora (HTMX + Alpine + hub-next).

---

## Roadmap

- ✅ **v2.0** — librería CSS, build, CDN, deploy, README
- ⏳ **v2.1 · Datastar layer** — previews reescritos con `data-*` para que sean interactivos reales
- ⏳ **v2.2 · Ronda 17** — navegación crítica (tabs · breadcrumbs · accordion · list · tree · stepper · navbar · menu · context-menu · banner · callout · lightbox · hover-card)
- ⏳ **v2.3 · Ronda 18** — inputs (rating · quantity-stepper · tag-input · autocomplete · OTP · currency · phone · color · datetime · date-range · rich-text · markdown)
- ⏳ **v2.4 · Ronda 19** — visualización (gauge · code-block · JSON-viewer · diff · QR · barcode · virtual-list · audio/video player)
- ⏳ **v2.5 · Ronda 20** — verticales (product-card · order-ticket · loyalty-card · time-clock · attendance · leave · production · quality · batch · gantt · file-manager)

---

## Python: `ux-jinja` package

Jinja2 macros and page templates that wrap the CSS classes for use in
FastAPI/Hotframe (Hub) and Django (Cloud). Lives in `src/ux_jinja/` of this
same repo and is published independently as the `ux-jinja` pip package.

```bash
pip install ux-jinja
```

```python
from ux_jinja import TEMPLATES_DIR
templates_loader.add_searchpath(str(TEMPLATES_DIR))
```

```jinja
{% from "ui/button.jinja" import button %}
{% from "ui/card.jinja" import card %}

{{ button("Save", on_click="@post('/api/save')") }}

{% call card(title="Order #42") %}
  <p>Body of the card.</p>
{% endcall %}
```

The macros use the Jinja2 `do` extension (for in-template list mutation), so
the `Environment` must enable it:

```python
from jinja2 import Environment, FileSystemLoader

env = Environment(
    loader=FileSystemLoader(str(TEMPLATES_DIR)),
    extensions=["jinja2.ext.do"],
    autoescape=True,
)
```

Macros available under `ui/`:

| Module          | Exports                          |
| --------------- | -------------------------------- |
| `button.jinja`  | `button`                         |
| `badge.jinja`   | `badge`                          |
| `card.jinja`    | `card`, `card_footer`            |
| `input.jinja`   | `input`                          |
| `textarea.jinja`| `textarea`                       |
| `select.jinja`  | `select`                         |
| `modal.jinja`   | `modal`, `modal_footer`          |
| `datatable.jinja`| `datatable`                     |

See <https://erplora.github.io/ux/> for live previews of the underlying CSS.

---

## Licencia

MIT © ERPlora · 2025
