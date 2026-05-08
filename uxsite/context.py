"""Sidebar navigation data shared across every view in the docs site."""

from __future__ import annotations


COMPONENT_NAMES: list[str] = [
    "button",
    "badge",
    "card",
    "input",
    "textarea",
    "select",
    "modal",
    "datatable",
]


PAGE_NAMES: list[str] = [
    "dashboard",
    "list_view",
]


def nav_context() -> dict[str, list[str]]:
    """Return the navigation context injected into every page render."""
    return {
        "component_names": COMPONENT_NAMES,
        "page_names": PAGE_NAMES,
    }
