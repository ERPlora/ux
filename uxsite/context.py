"""Sidebar navigation data and shared context for every view in the docs site.

The structure mirrors the canonical ``index.html`` reference: a hierarchical
list of groups, each with a label and a flat list of items keyed by the route
they point to. Hotframe's template engine receives this through the
``nav_context()`` helper which is spread into every ``TemplateResponse``.

Items list shape::

    {"label": "button", "href": "/c/button", "icon": <svg path>}
"""

from __future__ import annotations


# Iconify icon identifiers used in the sidebar.
# Each key maps to an ion: icon from https://icon-sets.iconify.design/ion/
ICON_NAMES: dict[str, str] = {
    "home":     "ion:home-outline",
    "install":  "ion:download-outline",
    "live":     "ion:flash-outline",
    "cube":     "ion:cube-outline",
    "input":    "ion:create-outline",
    "nav":      "ion:menu-outline",
    "modal":    "ion:chatbubble-outline",
    "feedback": "ion:alert-circle-outline",
    "table":    "ion:grid-outline",
    "page":     "ion:document-outline",
    # Extra icons matching the public index.html NAV
    "layers":   "ion:layers-outline",
    "layout":   "ion:browsers-outline",
    "grid":     "ion:apps-outline",
    "forms":    "ion:reader-outline",
    "alert":    "ion:warning-outline",
    "flow":     "ion:pulse-outline",
    "factory":  "ion:business-outline",
    "store":    "ion:storefront-outline",
}


# Component identifiers that map 1:1 to a macro file in
# ``ux_jinja/templates/ui/<name>.jinja``. Order is irrelevant for routing —
# the SIDEBAR_GROUPS ordering below is what the user sees.
COMPONENT_NAMES: list[str] = [
    "button",
    "badge",
    "card",
    "chip",
    "avatar",
    "icon",
    "divider",
    "kpi",
    "spacer",
    "pill",
    "icon_btn",
    "input",
    "textarea",
    "select",
    "field",
    "toggle",
    "check",
    "radio",
    "radio_card",
    "range",
    "slider",
    "datepicker",
    "timepicker",
    "dropzone",
    "combo",
    "search",
    "breadcrumbs",
    "tabs",
    "tabbar",
    "tabbar_item",
    "topbar",
    "sidebar",
    "sidebar_item",
    "app_shell",
    "drawer",
    "modal",
    "tooltip",
    "toast",
    "progress",
    "accordion",
    "list",
    "timeline",
    "empty",
    "states",
    "datatable",
    "dt_toolbar",
    "date_range",
    "view_toggle",
    "calendar",
    "chart",
    "chat",
    "kanban",
    "receipt",
    "editor",
    "multimedia",
    "tree",
    "stat",
    "inline_feedback",
    "cmdk",
    "pos_canvas",
    "pos_numpad",
    "pos_payment",
    "kds",
    "hr_card",
    "manufacturing_panel",
    "commerce_card",
    "mobile_shell",
    # v2.1 · added 2026-05-09 — round-out of legacy library coverage.
    "menu_btn",
    "table",
    "sparkline",
    "otp",
    "pinpad",
    "rating",
    "qty_stepper",
    "segment",
    "stepper",
    "popover",
    "autocomplete",
    "color_picker",
    "currency",
    "phone",
]


# Example pages shipped under ``ux_jinja/templates/pages/<name>.jinja``.
PAGE_NAMES: list[str] = [
    "dashboard",
    "list_view",
    "login",
    "settings",
    "profile",
    "kanban",
    "calendar_view",
    "form_complex",
    "error_pages",
    "pos",
]


