"""Live preview fixtures for each ux-jinja macro.

Each fixture is a small Jinja source string that renders against the same
environment the rest of the site uses, so the preview always matches the
HTML the consumer would actually get when calling the macro.

The fixtures are grouped — every component now ships at least two named
groups (Variants, Sizes, States, ...) so the detail page can show a card
per group. ``USAGE`` provides the canonical "how do I call this macro?"
snippet shown in the Usage tab.
"""

from __future__ import annotations

from pathlib import Path
from typing import Any

import ux_jinja
from jinja2 import Environment, FileSystemLoader, select_autoescape


# Each entry: list of {label, render} dicts. ``label`` is a section title
# rendered above the preview block; ``render`` is the raw Jinja source
# executed by the preview environment to produce the HTML.
EXAMPLES: dict[str, list[dict[str, str]]] = {
    "button": [
        {"label": "Variantes", "render": (
            '{% from "ui/button.jinja" import button %}'
            '<div class="ux-flex ux-wrap ux-gap-2 ux-items-center">'
            '{{ button("Continuar") }} '
            '{{ button("Secundario", variant="secondary") }} '
            '{{ button("Outline", variant="outline") }} '
            '{{ button("Ghost", variant="ghost") }} '
            '{{ button("Eliminar", variant="danger") }} '
            '{{ button("Aprender más", variant="link") }}'
            '</div>'
        )},
        {"label": "Tamaños", "render": (
            '{% from "ui/button.jinja" import button %}'
            '<div class="ux-flex ux-wrap ux-gap-2 ux-items-center">'
            '{{ button("Small", size="sm") }} '
            '{{ button("Medium") }} '
            '{{ button("Large", size="lg") }}'
            '</div>'
        )},
        {"label": "Con icono", "render": (
            '{% from "ui/button.jinja" import button %}'
            '<div class="ux-flex ux-wrap ux-gap-2 ux-items-center">'
            '{{ button("Nuevo ticket") }} '
            '{{ button("Exportar", variant="secondary") }}'
            '</div>'
        )},
        {"label": "Button group · segmentado", "render": (
            '<div class="ux-flex ux-wrap ux-gap-2 ux-items-center">'
            '<div class="ux-btn-group">'
            '<button data-active="true">Hoy</button>'
            '<button>7 días</button>'
            '<button>30 días</button>'
            '<button>90 días</button>'
            '</div>'
            '<div class="ux-btn-group">'
            '<button data-active="true">Lista</button>'
            '<button>Cuadrícula</button>'
            '</div>'
            '</div>'
        )},
        {"label": "Estados · deshabilitado y bloque", "render": (
            '{% from "ui/button.jinja" import button %}'
            '<div class="ux-flex ux-wrap ux-gap-2 ux-items-center">'
            '{{ button("Deshabilitado", disabled=True) }}'
            '</div>'
            '<div style="max-width:240px;margin-top:8px;">'
            '<div style="max-width:240px;"><button class="ux-btn ux-btn--primary ux-btn--block">Bloque · ancho completo</button></div>'
            '</div>'
        )},
        {"label": "Acción Datastar", "render": (
            '{% from "ui/button.jinja" import button %}'
            '<div data-signals=\'{"clicks": 0}\'>'
            '{{ button("Haz clic", on_click="$clicks = $clicks + 1") }} '
            '<span class="ux-badge ux-badge--brand" data-text="\'Clics: \' + $clicks">Clics: 0</span>'
            '</div>'
        )},
    ],
    "badge": [
        {"label": "Badge tonal", "render": (
            '{% from "ui/badge.jinja" import badge %}'
            '<div class="ux-flex ux-wrap ux-gap-2 ux-items-center">'
            '{{ badge("Default") }} '
            '{{ badge("Brand", variant="brand", dot=True) }} '
            '{{ badge("Activo", variant="ok", dot=True) }} '
            '{{ badge("Pendiente", variant="warn", dot=True) }} '
            '{{ badge("Error", variant="danger", dot=True) }} '
            '{{ badge("Info", variant="info", dot=True) }}'
            '</div>'
        )},
        {"label": "Badge solid", "render": (
            '{% from "ui/badge.jinja" import badge %}'
            '<div class="ux-flex ux-wrap ux-gap-2 ux-items-center">'
            '{{ badge("12", variant="solid") }} '
            '{{ badge("NUEVO", variant="solid-brand") }} '
            '{{ badge("3", size="sm") }}'
            '</div>'
        )},
        {"label": "Pill · estado", "render": (
            '<div class="ux-flex ux-wrap ux-gap-2 ux-items-center">'
            '<span class="ux-pill ux-pill--ok"><span class="ux-pill__dot"></span>En línea</span>'
            '<span class="ux-pill ux-pill--warn"><span class="ux-pill__dot"></span>Sincronizando</span>'
            '<span class="ux-pill ux-pill--danger"><span class="ux-pill__dot"></span>Desconectado</span>'
            '<span class="ux-pill ux-pill--brand"><span class="ux-pill__dot"></span>Producción</span>'
            '<span class="ux-pill ux-pill--info"><span class="ux-pill__dot"></span>Sandbox</span>'
            '</div>'
        )},
        {"label": "Chip · seleccionable y removible", "render": (
            '<div class="ux-flex ux-wrap ux-gap-2 ux-items-center">'
            '<button class="ux-chip" data-active="true">Bebidas</button>'
            '<button class="ux-chip">Café</button>'
            '<button class="ux-chip">Bocadillos</button>'
            '<span class="ux-chip">Filtro · Hoy <span class="ux-chip__remove">✕</span></span>'
            '</div>'
        )},
    ],
    "card": [
        {"label": "Default · con pie", "render": (
            '{% from "ui/card.jinja" import card, card_footer %}'
            '{% from "ui/button.jinja" import button %}'
            '{% call card(title="Terminal POS-04", subtitle="Sucursal Centro · Mostrador 2") %}'
            '<p style="margin:0;color:var(--ux-ink-2);font-size:13px;">Equipo activo desde las 08:00. Última sincronización hace 2 minutos.</p>'
            '{% call card_footer() %}'
            '<span class="ux-pill ux-pill--ok"><span class="ux-pill__dot"></span>En línea</span>'
            '{{ button("Abrir", variant="ghost", size="sm") }}'
            '{% endcall %}'
            '{% endcall %}'
        )},
        {"label": "Elevated y Flat", "render": (
            '{% from "ui/card.jinja" import card %}'
            '<div style="display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));width:100%;">'
            '{% call card(title="Card elevada", subtitle="Con sombra suave", elevated=True) %}'
            '<p style="margin:0;font-size:13px;color:var(--ux-ink-2);">Variante elevated. Útil sobre fondos planos.</p>'
            '{% endcall %}'
            '{% call card(title="Card flat", subtitle="Sin borde", flat=True) %}'
            '<p style="margin:0;font-size:13px;color:var(--ux-ink-2);">Variante flat: sin borde ni sombra.</p>'
            '{% endcall %}'
            '</div>'
        )},
        {"label": "Glass · sobre fondo decorado", "render": (
            '{% from "ui/card.jinja" import card %}'
            '<div style="background:radial-gradient(circle at 20% 20%,var(--ux-brand-soft),transparent 60%);padding:18px;border-radius:16px;">'
            '{% call card(title="Resumen del día", subtitle="Glass · sobre fondo decorado", glass=True) %}'
            '<p style="margin:0;font-size:13px;color:var(--ux-ink-2);">Usar solo cuando hay fondo con color detrás.</p>'
            '{% endcall %}'
            '</div>'
        )},
        {"label": "Interactiva · hover", "render": (
            '{% from "ui/card.jinja" import card %}'
            '<div style="display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));width:100%;">'
            '{% call card(title="Pasarela Stripe", interactive=True) %}'
            '<p style="margin:0;font-size:13px;color:var(--ux-ink-2);">Conectada · 12 cobros hoy · €1.840 procesados</p>'
            '{% endcall %}'
            '{% call card(title="Pasarela Adyen", interactive=True, flat=True) %}'
            '<p style="margin:0;font-size:13px;color:var(--ux-ink-3);">+ Conectar nueva integración</p>'
            '{% endcall %}'
            '</div>'
        )},
        {"label": "KPI · glass", "render": (
            '<div style="background:radial-gradient(circle at 20% 20%,var(--ux-brand-soft),transparent 60%);padding:18px;border-radius:16px;">'
            '<div class="ux-kpi ux-kpi--glass">'
            '<div class="ux-kpi__label">Glass KPI</div>'
            '<div class="ux-kpi__value">€12.480</div>'
            '<div class="ux-kpi__delta ux-kpi__delta--up">+4,8%</div>'
            '</div>'
            '</div>'
        )},
    ],
    "chip": [
        {"label": "Tones", "render": (
            '{% from "ui/chip.jinja" import chip %}'
            '<div class="ux-flex ux-wrap ux-gap-2">'
            '{{ chip("Default") }} '
            '{{ chip("Brand", variant="brand") }} '
            '{{ chip("Info", variant="info") }} '
            '{{ chip("Leaf", variant="leaf") }} '
            '{{ chip("Warn", variant="warn") }} '
            '{{ chip("Danger", variant="danger") }}'
            '</div>'
        )},
        {"label": "Activo y removible", "render": (
            '{% from "ui/chip.jinja" import chip %}'
            '<div class="ux-flex ux-wrap ux-gap-2">'
            '{{ chip("Activo", active=True, variant="brand") }} '
            '{{ chip("Filtrable", removable=True) }} '
            '{{ chip("Filtro · Hoy", variant="brand", removable=True) }}'
            '</div>'
        )},
        {"label": "Filter chips · togglables", "render": (
            '<div class="ux-filter-chips" data-signals=\'{"active": ["paid"]}\'>'
            '<button class="ux-filter-chip" data-class:is-active="$active.includes(\'all\')" data-on:click="$active = $active.includes(\'all\') ? $active.filter(x => x !== \'all\') : [...$active, \'all\']">'
            '<span class="ux-filter-chip__label">Todos</span>'
            '<span class="ux-filter-chip__count">42</span>'
            '<span class="ux-filter-chip__check"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 8 7 12 13 4"/></svg></span>'
            '</button>'
            '<button class="ux-filter-chip" data-class:is-active="$active.includes(\'paid\')" data-on:click="$active = $active.includes(\'paid\') ? $active.filter(x => x !== \'paid\') : [...$active, \'paid\']">'
            '<span class="ux-filter-chip__label">Pagados</span>'
            '<span class="ux-filter-chip__count">18</span>'
            '<span class="ux-filter-chip__check"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 8 7 12 13 4"/></svg></span>'
            '</button>'
            '<button class="ux-filter-chip" data-class:is-active="$active.includes(\'pending\')" data-on:click="$active = $active.includes(\'pending\') ? $active.filter(x => x !== \'pending\') : [...$active, \'pending\']">'
            '<span class="ux-filter-chip__label">Pendientes</span>'
            '<span class="ux-filter-chip__count">7</span>'
            '<span class="ux-filter-chip__check"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 8 7 12 13 4"/></svg></span>'
            '</button>'
            '</div>'
        )},
        {"label": "Toggle group · Datastar", "render": (
            '<div class="ux-toggle-group" data-signals=\'{"view": "list"}\'>'
            '<button class="ux-toggle-group__option" data-class:is-selected="$view === \'list\'" data-on:click="$view = \'list\'">Lista</button>'
            '<button class="ux-toggle-group__option" data-class:is-selected="$view === \'grid\'" data-on:click="$view = \'grid\'">Cuadrícula</button>'
            '<button class="ux-toggle-group__option" data-class:is-selected="$view === \'kanban\'" data-on:click="$view = \'kanban\'">Kanban</button>'
            '</div>'
        )},
    ],
    "avatar": [
        {"label": "Tamaños", "render": (
            '{% from "ui/avatar.jinja" import avatar %}'
            '<div class="ux-flex ux-wrap ux-gap-3 ux-items-center">'
            '{{ avatar("Ada Lovelace", size="xs") }} '
            '{{ avatar("Ada Lovelace", size="sm") }} '
            '{{ avatar("Ada Lovelace") }} '
            '{{ avatar("Ada Lovelace", size="lg") }} '
            '{{ avatar("Ada Lovelace", size="xl") }}'
            '</div>'
        )},
        {"label": "Variantes · imagen y brand", "render": (
            '{% from "ui/avatar.jinja" import avatar %}'
            '<div class="ux-flex ux-wrap ux-gap-3 ux-items-center">'
            '{{ avatar("Marc Riera") }} '
            '{{ avatar("Encargada", variant="brand") }} '
            '{{ avatar("Foto", src="https://i.pravatar.cc/64?img=11") }} '
            '{{ avatar("Grande", src="https://i.pravatar.cc/64?img=22", size="lg") }}'
            '</div>'
        )},
        {"label": "Status · online / busy / offline", "render": (
            '{% from "ui/avatar.jinja" import avatar %}'
            '<div class="ux-flex ux-wrap ux-gap-3 ux-items-center">'
            '{{ avatar("Online", status="online") }} '
            '{{ avatar("Busy", status="busy") }} '
            '{{ avatar("Offline", status="offline") }}'
            '</div>'
        )},
        {"label": "Stack · grupo de avatares", "render": (
            '{% from "ui/avatar.jinja" import avatar, avatar_stack %}'
            '{% call avatar_stack() %}'
            '{{ avatar("Ada Lovelace") }}'
            '{{ avatar("Alan Turing") }}'
            '{{ avatar("Grace Hopper") }}'
            '{{ avatar("+4") }}'
            '{% endcall %}'
        )},
        {"label": "Icon buttons", "render": (
            '<div class="ux-flex ux-wrap ux-gap-3 ux-items-center">'
            '<button class="ux-icon-btn" aria-label="Buscar">'
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>'
            '</button>'
            '<button class="ux-icon-btn" aria-pressed="true" aria-label="Favorito">'
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="m12 21-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.18L12 21z"/></svg>'
            '</button>'
            '<button class="ux-icon-btn ux-icon-btn--lg" aria-label="Más">'
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>'
            '</button>'
            '</div>'
        )},
    ],
    "divider": [
        {"label": "Horizontal", "render": (
            '{% from "ui/divider.jinja" import divider %}'
            '<div style="width:260px;">'
            '<p style="margin:0 0 6px;font-size:13px;color:var(--ux-ink-2);">Above the line.</p>'
            '{{ divider() }}'
            '<p style="margin:6px 0 0;font-size:13px;color:var(--ux-ink-2);">Below the line.</p>'
            '</div>'
        )},
        {"label": "Labelled", "render": (
            '{% from "ui/divider.jinja" import divider %}'
            '<div style="width:300px;">'
            '{{ divider(label="OR CONTINUE WITH") }}'
            '</div>'
        )},
    ],
    "kpi": [
        {"label": "KPI cards · grid", "render": (
            '{% from "ui/kpi.jinja" import kpi %}'
            '<div style="display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));width:100%;">'
            '{{ kpi(label="Ventas hoy", value="\\u20ac2.847", unit=",30", delta="+12,4% vs ayer", trend="up") }}'
            '{{ kpi(label="Tickets", value="147", delta="+8 vs media", trend="up") }}'
            '{{ kpi(label="Ticket medio", value="\\u20ac19", unit=",37", delta="\\u22122,1%", trend="down") }}'
            '{{ kpi(label="Margen", value="68", unit="%", delta="objetivo 70%", trend="flat", variant="brand") }}'
            '</div>'
        )},
        {"label": "Trend up", "render": (
            '{% from "ui/kpi.jinja" import kpi %}'
            '{{ kpi(label="Pedidos activos", value="1.284", delta="+12,4%", trend="up") }}'
        )},
        {"label": "Variantes de trend", "render": (
            '{% from "ui/kpi.jinja" import kpi %}'
            '<div style="display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));width:100%;">'
            '{{ kpi(label="Ingresos", value="48.2", unit=" k", delta="+8,1%", trend="up", variant="brand") }}'
            '{{ kpi(label="Devoluciones", value="312", delta="-2,0%", trend="down") }}'
            '{{ kpi(label="Objetivo", value="92%", delta="objetivo 95%", trend="flat") }}'
            '</div>'
        )},
    ],
    "input": [
        {"label": "Sizes", "render": (
            '{% from "ui/input.jinja" import input %}'
            '<div style="display:flex;gap:10px;flex-wrap:wrap;">'
            '{{ input("name1", placeholder="Small", size="sm") }}'
            '{{ input("name2", placeholder="Default") }}'
            '{{ input("name3", placeholder="Large", size="lg") }}'
            '</div>'
        )},
        {"label": "States", "render": (
            '{% from "ui/input.jinja" import input %}'
            '<div style="display:flex;gap:10px;flex-wrap:wrap;">'
            '{{ input("zip", value="ABC", invalid=True) }}'
            '{{ input("readonly", value="locked", disabled=True) }}'
            '</div>'
        )},
        {"label": "Datastar bind", "render": (
            '{% from "ui/input.jinja" import input %}'
            '<div data-signals=\'{"name": ""}\' style="display:flex;flex-direction:column;gap:8px;width:280px;">'
            '{{ input("name", placeholder="Type your name", value_signal="$name") }}'
            '<small style="font-size:12px;color:var(--ux-ink-3);" data-text="\'You typed: \' + $name">You typed: </small>'
            '</div>'
        )},
    ],
    "textarea": [
        {"label": "Default", "render": (
            '{% from "ui/textarea.jinja" import textarea %}'
            '<div style="width:300px;">'
            '{{ textarea("notes", placeholder="Write something...") }}'
            '</div>'
        )},
        {"label": "Invalid", "render": (
            '{% from "ui/textarea.jinja" import textarea %}'
            '<div style="width:300px;">'
            '{{ textarea("notes", value="Too short", invalid=True) }}'
            '</div>'
        )},
    ],
    "select": [
        {"label": "Default", "render": (
            '{% from "ui/select.jinja" import select %}'
            '{{ select("country", options=[("us", "United States"), ("es", "Spain"), ("fr", "France")], value="es") }}'
        )},
        {"label": "Sizes", "render": (
            '{% from "ui/select.jinja" import select %}'
            '<div style="display:flex;gap:10px;align-items:center;">'
            '{{ select("a", options=["A", "B", "C"], size="sm") }}'
            '{{ select("b", options=["A", "B", "C"]) }}'
            '{{ select("c", options=["A", "B", "C"], size="lg") }}'
            '</div>'
        )},
    ],
    "breadcrumbs": [
        {"label": "Default · chevron", "render": (
            '{% from "ui/breadcrumbs.jinja" import breadcrumbs %}'
            '{{ breadcrumbs(items=['
            '{"label": "ERPlora", "href": "/"},'
            '{"label": "Cafeteria La Rambla", "href": "/"},'
            '{"label": "Comercial", "href": "/"},'
            '{"label": "Pedido #FCT-2026-00184"}'
            ']) }}'
        )},
        {"label": "Slash + overflow", "render": (
            '{% from "ui/breadcrumbs.jinja" import breadcrumbs %}'
            '{{ breadcrumbs(items=['
            '{"label": "Inicio", "href": "/"},'
            '{"label": "Manufactura", "href": "/"},'
            '{"label": "Linea 04", "href": "/"},'
            '{"label": "Trazabilidad"}'
            ']) }}'
        )},
        {"label": "Chips · stack", "render": (
            '{% from "ui/breadcrumbs.jinja" import breadcrumbs %}'
            '{{ breadcrumbs(variant="chips", items=['
            '{"label": "Inventario", "href": "/"},'
            '{"label": "Almacenes", "href": "/"},'
            '{"label": "ALM-MAD-01", "href": "/"},'
            '{"label": "SKU 8743290"}'
            ']) }}'
        )},
        {"label": "En topbar · patron real", "render": (
            '{% from "ui/breadcrumbs.jinja" import breadcrumbs %}'
            '<div style="display:flex;align-items:center;gap:14px;padding:10px 16px;border-radius:10px;background:var(--ux-bg-1);border:1px solid var(--ux-line);">'
            '<button style="background:transparent;border:1px solid var(--ux-line);width:28px;height:28px;border-radius:6px;color:var(--ux-ink-2);">'
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>'
            '</button>'
            '{{ breadcrumbs(items=['
            '{"label": "Operacion", "href": "/"},'
            '{"label": "Tienda Eixample", "href": "/"},'
            '{"label": "Cierre de caja"}'
            ']) }}'
            '</div>'
        )},
    ],
    "tabs": [
        {"label": "Default · underline", "render": (
            '<div style="width:100%;" data-signals=\'{"tab": "resumen"}\'>'
            '<div class="ux-tabs" role="tablist">'
            '<button class="ux-tab" data-on:click="$tab = \'resumen\'" data-attr:aria-selected="$tab === \'resumen\'">Resumen</button>'
            '<button class="ux-tab" data-on:click="$tab = \'movimientos\'" data-attr:aria-selected="$tab === \'movimientos\'">Movimientos <span class="ux-tab-badge">128</span></button>'
            '<button class="ux-tab" data-on:click="$tab = \'conciliacion\'" data-attr:aria-selected="$tab === \'conciliacion\'">Conciliacion <span class="ux-tab-badge">3</span></button>'
            '<button class="ux-tab" data-on:click="$tab = \'auditoria\'" data-attr:aria-selected="$tab === \'auditoria\'">Auditoria</button>'
            '</div>'
            '<div style="padding:14px 4px;font-size:13px;color:var(--ux-ink-2);">Contenido del tab activo.</div>'
            '</div>'
        )},
        {"label": "Con iconos", "render": (
            '<div data-signals=\'{"tab": "vista"}\'>'
            '<div class="ux-tabs" role="tablist">'
            '<button class="ux-tab" data-on:click="$tab = \'vista\'" data-attr:aria-selected="$tab === \'vista\'">'
            '<svg class="ux-tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>'
            'Vista general</button>'
            '<button class="ux-tab" data-on:click="$tab = \'metricas\'" data-attr:aria-selected="$tab === \'metricas\'">'
            '<svg class="ux-tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="M7 14l4-4 4 4 5-5"/></svg>'
            'Metricas</button>'
            '<button class="ux-tab" data-on:click="$tab = \'equipo\'" data-attr:aria-selected="$tab === \'equipo\'">'
            '<svg class="ux-tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="7" r="4"/><path d="M5 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2"/></svg>'
            'Equipo</button>'
            '</div>'
            '</div>'
        )},
        {"label": "Pill · segmentado", "render": (
            '{% from "ui/tabs.jinja" import tabs %}'
            '<div data-signals=\'{"tab": "hoy"}\'>'
            '{{ tabs("demo_pill", variant="pill", items=['
            '{"label": "Hoy", "key": "hoy"},'
            '{"label": "7 dias", "key": "7d"},'
            '{"label": "30 dias", "key": "30d"},'
            '{"label": "Ano", "key": "ano"}'
            ']) }}'
            '</div>'
        )},
        {"label": "Vertical · sidebar de ajustes", "render": (
            '<div style="display:grid;grid-template-columns:200px 1fr;gap:0;" data-signals=\'{"tab": "general"}\'>'
            '<div class="ux-tabs ux-tabs--vertical" role="tablist" style="height:auto;">'
            '<button class="ux-tab" data-on:click="$tab = \'general\'" data-attr:aria-selected="$tab === \'general\'">General</button>'
            '<button class="ux-tab" data-on:click="$tab = \'facturacion\'" data-attr:aria-selected="$tab === \'facturacion\'">Facturacion <span class="ux-tab-badge">3</span></button>'
            '<button class="ux-tab" data-on:click="$tab = \'equipo\'" data-attr:aria-selected="$tab === \'equipo\'">Equipo</button>'
            '<button class="ux-tab" data-on:click="$tab = \'seguridad\'" data-attr:aria-selected="$tab === \'seguridad\'">Seguridad</button>'
            '</div>'
            '<div style="padding:14px;font-size:13px;color:var(--ux-ink-2);">Panel de configuracion.</div>'
            '</div>'
        )},
    ],
    "drawer": [
        {"label": "Abrir con signal", "render": (
            '{% from "ui/drawer.jinja" import drawer, drawer_footer %}'
            '{% from "ui/button.jinja" import button %}'
            '<div data-signals=\'{"showDrawerDemo": false}\'>'
            '{{ button("Abrir drawer", on_click="$showDrawerDemo = true") }}'
            '{% call drawer("$showDrawerDemo", title="Pedido #PED-2041", subtitle="Hoy - 14:22 - Marina Ribo") %}'
            '<p style="color:var(--ux-ink-2);font-size:13px;">Contenido del panel lateral.</p>'
            '{% call drawer_footer() %}'
            '{{ button("Imprimir", variant="ghost") }} '
            '{{ button("Reembolsar", variant="secondary") }}'
            '{% endcall %}'
            '{% endcall %}'
            '</div>'
        )},
        {"label": "Drawer derecha (detalle)", "render": (
            '<div style="position:relative;height:300px;background:var(--ux-bg-1);border:1px solid var(--ux-line);border-radius:14px;overflow:hidden;">'
            '<div class="ux-backdrop" style="position:absolute;"></div>'
            '<div class="ux-drawer-root" style="position:absolute;" data-state="open">'
            '<aside class="ux-drawer">'
            '<header class="ux-drawer__header">'
            '<div><div class="ux-drawer__title">Pedido #PED-2041</div><div class="ux-drawer__sub">Hoy - 14:22 - Marina Ribo</div></div>'
            '<button class="ux-drawer__close" aria-label="Cerrar">x</button>'
            '</header>'
            '<div class="ux-drawer__body"><p style="font-size:13px;color:var(--ux-ink-2);">Tabla de lineas y cronologia.</p></div>'
            '<footer class="ux-drawer__footer">'
            '<button class="ux-btn ux-btn--ghost">Imprimir</button>'
            '<button class="ux-btn ux-btn--secondary">Reembolsar</button>'
            '</footer>'
            '</aside>'
            '</div>'
            '</div>'
        )},
        {"label": "Drawer izquierda (filtros)", "render": (
            '<div style="position:relative;height:300px;background:var(--ux-bg-1);border:1px solid var(--ux-line);border-radius:14px;overflow:hidden;">'
            '<div class="ux-backdrop" style="position:absolute;"></div>'
            '<div class="ux-drawer-root" style="position:absolute;" data-state="open">'
            '<aside class="ux-drawer ux-drawer--left">'
            '<header class="ux-drawer__header">'
            '<div><div class="ux-drawer__title">Filtros</div><div class="ux-drawer__sub">3 activos</div></div>'
            '<button class="ux-drawer__close" aria-label="Cerrar">x</button>'
            '</header>'
            '<div class="ux-drawer__body"><p style="font-size:13px;color:var(--ux-ink-2);">Campos de filtro: estado, canal, importe.</p></div>'
            '<footer class="ux-drawer__footer">'
            '<button class="ux-btn ux-btn--ghost">Limpiar</button>'
            '<button class="ux-btn ux-btn--primary">Aplicar (3)</button>'
            '</footer>'
            '</aside>'
            '</div>'
            '</div>'
        )},
        {"label": "Bottom sheet mobile", "render": (
            '<div style="position:relative;height:300px;background:var(--ux-bg-1);border:1px solid var(--ux-line);border-radius:14px;overflow:hidden;">'
            '<div class="ux-backdrop" style="position:absolute;"></div>'
            '<div class="ux-drawer-root" style="position:absolute;" data-state="open">'
            '<aside class="ux-drawer ux-drawer--bottom" style="max-height:60%">'
            '<header class="ux-drawer__header" style="padding-top:18px">'
            '<div class="ux-drawer__title">Acciones rapidas</div>'
            '</header>'
            '<div class="ux-drawer__body">'
            '<div style="display:flex;flex-direction:column;">'
            '<button class="ux-menu__item">Duplicar pedido</button>'
            '<button class="ux-menu__item">Imprimir ticket</button>'
            '<button class="ux-menu__item ux-menu__item--danger">Anular pedido</button>'
            '</div>'
            '</div>'
            '</aside>'
            '</div>'
            '</div>'
        )},
    ],
    "modal": [
        {"label": "Confirmacion · abrir con signal", "render": (
            '{% from "ui/modal.jinja" import modal, modal_footer %}'
            '{% from "ui/button.jinja" import button %}'
            '<div data-signals=\'{"showDemoModal": false}\'>'
            '{{ button("Cerrar caja", on_click="$showDemoModal = true") }}'
            '{% call modal("$showDemoModal", title="Cerrar caja del turno?", subtitle="Se generara el resumen Z.", size="sm") %}'
            '{% call modal_footer() %}'
            '{{ button("Cancelar", variant="ghost", on_click="$showDemoModal = false") }} '
            '{{ button("Cerrar caja", on_click="$showDemoModal = false") }}'
            '{% endcall %}'
            '{% endcall %}'
            '</div>'
        )},
        {"label": "Modal sm confirmacion estatica", "render": (
            '<div style="position:relative;height:280px;background:var(--ux-bg-1);border:1px solid var(--ux-line);border-radius:14px;overflow:hidden;">'
            '<div class="ux-backdrop" style="position:absolute;"></div>'
            '<div class="ux-modal-root" style="position:absolute;" data-state="open">'
            '<div class="ux-modal ux-modal--sm">'
            '<div class="ux-modal__header">'
            '<div class="ux-modal__icon ux-modal__icon--brand"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg></div>'
            '<div class="ux-modal__heading"><h3 class="ux-modal__title">Cerrar caja del turno?</h3><p class="ux-modal__sub">Se generara el resumen Z.</p></div>'
            '<button class="ux-modal__close" aria-label="Cerrar">x</button>'
            '</div>'
            '<div class="ux-modal__footer">'
            '<button class="ux-btn ux-btn--ghost">Cancelar</button>'
            '<button class="ux-btn ux-btn--primary">Cerrar caja</button>'
            '</div>'
            '</div>'
            '</div>'
            '</div>'
        )},
        {"label": "Modal md formulario", "render": (
            '<div style="position:relative;height:360px;background:var(--ux-bg-1);border:1px solid var(--ux-line);border-radius:14px;overflow:hidden;">'
            '<div class="ux-backdrop" style="position:absolute;"></div>'
            '<div class="ux-modal-root" style="position:absolute;" data-state="open">'
            '<div class="ux-modal ux-modal--md">'
            '<div class="ux-modal__header">'
            '<div class="ux-modal__heading"><h3 class="ux-modal__title">Nuevo proveedor</h3><p class="ux-modal__sub">Datos basicos para registrar compras.</p></div>'
            '<button class="ux-modal__close" aria-label="Cerrar">x</button>'
            '</div>'
            '<div class="ux-modal__body">'
            '<div class="ux-form">'
            '<div class="ux-field"><label class="ux-field__label">Razon social</label><input class="ux-input" placeholder="Distribuciones Garcia SL"/></div>'
            '<div class="ux-field"><label class="ux-field__label">CIF</label><input class="ux-input" placeholder="B12345678"/></div>'
            '</div>'
            '</div>'
            '<div class="ux-modal__footer ux-modal__footer--between">'
            '<span style="font-size:11px;color:var(--ux-ink-3);">Borrador autoguardado</span>'
            '<div class="ux-flex ux-gap-2"><button class="ux-btn ux-btn--ghost">Cancelar</button><button class="ux-btn ux-btn--primary">Crear proveedor</button></div>'
            '</div>'
            '</div>'
            '</div>'
            '</div>'
        )},
        {"label": "Modal de peligro", "render": (
            '<div style="position:relative;height:260px;background:var(--ux-bg-1);border:1px solid var(--ux-line);border-radius:14px;overflow:hidden;">'
            '<div class="ux-backdrop" style="position:absolute;"></div>'
            '<div class="ux-modal-root" style="position:absolute;" data-state="open">'
            '<div class="ux-modal ux-modal--sm">'
            '<div class="ux-modal__header">'
            '<div class="ux-modal__icon ux-modal__icon--danger"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4M12 17h.01"/></svg></div>'
            '<div class="ux-modal__heading"><h3 class="ux-modal__title">Eliminar terminal POS-04</h3><p class="ux-modal__sub">Esta accion no se puede deshacer.</p></div>'
            '</div>'
            '<div class="ux-modal__footer">'
            '<button class="ux-btn ux-btn--ghost">Cancelar</button>'
            '<button class="ux-btn ux-btn--danger">Eliminar terminal</button>'
            '</div>'
            '</div>'
            '</div>'
            '</div>'
        )},
    ],
    "tooltip": [
        {"label": "Hover trigger", "render": (
            '{% from "ui/tooltip.jinja" import tooltip_trigger %}'
            '{% from "ui/button.jinja" import button %}'
            '{% call tooltip_trigger("This is a tooltip") %}'
            '{{ button("Hover me", variant="ghost") }}'
            '{% endcall %}'
        )},
    ],
    "toast": [
        {"label": "Variantes en stack", "render": (
            '{% from "ui/toast.jinja" import toast %}'
            '<div style="display:flex;flex-direction:column;gap:10px;width:100%;max-width:360px;">'
            '{{ toast(title="Pedido pagado", desc="PED-2041 - 124,50 via tarjeta", variant="ok", dismissible=True) }}'
            '{{ toast(title="Sincronizando inventario", desc="3 SKU pendientes - finalizara en 30s.", variant="info") }}'
            '{{ toast(title="Stock critico", desc="Leche desnatada - quedan 1 unidad.", variant="warn", dismissible=True) }}'
            '{{ toast(title="Pago rechazado", desc="El TPV devolvio fondos insuficientes.", variant="danger", dismissible=True) }}'
            '</div>'
        )},
        {"label": "Con accion · call-to-action", "render": (
            '{% from "ui/toast.jinja" import toast %}'
            '<div style="width:100%;max-width:360px;">'
            '{{ toast(title="Stock critico", desc="Cafe Brasil 1kg - quedan 4 unidades.", variant="warn") }}'
            '</div>'
        )},
        {"label": "Brand · notificacion positiva", "render": (
            '{% from "ui/toast.jinja" import toast %}'
            '<div style="width:100%;max-width:360px;">'
            '{{ toast(title="Nueva integracion disponible", desc="Conecta tu pasarela Adyen en 2 clics.", variant="brand") }}'
            '</div>'
        )},
        {"label": "Sin descripcion · compacto", "render": (
            '{% from "ui/toast.jinja" import toast %}'
            '<div style="width:100%;max-width:360px;">'
            '{{ toast(title="Cambios guardados", variant="ok") }}'
            '</div>'
        )},
    ],
    "progress": [
        {"label": "Linear · niveles de carga", "render": (
            '{% from "ui/progress.jinja" import progress %}'
            '<div style="display:flex;flex-direction:column;gap:14px;width:100%;max-width:480px;">'
            '{{ progress(value=73, label="Importando productos", value_text="1.842 / 2.500 - 73 %") }}'
            '{{ progress(value=42, label="Generando informe SII", value_text="42 %", variant="leaf") }}'
            '{{ progress(value=92, label="Cuota de almacenamiento", value_text="9,2 / 10 GB", variant="warn") }}'
            '</div>'
        )},
        {"label": "Indeterminate y striped", "render": (
            '{% from "ui/progress.jinja" import progress %}'
            '<div style="display:flex;flex-direction:column;gap:14px;width:100%;max-width:480px;">'
            '{{ progress(label="Subiendo factura escaneada", value_text="esperando...", indeterminate=True) }}'
            '{{ progress(value=58, label="Procesando lote L-2026-0341", value_text="en curso", size="lg", striped=True) }}'
            '</div>'
        )},
        {"label": "Segmentado · pasos de wizard", "render": (
            '<div style="width:100%;max-width:480px;">'
            '<div class="ux-progress-segments">'
            '<div class="ux-progress-segments__seg" data-state="done"></div>'
            '<div class="ux-progress-segments__seg" data-state="done"></div>'
            '<div class="ux-progress-segments__seg" data-state="done"></div>'
            '<div class="ux-progress-segments__seg" data-state="active"></div>'
            '<div class="ux-progress-segments__seg"></div>'
            '<div class="ux-progress-segments__seg"></div>'
            '<div class="ux-progress-segments__seg"></div>'
            '</div>'
            '<div style="display:flex;justify-content:space-between;margin-top:8px;font-size:12px;color:var(--ux-ink-3);">'
            '<span>Paso 4 / 7 - Configurar plan contable</span>'
            '<span>~3 min restantes</span>'
            '</div>'
            '</div>'
        )},
        {"label": "Spinner · tamanios y tones", "render": (
            '<div class="ux-flex ux-wrap ux-gap-4 ux-items-center">'
            '<span class="ux-spinner ux-spinner--xs"></span>'
            '<span class="ux-spinner ux-spinner--sm"></span>'
            '<span class="ux-spinner"></span>'
            '<span class="ux-spinner ux-spinner--md"></span>'
            '<span class="ux-spinner ux-spinner--lg"></span>'
            '<span class="ux-spinner ux-spinner--md ux-spinner--leaf"></span>'
            '<span class="ux-spinner ux-spinner--md ux-spinner--warn"></span>'
            '<span class="ux-spinner ux-spinner--md ux-spinner--danger"></span>'
            '<span class="ux-dots"><span class="ux-dots__d"></span><span class="ux-dots__d"></span><span class="ux-dots__d"></span></span>'
            '</div>'
        )},
        {"label": "Circular progress", "render": (
            '<div class="ux-flex ux-wrap ux-gap-4 ux-items-center">'
            '<div class="ux-circ" style="--ux-circ-size: 80px;">'
            '<svg viewBox="0 0 100 100"><circle class="ux-circ__track" cx="50" cy="50" r="44"/><circle class="ux-circ__bar" cx="50" cy="50" r="44" stroke-dasharray="276.46" stroke-dashoffset="69.1"/></svg>'
            '<span class="ux-circ__label ux-text-base">75 %</span>'
            '</div>'
            '<div class="ux-circ" style="--ux-circ-size: 80px; --ux-circ-fill: var(--ux-leaf);">'
            '<svg viewBox="0 0 100 100"><circle class="ux-circ__track" cx="50" cy="50" r="44"/><circle class="ux-circ__bar" cx="50" cy="50" r="44" stroke-dasharray="276.46" stroke-dashoffset="11"/></svg>'
            '<span class="ux-circ__label ux-text-base">96 %</span>'
            '</div>'
            '<div class="ux-circ" style="--ux-circ-size: 80px; --ux-circ-fill: var(--ux-warn);">'
            '<svg viewBox="0 0 100 100"><circle class="ux-circ__track" cx="50" cy="50" r="44"/><circle class="ux-circ__bar" cx="50" cy="50" r="44" stroke-dasharray="276.46" stroke-dashoffset="194"/></svg>'
            '<span class="ux-circ__label ux-text-base">30 %</span>'
            '</div>'
            '</div>'
        )},
    ],
    "accordion": [
        {"label": "Default · bordered", "render": (
            '{% from "ui/accordion.jinja" import accordion %}'
            '<div style="width:100%;max-width:540px;">'
            '{{ accordion("acc_demo", items=['
            '{"title": "Datos fiscales", "sub": "CIF, direccion facturacion, regimen IVA", "meta": "Completo", "body": "CIF B-65432109 - Cafeteria La Rambla S.L. - Carrer Provenca 287, Eixample.", "open": True},'
            '{"title": "Metodos de pago", "sub": "2 cuentas SEPA, 1 tarjeta", "meta": "3 activos", "body": "SEPA principal ES31 0049 1500 5126 1009 4283."},'
            '{"title": "Equipo y permisos", "meta": "9 miembros", "body": "9 usuarios activos repartidos en 4 roles personalizados."}'
            ']) }}'
            '</div>'
        )},
        {"label": "Ghost · FAQ", "render": (
            '{% from "ui/accordion.jinja" import accordion %}'
            '<div style="width:100%;max-width:540px;">'
            '{{ accordion("acc_faq", variant="ghost", items=['
            '{"title": "Como se calcula el coste medio del producto?", "body": "El coste medio (PMP) se recalcula cada vez que entra una compra.", "open": True},'
            '{"title": "Puedo migrar desde otro ERP?", "body": "Si. Soportamos importadores nativos para Holded, Sage 50, Contasol y A3 ERP."},'
            '{"title": "Hay app movil para mi equipo de campo?", "body": "App nativa iOS/Android para parte de horas, dietas, kilometraje y firma de albaranes."}'
            ']) }}'
            '</div>'
        )},
        {"label": "Cards · separados", "render": (
            '{% from "ui/accordion.jinja" import accordion %}'
            '<div style="width:100%;max-width:540px;">'
            '{{ accordion("acc_cards", variant="cards", items=['
            '{"title": "Configuracion inicial", "sub": "CIF, plan contable, ejercicio fiscal", "meta": "7/7", "body": "Empresa configurada: Cafeteria La Rambla S.L. ejercicio 2026.", "open": True},'
            '{"title": "Conciliacion bancaria", "sub": "Conexion PSD2 con BBVA, La Caixa y Sabadell", "meta": "3/4 cuentas", "body": "Falta refrescar el token de Banco Sabadell."},'
            '{"title": "Integraciones externas", "sub": "Stripe, Shopify, Google Workspace, Slack", "meta": "4 conectadas", "body": "Ultimo sync hace 2 minutos."}'
            ']) }}'
            '</div>'
        )},
        {"label": "Single (solo uno abierto)", "render": (
            '{% from "ui/accordion.jinja" import accordion %}'
            '<div style="width:100%;max-width:540px;">'
            '{{ accordion("acc_single", single=True, items=['
            '{"title": "Paso 1: instalar", "body": "Ejecuta el comando de instalacion.", "open": True},'
            '{"title": "Paso 2: registrar loader", "body": "Anade el directorio de templates."},'
            '{"title": "Paso 3: importar macros", "body": "Usa la sentencia from/import."}'
            ']) }}'
            '</div>'
        )},
    ],
    "list": [
        {"label": "Default · settings nav", "render": (
            '{% from "ui/list.jinja" import list %}'
            '<div style="width:100%;max-width:480px;">'
            '{{ list(items=['
            '{"title": "Perfil de empresa", "desc": "Cafeteria La Rambla S.L. - CIF B-65432109", "icon_tone": "brand", "href": "#", "active": True},'
            '{"title": "Facturacion y pagos", "desc": "Plan Business - proxima factura 31 may 2026", "href": "#"},'
            '{"title": "Seguridad", "desc": "3 miembros sin 2FA - revision recomendada", "icon_tone": "warn", "href": "#"},'
            '{"title": "Integraciones", "desc": "Stripe - Shopify - Slack - Google Workspace", "href": "#"}'
            ']) }}'
            '</div>'
        )},
        {"label": "Separated · cards notificaciones", "render": (
            '{% from "ui/list.jinja" import list %}'
            '<div style="width:100%;max-width:480px;">'
            '{{ list(variant="separated", items=['
            '{"title": "Pedido FCT-184 enviado", "desc": "Cliente: Restaurante El Caracol - 1.245,80", "icon_tone": "leaf", "aside": "hace 12 min", "href": "#"},'
            '{"title": "Nuevo mensaje de Marc Riera", "desc": "Sobre presupuesto P-2026-022 - pendiente revision tecnica", "icon_tone": "info", "aside": "14:38", "href": "#"},'
            '{"title": "Stock critico - Cafe Brasil 1kg", "desc": "Quedan 4 uds - minimo 25", "icon_tone": "danger", "aside": "15:02", "href": "#"}'
            ']) }}'
            '</div>'
        )},
        {"label": "Dense · ghost con atajos", "render": (
            '{% from "ui/list.jinja" import list %}'
            '<div style="width:100%;max-width:480px;">'
            '{{ list(variant="ghost", items=['
            '{"title": "Validar plan contable", "aside": "1"},'
            '{"title": "Confirmar direccion fiscal", "aside": "2"},'
            '{"title": "Invitar al equipo (minimo 1)", "aside": "3"},'
            '{"title": "Conectar al menos 1 cuenta bancaria", "aside": "4"}'
            ']) }}'
            '</div>'
        )},
        {"label": "Con avatar · equipo", "render": (
            '{% from "ui/list.jinja" import list %}'
            '<div style="width:100%;max-width:480px;">'
            '{{ list(items=['
            '{"title": "Joan Castell", "desc": "joan@larambla.es - activo hace 2 min", "aside": "Owner/Admin", "icon_tone": "brand"},'
            '{"title": "Marc Riera", "desc": "marc@larambla.es - activo hace 12 min", "aside": "Comercial"},'
            '{"title": "Pere Gallart", "desc": "pere@larambla.es - contabilidad", "aside": "Financiero"}'
            ']) }}'
            '</div>'
        )},
    ],
    "datatable": [
        {
            # Replica fiel del preview público: vista Tabla con toolbar
            # consolidada (search + 2 filters + date range + page size + view
            # toggle + IO + primary action) + tabla con avatares y badges.
            "label": "Vista tabla - toolbar consolidada en una linea",
            "render": '{% include "_previews/datatable_full.html" %}',
        },
        {
            "label": "Basico - macro datatable() con datos simples",
            "render": (
                '{% from "ui/datatable.jinja" import datatable %}'
                '{{ datatable("dt_simple", '
                "columns=[{'key':'name','label':'Producto','sortable':True}, "
                "{'key':'qty','label':'Cant.','align':'right'}, "
                "{'key':'sku','label':'SKU'}], "
                "rows=[{'name':'Cafe arabica','qty':12,'sku':'CA-01'}, "
                "{'name':'Cafe robusta','qty':5,'sku':'CA-04'}, "
                "{'name':'Te verde','qty':47,'sku':'TE-22'}, "
                "{'name':'Mate','qty':9,'sku':'MA-08'}], "
                'search_placeholder="Buscar producto...", '
                "view_toggle=False, io_icons=False, "
                'primary_action={"label":"+ Nuevo"})'
                ' }}'
            ),
        },
        {
            "label": "Con filtros, fechas, view toggle y IO icons",
            "render": (
                '{% from "ui/datatable.jinja" import datatable %}'
                '{{ datatable("dt_full", '
                "columns=[{'key':'name','label':'Cliente','sortable':True}, "
                "{'key':'email','label':'Email'}, "
                "{'key':'role','label':'Rol'}, "
                "{'key':'state','label':'Estado'}], "
                "rows=[{'name':'Ada Lovelace','email':'ada@ex.com','role':'Admin','state':'activo'}, "
                "{'name':'Grace Hopper','email':'grace@ex.com','role':'Engineer','state':'invitado'}, "
                "{'name':'Linus Torvalds','email':'linus@ex.com','role':'Ops','state':'suspendido'}], "
                "filters=[{'name':'estado','label':'Todos los Estados','options':['Pagado','Procesando','Reembolso']}, "
                "{'name':'tipo','label':'Todos los tipos','options':['POS','Web','App']}], "
                "date_range={'label':'Rango de fechas','from_label':'01/10/25','to_label':'18/10/25'}, "
                'primary_action={"label":"+ Nuevo"})'
                ' }}'
            ),
        },
    ],
    "field": [
        {"label": "With hint", "render": (
            '{% from "ui/field.jinja" import field %}'
            '{% from "ui/input.jinja" import input %}'
            '<div style="width:280px;">'
            '{% call field(label="Email", hint="We never share it.") %}'
            '{{ input("email", placeholder="you@example.com") }}'
            '{% endcall %}'
            '</div>'
        )},
        {"label": "Required with error", "render": (
            '{% from "ui/field.jinja" import field %}'
            '{% from "ui/input.jinja" import input %}'
            '<div style="width:280px;">'
            '{% call field(label="ZIP", required=True, error="ZIP is required.") %}'
            '{{ input("zip", invalid=True) }}'
            '{% endcall %}'
            '</div>'
        )},
    ],
    "toggle": [
        {"label": "Default", "render": (
            '{% from "ui/toggle.jinja" import toggle %}'
            '<div data-signals=\'{"notifs": true}\' style="display:flex;gap:14px;align-items:center;">'
            '{{ toggle("notifs", value_signal="$notifs") }}'
            '<span style="font-size:13px;color:var(--ux-ink-2);" data-text="$notifs ? \'Notifications on\' : \'Notifications off\'">Notifications on</span>'
            '</div>'
        )},
        {"label": "Sizes", "render": (
            '{% from "ui/toggle.jinja" import toggle %}'
            '<div style="display:flex;gap:14px;align-items:center;">'
            '{{ toggle("a", checked=True, size="sm") }}'
            '{{ toggle("b", checked=True) }}'
            '{{ toggle("c", checked=True, size="lg") }}'
            '</div>'
        )},
    ],
    "check": [
        {"label": "Group", "render": (
            '{% from "ui/check.jinja" import check %}'
            '<div class="ux-check-group">'
            '{{ check("a", label="Accept home delivery", checked=True) }}'
            '{{ check("b", label="Show prices with VAT") }}'
            '{{ check("c", label="Offline mode (disabled)", disabled=True) }}'
            '</div>'
        )},
        {"label": "Bound to signal", "render": (
            '{% from "ui/check.jinja" import check %}'
            '<div data-signals=\'{"agree": false}\' style="display:flex;gap:10px;align-items:center;">'
            '{{ check("agree", label="I agree", value_signal="$agree") }}'
            '<span style="font-size:13px;color:var(--ux-ink-3);" data-text="$agree ? \'agreed\' : \'pending\'">pending</span>'
            '</div>'
        )},
    ],
    "radio": [
        {"label": "Group inline", "render": (
            '{% from "ui/radio.jinja" import radio_group %}'
            '{{ radio_group("freq", options=[("m", "Monthly"), ("y", "Yearly")], selected="y", inline=True) }}'
        )},
        {"label": "Single radios", "render": (
            '{% from "ui/radio.jinja" import radio %}'
            '<div class="ux-radio-group">'
            '{{ radio("size", "s", label="Small") }}'
            '{{ radio("size", "m", label="Medium", checked=True) }}'
            '{{ radio("size", "l", label="Large") }}'
            '</div>'
        )},
    ],
    "radio_card": [
        {"label": "Plans", "render": (
            '{% from "ui/radio_card.jinja" import radio_card %}'
            '<div style="display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));">'
            '{{ radio_card("plan", selected="grow", options=['
            "{'value': 'grow', 'title': 'Grow 49/mo', 'description': 'Up to 3 terminals.'}, "
            "{'value': 'scale', 'title': 'Scale 129/mo', 'description': 'Multi-store, full API.'}"
            ']) }}'
            '</div>'
        )},
    ],
    "range": [
        {"label": "Default", "render": (
            '{% from "ui/range.jinja" import range %}'
            '<div style="width:300px;">'
            '{{ range("vol", min=0, max=100, value=30) }}'
            '</div>'
        )},
        {"label": "Bound to signal", "render": (
            '{% from "ui/range.jinja" import range %}'
            '<div data-signals=\'{"vol": 50}\' style="width:300px;display:flex;flex-direction:column;gap:6px;">'
            '{{ range("vol", min=0, max=100, value_signal="$vol") }}'
            '<small style="font-size:12px;color:var(--ux-ink-3);" data-text="$vol + \' %\'">50 %</small>'
            '</div>'
        )},
    ],
    "slider": [
        {"label": "Variants", "render": (
            '{% from "ui/slider.jinja" import slider %}'
            '<div style="display:grid;gap:14px;width:300px;">'
            '{{ slider("a", value=20) }}'
            '{{ slider("b", value=50, variant="leaf") }}'
            '{{ slider("c", value=80, variant="warn") }}'
            '</div>'
        )},
    ],
    "datepicker": [
        {"label": "Default", "render": (
            '{% from "ui/datepicker.jinja" import datepicker %}'
            '{{ datepicker("dob", value="2026-05-08") }}'
        )},
    ],
    "timepicker": [
        {"label": "Default", "render": (
            '{% from "ui/timepicker.jinja" import timepicker %}'
            '{{ timepicker("opens", value="09:30") }}'
        )},
    ],
    "dropzone": [
        {"label": "Default", "render": (
            '{% from "ui/dropzone.jinja" import dropzone %}'
            '<div data-signals=\'{"drag": false}\' style="width:100%;max-width:520px;">'
            '{{ dropzone("upload", accept=".csv,.xlsx,.pdf", drag_signal="$drag", hint="CSV, XLSX, PDF up to 25 MB.") }}'
            '</div>'
        )},
    ],
    "combo": [
        {"label": "With selection", "render": (
            '{% from "ui/combo.jinja" import combo %}'
            '<div style="width:320px;">'
            '{{ combo("client", placeholder="Select client...", value="bravo", options=['
            "{'value': 'acme', 'label': 'Acme', 'meta': '12'}, "
            "{'value': 'bravo', 'label': 'Bravo'}, "
            "{'value': 'charlie', 'label': 'Charlie'}"
            ']) }}'
            '</div>'
        )},
    ],
    "search": [
        {"label": "With shortcut", "render": (
            '{% from "ui/search.jinja" import search %}'
            '<div style="width:360px;">'
            '{{ search("q", placeholder="Search products, customers, orders...", kbd="K") }}'
            '</div>'
        )},
        {"label": "Bound to signal", "render": (
            '{% from "ui/search.jinja" import search %}'
            '<div data-signals=\'{"q": ""}\' style="width:360px;display:flex;flex-direction:column;gap:6px;">'
            '{{ search("q", value_signal="$q") }}'
            '<small style="font-size:12px;color:var(--ux-ink-3);" data-text="\'Query: \' + $q">Query: </small>'
            '</div>'
        )},
    ],
    "timeline": [
        {"label": "Order lifecycle", "render": (
            '{% from "ui/timeline.jinja" import timeline %}'
            '<div style="width:100%;max-width:480px;">'
            '{{ timeline(items=['
            "{'title': 'Order created', 'time': '14:02', 'desc': '3 items 34.50', 'variant': 'brand'}, "
            "{'title': 'Sent to kitchen', 'time': '14:03', 'variant': 'info'}, "
            "{'title': 'Served and paid', 'time': '14:32', 'desc': 'Cash change 5.50', 'variant': 'leaf'}"
            ']) }}'
            '</div>'
        )},
        {"label": "Dense", "render": (
            '{% from "ui/timeline.jinja" import timeline %}'
            '<div style="width:100%;max-width:480px;">'
            '{{ timeline(dense=True, items=['
            "{'title': 'Elena approved proposal', 'time': '4 min ago', 'variant': 'leaf'}, "
            "{'title': 'Stock low: Coffee 1kg', 'time': '28 min ago', 'variant': 'warn'}, "
            "{'title': 'Login failed', 'time': '2 h ago', 'variant': 'danger'}"
            ']) }}'
            '</div>'
        )},
    ],
    "empty": [
        {"label": "Full empty state", "render": (
            '{% from "ui/empty.jinja" import empty %}'
            '{{ empty(title="No inventory movements", description="When you record stock entries or exits they will appear here.", action_label="New movement", action_href="#") }}'
        )},
        {"label": "Compact (in card)", "render": (
            '{% from "ui/empty.jinja" import empty %}'
            '{% from "ui/card.jinja" import card %}'
            '{% call card(title="Search") %}'
            '{{ empty(title="No results", description="Try a different term.", compact=True) }}'
            '{% endcall %}'
        )},
    ],
    "states": [
        {"label": "Loading", "render": (
            '{% from "ui/states.jinja" import loading_state %}'
            '{{ loading_state(message="Loading dashboard...", size="lg") }}'
        )},
        {"label": "Error", "render": (
            '{% from "ui/states.jinja" import error_state %}'
            '{{ error_state(title="Service unavailable", message="The backend is taking too long to respond.", code="502", retry_url="#", retry_label="Try again") }}'
        )},
        {"label": "Success", "render": (
            '{% from "ui/states.jinja" import success_state %}'
            '{{ success_state(title="Saved", message="Changes were applied.") }}'
        )},
    ],
    "calendar": [
        {"label": "Vista mensual mayo 2026", "render": (
            '{% from "ui/calendar.jinja" import calendar %}'
            "{{ calendar(year=2026, month=5, selected='2026-05-14', events=['2026-05-01', '2026-05-05', '2026-05-06', '2026-05-07', '2026-05-08', '2026-05-12', '2026-05-14', '2026-05-15', '2026-05-20', '2026-05-22', '2026-05-27']) }}"
        )},
        {"label": "Mini calendar selector de fecha", "render": (
            '<div class="ux-cal-mini" style="max-width:240px;">'
            '<header class="ux-cal-mini__head">'
            '<div class="ux-cal-mini__title">Mayo 2026</div>'
            '<div class="ux-cal__nav">'
            '<button class="ux-cal__nav-btn" style="width:22px;height:22px"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg></button>'
            '<button class="ux-cal__nav-btn" style="width:22px;height:22px"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg></button>'
            '</div>'
            '</header>'
            '<div class="ux-cal-mini__grid">'
            '<div class="ux-cal-mini__wd">L</div><div class="ux-cal-mini__wd">M</div><div class="ux-cal-mini__wd">X</div><div class="ux-cal-mini__wd">J</div><div class="ux-cal-mini__wd">V</div><div class="ux-cal-mini__wd">S</div><div class="ux-cal-mini__wd">D</div>'
            '<button class="ux-cal-mini__day ux-cal-mini__day--out">28</button>'
            '<button class="ux-cal-mini__day ux-cal-mini__day--out">29</button>'
            '<button class="ux-cal-mini__day ux-cal-mini__day--out">30</button>'
            '<button class="ux-cal-mini__day ux-cal-mini__day--has-event">1</button>'
            '<button class="ux-cal-mini__day">2</button>'
            '<button class="ux-cal-mini__day ux-cal-mini__day--has-event">5</button>'
            '<button class="ux-cal-mini__day ux-cal-mini__day--has-event">6</button>'
            '<button class="ux-cal-mini__day ux-cal-mini__day--today ux-cal-mini__day--has-event">7</button>'
            '<button class="ux-cal-mini__day ux-cal-mini__day--has-event">8</button>'
            '<button class="ux-cal-mini__day ux-cal-mini__day--has-event">12</button>'
            '<button class="ux-cal-mini__day ux-cal-mini__day--selected ux-cal-mini__day--has-event">14</button>'
            '<button class="ux-cal-mini__day ux-cal-mini__day--has-event">15</button>'
            '<button class="ux-cal-mini__day ux-cal-mini__day--has-event">20</button>'
            '<button class="ux-cal-mini__day ux-cal-mini__day--has-event">22</button>'
            '<button class="ux-cal-mini__day ux-cal-mini__day--has-event">27</button>'
            '<button class="ux-cal-mini__day">30</button>'
            '<button class="ux-cal-mini__day">31</button>'
            '<button class="ux-cal-mini__day ux-cal-mini__day--out">1</button>'
            '</div>'
            '</div>'
        )},
        {"label": "Con marca de hoy y seleccionado", "render": (
            '{% from "ui/calendar.jinja" import calendar %}'
            "{{ calendar(year=2026, month=5, selected='2026-05-14', events=['2026-05-07', '2026-05-12', '2026-05-14', '2026-05-27']) }}"
        )},
    ],
    "icon": [
        {"label": "Default", "render": (
            '{% from "ui/icon.jinja" import icon %}'
            '<div style="display:flex;gap:14px;align-items:center;font-size:14px;color:var(--ux-ink-2);">'
            '{{ icon("ion:home-outline") }} '
            '{{ icon("ion:settings-outline", size=24) }} '
            '{{ icon("ion:notifications-outline", size=28) }}'
            '</div>'
        )},
    ],
    "spacer": [
        {"label": "Sizes", "render": (
            '{% from "ui/spacer.jinja" import spacer %}'
            '<div style="display:flex;align-items:center;border:1px dashed var(--ux-line);padding:8px;">'
            '<span>A</span>{{ spacer(size="xs") }}<span>B</span>{{ spacer(size="md") }}<span>C</span>{{ spacer(size="xl") }}<span>D</span>'
            '</div>'
        )},
        {"label": "Block divider", "render": (
            '{% from "ui/spacer.jinja" import spacer %}'
            '<div style="width:240px;">'
            '<p style="margin:0;font-size:13px;color:var(--ux-ink-2);">Above.</p>'
            '{{ spacer(size="lg", block=True, divider=True) }}'
            '<p style="margin:0;font-size:13px;color:var(--ux-ink-2);">Below.</p>'
            '</div>'
        )},
    ],
    "topbar": [
        {"label": "Minimal", "render": (
            '{% from "ui/topbar.jinja" import topbar %}'
            '<div data-signals=\'{"sidebar": false}\'>'
            '{{ topbar(title="Dashboard") }}'
            '</div>'
        )},
        {"label": "With back button", "render": (
            '{% from "ui/topbar.jinja" import topbar %}'
            '<div data-signals=\'{"sidebar": false}\'>'
            '{{ topbar(title="Edit employee", back_href="/preview/employees/list") }}'
            '</div>'
        )},
        {"label": "With actions slot", "render": (
            '{% from "ui/topbar.jinja" import topbar %}'
            '<div data-signals=\'{"sidebar": false}\'>'
            '{% call topbar(title="Inbox") %}'
            '<button class="ux-icon-btn" aria-label="Notifications" type="button">'
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/></svg>'
            '</button>'
            '<span class="ux-pill ux-pill--ok"><span class="ux-pill__dot"></span>Online</span>'
            '<span class="ux-avatar ux-avatar--sm ux-avatar--brand">JC</span>'
            '{% endcall %}'
            '</div>'
        )},
        {"label": "No menu burger", "render": (
            '{% from "ui/topbar.jinja" import topbar %}'
            '{{ topbar(title="Settings", show_menu=False) }}'
        )},
    ],
    "tabbar": [
        {"label": "Default · Indicator · Pill · FAB · Phone shell", "render": (
            '{% include "_previews/tabbar_full.html" %}'
        )},
    ],
    # ------------------------------------------------------------------ shells
    "app_shell": [
        {"label": "Layout completo · sidebar + topbar", "render": (
            '{% from "ui/app_shell.jinja" import app_shell %}'
            '{% from "ui/sidebar.jinja" import sidebar %}'
            '{% from "ui/sidebar_item.jinja" import sidebar_item %}'
            '{% from "ui/topbar.jinja" import topbar %}'
            '{% call app_shell() %}'
            '{% call sidebar(brand_initials="ER", brand_name="ERPlora", brand_meta="3 sedes") %}'
            '{{ sidebar_item("Dashboard", href="/", active=True) }}'
            '{{ sidebar_item("Ventas", href="/ventas") }}'
            '{{ sidebar_item("Empleados", href="/empleados") }}'
            '{% endcall %}'
            '<div class="ux-app__main">'
            '<div data-signals=\'{"sidebar": false}\'>'
            '{{ topbar(title="Dashboard") }}'
            '</div>'
            '<div class="ux-app__body"><p style="color:var(--ux-ink-2);font-size:13px;">Contenido de la página.</p></div>'
            '</div>'
            '{% endcall %}'
        )},
        {"label": "Modo colapsado", "render": (
            '{% from "ui/app_shell.jinja" import app_shell %}'
            '{% from "ui/sidebar.jinja" import sidebar %}'
            '{% from "ui/sidebar_item.jinja" import sidebar_item %}'
            '{% from "ui/topbar.jinja" import topbar %}'
            '{% call app_shell(sidebar_state="collapsed") %}'
            '{% call sidebar(brand_initials="ER", brand_name="ERPlora", collapsed=True) %}'
            '{{ sidebar_item("Dashboard", href="/") }}'
            '{{ sidebar_item("Ventas", href="/ventas") }}'
            '{% endcall %}'
            '<div class="ux-app__main">'
            '<div data-signals=\'{"sidebar": false}\'>'
            '{{ topbar(title="Ventas") }}'
            '</div>'
            '<div class="ux-app__body"><p style="color:var(--ux-ink-2);font-size:13px;">Sidebar colapsado.</p></div>'
            '</div>'
            '{% endcall %}'
        )},
    ],
    "sidebar": [
        {"label": "Sidebar estándar", "render": (
            '{% from "ui/sidebar.jinja" import sidebar %}'
            '{% from "ui/sidebar_item.jinja" import sidebar_item %}'
            '{% call sidebar(brand_initials="ER", brand_name="ERPlora", brand_meta="3 sedes") %}'
            '{{ sidebar_item("Principal", group=True) }}'
            '{{ sidebar_item("Dashboard", href="/", active=True) }}'
            '{{ sidebar_item("Ventas", href="/ventas", badge="12", badge_variant="brand") }}'
            '{{ sidebar_item("Compras", href="/compras") }}'
            '{{ sidebar_item("Sistema", group=True) }}'
            '{{ sidebar_item("Configuración", href="/config") }}'
            '{% endcall %}'
        )},
        {"label": "Sidebar colapsado", "render": (
            '{% from "ui/sidebar.jinja" import sidebar %}'
            '{% from "ui/sidebar_item.jinja" import sidebar_item %}'
            '{% call sidebar(brand_initials="ER", collapsed=True) %}'
            '{{ sidebar_item("Dashboard", href="/", active=True) }}'
            '{{ sidebar_item("Ventas", href="/ventas") }}'
            '{{ sidebar_item("Inventario", href="/inventario") }}'
            '{% endcall %}'
        )},
    ],
    "sidebar_item": [
        {"label": "Variantes", "render": (
            '{% from "ui/sidebar_item.jinja" import sidebar_item %}'
            '<nav style="width:240px;background:var(--ux-surface);border:1px solid var(--ux-line);border-radius:10px;padding:8px;">'
            '{{ sidebar_item("Grupo de navegación", group=True) }}'
            '{{ sidebar_item("Dashboard", href="/", active=True) }}'
            '{{ sidebar_item("Ventas", href="/ventas") }}'
            '{{ sidebar_item("Bandeja", href="/inbox", badge="7", badge_variant="brand") }}'
            '</nav>'
        )},
    ],
    "mobile_shell": [
        {"label": "Shell móvil con tabbar", "render": (
            '{% from "ui/mobile_shell.jinja" import mobile_shell %}'
            '{% call mobile_shell('
            '  brand_initials="ER", brand_name="ERPlora", brand_meta="Demo",\n'
            '  nav_items=['
            '    {"label": "Inicio", "href": "/"},'
            '    {"label": "Ventas", "href": "/ventas"},'
            '    {"label": "Perfil", "href": "/me"}'
            '  ],\n'
            '  current_path="/") %}'
            '<p style="padding:16px;font-size:13px;color:var(--ux-ink-2);">Contenido de la app móvil.</p>'
            '{% endcall %}'
        )},
    ],
    # ------------------------------------------------------------------ navigation extras
    "pill": [
        {"label": "Variantes de estado", "render": (
            '{% from "ui/pill.jinja" import pill %}'
            '<div class="ux-flex ux-wrap ux-gap-2">'
            '{{ pill("En línea", variant="ok") }}'
            '{{ pill("Sincronizando", variant="warn") }}'
            '{{ pill("Desconectado", variant="danger") }}'
            '{{ pill("Producción", variant="brand") }}'
            '{{ pill("Sandbox", variant="info") }}'
            '{{ pill("Neutro") }}'
            '</div>'
        )},
        {"label": "Sin punto", "render": (
            '{% from "ui/pill.jinja" import pill %}'
            '<div class="ux-flex ux-wrap ux-gap-2">'
            '{{ pill("Activo", variant="ok", dot=False) }}'
            '{{ pill("Beta", variant="brand", dot=False) }}'
            '{{ pill("Deprecado", variant="danger", dot=False) }}'
            '</div>'
        )},
    ],
    "tabbar_item": [
        {"label": "Items con señal Datastar", "render": (
            '{% from "ui/tabbar_item.jinja" import tabbar_item %}'
            '<nav class="ux-tabbar" style="position:static;box-shadow:none;border:1px solid var(--ux-line);border-radius:12px;">'
            '<div data-signals=\'{"tab": "home"}\'>'
            '{{ tabbar_item("Inicio", tab_signal="$tab", tab_key="home",'
            '  icon_svg=\'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>\') }}'
            '{{ tabbar_item("Ventas", tab_signal="$tab", tab_key="sales", badge="3",'
            '  icon_svg=\'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>\') }}'
            '{{ tabbar_item("Perfil", tab_signal="$tab", tab_key="me",'
            '  icon_svg=\'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>\') }}'
            '</div>'
            '</nav>'
        )},
    ],
    "view_toggle": [
        {"label": "Lista / Cuadrícula", "render": (
            '{% from "ui/view_toggle.jinja" import view_toggle %}'
            '<div data-signals=\'{"view": "table"}\'>'
            '{{ view_toggle("$view", views=['
            '  {"key": "table", "title": "Vista lista",'
            '   "svg": \'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>\'},'
            '  {"key": "grid", "title": "Vista cuadrícula",'
            '   "svg": \'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>\'}'
            ']) }}'
            '</div>'
        )},
    ],
    "icon_btn": [
        {"label": "Variantes", "render": (
            '{% from "ui/icon_btn.jinja" import icon_btn %}'
            '<div class="ux-flex ux-gap-2 ux-items-center">'
            '{% call icon_btn(label="Editar") %}'
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>'
            '{% endcall %}'
            '{% call icon_btn(label="Eliminar", variant="danger") %}'
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6M9 6V4h6v2"/></svg>'
            '{% endcall %}'
            '{% call icon_btn(label="Notificaciones", variant="brand") %}'
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/></svg>'
            '{% endcall %}'
            '</div>'
        )},
        {"label": "Tamaños", "render": (
            '{% from "ui/icon_btn.jinja" import icon_btn %}'
            '<div class="ux-flex ux-gap-2 ux-items-center">'
            '{% call icon_btn(label="Pequeño", size="sm") %}'
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>'
            '{% endcall %}'
            '{% call icon_btn(label="Normal") %}'
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>'
            '{% endcall %}'
            '{% call icon_btn(label="Grande", size="lg") %}'
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>'
            '{% endcall %}'
            '</div>'
        )},
    ],
    "dt_toolbar": [
        {"label": "Toolbar completa", "render": (
            '{% from "ui/dt_toolbar.jinja" import dt_toolbar %}'
            '{% from "ui/search.jinja" import search %}'
            '{% from "ui/select.jinja" import select %}'
            '{% from "ui/date_range.jinja" import date_range %}'
            '{% from "ui/view_toggle.jinja" import view_toggle %}'
            '{% from "ui/icon_btn.jinja" import icon_btn %}'
            '<div data-signals=\'{"q": "", "estado": "", "view": "table"}\'>'
            '{% call dt_toolbar() %}'
            '{{ search("q", placeholder="Buscar pedidos...", value_signal="$q") }}'
            '{{ select("estado", options=[("", "Todos"), ("paid", "Pagado"), ("pending", "Pendiente")], value_signal="$estado") }}'
            '{{ date_range(from_value="2026-05-01", to_value="2026-05-31") }}'
            '<div class="ux-dt-toolbar__spacer"></div>'
            '<div class="ux-dt-toolbar__divider"></div>'
            '{{ view_toggle("$view", views=['
            '  {"key": "table", "title": "Lista", "svg": \'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>\'},'
            '  {"key": "grid", "title": "Cuadrícula", "svg": \'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>\'}'
            ']) }}'
            '{% call icon_btn(label="Exportar") %}'
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>'
            '{% endcall %}'
            '{% endcall %}'
            '</div>'
        )},
        {"label": "Toolbar simple", "render": (
            '{% from "ui/dt_toolbar.jinja" import dt_toolbar %}'
            '{% from "ui/search.jinja" import search %}'
            '{% from "ui/button.jinja" import button %}'
            '<div data-signals=\'{"q": ""}\'>'
            '{% call dt_toolbar() %}'
            '{{ search("q", placeholder="Buscar empleados...", value_signal="$q") }}'
            '<div class="ux-dt-toolbar__spacer"></div>'
            '{{ button("Nuevo empleado", variant="primary", size="sm") }}'
            '{% endcall %}'
            '</div>'
        )},
    ],
    "date_range": [
        {"label": "Rango de fechas", "render": (
            '{% from "ui/date_range.jinja" import date_range %}'
            '<div class="ux-flex ux-gap-3 ux-wrap">'
            '{{ date_range(from_value="01 may 2026", to_value="31 may 2026", title="Período") }}'
            '{{ date_range(from_value="2026-04-01", to_value="2026-04-30", icon=False) }}'
            '</div>'
        )},
    ],
    # ------------------------------------------------------------------ data viz
    "chart": [
        {"label": "Gráfico de barras", "render": (
            '{% from "ui/chart.jinja" import chart %}'
            '{% call chart(title="Ventas mensuales", sub="Últimos 6 meses", big="€48.320", delta="+12,4%", delta_dir="up") %}'
            '<div class="ux-chart__svg">'
            '<svg viewBox="0 0 300 100" width="100%" style="display:block;">'
            '<line class="ux-chart__grid" x1="0" y1="80" x2="300" y2="80" stroke="var(--ux-line)" stroke-width="1"/>'
            '<rect class="ux-chart__bar ux-chart__bar--leaf" x="10" y="40" width="30" height="40"/>'
            '<rect class="ux-chart__bar ux-chart__bar--leaf" x="55" y="25" width="30" height="55"/>'
            '<rect class="ux-chart__bar ux-chart__bar--leaf" x="100" y="50" width="30" height="30"/>'
            '<rect class="ux-chart__bar ux-chart__bar--leaf" x="145" y="15" width="30" height="65"/>'
            '<rect class="ux-chart__bar ux-chart__bar--leaf" x="190" y="35" width="30" height="45"/>'
            '<rect class="ux-chart__bar ux-chart__bar--brand" x="235" y="10" width="30" height="70"/>'
            '</svg>'
            '</div>'
            '<div class="ux-chart__legend">'
            '<span class="ux-chart__legend-item"><span class="ux-chart__legend-dot" style="background:var(--ux-leaf)"></span>2026</span>'
            '</div>'
            '{% endcall %}'
        )},
        {"label": "Gráfico de línea", "render": (
            '{% from "ui/chart.jinja" import chart %}'
            '{% call chart(title="Pedidos diarios", sub="Esta semana", big="284", delta="-3%", delta_dir="down", flat=True) %}'
            '<div class="ux-chart__svg">'
            '<svg viewBox="0 0 300 80" width="100%" style="display:block;">'
            '<polyline class="ux-chart__line ux-chart__line--info" fill="none" stroke="var(--ux-info)" stroke-width="2" points="0,60 50,40 100,55 150,20 200,35 250,15 300,25"/>'
            '</svg>'
            '</div>'
            '{% endcall %}'
        )},
    ],
    "stat": [
        {"label": "KPIs de negocio", "render": (
            '{% from "ui/stat.jinja" import stat %}'
            '{{ stat(items=['
            '  {"label": "Ventas hoy", "value": "€12.480", "delta": "+8,3%", "delta_dir": "up"},'
            '  {"label": "Pedidos", "value": "143", "delta": "+12", "delta_dir": "up"},'
            '  {"label": "Devoluciones", "value": "4", "delta": "-2", "delta_dir": "down"},'
            '  {"label": "Ticket medio", "value": "€87,27"}'
            ']) }}'
        )},
        {"label": "Glass · sobre fondo de color", "render": (
            '{% from "ui/stat.jinja" import stat %}'
            '<div style="background:radial-gradient(circle at 20% 20%,var(--ux-brand-soft),transparent 60%);padding:18px;border-radius:16px;">'
            '{{ stat(items=['
            '  {"label": "Ingresos", "value": "€48.320", "delta": "+12,4%", "delta_dir": "up"},'
            '  {"label": "Margen", "value": "34,2%", "delta": "+1,1%", "delta_dir": "up"},'
            '  {"label": "Clientes", "value": "1.204"}'
            '], glass=True) }}'
            '</div>'
        )},
    ],
    "inline_feedback": [
        {"label": "Banners de estado", "render": (
            '{% from "ui/inline_feedback.jinja" import banner %}'
            '<div style="display:flex;flex-direction:column;gap:8px;">'
            '{{ banner(title="Información", msg="Tu plan se renueva el 1 de junio.", variant="info", closeable=True) }}'
            '{{ banner(title="Guardado", msg="Los cambios se han aplicado correctamente.", variant="ok") }}'
            '{{ banner(title="Atención", msg="Quedan 3 días para que venza tu suscripción.", variant="warn", action_label="Renovar", action_href="#") }}'
            '{{ banner(title="Error", msg="No se pudo conectar con el servidor.", variant="danger", closeable=True) }}'
            '</div>'
        )},
        {"label": "Callouts compactos", "render": (
            '{% from "ui/inline_feedback.jinja" import callout %}'
            '<div style="display:flex;flex-direction:column;gap:8px;">'
            '{{ callout("Este campo es obligatorio para VeriFactu.", variant="warn", title="Aviso") }}'
            '{{ callout("Operación completada. Puedes cerrar esta ventana.", variant="ok") }}'
            '{{ callout("Modo sandbox activo — los cobros no son reales.", variant="info") }}'
            '</div>'
        )},
    ],
    "tree": [
        {"label": "Árbol de categorías", "render": (
            '{% from "ui/tree.jinja" import tree %}'
            '{{ tree("cats", nodes=['
            '  {"label": "Bebidas", "open": True, "children": ['
            '    {"label": "Refrescos", "is_leaf": True},'
            '    {"label": "Zumos", "is_leaf": True, "selected": True}'
            '  ]},'
            '  {"label": "Alimentación", "children": ['
            '    {"label": "Panadería", "is_leaf": True},'
            '    {"label": "Lácteos", "is_leaf": True}'
            '  ]},'
            '  {"label": "Limpieza", "is_leaf": True}'
            ']) }}'
        )},
        {"label": "Árbol compacto", "render": (
            '{% from "ui/tree.jinja" import tree %}'
            '{{ tree("files", dense=True, nodes=['
            '  {"label": "src", "open": True, "children": ['
            '    {"label": "main.py", "is_leaf": True, "selected": True},'
            '    {"label": "utils.py", "is_leaf": True}'
            '  ]},'
            '  {"label": "tests", "children": ['
            '    {"label": "test_core.py", "is_leaf": True}'
            '  ]}'
            ']) }}'
        )},
    ],
    # ------------------------------------------------------------------ communication
    "chat": [
        {"label": "Interfaz de mensajes", "render": (
            '{% from "ui/chat.jinja" import chat %}'
            '{% call chat() %}'
            '<div class="ux-chat__list">'
            '<div class="ux-chat__search"><input type="text" placeholder="Buscar conversaciones..." style="width:100%;border:none;background:transparent;padding:8px;font-size:13px;outline:none;color:var(--ux-ink-1);"/></div>'
            '<div class="ux-chat__convs">'
            '<div class="ux-chat__conv ux-chat__conv--active">'
            '<div class="ux-chat__conv-avatar ux-avatar ux-avatar--sm ux-avatar--brand">AC</div>'
            '<div class="ux-chat__conv-body">'
            '<div class="ux-chat__conv-name">Ana García</div>'
            '<div class="ux-chat__conv-preview">¿El pedido ya salió?</div>'
            '</div>'
            '<div class="ux-chat__conv-meta"><span class="ux-chat__conv-time">14:32</span></div>'
            '</div>'
            '<div class="ux-chat__conv ux-chat__conv--unread">'
            '<div class="ux-chat__conv-avatar ux-avatar ux-avatar--sm ux-avatar--leaf">JM</div>'
            '<div class="ux-chat__conv-body">'
            '<div class="ux-chat__conv-name">Juan Martínez</div>'
            '<div class="ux-chat__conv-preview">Confirmado para las 16:00</div>'
            '</div>'
            '<div class="ux-chat__conv-meta"><span class="ux-chat__conv-time">13:05</span><span class="ux-chat__conv-badge">2</span></div>'
            '</div>'
            '</div>'
            '</div>'
            '<div class="ux-chat__thread">'
            '<div class="ux-chat__head">'
            '<div class="ux-chat__head-avatar ux-avatar ux-avatar--sm ux-avatar--brand">AC</div>'
            '<div class="ux-chat__head-info">'
            '<div class="ux-chat__head-name">Ana García</div>'
            '<div class="ux-chat__head-status ux-chat__head-status--online">En línea</div>'
            '</div>'
            '</div>'
            '<div class="ux-chat__messages">'
            '<div class="ux-chat__day">Hoy</div>'
            '<div class="ux-chat__msg">¿El pedido #1042 ya salió?</div>'
            '<div class="ux-chat__msg ux-chat__msg--mine">Sí, salió a las 14:00. Tracking: ES123456.</div>'
            '</div>'
            '</div>'
            '{% endcall %}'
        )},
    ],
    "cmdk": [
        {"label": "Paleta de comandos", "render": (
            '{% from "ui/cmdk.jinja" import cmdk %}'
            '<div data-signals=\'{"cmdkOpen": true, "cmdkQ": ""}\'>'
            '{% call cmdk(id="cmdk", placeholder="Buscar comandos...") %}'
            '<div class="ux-cmdk__group">Acciones recientes</div>'
            '<button class="ux-cmdk__item" aria-selected="true">'
            '<span class="ux-cmdk__item-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M12 5v14M5 12l7 7 7-7"/></svg></span>'
            '<span class="ux-cmdk__item-text"><span class="ux-cmdk__item-title">Crear factura</span><span class="ux-cmdk__item-sub">Módulo Ventas</span></span>'
            '<span class="ux-cmdk__item-shortcut">⌘N</span>'
            '</button>'
            '<button class="ux-cmdk__item">'
            '<span class="ux-cmdk__item-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg></span>'
            '<span class="ux-cmdk__item-text"><span class="ux-cmdk__item-title">Buscar cliente</span><span class="ux-cmdk__item-sub">CRM</span></span>'
            '</button>'
            '<div class="ux-cmdk__group">Navegación</div>'
            '<button class="ux-cmdk__item">'
            '<span class="ux-cmdk__item-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg></span>'
            '<span class="ux-cmdk__item-text"><span class="ux-cmdk__item-title">Dashboard</span></span>'
            '<span class="ux-cmdk__item-shortcut">G H</span>'
            '</button>'
            '{% endcall %}'
            '</div>'
        )},
    ],
    # ------------------------------------------------------------------ rich content
    "editor": [
        {"label": "Editor de texto enriquecido", "render": (
            '{% from "ui/editor.jinja" import editor %}'
            '{% call editor(name="body", placeholder="Escribe aquí...") %}'
            '<div class="ux-richtext__toolbar" role="toolbar">'
            '<button class="ux-richtext__btn is-active" title="Negrita"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/></svg></button>'
            '<button class="ux-richtext__btn" title="Cursiva"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><line x1="19" y1="4" x2="10" y2="4"/><line x1="14" y1="20" x2="5" y2="20"/><line x1="15" y1="4" x2="9" y2="20"/></svg></button>'
            '<button class="ux-richtext__btn" title="Subrayado"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"/><line x1="4" y1="21" x2="20" y2="21"/></svg></button>'
            '<div class="ux-richtext__divider"></div>'
            '<button class="ux-richtext__btn" title="Lista"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg></button>'
            '</div>'
            '<div class="ux-richtext__content" contenteditable="true" role="textbox" aria-multiline="true" data-placeholder="Escribe aquí...">Ejemplo de contenido <strong>enriquecido</strong> con el editor.</div>'
            '{% endcall %}'
        )},
    ],
    "multimedia": [
        {"label": "Galería de imágenes", "render": (
            '{% from "ui/multimedia.jinja" import gallery %}'
            '{{ gallery(items=['
            '  {"label": "Foto 1", "caption": "Portada", "selected": True},'
            '  {"label": "Foto 2", "caption": "Detalle"},'
            '  {"label": "Foto 3", "caption": "Empaque"},'
            '  {"label": "Foto 4", "caption": "Etiqueta"}'
            ']) }}'
        )},
        {"label": "Zona de subida + adjuntos", "render": (
            '{% from "ui/multimedia.jinja" import upload %}'
            '{{ upload(title="Arrastra archivos aquí", sub="PDF, JPG o PNG hasta 25 MB") }}'
            '<div class="ux-attachments" style="margin-top:12px;">'
            '<div class="ux-attachment">'
            '<span class="ux-attachment__icon ux-attachment__icon--pdf"></span>'
            '<div class="ux-attachment__body"><div class="ux-attachment__name">contrato_2026.pdf</div><small style="color:var(--ux-ink-3);">1,4 MB</small></div>'
            '</div>'
            '<div class="ux-attachment">'
            '<span class="ux-attachment__icon ux-attachment__icon--img"></span>'
            '<div class="ux-attachment__body"><div class="ux-attachment__name">foto_producto.jpg</div><small style="color:var(--ux-ink-3);">340 KB</small></div>'
            '</div>'
            '</div>'
        )},
    ],
    # ------------------------------------------------------------------ POS
    "pos_canvas": [
        {"label": "Canvas POS completo", "render": (
            '{% from "ui/pos_canvas.jinja" import pos_canvas %}'
            '{% call pos_canvas() %}'
            '<div class="ux-pos__main">'
            '<div class="ux-pos__cats">'
            '<button class="ux-pos__cat" data-active="true">Todos</button>'
            '<button class="ux-pos__cat">Bebidas</button>'
            '<button class="ux-pos__cat">Comida</button>'
            '</div>'
            '<div class="ux-pos__grid">'
            '<button class="ux-pos__product">'
            '<div class="ux-pos__product-img ux-pos__product-img--ph"></div>'
            '<div class="ux-pos__product-name">Café solo</div>'
            '<div class="ux-pos__product-price">€1,50</div>'
            '</button>'
            '<button class="ux-pos__product">'
            '<div class="ux-pos__product-img ux-pos__product-img--ph"></div>'
            '<div class="ux-pos__product-name">Bocadillo</div>'
            '<div class="ux-pos__product-price">€4,20</div>'
            '</button>'
            '<button class="ux-pos__product">'
            '<div class="ux-pos__product-img ux-pos__product-img--ph"></div>'
            '<div class="ux-pos__product-name">Zumo naranja</div>'
            '<div class="ux-pos__product-price">€2,80</div>'
            '</button>'
            '</div>'
            '</div>'
            '<aside class="ux-pos__aside">'
            '<div class="ux-pos__cart">'
            '<div class="ux-pos__cart-head"><span>Ticket actual</span><span class="ux-badge ux-badge--brand">2</span></div>'
            '<div class="ux-pos__lines">'
            '<div class="ux-pos__line"><span class="ux-pos__line-qty">2×</span><span class="ux-pos__line-name">Café solo</span><span class="ux-pos__line-price">€3,00</span></div>'
            '<div class="ux-pos__line"><span class="ux-pos__line-qty">1×</span><span class="ux-pos__line-name">Bocadillo</span><span class="ux-pos__line-price">€4,20</span></div>'
            '</div>'
            '<div class="ux-pos__total"><span>TOTAL</span><span>€7,20</span></div>'
            '</div>'
            '</aside>'
            '{% endcall %}'
        )},
    ],
    "pos_numpad": [
        {"label": "Teclado estándar", "render": (
            '{% from "ui/pos_numpad.jinja" import pos_numpad %}'
            '{{ pos_numpad(label="A cobrar · €7,20", value="€10,00") }}'
        )},
        {"label": "Diseño calculadora", "render": (
            '{% from "ui/pos_numpad.jinja" import pos_numpad %}'
            '{{ pos_numpad(label="Cantidad", value="0", layout="calc") }}'
        )},
    ],
    "pos_payment": [
        {"label": "Selección de método de pago", "render": (
            '{% from "ui/pos_payment.jinja" import pos_payment %}'
            '{{ pos_payment(total="€7,20", selected="card") }}'
        )},
        {"label": "Métodos personalizados", "render": (
            '{% from "ui/pos_payment.jinja" import pos_payment %}'
            '{{ pos_payment(total="€24,50", selected="cash", methods=['
            '  {"id": "cash", "name": "Efectivo", "sub": "Cambio automático",'
            '   "icon_svg": \'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="3"/></svg>\'},'
            '  {"id": "card", "name": "Tarjeta", "sub": "Visa · MC",'
            '   "icon_svg": \'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>\'}'
            ']) }}'
        )},
    ],
    # ------------------------------------------------------------------ domain
    "receipt": [
        {"label": "Ticket de venta", "render": (
            '{% from "ui/receipt.jinja" import receipt %}'
            '{{ receipt('
            '  title="ERPlora POS", sub="Sucursal Centro · #2041",'
            '  lines=['
            '    {"name": "2× Café solo", "price": "€3,00"},'
            '    {"name": "1× Bocadillo jamón", "price": "€4,20"},'
            '    {"name": "IVA 10%", "price": "€0,72", "divider_before": True}'
            '  ],'
            '  total="€7,92",'
            '  footer="Gracias por su visita · erplora.com"'
            ') }}'
        )},
        {"label": "Ticket mínimo", "render": (
            '{% from "ui/receipt.jinja" import receipt %}'
            '{{ receipt(title="Recibo simplificado", lines=['
            '  {"name": "Servicio consultoría", "price": "€350,00"},'
            '  {"name": "IVA 21%", "price": "€73,50", "divider_before": True}'
            '], total="€423,50") }}'
        )},
    ],
    "kds": [
        {"label": "Ticket cocina · activo", "render": (
            '{% from "ui/kds.jinja" import kds %}'
            '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;">'
            '{{ kds(order="M4 · #2041", source="Mesa · Ana", time="14:32",'
            '  items=['
            '    {"qty": 2, "name": "Café solo", "done": True},'
            '    {"qty": 1, "name": "Tarta de queso", "done": False},'
            '    {"qty": 1, "name": "Zumo naranja", "done": False}'
            '  ],'
            '  notes=["Sin azúcar en el café"]'
            ') }}'
            '{{ kds(order="B2 · #2042", source="Barra · Marcos", time="14:28",'
            '  items=['
            '    {"qty": 3, "name": "Cortado", "done": False}'
            '  ], status="late"'
            ') }}'
            '{{ kds(order="T1 · #2040", source="Terraza", time="14:15",'
            '  items=['
            '    {"qty": 2, "name": "Pizza Margarita", "done": True},'
            '    {"qty": 1, "name": "Ensalada mixta", "done": True}'
            '  ], status="ready"'
            ') }}'
            '</div>'
        )},
    ],
    "hr_card": [
        {"label": "Tarjetas de empleados", "render": (
            '{% from "ui/hr_card.jinja" import hr_card %}'
            '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;">'
            '{{ hr_card(name="Ana García", initials="AG", role="Directora de Ventas",'
            '  stats=['
            '    {"label": "Turno", "value": "09:00–18:00"},'
            '    {"label": "Horas", "value": "40 h/sem"},'
            '    {"label": "Vacaciones", "value": "12 días"}'
            '  ]'
            ') }}'
            '{{ hr_card(name="Juan Martínez", initials="JM", role="Técnico Soporte",'
            '  status="break", stats=['
            '    {"label": "Turno", "value": "12:00–20:00"},'
            '    {"label": "Horas", "value": "35 h/sem"}'
            '  ]'
            ') }}'
            '{{ hr_card(name="Sara López", initials="SL", role="Contable",'
            '  status="off", stats=['
            '    {"label": "Turno", "value": "–"},'
            '    {"label": "Vacaciones", "value": "Hoy"}'
            '  ]'
            ') }}'
            '</div>'
        )},
    ],
    "manufacturing_panel": [
        {"label": "Panel de orden de fabricación", "render": (
            '{% from "ui/manufacturing_panel.jinja" import manufacturing_panel %}'
            '{{ manufacturing_panel('
            '  wo_id="WO-2026-0184",'
            '  title="Mesa de roble 180×80",'
            '  sub="Línea 2 · Turno mañana · Resp: Carlos Vega",'
            '  produced=18, total=25,'
            '  bar_done=55, bar_running=17, bar_scrap=3,'
            '  steps=['
            '    {"name": "Corte de madera", "meta": "12 min", "status": "done"},'
            '    {"name": "Lijado fino", "meta": "8 min", "status": "active"},'
            '    {"name": "Barnizado", "meta": "20 min", "status": ""},'
            '    {"name": "Control de calidad", "meta": "5 min", "status": ""}'
            '  ]'
            ') }}'
        )},
    ],
    "commerce_card": [
        {"label": "Factura de venta", "render": (
            '{% from "ui/commerce_card.jinja" import commerce_card %}'
            '{{ commerce_card('
            '  number="F-2026-0184",'
            '  title="Factura",'
            '  date="09 may 2026",'
            '  due_date="09 jun 2026",'
            '  status="Pendiente",'
            '  from_name="ERPlora SL",'
            '  from_info="Calle Mayor 12, 28001 Madrid",'
            '  to_name="Acme Corporation SA",'
            '  to_info="Av. Diagonal 100, 08008 Barcelona",'
            '  lines=['
            '    {"concept": "Licencia Hub Anual", "qty": "1", "price": "€2.400,00", "discount": "–", "vat": "21%", "total": "€2.904,00"},'
            '    {"concept": "Módulo VeriFactu", "qty": "1", "price": "€299,00", "discount": "–", "vat": "21%", "total": "€361,79"}'
            '  ],'
            '  notes="Transferencia bancaria. IBAN: ES12 3456 7890 0000 0001"'
            ') }}'
        )},
    ],
    "kanban": [
        {"label": "Tablero de proyectos", "render": (
            '{% from "ui/kanban.jinja" import kanban, kcard %}'
            '{% call kanban() %}'
            '<div class="ux-kanban__col">'
            '<div class="ux-kanban__col-head">'
            '<span class="ux-kanban__col-dot ux-kanban__col-dot--info"></span>'
            '<span class="ux-kanban__col-title">Pendiente</span>'
            '<span class="ux-kanban__col-count">3</span>'
            '</div>'
            '<div class="ux-kanban__col-body">'
            '{% call kcard(title="Migrar base de datos", desc="Aurora → RDS multiregión", priority="high") %}'
            '<div class="ux-kcard__tags"><span class="ux-kcard__tag ux-kcard__tag--danger">Infra</span></div>'
            '{% endcall %}'
            '{% call kcard(title="Diseñar landing v2", priority="med") %}'
            '<div class="ux-kcard__tags"><span class="ux-kcard__tag ux-kcard__tag--brand">UX</span></div>'
            '{% endcall %}'
            '</div>'
            '</div>'
            '<div class="ux-kanban__col">'
            '<div class="ux-kanban__col-head">'
            '<span class="ux-kanban__col-dot ux-kanban__col-dot--warn"></span>'
            '<span class="ux-kanban__col-title">En progreso</span>'
            '<span class="ux-kanban__col-count">2</span>'
            '</div>'
            '<div class="ux-kanban__col-body">'
            '{% call kcard(title="Integración Stripe webhooks", desc="Manejo de eventos de pago", priority="crit") %}'
            '<div class="ux-kcard__tags"><span class="ux-kcard__tag ux-kcard__tag--leaf">Backend</span></div>'
            '{% endcall %}'
            '</div>'
            '</div>'
            '<div class="ux-kanban__col">'
            '<div class="ux-kanban__col-head">'
            '<span class="ux-kanban__col-dot ux-kanban__col-dot--leaf"></span>'
            '<span class="ux-kanban__col-title">Completado</span>'
            '<span class="ux-kanban__col-count">1</span>'
            '</div>'
            '<div class="ux-kanban__col-body">'
            '{% call kcard(title="Setup CI/CD GitHub Actions", priority="low") %}'
            '<div class="ux-kcard__tags"><span class="ux-kcard__tag ux-kcard__tag--info">DevOps</span></div>'
            '{% endcall %}'
            '</div>'
            '</div>'
            '{% endcall %}'
        )},
    ],
    # ── v2.1 macros (added 2026-05-09) ─────────────────────────────────
    "menu_btn": [
        {"label": "Default · suelto y dentro de un topbar", "render": (
            '{% from "ui/menu_btn.jinja" import menu_btn %}'
            '<div class="ux-flex ux-gap-3 ux-items-center" data-signals=\'{"open": false}\'>'
            '{{ menu_btn(label="Abrir menú", on_click="$open = !$open") }}'
            '<span class="ux-c-ink-3 ux-text-sm" data-text="$open ? \'menú abierto\' : \'menú cerrado\'">menú cerrado</span>'
            '</div>'
        )},
        {"label": "Mobile only — hidden ≥ desktop", "render": (
            '{% from "ui/menu_btn.jinja" import menu_btn %}'
            '{{ menu_btn(label="Abrir menú", mobile_only=True) }}'
        )},
    ],
    "table": [
        {"label": "Tabla básica", "render": (
            '{% from "ui/table.jinja" import table %}'
            '{{ table('
            '  columns=['
            '    {"key": "name", "label": "Cliente"},'
            '    {"key": "city", "label": "Ciudad"},'
            '    {"key": "amount", "label": "Importe", "align": "right"},'
            '  ],'
            '  rows=['
            '    {"name": "Acme S.L.", "city": "Madrid", "amount": "1.240,00 €"},'
            '    {"name": "Norden Bikes", "city": "Barcelona", "amount": "820,50 €"},'
            '    {"name": "Pulpo Cooperativa", "city": "Valencia", "amount": "415,00 €"},'
            '  ]) }}'
        )},
        {"label": "Densa · cabeceras ordenables", "render": (
            '{% from "ui/table.jinja" import table %}'
            '{{ table(dense=True,'
            '  columns=['
            '    {"key": "sku", "label": "SKU", "sortable": True, "sort": "ascending"},'
            '    {"key": "name", "label": "Producto", "sortable": True},'
            '    {"key": "stock", "label": "Stock", "align": "right"},'
            '  ],'
            '  rows=['
            '    {"sku": "A-001", "name": "Café 250 g", "stock": 124},'
            '    {"sku": "A-002", "name": "Café molido", "stock": 56, "selected": True},'
            '    {"sku": "B-110", "name": "Cápsulas mix", "stock": 12},'
            '  ]) }}'
        )},
    ],
    "sparkline": [
        {"label": "Variantes y tamaños", "render": (
            '{% from "ui/sparkline.jinja" import sparkline %}'
            '<div class="ux-flex ux-wrap ux-gap-3 ux-items-center">'
            '{{ sparkline([3,5,4,7,6,9,8,11,10,13], variant="up") }} '
            '{{ sparkline([12,10,11,8,9,6,7,4,3,2], variant="down") }} '
            '{{ sparkline([5,7,6,9,8,11,10,13,12,15], variant="brand", filled=True) }}'
            '</div>'
            '<div class="ux-flex ux-wrap ux-gap-3 ux-items-center" style="margin-top:14px;">'
            '{{ sparkline([3,5,4,7,6,9,8], variant="brand", size="sm") }} '
            '{{ sparkline([3,5,4,7,6,9,8,11,10], variant="brand") }} '
            '{{ sparkline([3,5,4,7,6,9,8,11,10,13,15,12], variant="brand", size="lg") }}'
            '</div>'
        )},
        {"label": "Embebido en una KPI", "render": (
            '{% from "ui/sparkline.jinja" import sparkline %}'
            '<div class="ux-card" style="max-width:260px;padding:14px;">'
            '<div class="ux-eyebrow ux-c-ink-3">Tickets · 7 días</div>'
            '<div class="ux-flex ux-items-end ux-gap-3" style="margin-top:6px;">'
            '<span style="font-family:var(--ux-font-display);font-size:24px;font-weight:600;">184</span>'
            '{{ sparkline([12,18,14,22,19,28,24], variant="up", size="lg", filled=True) }}'
            '</div>'
            '</div>'
        )},
    ],
    "otp": [
        {"label": "6 dígitos · default", "render": (
            '{% from "ui/otp.jinja" import otp %}'
            '<div data-signals=\'{"otp0":"","otp1":"","otp2":"","otp3":"","otp4":"","otp5":""}\'>'
            '{{ otp("code", length=6, value_signal="$otp") }}'
            '</div>'
        )},
        {"label": "Con separador y tamaño grande", "render": (
            '{% from "ui/otp.jinja" import otp %}'
            '{{ otp("code2", length=6, separator_at=3, size="lg") }}'
        )},
    ],
    "pinpad": [
        {"label": "POS PIN · 4 dígitos", "render": (
            '{% from "ui/pinpad.jinja" import pinpad %}'
            '<div data-signals=\'{"pin": ""}\' class="ux-flex ux-flex-col ux-items-center ux-gap-3">'
            '<div style="font-family:var(--ux-font-mono);font-size:22px;letter-spacing:8px;color:var(--ux-ink);min-height:28px;" data-text="\'•\'.repeat($pin.length).padEnd(4, \'_\')">____</div>'
            '{{ pinpad(value_signal="$pin", max_length=4) }}'
            '</div>'
        )},
    ],
    "rating": [
        {"label": "Interactivo · 0/5", "render": (
            '{% from "ui/rating.jinja" import rating %}'
            '<div data-signals=\'{"stars": 4}\'>'
            '{{ rating(value=4, value_signal="$stars", label="4 / 5") }}'
            '</div>'
        )},
        {"label": "Tamaños y readonly", "render": (
            '{% from "ui/rating.jinja" import rating %}'
            '<div class="ux-flex ux-flex-col ux-gap-2">'
            '{{ rating(value=5, size="sm", readonly=True) }}'
            '{{ rating(value=3, readonly=True) }}'
            '{{ rating(value=2, size="lg", readonly=True) }}'
            '</div>'
        )},
    ],
    "qty_stepper": [
        {"label": "Default · sm · lg", "render": (
            '{% from "ui/qty_stepper.jinja" import qty_stepper %}'
            '<div class="ux-flex ux-wrap ux-gap-3 ux-items-center" data-signals=\'{"q1":1,"q2":2,"q3":4}\'>'
            '{{ qty_stepper("q1", value=1, min=1, max=99, size="sm", value_signal="$q1") }}'
            '{{ qty_stepper("q2", value=2, min=0, max=99, value_signal="$q2") }}'
            '{{ qty_stepper("q3", value=4, min=0, max=99, size="lg", value_signal="$q3") }}'
            '</div>'
        )},
    ],
    "segment": [
        {"label": "Día · semana · mes · trimestre", "render": (
            '{% from "ui/segment.jinja" import segment %}'
            '<div data-signals=\'{"period": "week"}\'>'
            '{{ segment(options=[("day","Día"),("week","Semana"),("month","Mes"),("q","Trim.")], value_signal="$period", value_key="week") }}'
            '<div class="ux-c-ink-3 ux-text-sm" style="margin-top:10px;" data-text="\'Periodo activo: \' + $period">Periodo activo: week</div>'
            '</div>'
        )},
        {"label": "Tamaños", "render": (
            '{% from "ui/segment.jinja" import segment %}'
            '<div class="ux-flex ux-flex-col ux-gap-2">'
            '{{ segment(options=[("a","Lista"),("b","Cuadrícula")], size="sm", value_key="a") }}'
            '{{ segment(options=[("a","Lista"),("b","Cuadrícula")], value_key="a") }}'
            '{{ segment(options=[("a","Lista"),("b","Cuadrícula")], size="lg", value_key="a") }}'
            '</div>'
        )},
    ],
    "stepper": [
        {"label": "Horizontal · 4 pasos", "render": (
            '{% from "ui/stepper.jinja" import stepper %}'
            '{{ stepper(steps=['
            '  {"title": "Cuenta", "sub": "Email y nombre", "state": "done"},'
            '  {"title": "Empresa", "sub": "Datos fiscales", "state": "done"},'
            '  {"title": "Pago", "sub": "Tarjeta o transferencia", "state": "active"},'
            '  {"title": "Listo", "sub": "Confirmación"},'
            ']) }}'
        )},
        {"label": "Vertical · settings wizard", "render": (
            '{% from "ui/stepper.jinja" import stepper %}'
            '{{ stepper(vertical=True, steps=['
            '  {"title": "Conexión Stripe", "sub": "Onboarding completado", "state": "done"},'
            '  {"title": "Identidad fiscal", "sub": "DNI subido y verificado", "state": "done"},'
            '  {"title": "Cuenta bancaria", "sub": "Pendiente de validar", "state": "active"},'
            '  {"title": "Primer payout", "sub": "Tras la primera venta"},'
            ']) }}'
        )},
    ],
    "popover": [
        {"label": "Toggle · filtros rápidos", "render": (
            '{% from "ui/popover.jinja" import popover %}'
            '<div data-signals=\'{"pop": false}\' style="position:relative;display:inline-block;">'
            '<button class="ux-btn ux-btn--ghost" data-on:click="$pop = !$pop">Filtros</button>'
            '{% call popover(title="Filtrar pedidos", open_signal="$pop") %}'
            '<div class="ux-flex ux-flex-col ux-gap-2">'
            '<label class="ux-flex ux-items-center ux-gap-2"><input type="checkbox" class="ux-check"> Sólo facturados</label>'
            '<label class="ux-flex ux-items-center ux-gap-2"><input type="checkbox" class="ux-check"> Excluir devoluciones</label>'
            '<label class="ux-flex ux-items-center ux-gap-2"><input type="checkbox" class="ux-check"> Pendiente de cobro</label>'
            '</div>'
            '{% endcall %}'
            '</div>'
        )},
    ],
    "autocomplete": [
        {"label": "Buscar cliente", "render": (
            '{% from "ui/autocomplete.jinja" import autocomplete %}'
            '<div data-signals=\'{"q": "", "client": ""}\'>'
            '{{ autocomplete("client", placeholder="Empieza a escribir un cliente...",'
            '   query_signal="$q", value_signal="$client",'
            '   options=['
            '     {"value": "acme", "label": "Acme S.L.", "meta": "12 facturas"},'
            '     {"value": "norden", "label": "Norden Bikes", "meta": "Barcelona"},'
            '     {"value": "pulpo", "label": "Pulpo Cooperativa", "meta": "Valencia"},'
            '     {"value": "ojala", "label": "Ojalá Bar", "meta": "Madrid"},'
            '   ]) }}'
            '<div class="ux-c-ink-3 ux-text-sm" style="margin-top:10px;" data-text="\'Seleccionado: \' + ($client || \'—\')">Seleccionado: —</div>'
            '</div>'
        )},
    ],
    "color_picker": [
        {"label": "Paleta de marca", "render": (
            '{% from "ui/color_picker.jinja" import color_picker %}'
            '<div data-signals=\'{"brand": "#E8552A"}\'>'
            '{{ color_picker("brand_color",'
            '  swatches=["#E8552A","#1E3A8A","#2F5233","#0EA5E9","#7C3AED","#111827","#10B981","#F59E0B","#EF4444"],'
            '  value="#E8552A", value_signal="$brand") }}'
            '<div class="ux-c-ink-3 ux-text-sm" style="margin-top:10px;" data-text="\'Color activo: \' + $brand">Color activo: #E8552A</div>'
            '</div>'
        )},
    ],
    "currency": [
        {"label": "EUR · USD · GBP", "render": (
            '{% from "ui/currency.jinja" import currency %}'
            '<div class="ux-flex ux-flex-col ux-gap-3" style="max-width:280px;">'
            '{{ currency("amount_eur", value=1240.50, symbol="€") }}'
            '{{ currency("amount_usd", value=2199.00, symbol="$") }}'
            '{{ currency("amount_multi", value=550.00, currency_options=["EUR","USD","GBP","CHF"]) }}'
            '</div>'
        )},
    ],
    "phone": [
        {"label": "España · Francia · UK", "render": (
            '{% from "ui/phone.jinja" import phone %}'
            '<div class="ux-flex ux-flex-col ux-gap-3" style="max-width:280px;">'
            '{{ phone("p_es", value="612 345 678", dial="+34", flag="🇪🇸") }}'
            '{{ phone("p_fr", value="0 6 12 34 56 78", dial="+33", flag="🇫🇷") }}'
            '{{ phone("p_uk", value="07700 900 000", dial="+44", flag="🇬🇧") }}'
            '</div>'
        )},
    ],
}


