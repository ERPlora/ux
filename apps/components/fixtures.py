"""Live preview snippets for each ux-jinja macro.

Each fixture is a small Jinja source string that renders against the same
environment the rest of the site uses, so the preview always matches the
HTML the consumer would actually get.
"""

from __future__ import annotations

from pathlib import Path
from typing import Any

import ux_jinja
from jinja2 import Environment


# A label is shown above each preview block; ``render`` is the raw Jinja
# source that gets executed and ``source`` is the snippet shown verbatim.
EXAMPLES: dict[str, list[dict[str, str]]] = {
    "button": [
        {
            "label": "Variants",
            "render": (
                '{% from "ui/button.jinja" import button %}'
                '{{ button("Primary") }} '
                '{{ button("Secondary", variant="secondary") }} '
                '{{ button("Ghost", variant="ghost") }} '
                '{{ button("Danger", variant="danger") }}'
            ),
        },
        {
            "label": "Sizes",
            "render": (
                '{% from "ui/button.jinja" import button %}'
                '{{ button("Sm", size="sm") }} '
                '{{ button("Md") }} '
                '{{ button("Lg", size="lg") }}'
            ),
        },
        {
            "label": "Datastar action",
            "render": (
                '{% from "ui/button.jinja" import button %}'
                '{{ button("Save", on_click="@post(\'/save\')") }}'
            ),
        },
    ],
    "badge": [
        {
            "label": "Tones",
            "render": (
                '{% from "ui/badge.jinja" import badge %}'
                '{{ badge("Default") }} '
                '{{ badge("OK", variant="ok") }} '
                '{{ badge("Warn", variant="warn") }} '
                '{{ badge("Danger", variant="danger") }} '
                '{{ badge("Info", variant="info") }}'
            ),
        },
        {
            "label": "With dot",
            "render": (
                '{% from "ui/badge.jinja" import badge %}'
                '{{ badge("Live", variant="ok", dot=True) }}'
            ),
        },
    ],
    "card": [
        {
            "label": "Default",
            "render": (
                '{% from "ui/card.jinja" import card %}'
                '{% call card(title="Example", subtitle="Optional subtitle") %}'
                '<p>Body content goes here.</p>'
                '{% endcall %}'
            ),
        },
        {
            "label": "With footer",
            "render": (
                '{% from "ui/card.jinja" import card, card_footer %}'
                '{% call card(title="Hello") %}'
                '<p>Body</p>'
                '{% call card_footer() %}<small>Footer slot</small>{% endcall %}'
                '{% endcall %}'
            ),
        },
    ],
    "input": [
        {
            "label": "Sizes & state",
            "render": (
                '{% from "ui/input.jinja" import input %}'
                '{{ input("name", placeholder="Small", size="sm") }} '
                '{{ input("email", placeholder="Default") }} '
                '{{ input("phone", placeholder="Large", size="lg") }}'
            ),
        },
        {
            "label": "Invalid",
            "render": (
                '{% from "ui/input.jinja" import input %}'
                '{{ input("zip", value="ABC", invalid=True) }}'
            ),
        },
    ],
    "textarea": [
        {
            "label": "Default",
            "render": (
                '{% from "ui/textarea.jinja" import textarea %}'
                '{{ textarea("notes", placeholder="Write something...") }}'
            ),
        },
    ],
    "select": [
        {
            "label": "Default",
            "render": (
                '{% from "ui/select.jinja" import select %}'
                '{{ select("country", options=[("us", "United States"), ("es", "Spain"), ("fr", "France")], value="es") }}'
            ),
        },
    ],
    "modal": [
        {
            "label": "Open via signal",
            "render": (
                '{% from "ui/modal.jinja" import modal, modal_footer %}'
                '{% from "ui/button.jinja" import button %}'
                '<div data-signals="{ showDemoModal: false }">'
                '{{ button("Open modal", on_click="$showDemoModal = true") }}'
                '{% call modal("$showDemoModal", title="Hello", subtitle="A small demo") %}'
                '<p>Body content.</p>'
                '{% call modal_footer() %}'
                '{{ button("Cancel", variant="ghost", on_click="$showDemoModal = false") }} '
                '{{ button("Confirm", variant="primary", on_click="$showDemoModal = false") }}'
                '{% endcall %}'
                '{% endcall %}'
                '</div>'
            ),
        },
    ],
    "datatable": [
        {
            "label": "Basic",
            "render": (
                '{% from "ui/datatable.jinja" import datatable %}'
                '{{ datatable("dt-demo", '
                "columns=[{'key': 'name', 'label': 'Name'}, {'key': 'qty', 'label': 'Qty', 'align': 'right'}], "
                "rows=[{'name': 'Apple', 'qty': 12}, {'name': 'Pear', 'qty': 5}, {'name': 'Cherry', 'qty': 47}]"
                ') }}'
            ),
        },
    ],
}


def _build_env() -> Environment:
    """Build a Jinja env loaded against the ux-jinja templates directory.

    Kept tiny on purpose — the only consumer is the docs site's preview
    renderer; we don't reuse the FastAPI app's environment because we want
    the previews to render in isolation, exactly as a downstream consumer
    would render them.
    """
    from jinja2 import FileSystemLoader, select_autoescape

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
        out.append(
            {
                "label": example["label"],
                "source": example["render"],
                "html": rendered,
            }
        )
    return out


def macro_source(name: str) -> str:
    """Return the raw .jinja source of the macro file for display."""
    path = Path(ux_jinja.TEMPLATES_DIR) / "ui" / f"{name}.jinja"
    if not path.exists():
        return ""
    return path.read_text(encoding="utf-8")