# One-line description per component — surfaced on the gallery cards.
COMPONENT_DESCRIPTIONS: dict[str, str] = {
    "button": "Primary, secondary, ghost, outline, danger and link variants in three sizes.",
    "badge": "Tonal status pills with optional leading dot and solid variants.",
    "card": "Article shell with header, body and footer slots — elevated, flat or glass.",
    "chip": "Compact selectable tags with active state and remove affordance.",
    "avatar": "Initials and image avatars with status dot and stack composition.",
    "divider": "Horizontal and vertical separators, optionally labelled inline.",
    "kpi": "Metric tile with delta arrow, trend tone and free-form unit suffix.",
    "input": "Text input across three sizes with invalid state and Datastar bind.",
    "textarea": "Multi-line input with rows, invalid state and Datastar bind.",
    "select": "Native select with tuple, dict or string option formats.",
    "breadcrumbs": "Hierarchical crumb trail with chevron separator and chips variant.",
    "tabs": "Tab list with pill and vertical variants, signal-driven panels.",
    "tabbar": "Mobile bottom tab bar with icon, label, badge and active aria-current.",
    "topbar": "Sticky page top bar with back, centred title, actions slot and burger.",
    "drawer": "Right, left or bottom side drawer driven by a Datastar signal.",
    "modal": "Backdrop dialog with header, body and footer slots in four sizes.",
    "tooltip": "Floating tooltip and pure-CSS hover trigger via data-tip.",
    "toast": "Status notification with tonal variants and optional dismiss.",
    "progress": "Determinate and indeterminate bars with optional label header.",
    "accordion": "Collapsible item group with single or multiple open panels.",
    "list": "Item rows with icon tone, description, aside slot and chevron.",
    "datatable": "Toolbar, search, optional view toggle and a typed column schema.",
    "icon": "Iconify wrapper — declarative <iconify-icon> with size and attrs.",
    "spacer": "Flex spacer in xs..xl with optional block and divider modifiers.",
    "field": "Form field wrapper with label, hint and error rows around any control.",
    "toggle": "iOS-style on/off switch with checked, sizes and Datastar bind.",
    "check": "Checkbox with label, indeterminate-friendly state and Datastar bind.",
    "radio": "Single radio plus radio_group helper that emits the matching markup.",
    "radio_card": "Rich card-style radio set with title and description per option.",
    "range": "Native range input styled with .ux-range and Datastar bind.",
    "slider": "Range slider with leaf, warn and danger fill variants.",
    "datepicker": "Native <input type='date'> wrapped in .ux-datepicker tokens.",
    "timepicker": "Native <input type='time'> wrapped in .ux-timepicker tokens.",
    "dropzone": "File upload dropzone with drag signal and Datastar drag feedback.",
    "combo": "Combobox / autocomplete shell with field, caret, menu and options.",
    "search": "Search input with leading icon and optional keyboard shortcut hint.",
    "timeline": "Vertical event timeline with tonal dots and optional dense mode.",
    "empty": "Empty state with icon, title, description and optional CTA button.",
    "states": "Loading, error and success blocks for async surfaces and pages.",
    "calendar": "Mini month grid with weekday header, selected day and event markers.",
    "pill": "Status tag with a leading coloured dot — lighter than badge, no solid fill.",
    "icon_btn": "Square icon-only ghost button for toolbars, topbars and row actions.",
    "tabbar_item": "Single item inside a .ux-tabbar nav — icon, label and optional badge.",
    "sidebar": "Full left-rail navigation pane with brand header, scrollable body and footer.",
    "sidebar_item": "Navigation row inside a sidebar — icon, label, badge and active state.",
    "app_shell": "Two-column app layout — sidebar + main area with mobile drawer support.",
    "dt_toolbar": "DataTable consolidated toolbar row wrapping search, filters and view controls.",
    "date_range": "Compact inline date-range display trigger for table toolbars.",
    "view_toggle": "Icon-button pair that switches between named views (table / grid).",
    "chart": "Shell for ux-chart with header, delta and SVG slot — flat or elevated.",
    "chat": "Two-pane chat layout with conversation list and thread — caller-driven shell.",
    "kanban": "Horizontal board shell with ux-kanban__col columns and draggable kcard items.",
    "receipt": "POS-style thermal receipt with lines, total and optional footer block.",
    "editor": "Richtext editor shell using ux-richtext with toolbar and editable content div.",
    "multimedia": "Gallery grid and upload dropzone using ux-gallery and ux-upload.",
    "tree": "Collapsible file/folder tree with Datastar open signals and dense mode.",
    "stat": "Horizontal stats bar (ux-stats / ux-stat) with value, label and delta tones.",
    "inline_feedback": "Banner and callout blocks for info, warn, danger and ok inline messages.",
    "cmdk": "Command-palette overlay driven by Datastar open/query signals.",
    "pos_canvas": "Full POS layout shell — category rail, product grid and cart aside with Datastar signals.",
    "pos_numpad": "Numeric entry pad for POS cash or quantity input — standard or calculator layout.",
    "pos_payment": "Payment method picker for POS checkout — card, cash, mobile and mixed methods.",
    "kds": "Kitchen Display System ticket card with order header, item list and action buttons.",
    "hr_card": "Employee card (ux-emp) with avatar, name, role, status badge and stats grid.",
    "manufacturing_panel": "Work-order panel with OEE progress bar and step-by-step status list.",
    "commerce_card": "Invoice / quote builder (ux-invoice) with header, line table and totals block.",
    "mobile_shell": "Mobile app shell — ux-app with offcanvas sidebar and ux-tabbar bottom nav.",
    "menu_btn": "Three-line burger button — pair with a Datastar signal to drive a sidebar or drawer.",
    "table": "Plain tabular data — columns and rows, optional sortable headers and dense / sticky variants.",
    "sparkline": "Inline SVG sparkline — line or filled area, sized for KPI cards and table cells.",
    "otp": "One-time-password split input — 4 to 8 cells with optional separator, autocomplete='one-time-code'.",
    "pinpad": "Numeric keypad — 0..9 plus action keys for PIN entry on touch devices.",
    "rating": "Star rating — interactive or read-only, with optional inline label.",
    "qty_stepper": "Quantity input with minus/plus buttons — clamped to min/max with Datastar bind.",
    "segment": "Segmented control — a row of pressable options, lighter than tabs.",
    "stepper": "Step indicator for wizards — horizontal or vertical, done / active / pending states.",
    "popover": "Floating panel anchored to a trigger — toggle via Datastar signal, four placements.",
    "autocomplete": "Search-as-you-type list — input plus filtered options, lighter than combo.",
    "color_picker": "Row of colour swatches — pick a brand colour with Datastar bind.",
    "currency": "Amount input with leading symbol or currency selector — locale-friendly numeric entry.",
    "phone": "International phone input — flag plus dial code prefix and tel-mode number field.",
}