# Canonical "how do I call this macro" snippet shown in the Usage tab.
USAGE: dict[str, str] = {
    "button": (
        '{% from "ui/button.jinja" import button %}\n'
        '{{ button("Continuar", variant="primary", on_click="@post(\'/save\')") }}'
    ),
    "badge": (
        '{% from "ui/badge.jinja" import badge %}\n'
        '{{ badge("Activo", variant="ok", dot=True) }}'
    ),
    "card": (
        '{% from "ui/card.jinja" import card, card_footer %}\n'
        '{% call card(title="Terminal POS-04", subtitle="Sucursal Centro") %}\n'
        '  <p>Body</p>\n'
        '  {% call card_footer() %}<small>Pie</small>{% endcall %}\n'
        '{% endcall %}'
    ),
    "chip": (
        '{% from "ui/chip.jinja" import chip %}\n'
        '{{ chip("Filtro", variant="brand", removable=True, on_remove="$filter = null") }}'
    ),
    "avatar": (
        '{% from "ui/avatar.jinja" import avatar %}\n'
        '{{ avatar("Ada Lovelace", size="lg", status="online") }}'
    ),
    "divider": (
        '{% from "ui/divider.jinja" import divider %}\n'
        '{{ divider(label="OR CONTINUE WITH") }}'
    ),
    "kpi": (
        '{% from "ui/kpi.jinja" import kpi %}\n'
        '{{ kpi(label="Ventas hoy", value="2.847", unit=",30", delta="+12,4%", trend="up") }}'
    ),
    "input": (
        '{% from "ui/input.jinja" import input %}\n'
        '{{ input("email", placeholder="you@example.com", value_signal="$email") }}'
    ),
    "textarea": (
        '{% from "ui/textarea.jinja" import textarea %}\n'
        '{{ textarea("notes", placeholder="Write something...", rows=5) }}'
    ),
    "select": (
        '{% from "ui/select.jinja" import select %}\n'
        '{{ select("country", options=[("us", "United States"), ("es", "Spain")], value="es") }}'
    ),
    "breadcrumbs": (
        '{% from "ui/breadcrumbs.jinja" import breadcrumbs %}\n'
        '{{ breadcrumbs(items=[\n'
        '  {"label": "Dashboard", "href": "/"},\n'
        '  {"label": "Componentes", "href": "/c"},\n'
        '  {"label": "Breadcrumbs"},\n'
        ']) }}'
    ),
    "tabs": (
        '{% from "ui/tabs.jinja" import tabs, tab_panel %}\n'
        '{{ tabs("settings", items=[\n'
        '  {"label": "General", "key": "gen"},\n'
        '  {"label": "Facturacion", "key": "bill"},\n'
        ']) }}\n'
        '{% call tab_panel("settings", "gen") %}<p>General</p>{% endcall %}\n'
        '{% call tab_panel("settings", "bill") %}<p>Facturacion</p>{% endcall %}'
    ),
    "drawer": (
        '{% from "ui/drawer.jinja" import drawer, drawer_footer %}\n'
        '<div data-signals=\'{"showDrawer": false}\'>\n'
        '  <button data-on:click="$showDrawer = true">Abrir</button>\n'
        '  {% call drawer("$showDrawer", title="Ajustes") %}\n'
        '    <p>Body</p>\n'
        '  {% endcall %}\n'
        '</div>'
    ),
    "modal": (
        '{% from "ui/modal.jinja" import modal, modal_footer %}\n'
        '<div data-signals=\'{"showModal": false}\'>\n'
        '  <button data-on:click="$showModal = true">Abrir</button>\n'
        '  {% call modal("$showModal", title="Confirmar") %}\n'
        '    <p>Estas seguro?</p>\n'
        '  {% endcall %}\n'
        '</div>'
    ),
    "tooltip": (
        '{% from "ui/tooltip.jinja" import tooltip_trigger %}\n'
        '{% call tooltip_trigger("Guardar cambios") %}\n'
        '  <button>Guardar</button>\n'
        '{% endcall %}'
    ),
    "toast": (
        '{% from "ui/toast.jinja" import toast %}\n'
        '{{ toast(title="Guardado", desc="Cambios aplicados.", variant="ok", dismissible=True) }}'
    ),
    "progress": (
        '{% from "ui/progress.jinja" import progress %}\n'
        '{{ progress(value=72, label="Subida", value_text="72%") }}'
    ),
    "accordion": (
        '{% from "ui/accordion.jinja" import accordion %}\n'
        '{{ accordion("faq", items=[\n'
        '  {"title": "Pregunta 1", "body": "Respuesta 1"},\n'
        '  {"title": "Pregunta 2", "body": "Respuesta 2"},\n'
        ']) }}'
    ),
    "list": (
        '{% from "ui/list.jinja" import list %}\n'
        '{{ list(items=[\n'
        '  {"title": "Bandeja de entrada", "desc": "12 sin leer", "icon_tone": "brand", "href": "#"},\n'
        '  {"title": "Informes", "desc": "3 pendientes", "icon_tone": "info", "href": "#"},\n'
        ']) }}'
    ),
    "datatable": (
        '{% from "ui/datatable.jinja" import datatable %}\n'
        '{{ datatable("orders",\n'
        '  columns=[{"key": "name", "label": "Name"}, {"key": "qty", "label": "Qty", "align": "right"}],\n'
        '  rows=[{"name": "Apple", "qty": 12}, {"name": "Pear", "qty": 5}],\n'
        ') }}'
    ),
    "field": (
        '{% from "ui/field.jinja" import field %}\n'
        '{% from "ui/input.jinja" import input %}\n'
        '{% call field(label="Email", hint="We never share it.", required=True) %}\n'
        '  {{ input("email", placeholder="you@example.com") }}\n'
        '{% endcall %}'
    ),
    "toggle": (
        '{% from "ui/toggle.jinja" import toggle %}\n'
        '{{ toggle("notifs", checked=True, value_signal="$notifs") }}'
    ),
    "check": (
        '{% from "ui/check.jinja" import check %}\n'
        '{{ check("agree", label="I agree", value_signal="$agree") }}'
    ),
    "radio": (
        '{% from "ui/radio.jinja" import radio_group %}\n'
        '{{ radio_group("freq",\n'
        '  options=[("m", "Monthly"), ("y", "Yearly")],\n'
        '  selected="y", inline=True) }}'
    ),
    "radio_card": (
        '{% from "ui/radio_card.jinja" import radio_card %}\n'
        '{{ radio_card("plan", selected="grow", options=[\n'
        '  {"value": "grow", "title": "Grow", "description": "Up to 3 terminals."},\n'
        '  {"value": "scale", "title": "Scale", "description": "Multi-store."},\n'
        ']) }}'
    ),
    "range": (
        '{% from "ui/range.jinja" import range %}\n'
        '{{ range("vol", min=0, max=100, value_signal="$vol") }}'
    ),
    "slider": (
        '{% from "ui/slider.jinja" import slider %}\n'
        '{{ slider("margin", value=20, variant="leaf", value_signal="$margin") }}'
    ),
    "datepicker": (
        '{% from "ui/datepicker.jinja" import datepicker %}\n'
        '{{ datepicker("dob", value="2026-05-08", value_signal="$dob") }}'
    ),
    "timepicker": (
        '{% from "ui/timepicker.jinja" import timepicker %}\n'
        '{{ timepicker("opens", value="09:30") }}'
    ),
    "dropzone": (
        '{% from "ui/dropzone.jinja" import dropzone %}\n'
        '<div data-signals=\'{"drag": false}\'>\n'
        '  {{ dropzone("upload", accept=".csv,.xlsx", drag_signal="$drag",\n'
        '              hint="CSV o XLSX hasta 25 MB.") }}\n'
        '</div>'
    ),
    "combo": (
        '{% from "ui/combo.jinja" import combo %}\n'
        '{{ combo("client", placeholder="Select client...", options=[\n'
        '  {"value": "acme", "label": "Acme", "meta": "12"},\n'
        '  {"value": "bravo", "label": "Bravo"},\n'
        '], open_signal="$comboOpen") }}'
    ),
    "search": (
        '{% from "ui/search.jinja" import search %}\n'
        '{{ search("q", placeholder="Buscar...", value_signal="$q", kbd="K") }}'
    ),
    "timeline": (
        '{% from "ui/timeline.jinja" import timeline %}\n'
        '{{ timeline(items=[\n'
        '  {"title": "Pedido creado", "time": "14:02", "variant": "brand"},\n'
        '  {"title": "Servido y pagado", "time": "14:32", "variant": "leaf"},\n'
        ']) }}'
    ),
    "empty": (
        '{% from "ui/empty.jinja" import empty %}\n'
        '{{ empty(title="Sin movimientos",\n'
        '         description="Registra un movimiento para empezar.",\n'
        '         action_label="Nuevo movimiento", action_href="#") }}'
    ),
    "states": (
        '{% from "ui/states.jinja" import loading_state, error_state, success_state %}\n'
        '{{ loading_state(message="Cargando...") }}\n'
        '{{ error_state(message="Backend caido.", retry_url="#") }}\n'
        '{{ success_state(message="Guardado.") }}'
    ),
    "calendar": (
        '{% from "ui/calendar.jinja" import calendar %}\n'
        '{{ calendar(year=2026, month=5,\n'
        '            selected="2026-05-14",\n'
        '            events=["2026-05-08", "2026-05-21"]) }}'
    ),
    "icon": (
        '{% from "ui/icon.jinja" import icon %}\n'
        '{{ icon("ion:home-outline", size=24) }}'
    ),
    "spacer": (
        '{% from "ui/spacer.jinja" import spacer %}\n'
        '{{ spacer(size="lg", block=True) }}'
    ),
    "topbar": (
        '{% from "ui/topbar.jinja" import topbar %}\n'
        '<div data-signals=\'{"sidebar": false}\'>\n'
        '  {% call topbar(title="Dashboard", back_href="/") %}\n'
        '    <span class="ux-avatar ux-avatar--sm ux-avatar--brand">JC</span>\n'
        '  {% endcall %}\n'
        '</div>'
    ),
    "tabbar": (
        '{% from "ui/tabbar.jinja" import tabbar %}\n'
        '<div data-signals=\'{"tab": "inicio"}\'>\n'
        '  {{ tabbar(signal="$tab", items=[\n'
        '    {"key": "inicio", "label": "Inicio", "icon": "ion:home-outline"},\n'
        '    {"key": "cobros", "label": "Cobros", "icon": "ion:card-outline", "badge": "3"},\n'
        '    {"key": "ventas", "label": "Ventas", "icon": "ion:trending-up-outline"},\n'
        '    {"key": "equipo", "label": "Equipo", "icon": "ion:people-outline"},\n'
        '    {"key": "ajustes", "label": "Ajustes", "icon": "ion:settings-outline"},\n'
        '  ]) }}\n'
        '</div>'
    ),
    "app_shell": (
        '{% from "ui/app_shell.jinja" import app_shell %}\n'
        '{% from "ui/sidebar.jinja" import sidebar %}\n'
        '{% from "ui/sidebar_item.jinja" import sidebar_item %}\n'
        '{% from "ui/topbar.jinja" import topbar %}\n'
        '{% call app_shell() %}\n'
        '  {% call sidebar(brand_initials="ER", brand_name="Mi App") %}\n'
        '    {{ sidebar_item("Dashboard", href="/", active=True) }}\n'
        '  {% endcall %}\n'
        '  <div class="ux-app__main">\n'
        '    {{ topbar(title="Dashboard") }}\n'
        '    <div class="ux-app__body"><!-- contenido --></div>\n'
        '  </div>\n'
        '{% endcall %}'
    ),
    "sidebar": (
        '{% from "ui/sidebar.jinja" import sidebar %}\n'
        '{% from "ui/sidebar_item.jinja" import sidebar_item %}\n'
        '{% call sidebar(brand_initials="ER", brand_name="ERPlora", brand_meta="3 sedes") %}\n'
        '  {{ sidebar_item("Principal", group=True) }}\n'
        '  {{ sidebar_item("Dashboard", href="/", active=True) }}\n'
        '  {{ sidebar_item("Ventas", href="/ventas", badge="12", badge_variant="brand") }}\n'
        '{% endcall %}'
    ),
    "sidebar_item": (
        '{% from "ui/sidebar_item.jinja" import sidebar_item %}\n'
        '{{ sidebar_item("Ventas", href="/ventas", active=True, badge="5", badge_variant="brand") }}\n'
        '{{ sidebar_item("Sección", group=True) }}'
    ),
    "mobile_shell": (
        '{% from "ui/mobile_shell.jinja" import mobile_shell %}\n'
        '{% call mobile_shell(\n'
        '  brand_initials="ER", brand_name="ERPlora",\n'
        '  nav_items=[\n'
        '    {"label": "Inicio", "href": "/"},\n'
        '    {"label": "Ventas", "href": "/ventas"},\n'
        '  ],\n'
        '  current_path="/") %}\n'
        '  <p>Contenido</p>\n'
        '{% endcall %}'
    ),
    "pill": (
        '{% from "ui/pill.jinja" import pill %}\n'
        '{{ pill("En línea", variant="ok") }}\n'
        '{{ pill("Pendiente", variant="warn") }}\n'
        '{{ pill("Sin punto", dot=False) }}'
    ),
    "tabbar_item": (
        '{% from "ui/tabbar_item.jinja" import tabbar_item %}\n'
        '<nav class="ux-tabbar">\n'
        '<div data-signals=\'{"tab": "home"}\'>\n'
        '  {{ tabbar_item("Inicio", tab_signal="$tab", tab_key="home") }}\n'
        '  {{ tabbar_item("Inbox", tab_signal="$tab", tab_key="inbox", badge="3") }}\n'
        '</div>\n'
        '</nav>'
    ),
    "view_toggle": (
        '{% from "ui/view_toggle.jinja" import view_toggle %}\n'
        '<div data-signals=\'{"view": "table"}\'>\n'
        '  {{ view_toggle("$view", views=[\n'
        '    {"key": "table", "title": "Lista", "svg": "..."},\n'
        '    {"key": "grid",  "title": "Cuadrícula", "svg": "..."},\n'
        '  ]) }}\n'
        '</div>'
    ),
    "icon_btn": (
        '{% from "ui/icon_btn.jinja" import icon_btn %}\n'
        '{% call icon_btn(label="Eliminar", variant="danger", on_click="@delete(\'/item/1\')") %}\n'
        '  <svg>...</svg>\n'
        '{% endcall %}'
    ),
    "dt_toolbar": (
        '{% from "ui/dt_toolbar.jinja" import dt_toolbar %}\n'
        '{% from "ui/search.jinja" import search %}\n'
        '<div data-signals=\'{"q": ""}\'>\n'
        '  {% call dt_toolbar() %}\n'
        '    {{ search("q", placeholder="Buscar...", value_signal="$q") }}\n'
        '    <div class="ux-dt-toolbar__spacer"></div>\n'
        '  {% endcall %}\n'
        '</div>'
    ),
    "date_range": (
        '{% from "ui/date_range.jinja" import date_range %}\n'
        '{{ date_range(from_value="01 may 2026", to_value="31 may 2026",\n'
        '              on_click="$pickerOpen = true") }}'
    ),
    "chart": (
        '{% from "ui/chart.jinja" import chart %}\n'
        '{% call chart(title="Ventas", big="€48.320", delta="+12%", delta_dir="up") %}\n'
        '  <div class="ux-chart__svg"><!-- SVG aquí --></div>\n'
        '{% endcall %}'
    ),
    "stat": (
        '{% from "ui/stat.jinja" import stat %}\n'
        '{{ stat(items=[\n'
        '  {"label": "Ventas hoy", "value": "€12.480", "delta": "+8%", "delta_dir": "up"},\n'
        '  {"label": "Pedidos", "value": "143"},\n'
        ']) }}'
    ),
    "inline_feedback": (
        '{% from "ui/inline_feedback.jinja" import banner, callout %}\n'
        '{{ banner(title="Guardado", msg="Cambios aplicados.", variant="ok", closeable=True) }}\n'
        '{{ callout("Modo sandbox activo.", variant="info") }}'
    ),
    "tree": (
        '{% from "ui/tree.jinja" import tree %}\n'
        '{{ tree("cats", nodes=[\n'
        '  {"label": "Bebidas", "open": True, "children": [\n'
        '    {"label": "Refrescos", "is_leaf": True},\n'
        '  ]},\n'
        '  {"label": "Comida", "is_leaf": True, "selected": True},\n'
        ']) }}'
    ),
    "chat": (
        '{% from "ui/chat.jinja" import chat %}\n'
        '{% call chat() %}\n'
        '  <div class="ux-chat__list"><!-- conversaciones --></div>\n'
        '  <div class="ux-chat__thread"><!-- mensajes --></div>\n'
        '{% endcall %}'
    ),
    "cmdk": (
        '{% from "ui/cmdk.jinja" import cmdk %}\n'
        '<div data-signals=\'{"cmdkOpen": false}\'>\n'
        '  <button data-on:click="$cmdkOpen = true">Abrir</button>\n'
        '  {% call cmdk(id="cmdk", placeholder="Buscar...") %}\n'
        '    <button class="ux-cmdk__item">Crear factura</button>\n'
        '  {% endcall %}\n'
        '</div>'
    ),
    "editor": (
        '{% from "ui/editor.jinja" import editor %}\n'
        '{% call editor(name="body", placeholder="Escribe aquí...") %}\n'
        '  <div class="ux-richtext__toolbar"><!-- botones --></div>\n'
        '  <div class="ux-richtext__content" contenteditable="true"\n'
        '       data-placeholder="Escribe aquí..."></div>\n'
        '{% endcall %}'
    ),
    "multimedia": (
        '{% from "ui/multimedia.jinja" import gallery, upload %}\n'
        '{{ gallery(items=[\n'
        '  {"label": "Foto 1", "caption": "Portada", "selected": True},\n'
        '  {"label": "Foto 2", "caption": "Detalle"},\n'
        ']) }}\n'
        '{{ upload(title="Arrastra archivos", sub="PDF o JPG hasta 25 MB") }}'
    ),
    "pos_canvas": (
        '{% from "ui/pos_canvas.jinja" import pos_canvas %}\n'
        '{% call pos_canvas() %}\n'
        '  <div class="ux-pos__main"><!-- categorías + grid --></div>\n'
        '  <aside class="ux-pos__aside"><!-- carrito --></aside>\n'
        '{% endcall %}'
    ),
    "pos_numpad": (
        '{% from "ui/pos_numpad.jinja" import pos_numpad %}\n'
        '{{ pos_numpad(label="A cobrar · €7,20", value="€10,00") }}'
    ),
    "pos_payment": (
        '{% from "ui/pos_payment.jinja" import pos_payment %}\n'
        '{{ pos_payment(total="€7,20", selected="card") }}'
    ),
    "receipt": (
        '{% from "ui/receipt.jinja" import receipt %}\n'
        '{{ receipt(\n'
        '  title="ERPlora POS", sub="Sucursal Centro · #2041",\n'
        '  lines=[\n'
        '    {"name": "2× Café solo", "price": "€3,00"},\n'
        '    {"name": "IVA 10%", "price": "€0,30", "divider_before": True},\n'
        '  ],\n'
        '  total="€3,30",\n'
        '  footer="Gracias por su visita"\n'
        ') }}'
    ),
    "kds": (
        '{% from "ui/kds.jinja" import kds %}\n'
        '{{ kds(\n'
        '  order="M4 · #2041", source="Mesa · Ana", time="14:32",\n'
        '  items=[\n'
        '    {"qty": 2, "name": "Café solo", "done": False},\n'
        '    {"qty": 1, "name": "Tarta de queso", "done": False},\n'
        '  ],\n'
        '  notes=["Sin azúcar"]\n'
        ') }}'
    ),
    "hr_card": (
        '{% from "ui/hr_card.jinja" import hr_card %}\n'
        '{{ hr_card(\n'
        '  name="Ana García", initials="AG", role="Directora de Ventas",\n'
        '  stats=[\n'
        '    {"label": "Turno", "value": "09:00–18:00"},\n'
        '    {"label": "Horas", "value": "40 h/sem"},\n'
        '  ]\n'
        ') }}'
    ),
    "manufacturing_panel": (
        '{% from "ui/manufacturing_panel.jinja" import manufacturing_panel %}\n'
        '{{ manufacturing_panel(\n'
        '  wo_id="WO-2026-0184", title="Mesa de roble 180×80",\n'
        '  produced=18, total=25,\n'
        '  bar_done=55, bar_running=17, bar_scrap=3,\n'
        '  steps=[\n'
        '    {"name": "Corte", "meta": "12 min", "status": "done"},\n'
        '    {"name": "Lijado", "meta": "8 min", "status": "active"},\n'
        '  ]\n'
        ') }}'
    ),
    "commerce_card": (
        '{% from "ui/commerce_card.jinja" import commerce_card %}\n'
        '{{ commerce_card(\n'
        '  number="F-2026-0184", title="Factura",\n'
        '  date="09 may 2026", due_date="09 jun 2026",\n'
        '  from_name="ERPlora SL", to_name="Acme SA",\n'
        '  lines=[\n'
        '    {"concept": "Licencia Hub", "qty": "1", "price": "€2.400", "discount": "–", "vat": "21%", "total": "€2.904"},\n'
        '  ]\n'
        ') }}'
    ),
    "kanban": (
        '{% from "ui/kanban.jinja" import kanban, kcard %}\n'
        '{% call kanban() %}\n'
        '  <div class="ux-kanban__col">\n'
        '    <div class="ux-kanban__col-head">...</div>\n'
        '    <div class="ux-kanban__col-body">\n'
        '      {% call kcard(title="Tarea", priority="high") %}\n'
        '        <div class="ux-kcard__tags">...</div>\n'
        '      {% endcall %}\n'
        '    </div>\n'
        '  </div>\n'
        '{% endcall %}'
    ),
    # ── v2.1 macros (added 2026-05-09) ─────────────────────────────────
    "menu_btn": (
        '{% from "ui/menu_btn.jinja" import menu_btn %}\n'
        '{{ menu_btn(label="Abrir menú", on_click="$sidebar = !$sidebar") }}'
    ),
    "table": (
        '{% from "ui/table.jinja" import table %}\n'
        '{{ table(\n'
        '  columns=[{"key": "name", "label": "Cliente"},\n'
        '           {"key": "amount", "label": "Importe", "align": "right"}],\n'
        '  rows=[{"name": "Acme", "amount": "1.240 €"}]) }}'
    ),
    "sparkline": (
        '{% from "ui/sparkline.jinja" import sparkline %}\n'
        '{{ sparkline([3, 5, 4, 7, 6, 9, 8, 11, 10, 13], variant="up") }}'
    ),
    "otp": (
        '{% from "ui/otp.jinja" import otp %}\n'
        '{{ otp("code", length=6, value_signal="$otp") }}'
    ),
    "pinpad": (
        '{% from "ui/pinpad.jinja" import pinpad %}\n'
        '{{ pinpad(value_signal="$pin", max_length=4) }}'
    ),
    "rating": (
        '{% from "ui/rating.jinja" import rating %}\n'
        '{{ rating(value=4, value_signal="$stars", label="4 / 5") }}'
    ),
    "qty_stepper": (
        '{% from "ui/qty_stepper.jinja" import qty_stepper %}\n'
        '{{ qty_stepper("qty", value=1, min=1, max=99, value_signal="$qty") }}'
    ),
    "segment": (
        '{% from "ui/segment.jinja" import segment %}\n'
        '{{ segment(\n'
        '  options=[("d", "Día"), ("w", "Semana"), ("m", "Mes")],\n'
        '  value_signal="$period", value_key="w") }}'
    ),
    "stepper": (
        '{% from "ui/stepper.jinja" import stepper %}\n'
        '{{ stepper(steps=[\n'
        '  {"title": "Cuenta", "state": "done"},\n'
        '  {"title": "Pago",   "state": "active"},\n'
        '  {"title": "Listo"}]) }}'
    ),
    "popover": (
        '{% from "ui/popover.jinja" import popover %}\n'
        '{% call popover(title="Filtros", open_signal="$pop") %}\n'
        '  …popover body…\n'
        '{% endcall %}'
    ),
    "autocomplete": (
        '{% from "ui/autocomplete.jinja" import autocomplete %}\n'
        '{{ autocomplete("client",\n'
        '  options=[{"value": "acme", "label": "Acme", "meta": "12"}],\n'
        '  query_signal="$q", value_signal="$client") }}'
    ),
    "color_picker": (
        '{% from "ui/color_picker.jinja" import color_picker %}\n'
        '{{ color_picker("brand",\n'
        '  swatches=["#E8552A", "#1E3A8A", "#2F5233"],\n'
        '  value="#E8552A", value_signal="$brand") }}'
    ),
    "currency": (
        '{% from "ui/currency.jinja" import currency %}\n'
        '{{ currency("amount", value=1240.50, symbol="€") }}'
    ),
    "phone": (
        '{% from "ui/phone.jinja" import phone %}\n'
        '{{ phone("phone", value="612 345 678", dial="+34", flag="🇪🇸") }}'
    ),
}


