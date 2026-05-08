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
        {"label": "Variants", "render": (
            '{% from "ui/button.jinja" import button %}'
            '{{ button("Primary") }} '
            '{{ button("Secondary", variant="secondary") }} '
            '{{ button("Ghost", variant="ghost") }} '
            '{{ button("Outline", variant="outline") }} '
            '{{ button("Danger", variant="danger") }} '
            '{{ button("Link", variant="link") }}'
        )},
        {"label": "Sizes", "render": (
            '{% from "ui/button.jinja" import button %}'
            '{{ button("Small", size="sm") }} '
            '{{ button("Medium") }} '
            '{{ button("Large", size="lg") }}'
        )},
        {"label": "States", "render": (
            '{% from "ui/button.jinja" import button %}'
            '{{ button("Disabled", disabled=True) }} '
            '{{ button("As link", href="#") }}'
        )},
        {"label": "Datastar action", "render": (
            '{% from "ui/button.jinja" import button %}'
            '<div data-signals=\'{"clicks": 0}\'>'
            '{{ button("Click me", on_click="$clicks = $clicks + 1") }} '
            '<span class="ux-badge ux-badge--brand" data-text="\'Clicks: \' + $clicks">Clicks: 0</span>'
            '</div>'
        )},
    ],
    "badge": [
        {"label": "Tones", "render": (
            '{% from "ui/badge.jinja" import badge %}'
            '{{ badge("Default") }} '
            '{{ badge("Brand", variant="brand") }} '
            '{{ badge("OK", variant="ok") }} '
            '{{ badge("Warn", variant="warn") }} '
            '{{ badge("Danger", variant="danger") }} '
            '{{ badge("Info", variant="info") }}'
        )},
        {"label": "Solid", "render": (
            '{% from "ui/badge.jinja" import badge %}'
            '{{ badge("Solid", variant="solid") }} '
            '{{ badge("Solid brand", variant="solid-brand") }}'
        )},
        {"label": "With dot", "render": (
            '{% from "ui/badge.jinja" import badge %}'
            '{{ badge("Live", variant="ok", dot=True) }} '
            '{{ badge("Pending", variant="warn", dot=True) }}'
        )},
    ],
    "card": [
        {"label": "Default", "render": (
            '{% from "ui/card.jinja" import card %}'
            '{% call card(title="Project Apollo", subtitle="Mission status") %}'
            '<p style="margin:0;color:var(--ux-ink-2);font-size:13px;">Body content goes here. The card wraps a header / body / footer trio.</p>'
            '{% endcall %}'
        )},
        {"label": "With footer", "render": (
            '{% from "ui/card.jinja" import card, card_footer %}'
            '{% from "ui/button.jinja" import button %}'
            '{% call card(title="Confirm action") %}'
            '<p style="margin:0 0 12px;color:var(--ux-ink-2);font-size:13px;">Some destructive copy explaining what happens next.</p>'
            '{% call card_footer() %}'
            '{{ button("Cancel", variant="ghost") }} '
            '{{ button("Confirm", variant="primary") }}'
            '{% endcall %}'
            '{% endcall %}'
        )},
        {"label": "Variants", "render": (
            '{% from "ui/card.jinja" import card %}'
            '<div style="display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));width:100%;">'
            '{% call card(title="Elevated", elevated=True) %}<p style="margin:0;font-size:13px;color:var(--ux-ink-2);">Raised surface.</p>{% endcall %}'
            '{% call card(title="Flat", flat=True) %}<p style="margin:0;font-size:13px;color:var(--ux-ink-2);">No elevation.</p>{% endcall %}'
            '{% call card(title="Glass", glass=True) %}<p style="margin:0;font-size:13px;color:var(--ux-ink-2);">Frosted look.</p>{% endcall %}'
            '</div>'
        )},
    ],
    "chip": [
        {"label": "Tones", "render": (
            '{% from "ui/chip.jinja" import chip %}'
            '{{ chip("Default") }} '
            '{{ chip("Brand", variant="brand") }} '
            '{{ chip("Info", variant="info") }}'
        )},
        {"label": "Active and removable", "render": (
            '{% from "ui/chip.jinja" import chip %}'
            '{{ chip("Active", active=True, variant="brand") }} '
            '{{ chip("Filterable", removable=True) }}'
        )},
    ],
    "avatar": [
        {"label": "Sizes", "render": (
            '{% from "ui/avatar.jinja" import avatar %}'
            '{{ avatar("Ada Lovelace", size="xs") }} '
            '{{ avatar("Ada Lovelace", size="sm") }} '
            '{{ avatar("Ada Lovelace") }} '
            '{{ avatar("Ada Lovelace", size="lg") }} '
            '{{ avatar("Ada Lovelace", size="xl") }}'
        )},
        {"label": "Variant and status", "render": (
            '{% from "ui/avatar.jinja" import avatar %}'
            '{{ avatar("Grace Hopper", variant="brand") }} '
            '{{ avatar("Online", status="online") }} '
            '{{ avatar("Busy", status="busy") }} '
            '{{ avatar("Offline", status="offline") }}'
        )},
        {"label": "Stack", "render": (
            '{% from "ui/avatar.jinja" import avatar, avatar_stack %}'
            '{% call avatar_stack() %}'
            '{{ avatar("Ada Lovelace") }}'
            '{{ avatar("Alan Turing") }}'
            '{{ avatar("Grace Hopper") }}'
            '{{ avatar("Linus Torvalds") }}'
            '{% endcall %}'
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
        {"label": "Up trend", "render": (
            '{% from "ui/kpi.jinja" import kpi %}'
            '{{ kpi(label="Active orders", value="1,284", delta="+12.4%", trend="up") }}'
        )},
        {"label": "Variants", "render": (
            '{% from "ui/kpi.jinja" import kpi %}'
            '<div style="display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));width:100%;">'
            '{{ kpi(label="Revenue", value="48.2", unit=" k", delta="+8.1%", trend="up", variant="brand") }}'
            '{{ kpi(label="Returns", value="312", delta="-2.0%", trend="down") }}'
            '{{ kpi(label="Target", value="92%", delta="objective 95%", trend="flat") }}'
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
        {"label": "Default", "render": (
            '{% from "ui/breadcrumbs.jinja" import breadcrumbs %}'
            '{{ breadcrumbs(items=['
            '{"label": "Dashboard", "href": "/"},'
            '{"label": "Components", "href": "/c"},'
            '{"label": "Breadcrumbs"}'
            ']) }}'
        )},
        {"label": "Chips variant", "render": (
            '{% from "ui/breadcrumbs.jinja" import breadcrumbs %}'
            '{{ breadcrumbs(variant="chips", items=['
            '{"label": "Catalog", "href": "/"},'
            '{"label": "Office"},'
            '{"label": "Chairs"}'
            ']) }}'
        )},
    ],
    "tabs": [
        {"label": "Default", "render": (
            '{% from "ui/tabs.jinja" import tabs, tab_panel %}'
            '<div style="width:100%;">'
            '{{ tabs("demo", items=['
            '{"label": "Overview", "key": "ov"},'
            '{"label": "Activity", "key": "act"},'
            '{"label": "Settings", "key": "set"}'
            ']) }}'
            '<div style="padding:14px 4px;">'
            '{% call tab_panel("demo", "ov") %}<p style="margin:0;color:var(--ux-ink-2);">Overview pane content.</p>{% endcall %}'
            '{% call tab_panel("demo", "act") %}<p style="margin:0;color:var(--ux-ink-2);">Activity pane content.</p>{% endcall %}'
            '{% call tab_panel("demo", "set") %}<p style="margin:0;color:var(--ux-ink-2);">Settings pane content.</p>{% endcall %}'
            '</div>'
            '</div>'
        )},
        {"label": "Pill variant", "render": (
            '{% from "ui/tabs.jinja" import tabs %}'
            '{{ tabs("demo_pill", variant="pill", items=['
            '{"label": "Day", "key": "d"},'
            '{"label": "Week", "key": "w"},'
            '{"label": "Month", "key": "m"}'
            ']) }}'
        )},
    ],
    "drawer": [
        {"label": "Open via signal", "render": (
            '{% from "ui/drawer.jinja" import drawer, drawer_footer %}'
            '{% from "ui/button.jinja" import button %}'
            '<div data-signals=\'{"showDrawerDemo": false}\'>'
            '{{ button("Open drawer", on_click="$showDrawerDemo = true") }}'
            '{% call drawer("$showDrawerDemo", title="Settings", subtitle="Sample drawer") %}'
            '<p style="color:var(--ux-ink-2);font-size:13px;">Drag-in content goes here.</p>'
            '{% call drawer_footer() %}'
            '{{ button("Close", variant="ghost", on_click="$showDrawerDemo = false") }}'
            '{% endcall %}'
            '{% endcall %}'
            '</div>'
        )},
    ],
    "modal": [
        {"label": "Open via signal", "render": (
            '{% from "ui/modal.jinja" import modal, modal_footer %}'
            '{% from "ui/button.jinja" import button %}'
            '<div data-signals=\'{"showDemoModal": false}\'>'
            '{{ button("Open modal", on_click="$showDemoModal = true") }}'
            '{% call modal("$showDemoModal", title="Hello", subtitle="A small demo") %}'
            '<p style="color:var(--ux-ink-2);font-size:13px;">Body content of the modal.</p>'
            '{% call modal_footer() %}'
            '{{ button("Cancel", variant="ghost", on_click="$showDemoModal = false") }} '
            '{{ button("Confirm", on_click="$showDemoModal = false") }}'
            '{% endcall %}'
            '{% endcall %}'
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
        {"label": "Tones", "render": (
            '{% from "ui/toast.jinja" import toast %}'
            '<div style="display:flex;flex-direction:column;gap:10px;width:100%;max-width:360px;">'
            '{{ toast(title="Saved", desc="Changes were applied.", variant="ok") }}'
            '{{ toast(title="Heads up", desc="Slow connection detected.", variant="warn") }}'
            '{{ toast(title="Failed", desc="Could not reach the server.", variant="danger") }}'
            '{{ toast(title="Update available", desc="A new version is ready.", variant="info") }}'
            '</div>'
        )},
    ],
    "progress": [
        {"label": "Determinate", "render": (
            '{% from "ui/progress.jinja" import progress %}'
            '<div style="display:flex;flex-direction:column;gap:14px;width:100%;max-width:360px;">'
            '{{ progress(value=20) }}'
            '{{ progress(value=55, variant="leaf") }}'
            '{{ progress(value=85, variant="warn") }}'
            '</div>'
        )},
        {"label": "With label", "render": (
            '{% from "ui/progress.jinja" import progress %}'
            '<div style="width:100%;max-width:360px;">'
            '{{ progress(value=72, label="Upload", value_text="72%") }}'
            '</div>'
        )},
        {"label": "Indeterminate", "render": (
            '{% from "ui/progress.jinja" import progress %}'
            '<div style="width:100%;max-width:360px;">'
            '{{ progress(indeterminate=True) }}'
            '</div>'
        )},
    ],
    "accordion": [
        {"label": "Multiple", "render": (
            '{% from "ui/accordion.jinja" import accordion %}'
            '<div style="width:100%;max-width:480px;">'
            '{{ accordion("acc_demo", items=['
            '{"title": "What is ERPlora UX?", "body": "A CSS + Jinja2 component library."},'
            '{"title": "How do I install?", "body": "pip install ux-jinja and add the templates dir."},'
            '{"title": "Datastar?", "body": "Yes — every macro is wired with declarative attributes."}'
            ']) }}'
            '</div>'
        )},
        {"label": "Single (only one open)", "render": (
            '{% from "ui/accordion.jinja" import accordion %}'
            '<div style="width:100%;max-width:480px;">'
            '{{ accordion("acc_single", single=True, items=['
            '{"title": "Step 1: install", "body": "Run the install command.", "open": True},'
            '{"title": "Step 2: register loader", "body": "Append the templates dir."},'
            '{"title": "Step 3: import macros", "body": "Use {% raw %}{% from \\"ui/...\\" import ... %}{% endraw %}."}'
            ']) }}'
            '</div>'
        )},
    ],
    "list": [
        {"label": "Default", "render": (
            '{% from "ui/list.jinja" import list %}'
            '<div style="width:100%;max-width:480px;">'
            '{{ list(items=['
            '{"title": "Inbox", "desc": "12 unread messages", "icon_tone": "brand"},'
            '{"title": "Reports", "desc": "3 pending reviews", "icon_tone": "info"},'
            '{"title": "Alerts", "desc": "1 critical", "icon_tone": "danger"}'
            ']) }}'
            '</div>'
        )},
        {"label": "Variants", "render": (
            '{% from "ui/list.jinja" import list %}'
            '<div style="display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));width:100%;">'
            '{{ list(variant="ghost", items=[{"title": "Ghost row 1"}, {"title": "Ghost row 2"}]) }}'
            '{{ list(variant="separated", items=[{"title": "Separated 1"}, {"title": "Separated 2"}]) }}'
            '</div>'
        )},
    ],
    "datatable": [
        {"label": "Basic", "render": (
            '{% from "ui/datatable.jinja" import datatable %}'
            '{{ datatable("dt_demo", '
            "columns=[{'key': 'name', 'label': 'Name'}, {'key': 'qty', 'label': 'Qty', 'align': 'right'}, {'key': 'sku', 'label': 'SKU'}], "
            "rows=[{'name': 'Apple', 'qty': 12, 'sku': 'AP-01'}, {'name': 'Pear', 'qty': 5, 'sku': 'PE-04'}, {'name': 'Cherry', 'qty': 47, 'sku': 'CH-22'}, {'name': 'Mango', 'qty': 9, 'sku': 'MA-08'}]"
            ") }}"
        )},
        {"label": "With view toggle", "render": (
            '{% from "ui/datatable.jinja" import datatable %}'
            '{{ datatable("dt_demo2", view_toggle=True, '
            "columns=[{'key': 'name', 'label': 'Name'}, {'key': 'role', 'label': 'Role'}], "
            "rows=[{'name': 'Ada', 'role': 'Engineer'}, {'name': 'Grace', 'role': 'Engineer'}, {'name': 'Linus', 'role': 'Ops'}]"
            ") }}"
        )},
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
            "{'value': 'grow', 'title': 'Grow · 49/mo', 'description': 'Up to 3 terminals.'}, "
            "{'value': 'scale', 'title': 'Scale · 129/mo', 'description': 'Multi-store, full API.'}"
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
            "{'value': 'acme', 'label': 'Acme', 'meta': '12 €'}, "
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
            '{{ search("q", placeholder="Search products, customers, orders...", kbd="⌘K") }}'
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
            "{'title': 'Order created', 'time': '14:02', 'desc': '3 items · 34.50€', 'variant': 'brand'}, "
            "{'title': 'Sent to kitchen', 'time': '14:03', 'variant': 'info'}, "
            "{'title': 'Served and paid', 'time': '14:32', 'desc': 'Cash · change 5.50€', 'variant': 'leaf'}"
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
        {"label": "May 2026", "render": (
            '{% from "ui/calendar.jinja" import calendar %}'
            "{{ calendar(year=2026, month=5, selected='2026-05-12', events=['2026-05-08', '2026-05-21']) }}"
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
        {"label": "Default — 4 items", "render": (
            '{% from "ui/tabbar.jinja" import tabbar %}'
            '{{ tabbar(items=['
            '  {"label":"Home","href":"/","icon":"ion:home-outline"},'
            '  {"label":"Sales","href":"/sales","icon":"ion:trending-up-outline"},'
            '  {"label":"Team","href":"/team","icon":"ion:people-outline"},'
            '  {"label":"Settings","href":"/settings","icon":"ion:settings-outline"}'
            '], current_path="/") }}'
        )},
        {"label": "With badges", "render": (
            '{% from "ui/tabbar.jinja" import tabbar %}'
            '{{ tabbar(items=['
            '  {"label":"Home","href":"/","icon":"ion:home-outline"},'
            '  {"label":"Inbox","href":"/inbox","icon":"ion:mail-outline","badge":"3"},'
            '  {"label":"Orders","href":"/orders","icon":"ion:cart-outline","badge":"12"},'
            '  {"label":"Profile","href":"/me","icon":"ion:person-outline"}'
            '], current_path="/inbox") }}'
        )},
        {"label": "Pill variant", "render": (
            '{% from "ui/tabbar.jinja" import tabbar %}'
            '{{ tabbar(items=['
            '  {"label":"Home","href":"/","icon":"ion:home-outline"},'
            '  {"label":"Search","href":"/search","icon":"ion:search-outline"},'
            '  {"label":"Alerts","href":"/alerts","icon":"ion:notifications-outline","badge":"5"},'
            '  {"label":"Me","href":"/me","icon":"ion:person-circle-outline"}'
            '], current_path="/", variant="pill") }}'
        )},
        {"label": "Indicator variant", "render": (
            '{% from "ui/tabbar.jinja" import tabbar %}'
            '{{ tabbar(items=['
            '  {"label":"Home","href":"/","icon":"ion:home-outline"},'
            '  {"label":"Agenda","href":"/agenda","icon":"ion:calendar-outline"},'
            '  {"label":"History","href":"/history","icon":"ion:time-outline"},'
            '  {"label":"More","href":"/more","icon":"ion:ellipsis-horizontal-outline"}'
            '], current_path="/agenda", variant="indicator") }}'
        )},
    ],
}


# Canonical "how do I call this macro" snippet shown in the Usage tab.
USAGE: dict[str, str] = {
    "button": (
        '{% from "ui/button.jinja" import button %}\n'
        '{{ button("Save", variant="primary", on_click="@post(\'/save\')") }}'
    ),
    "badge": (
        '{% from "ui/badge.jinja" import badge %}\n'
        '{{ badge("Active", variant="ok", dot=True) }}'
    ),
    "card": (
        '{% from "ui/card.jinja" import card, card_footer %}\n'
        '{% call card(title="Hello", subtitle="World") %}\n'
        '  <p>Body</p>\n'
        '  {% call card_footer() %}<small>Footer</small>{% endcall %}\n'
        '{% endcall %}'
    ),
    "chip": (
        '{% from "ui/chip.jinja" import chip %}\n'
        '{{ chip("Filter", variant="brand", removable=True, on_remove="$filter = null") }}'
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
        '{{ kpi(label="Revenue", value="48.2", unit=" k", delta="+8.1%", trend="up", variant="brand") }}'
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
        '  {"label": "Components", "href": "/c"},\n'
        '  {"label": "Breadcrumbs"},\n'
        ']) }}'
    ),
    "tabs": (
        '{% from "ui/tabs.jinja" import tabs, tab_panel %}\n'
        '{{ tabs("settings", items=[\n'
        '  {"label": "General", "key": "gen"},\n'
        '  {"label": "Billing", "key": "bill"},\n'
        ']) }}\n'
        '{% call tab_panel("settings", "gen") %}<p>General</p>{% endcall %}\n'
        '{% call tab_panel("settings", "bill") %}<p>Billing</p>{% endcall %}'
    ),
    "drawer": (
        '{% from "ui/drawer.jinja" import drawer, drawer_footer %}\n'
        '<div data-signals=\'{"showDrawer": false}\'>\n'
        '  <button data-on:click="$showDrawer = true">Open</button>\n'
        '  {% call drawer("$showDrawer", title="Settings") %}\n'
        '    <p>Body</p>\n'
        '  {% endcall %}\n'
        '</div>'
    ),
    "modal": (
        '{% from "ui/modal.jinja" import modal, modal_footer %}\n'
        '<div data-signals=\'{"showModal": false}\'>\n'
        '  <button data-on:click="$showModal = true">Open</button>\n'
        '  {% call modal("$showModal", title="Confirm") %}\n'
        '    <p>Are you sure?</p>\n'
        '  {% endcall %}\n'
        '</div>'
    ),
    "tooltip": (
        '{% from "ui/tooltip.jinja" import tooltip_trigger %}\n'
        '{% call tooltip_trigger("Save changes") %}\n'
        '  <button>Save</button>\n'
        '{% endcall %}'
    ),
    "toast": (
        '{% from "ui/toast.jinja" import toast %}\n'
        '{{ toast(title="Saved", desc="All changes applied.", variant="ok", dismissible=True) }}'
    ),
    "progress": (
        '{% from "ui/progress.jinja" import progress %}\n'
        '{{ progress(value=72, label="Upload", value_text="72%") }}'
    ),
    "accordion": (
        '{% from "ui/accordion.jinja" import accordion %}\n'
        '{{ accordion("faq", items=[\n'
        '  {"title": "Q1", "body": "A1"},\n'
        '  {"title": "Q2", "body": "A2"},\n'
        ']) }}'
    ),
    "list": (
        '{% from "ui/list.jinja" import list %}\n'
        '{{ list(items=[\n'
        '  {"title": "Inbox", "desc": "12 unread", "icon_tone": "brand"},\n'
        '  {"title": "Reports", "desc": "3 pending", "icon_tone": "info"},\n'
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
        '              hint="CSV or XLSX up to 25 MB.") }}\n'
        '</div>'
    ),
    "combo": (
        '{% from "ui/combo.jinja" import combo %}\n'
        '{{ combo("client", placeholder="Select client...", options=[\n'
        '  {"value": "acme", "label": "Acme", "meta": "12 €"},\n'
        '  {"value": "bravo", "label": "Bravo"},\n'
        '], open_signal="$comboOpen") }}'
    ),
    "search": (
        '{% from "ui/search.jinja" import search %}\n'
        '{{ search("q", placeholder="Search...", value_signal="$q", kbd="⌘K") }}'
    ),
    "timeline": (
        '{% from "ui/timeline.jinja" import timeline %}\n'
        '{{ timeline(items=[\n'
        '  {"title": "Order created", "time": "14:02", "variant": "brand"},\n'
        '  {"title": "Served and paid", "time": "14:32", "variant": "leaf"},\n'
        ']) }}'
    ),
    "empty": (
        '{% from "ui/empty.jinja" import empty %}\n'
        '{{ empty(title="No movements",\n'
        '         description="Add a movement to get started.",\n'
        '         action_label="New movement", action_href="#") }}'
    ),
    "states": (
        '{% from "ui/states.jinja" import loading_state, error_state, success_state %}\n'
        '{{ loading_state(message="Loading...") }}\n'
        '{{ error_state(message="Backend down.", retry_url="#") }}\n'
        '{{ success_state(message="Saved.") }}'
    ),
    "calendar": (
        '{% from "ui/calendar.jinja" import calendar %}\n'
        '{{ calendar(year=2026, month=5,\n'
        '            selected="2026-05-12",\n'
        '            events=["2026-05-08"]) }}'
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
        '{{ tabbar(items=[\n'
        '  {"label": "Home", "href": "/", "icon": "ion:home-outline"},\n'
        '  {"label": "Inbox", "href": "/inbox", "icon": "ion:mail-outline", "badge": "3"},\n'
        '  {"label": "Profile", "href": "/me", "icon": "ion:person-outline"},\n'
        '], current_path="/") }}'
    ),
}


def _build_env() -> Environment:
    """Build a Jinja env loaded against the ux-jinja templates directory.

    The previews are rendered in isolation — exactly as a downstream consumer
    would render them — so we do not reuse the FastAPI app's environment.
    """
    return Environment(
        loader=FileSystemLoader(str(Path(ux_jinja.TEMPLATES_DIR))),
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
    """Render every example for a component name into HTML.

    Returns a list of dicts with ``label``, ``source`` (raw Jinja), and
    ``html`` (the rendered output). Unknown component names return an
    empty list rather than raising — the routing layer catches that and
    serves a 404 page.
    """
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
    """Return the canonical "how to call this macro" snippet."""
    return USAGE.get(name, "")