PAGE_DESCRIPTIONS: dict[str, str] = {
    "dashboard": "KPI grid with cards, lists and a representative ERP layout.",
    "list_view": "DataTable-driven list view with toolbar, filters and rows.",
    "login": "Centered sign-in form with email/password and link footer.",
    "settings": "Settings page with sidebar nav and grouped account cards.",
    "profile": "User profile with avatar, KPIs and recent activity list.",
    "kanban": "Three-column kanban board with cards, badges and counts.",
    "calendar_view": "Mini calendar plus a list of events for the selected day.",
    "form_complex": "Multi-section product form with toggles, range and chips.",
    "error_pages": "Showcase of 403/404/500 error layouts on a single page.",
    "pos": "Point-of-sale layout with catalogue, ticket and payment panels.",
}


# Sidebar layout — mirrors the canonical NAV array in index.html exactly.
# Mapping rules:
#   components/<name> with existing /c/<name> route → href="/c/<name>"
#   components/<name> without /c/<name> route       → href="#", badge="soon"
#   app pages                                        → href="/preview/<cat>/<slug>"
#   overview / design-system                         → special top-level routes
_C = ICON_NAMES["cube"]
_NAV = ICON_NAMES["nav"]
_LAYOUT = ICON_NAMES["layout"]
_FORMS = ICON_NAMES["forms"]
_TABLE = ICON_NAMES["table"]
_MODAL = ICON_NAMES["modal"]
_FLOW = ICON_NAMES["flow"]
_FACTORY = ICON_NAMES["factory"]
_STORE = ICON_NAMES["store"]
_GRID = ICON_NAMES["grid"]
_ALERT = ICON_NAMES["alert"]