def _build_env() -> Environment:
    """Build a Jinja env loaded against the ux-jinja templates directory."""
    repo_root = Path(__file__).resolve().parents[2]
    return Environment(
        loader=FileSystemLoader([
            str(Path(ux_jinja.TEMPLATES_DIR)),
            str(repo_root / "templates"),
        ]),
        extensions=["jinja2.ext.do"],
        autoescape=select_autoescape(["html"]),
    )


_PREVIEW_ENV: Environment | None = None


def _preview_env() -> Environment:
    global _PREVIEW_ENV
    if _PREVIEW_ENV is None:
        _PREVIEW_ENV = _build_env()
    return _PREVIEW_ENV


def render_examples_for(name: str) -> list[dict[str, Any]]:
    """Render every example for a component name into HTML."""
    env = _preview_env()
    out: list[dict[str, Any]] = []
    for example in EXAMPLES.get(name, []):
        rendered = env.from_string(example["render"]).render()
        out.append({
            "label": example["label"],
            "source": example["render"],
            "html": rendered,
        })
    return out


def render_first_for(name: str) -> str:
    """Render only the first example for a component (used for thumbnails)."""
    env = _preview_env()
    examples = EXAMPLES.get(name, [])
    if not examples:
        return ""
    return env.from_string(examples[0]["render"]).render()


def macro_source(name: str) -> str:
    """Return the raw .jinja source of the macro file for display."""
    path = Path(ux_jinja.TEMPLATES_DIR) / "ui" / f"{name}.jinja"
    if not path.exists():
        return ""
    return path.read_text(encoding="utf-8")


def usage_for(name: str) -> str:
    """Return the canonical 'how to call this macro' snippet."""
    return USAGE.get(name, "")
