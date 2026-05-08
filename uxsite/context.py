"""Sidebar navigation data and shared context for every view in the docs site.

The structure mirrors the canonical ``index.html`` reference: a hierarchical
list of groups, each with a label and a flat list of items keyed by the route
they point to. Hotframe's template engine receives this through the
``nav_context()`` helper which is spread into every ``TemplateResponse``.

Items list shape::

    {"label": "button", "href": "/c/button", "icon": <svg path>}
"""

from __future__ import annotations


# Single SVG path-d strings reused across the sidebar — keeps the layout
# compact without bringing in a heavyweight icon set.
ICON: dict[str, str] = {
    "home": "M3 11l9-8 9 8v9a2 2 0 0 1-2 2h-4v-7H9v7H5a2 2 0 0 1-2-2z",
    "install": "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3",
    "live": "M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83",
    "cube": "M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16zM3.3 7L12 12l8.7-5M12 22V12",
    "input": "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8",
    "nav": "M3 12h18M3 6h18M3 18h12",
    "modal": "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
    "feedback": "M12 9v4M12 17h0M10.3 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z",
    "table": "M3 3h18v18H3zM3 9h18M3 15h18M9 3v18M15 3v18",
    "page": "M3 3h18v18H3zM3 9h18M9 21V9",
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
    "topbar",
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
    "calendar",
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


# Sidebar layout — replicates the structure brief from the build doc.
SIDEBAR_GROUPS: list[dict] = [
    {
        "label": "Getting started",
        "items": [
            {"label": "Home", "href": "/", "icon": ICON["home"]},
            {"label": "Install", "href": "/install", "icon": ICON["install"]},
            {"label": "Datastar live", "href": "/live", "icon": ICON["live"], "badge": "live"},
        ],
    },
    {
        "label": "Core",
        "items": [
            {"label": name, "href": f"/c/{name}", "icon": ICON["cube"]}
            for name in (
                "button", "badge", "card", "chip", "avatar",
                "icon", "divider", "kpi", "spacer",
            )
        ],
    },
    {
        "label": "Inputs",
        "items": [
            {"label": name, "href": f"/c/{name}", "icon": ICON["input"]}
            for name in (
                "input", "textarea", "select", "field", "toggle", "check",
                "radio", "radio_card", "range", "slider",
                "datepicker", "timepicker", "dropzone", "combo", "search",
            )
        ],
    },
    {
        "label": "Navigation",
        "items": [
            {"label": name, "href": f"/c/{name}", "icon": ICON["nav"]}
            for name in ("breadcrumbs", "tabs", "tabbar", "topbar", "drawer")
        ],
    },
    {
        "label": "Overlays",
        "items": [
            {"label": name, "href": f"/c/{name}", "icon": ICON["modal"]}
            for name in ("modal", "tooltip", "toast")
        ],
    },
    {
        "label": "Feedback",
        "items": [
            {"label": name, "href": f"/c/{name}", "icon": ICON["feedback"]}
            for name in (
                "progress", "accordion", "list",
                "timeline", "empty", "states",
            )
        ],
    },
    {
        "label": "Data",
        "items": [
            {"label": name, "href": f"/c/{name}", "icon": ICON["table"]}
            for name in ("datatable", "calendar")
        ],
    },
    {
        "label": "Pages",
        "items": [
            {"label": name, "href": f"/p/{name}", "icon": ICON["page"]}
            for name in PAGE_NAMES
        ],
    },
    {
        "label": "Auth",
        "items": [
            {"label": "login-saas", "href": "/preview/auth/login-saas", "icon": ICON["input"]},
            {"label": "login-hub", "href": "/preview/auth/login-hub", "icon": ICON["input"]},
            {"label": "2fa-setup", "href": "/preview/auth/2fa-setup", "icon": ICON["input"]},
            {"label": "2fa-profile", "href": "/preview/auth/2fa-profile", "icon": ICON["input"]},
            {"label": "2fa-disable", "href": "/preview/auth/2fa-disable", "icon": ICON["input"]},
            {"label": "change-password", "href": "/preview/auth/change-password", "icon": ICON["input"]},
            {"label": "delete-account", "href": "/preview/auth/delete-account", "icon": ICON["input"]},
            {"label": "sessions", "href": "/preview/auth/sessions", "icon": ICON["input"]},
            {"label": "trusted-devices", "href": "/preview/auth/trusted-devices", "icon": ICON["input"]},
        ],
    },
    {
        "label": "Employees",
        "items": [
            {"label": "list", "href": "/preview/employees/list", "icon": ICON["page"]},
            {"label": "add", "href": "/preview/employees/add", "icon": ICON["page"]},
            {"label": "edit", "href": "/preview/employees/edit", "icon": ICON["page"]},
        ],
    },
    {
        "label": "Profile",
        "items": [
            {"label": "hub", "href": "/preview/profile/hub", "icon": ICON["page"]},
            {"label": "saas", "href": "/preview/profile/saas", "icon": ICON["page"]},
        ],
    },
    {
        "label": "Users",
        "items": [
            {"label": "list", "href": "/preview/users/list", "icon": ICON["page"]},
            {"label": "invite", "href": "/preview/users/invite", "icon": ICON["page"]},
        ],
    },
    {
        "label": "Errors",
        "items": [
            {"label": "404", "href": "/preview/errors/404", "icon": ICON["feedback"]},
            {"label": "500", "href": "/preview/errors/500", "icon": ICON["feedback"]},
            {"label": "403", "href": "/preview/errors/403", "icon": ICON["feedback"]},
            {"label": "405", "href": "/preview/errors/405", "icon": ICON["feedback"]},
            {"label": "unauthorized", "href": "/preview/errors/unauthorized", "icon": ICON["feedback"]},
            {"label": "bootstrap", "href": "/preview/errors/bootstrap", "icon": ICON["feedback"]},
            {"label": "bootstrap-detail", "href": "/preview/errors/bootstrap-detail", "icon": ICON["feedback"]},
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