SIDEBAR_GROUPS: list[dict] = [
    # ── Foundations ──────────────────────────────────────────────────────────
    {
        "label": "Foundations",
        "items": [
            {"label": "Visión general", "href": "/",              "icon": ICON_NAMES["home"]},
            {"label": "Design system",  "href": "/design-system", "icon": ICON_NAMES["layers"]},
        ],
    },
    # ── Layout ───────────────────────────────────────────────────────────────
    {
        "label": "Layout",
        "items": [
            {"label": "App shell",    "href": "/c/app_shell", "icon": _LAYOUT},
            {"label": "Mobile shell", "href": "/c/mobile_shell", "icon": _LAYOUT},
            {"label": "Sidebar",      "href": "/c/sidebar",   "icon": _LAYOUT},
            {"label": "Topbar",       "href": "/c/topbar",    "icon": _LAYOUT},
        ],
    },
    # ── Navegación ───────────────────────────────────────────────────────────
    {
        "label": "Navegación",
        "items": [
            {"label": "Tab bar (bottom)", "href": "/c/tabbar",      "icon": _NAV},
            {"label": "Tabs (top)",       "href": "/c/tabs",        "icon": _NAV},
            {"label": "Menu button",      "href": "/c/menu_btn",    "icon": _NAV},
            {"label": "Breadcrumbs",      "href": "/c/breadcrumbs", "icon": _NAV},
        ],
    },
    # ── Atomics ──────────────────────────────────────────────────────────────
    {
        "label": "Atomics",
        "items": [
            {"label": "Button",                           "href": "/c/button",   "icon": _C},
            {"label": "Badge & Pill",                     "href": "/c/badge",    "icon": _C},
            {"label": "Avatar",                           "href": "/c/avatar",   "icon": _C},
            {"label": "Progress · Spinner · Pagination",  "href": "/c/progress", "icon": _C},
            {"label": "Datepicker",                       "href": "/c/datepicker",   "icon": _C},
            {"label": "OTP",                              "href": "/c/otp",          "icon": _C},
            {"label": "Pinpad",                           "href": "/c/pinpad",       "icon": _C},
            {"label": "Rating",                           "href": "/c/rating",       "icon": _C},
            {"label": "Autocomplete",                     "href": "/c/autocomplete", "icon": _C},
            {"label": "Color picker",                     "href": "/c/color_picker", "icon": _C},
            {"label": "Sparkline",                        "href": "/c/sparkline",    "icon": _C},
        ],
    },
    # ── Surfaces ─────────────────────────────────────────────────────────────
    {
        "label": "Surfaces",
        "items": [
            {"label": "Card",               "href": "/c/card",          "icon": _GRID},
            {"label": "KPI card",           "href": "/c/kpi",           "icon": _GRID},
            {"label": "Stats",              "href": "/c/stat",          "icon": _GRID},
            {"label": "Empty state",        "href": "/c/empty",         "icon": _GRID},
            {"label": "Accordion",          "href": "/c/accordion",     "icon": _GRID},
            {"label": "List",               "href": "/c/list",          "icon": _GRID},
            {"label": "Tree",               "href": "/c/tree",          "icon": _GRID},
            {"label": "Banners · Callouts", "href": "/c/inline_feedback", "icon": _ALERT},
        ],
    },
    # ── Forms ────────────────────────────────────────────────────────────────
    {
        "label": "Forms",
        "items": [
            {"label": "Input",          "href": "/c/input",       "icon": _FORMS},
            {"label": "Textarea",       "href": "/c/textarea",    "icon": _FORMS},
            {"label": "Search",         "href": "/c/search",      "icon": _FORMS},
            {"label": "Select",         "href": "/c/select",      "icon": _FORMS},
            {"label": "Combo",          "href": "/c/combo",       "icon": _FORMS},
            {"label": "Toggle",         "href": "/c/toggle",      "icon": _FORMS},
            {"label": "Check",          "href": "/c/check",       "icon": _FORMS},
            {"label": "Radio",          "href": "/c/radio",       "icon": _FORMS},
            {"label": "Radio card",     "href": "/c/radio_card",  "icon": _FORMS},
            {"label": "Field · layout", "href": "/c/field",       "icon": _FORMS},
            {"label": "Slider",         "href": "/c/slider",      "icon": _FORMS},
            {"label": "Range",          "href": "/c/range",       "icon": _FORMS},
            {"label": "Dropzone",       "href": "/c/dropzone",    "icon": _FORMS},
            {"label": "Stepper",        "href": "/c/stepper",     "icon": _FORMS},
            {"label": "Segment",        "href": "/c/segment",     "icon": _FORMS},
            {"label": "Qty stepper",    "href": "/c/qty_stepper", "icon": _FORMS},
            {"label": "Currency",       "href": "/c/currency",    "icon": _FORMS},
            {"label": "Phone",          "href": "/c/phone",       "icon": _FORMS},
            {"label": "Timepicker",     "href": "/c/timepicker",  "icon": _FORMS},
        ],
    },
    # ── Data display ─────────────────────────────────────────────────────────
    {
        "label": "Data display",
        "items": [
            {"label": "Table",                  "href": "/c/table",     "icon": _TABLE},
            {"label": "DataTable + Pagination", "href": "/c/datatable", "icon": _TABLE},
            {"label": "DT toolbar",             "href": "/c/dt_toolbar","icon": _TABLE},
            {"label": "View toggle",            "href": "/c/view_toggle","icon": _TABLE},
            {"label": "Date range",             "href": "/c/date_range","icon": _TABLE},
            {"label": "Sparkline",              "href": "/c/sparkline", "icon": _TABLE},
        ],
    },
    # ── Overlays ─────────────────────────────────────────────────────────────
    {
        "label": "Overlays",
        "items": [
            {"label": "Modal",                     "href": "/c/modal",   "icon": _MODAL},
            {"label": "Drawer",                    "href": "/c/drawer",  "icon": _MODAL},
            {"label": "Toast",                     "href": "/c/toast",   "icon": _MODAL},
            {"label": "Tooltip",                   "href": "/c/tooltip", "icon": _MODAL},
            {"label": "Popover",                   "href": "/c/popover", "icon": _MODAL},
        ],
    },
    # ── Workflow ─────────────────────────────────────────────────────────────
    {
        "label": "Workflow",
        "items": [
            {"label": "Kanban",             "href": "/c/kanban",   "icon": _FLOW},
            {"label": "Calendar",           "href": "/c/calendar", "icon": _FLOW},
            {"label": "Chat",               "href": "/c/chat",     "icon": _FLOW},
            {"label": "Timeline & Stepper", "href": "/c/timeline", "icon": _FLOW},
            {"label": "Charts",             "href": "/c/chart",    "icon": _FLOW},
        ],
    },
    # ── Industria ────────────────────────────────────────────────────────────
    {
        "label": "Industria",
        "items": [
            {"label": "Manufactura",              "href": "/c/manufacturing_panel", "icon": _FACTORY},
            {"label": "Recursos humanos",         "href": "/c/hr_card",             "icon": _FACTORY},
            {"label": "Multimedia",               "href": "/c/multimedia",          "icon": _FACTORY},
            {"label": "Forms avanzados",          "href": "#",                      "icon": _FACTORY, "badge": "soon"},
            {"label": "Comercial · invoice",      "href": "/c/commerce_card",       "icon": _FACTORY},
            {"label": "Mobile patterns",          "href": "#",                      "icon": _FACTORY, "badge": "soon"},
            {"label": "Cmd+K · Notif · Coach",    "href": "/c/cmdk",                "icon": _FACTORY},
            {"label": "Estados · skel · loading", "href": "/c/states",              "icon": _FACTORY},
        ],
    },
    # ── POS · Punto de venta ─────────────────────────────────────────────────
    {
        "label": "POS · Punto de venta",
        "items": [
            {"label": "POS · canvas completo", "href": "/c/pos_canvas",  "icon": _STORE},
            {"label": "Numpad",                "href": "/c/pos_numpad",  "icon": _STORE},
            {"label": "Cobro / pago",          "href": "/c/pos_payment", "icon": _STORE},
            {"label": "Receipt (ticket)",      "href": "/c/receipt",     "icon": _STORE},
            {"label": "KDS · cocina",          "href": "/c/kds",         "icon": _STORE},
        ],
    },
    # ── v2.1 · Actions & inputs ──────────────────────────────────────────────
    {
        "label": "v2.1 · Actions & inputs",
        "items": [
            {"label": "Back · Split btn · Calc · App icon",                    "href": "#", "icon": _C,     "badge": "soon"},
            {"label": "Tag · Filter chip · Toggle group · Variant · Qty badge", "href": "#", "icon": _C,     "badge": "soon"},
            {"label": "Currency · Phone · Qty stepper",                        "href": "#", "icon": _FORMS, "badge": "soon"},
        ],
    },
    # ── v2.1 · Data & layout ─────────────────────────────────────────────────
    {
        "label": "v2.1 · Data & layout",
        "items": [
            {"label": "JSON · QR · Carousel · Img · Zoom · Reorder · Vlist · Iscroll", "href": "#", "icon": _TABLE,  "badge": "soon"},
            {"label": "Panel · Masonry · Master-detail · Scroll · Split · Toolbar",    "href": "#", "icon": _LAYOUT, "badge": "soon"},
            {"label": "Rich text · Keyboard · OSK · VKB",                              "href": "#", "icon": _FORMS,  "badge": "soon"},
        ],
    },
    # ── v2.1 · Verticals ─────────────────────────────────────────────────────
    {
        "label": "v2.1 · Verticals",
        "items": [
            {"label": "Audio · Video · PDF",                        "href": "#", "icon": _FACTORY, "badge": "soon"},
            {"label": "Time clock · Shift cal · Attendance · Perf", "href": "#", "icon": _FACTORY, "badge": "soon"},
            {"label": "Machine · Prodline · QC · Batch",            "href": "#", "icon": _FACTORY, "badge": "soon"},
            {"label": "Loyalty · Ticket · Event · Product",         "href": "#", "icon": _STORE,   "badge": "soon"},
            {"label": "Menubar · Scheduler",                        "href": "#", "icon": _NAV,     "badge": "soon"},
        ],
    },
    # ── Auth ─────────────────────────────────────────────────────────────────
    {
        "label": "Auth",
        "items": [
            {"label": "Login (SaaS)",           "href": "/preview/auth/login-saas",      "icon": _C, "badge": "saas"},
            {"label": "Login (Hub · PIN pad)",  "href": "/preview/auth/login-hub",       "icon": _C, "badge": "hub"},
            {"label": "Activar 2FA",            "href": "/preview/auth/2fa-setup",       "icon": _C},
            {"label": "Gestionar 2FA",          "href": "/preview/auth/2fa-profile",     "icon": _C},
            {"label": "Desactivar 2FA",         "href": "/preview/auth/2fa-disable",     "icon": _C},
            {"label": "Cambiar contraseña",     "href": "/preview/auth/change-password", "icon": _C},
            {"label": "Sesiones activas",       "href": "/preview/auth/sessions",        "icon": _C},
            {"label": "Dispositivos confiados", "href": "/preview/auth/trusted-devices", "icon": _C},
            {"label": "Eliminar cuenta",        "href": "/preview/auth/delete-account",  "icon": _ALERT},
        ],
    },
    # ── Dashboard & profile ──────────────────────────────────────────────────
    {
        "label": "Dashboard & profile",
        "items": [
            {"label": "Dashboard (SaaS)", "href": "/preview/dashboard/saas", "icon": _LAYOUT, "badge": "saas"},
            {"label": "Dashboard (Hub)",  "href": "/preview/dashboard/hub",  "icon": _LAYOUT, "badge": "hub"},
            {"label": "Perfil (SaaS)",    "href": "/preview/profile/saas",   "icon": _C,      "badge": "saas"},
            {"label": "Perfil (Hub)",     "href": "/preview/profile/hub",    "icon": _C,      "badge": "hub"},
        ],
    },
    # ── Organizations ────────────────────────────────────────────────────────
    {
        "label": "Organizations",
        "items": [
            {"label": "Organizaciones",    "href": "/preview/orgs/list",            "icon": _GRID},
            {"label": "Nueva org",         "href": "/preview/orgs/create",          "icon": _GRID},
            {"label": "Detalle org",       "href": "/preview/orgs/detail",          "icon": _GRID},
            {"label": "Invitar miembro",   "href": "/preview/orgs/invite",          "icon": _GRID},
            {"label": "Facturación org",   "href": "/preview/orgs/billing",         "icon": _GRID},
            {"label": "Direcciones envío", "href": "/preview/orgs/shipping",        "icon": _GRID},
            {"label": "Métodos de pago",   "href": "/preview/orgs/payment-methods", "icon": _GRID},
        ],
    },
    # ── Hubs ─────────────────────────────────────────────────────────────────
    {
        "label": "Hubs",
        "items": [
            {"label": "Hubs activos",       "href": "/preview/hubs/active",   "icon": _FLOW},
            {"label": "Hubs inactivos",     "href": "/preview/hubs/inactive", "icon": _FLOW},
            {"label": "Crear hub (wizard)", "href": "/preview/hubs/create",   "icon": _FLOW},
            {"label": "Configuración hub",  "href": "/preview/hubs/settings", "icon": _FLOW},
            {"label": "Usuarios del hub",   "href": "/preview/hubs/users",    "icon": _FLOW},
            {"label": "Módulos del hub",    "href": "/preview/hubs/modules",  "icon": _FLOW},
            {"label": "Acceso QR hub",      "href": "/preview/hubs/qr",       "icon": _FLOW},
        ],
    },
    # ── Users ────────────────────────────────────────────────────────────────
    {
        "label": "Users",
        "items": [
            {"label": "Usuarios globales", "href": "/preview/users/list",   "icon": _C},
            {"label": "Invitar a hubs",    "href": "/preview/users/invite", "icon": _C},
        ],
    },
    # ── Billing ──────────────────────────────────────────────────────────────
    {
        "label": "Billing",
        "items": [
            {"label": "Facturas",            "href": "/preview/billing/invoices",         "icon": _MODAL},
            {"label": "Detalle factura",     "href": "/preview/billing/invoice-detail",   "icon": _MODAL},
            {"label": "Suscripciones",       "href": "/preview/billing/subscriptions",    "icon": _MODAL},
            {"label": "Mis compras",         "href": "/preview/billing/purchases",        "icon": _MODAL},
            {"label": "Historial pagos",     "href": "/preview/billing/payment-history",  "icon": _MODAL},
            {"label": "Facturación del hub", "href": "/preview/billing/hub",              "icon": _MODAL,   "badge": "hub"},
            {"label": "Vendor dashboard",    "href": "/preview/billing/vendor-dashboard", "icon": _FACTORY},
            {"label": "Detalle ingresos",    "href": "/preview/billing/vendor-earnings",  "icon": _FACTORY},
            {"label": "Payouts",             "href": "/preview/billing/payouts",          "icon": _FACTORY},
            {"label": "Detalle payout",      "href": "/preview/billing/payout-detail",    "icon": _FACTORY},
            {"label": "Stripe Connect",      "href": "/preview/billing/stripe-connect",   "icon": _FACTORY},
        ],
    },
    # ── Marketplace ──────────────────────────────────────────────────────────
    {
        "label": "Marketplace",
        "items": [
            {"label": "Tienda equipos (SaaS)", "href": "/preview/marketplace/saas-shop",          "icon": _STORE, "badge": "saas"},
            {"label": "Carrito (SaaS)",        "href": "/preview/marketplace/saas-cart",          "icon": _STORE, "badge": "saas"},
            {"label": "Checkout (SaaS)",       "href": "/preview/marketplace/saas-checkout",      "icon": _STORE, "badge": "saas"},
            {"label": "Pedido confirmado",     "href": "/preview/marketplace/saas-success",       "icon": _STORE, "badge": "saas"},
            {"label": "Marketplace (Hub)",     "href": "/preview/marketplace/hub-index",          "icon": _STORE, "badge": "hub"},
            {"label": "Catálogo (29 módulos)", "href": "/preview/marketplace/hub-catalog",        "icon": _STORE, "badge": "hub"},
            {"label": "Detalle de módulo",     "href": "/preview/marketplace/hub-detail",         "icon": _STORE, "badge": "hub"},
            {"label": "Soluciones por sector", "href": "/preview/marketplace/hub-solutions",      "icon": _STORE, "badge": "hub"},
            {"label": "Tipos de negocio",      "href": "/preview/marketplace/hub-business-types", "icon": _STORE, "badge": "hub"},
            {"label": "Cumplimiento",          "href": "/preview/marketplace/hub-compliance",     "icon": _STORE, "badge": "hub"},
            {"label": "Mis compras (Hub)",     "href": "/preview/marketplace/hub-my-purchases",   "icon": _STORE, "badge": "hub"},
            {"label": "Checkout (Stripe)",     "href": "/preview/marketplace/hub-checkout",       "icon": _STORE, "badge": "hub"},
            {"label": "Modal README",          "href": "/preview/marketplace/hub-readme",         "icon": _STORE, "badge": "hub"},
        ],
    },
    # ── Modules & Developer ──────────────────────────────────────────────────
    {
        "label": "Modules & Developer",
        "items": [
            {"label": "Developer hub",     "href": "/preview/modules/overview",      "icon": _FACTORY},
            {"label": "Mis módulos",       "href": "/preview/modules/my",            "icon": _FACTORY},
            {"label": "Subir módulo",      "href": "/preview/modules/upload",        "icon": _FACTORY},
            {"label": "Editar módulo",     "href": "/preview/modules/edit",          "icon": _FACTORY},
            {"label": "Estadísticas",      "href": "/preview/modules/stats",         "icon": _FACTORY},
            {"label": "Colaboradores",     "href": "/preview/modules/members",       "icon": _FACTORY},
            {"label": "Repositorios",      "href": "/preview/modules/repositories",  "icon": _FACTORY},
            {"label": "Conectar GitHub",   "href": "/preview/modules/add-from-git",  "icon": _FACTORY},
            {"label": "Instalados en hub", "href": "/preview/modules/hub-installed", "icon": _FACTORY, "badge": "hub"},
        ],
    },
    # ── Employees & roles ────────────────────────────────────────────────────
    {
        "label": "Employees & roles",
        "items": [
            {"label": "Empleados",       "href": "/preview/employees/list",       "icon": _FLOW},
            {"label": "Añadir empleado", "href": "/preview/employees/add",        "icon": _FLOW},
            {"label": "Editar empleado", "href": "/preview/employees/edit",       "icon": _FLOW},
            {"label": "Roles",           "href": "/preview/roles/list",           "icon": _FLOW},
            {"label": "Form de rol",     "href": "/preview/roles/form",           "icon": _FLOW},
            {"label": "Detalle de rol",  "href": "/preview/roles/detail",         "icon": _FLOW},
            {"label": "Eliminar rol",    "href": "/preview/roles/confirm-delete", "icon": _FLOW},
        ],
    },
    # ── Settings ─────────────────────────────────────────────────────────────
    {
        "label": "Settings",
        "items": [
            {"label": "Preferencias",       "href": "/preview/settings/preferences",     "icon": _C},
            {"label": "Settings hub",       "href": "/preview/settings/hub",             "icon": _C, "badge": "hub"},
            {"label": "Configuración hub",  "href": "/preview/settings/hub-config",      "icon": _C, "badge": "hub"},
            {"label": "Cumplimiento",       "href": "/preview/settings/compliance",      "icon": _C},
            {"label": "Dispositivos",       "href": "/preview/settings/devices",         "icon": _C},
            {"label": "Impresoras",         "href": "/preview/settings/printers",        "icon": _C},
            {"label": "Backup",             "href": "/preview/settings/backup",          "icon": _C},
            {"label": "File browser",       "href": "/preview/settings/file-browser",    "icon": _C},
            {"label": "Clases de impuesto", "href": "/preview/settings/tax-classes",     "icon": _C},
            {"label": "Archivos",           "href": "/preview/settings/files",           "icon": _C},
            {"label": "Centro de ayuda",    "href": "/preview/settings/help",            "icon": _C},
            {"label": "Tareas programadas", "href": "/preview/settings/scheduled-tasks", "icon": _C},
        ],
    },
    # ── System & public ──────────────────────────────────────────────────────
    {
        "label": "System & public",
        "items": [
            {"label": "Dispositivos del sistema", "href": "/preview/system/index",        "icon": _C,     "badge": "hub"},
            {"label": "Setup Bridge (wizard)",    "href": "/preview/system/bridge-setup", "icon": _C,     "badge": "hub"},
            {"label": "Landing pública",          "href": "/preview/public/index",        "icon": _STORE, "badge": "hub"},
            {"label": "Catálogo público",         "href": "/preview/public/catalog",      "icon": _STORE, "badge": "hub"},
            {"label": "Detalle producto",         "href": "/preview/public/product",      "icon": _STORE, "badge": "hub"},
        ],
    },
    # ── Errors ───────────────────────────────────────────────────────────────
    {
        "label": "Errors",
        "items": [
            {"label": "403 — Forbidden",    "href": "/preview/errors/403",              "icon": _ALERT},
            {"label": "404 — Not found",    "href": "/preview/errors/404",              "icon": _ALERT},
            {"label": "405 — Method NA",    "href": "/preview/errors/405",              "icon": _ALERT},
            {"label": "500 — Server error", "href": "/preview/errors/500",              "icon": _ALERT},
            {"label": "Bootstrap error",    "href": "/preview/errors/bootstrap",        "icon": _ALERT},
            {"label": "Bootstrap detail",   "href": "/preview/errors/bootstrap-detail", "icon": _ALERT},
            {"label": "Acceso denegado",    "href": "/preview/errors/unauthorized",     "icon": _ALERT},
        ],
    },
]


# The list of theme ids loaded from ``dist/templates/all.min.css``. The
# default ``""`` means "no template — use the base erplora theme only".
THEME_OPTIONS: list[dict[str, str]] = [
    {"value": "", "label": "Default — Terracotta"},
    {"value": "corporate", "label": "Corporate — Blue"},
    {"value": "forest", "label": "Forest — Earth"},
    {"value": "ocean", "label": "Ocean — Teal"},
    {"value": "minimal", "label": "Minimal — Mono"},
    {"value": "violet", "label": "Violet — Royal"},
]


def nav_context() -> dict[str, object]:
    """Return the navigation context injected into every page render."""
    return {
        "sidebar_groups": SIDEBAR_GROUPS,
        "component_names": COMPONENT_NAMES,
        "page_names": PAGE_NAMES,
        "component_descriptions": COMPONENT_DESCRIPTIONS,
        "page_descriptions": PAGE_DESCRIPTIONS,
        "theme_options": THEME_OPTIONS,
    }
