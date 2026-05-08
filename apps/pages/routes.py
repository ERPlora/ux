"""Pages app — example page previews from ux_jinja.templates.pages.*."""

from __future__ import annotations

from pathlib import Path

import ux_jinja
from fastapi import APIRouter, HTTPException, Request

from uxsite.context import PAGE_DESCRIPTIONS, PAGE_NAMES, nav_context

from .fixtures import context_for


router = APIRouter()


@router.get("/p", name="pages_index", include_in_schema=False)
async def pages_index(request: Request):
    """Gallery of example pages — one card per ux_jinja page template."""
    templates = request.app.state.templates
    cards = [
        {
            "name": name,
            "description": PAGE_DESCRIPTIONS.get(name, ""),
            "href": f"/p/{name}",
        }
        for name in PAGE_NAMES
    ]
    return templates.TemplateResponse(
        request,
        "pages/index.html",
        {**nav_context(), "cards": cards, "active_route": "/p"},
    )


@router.get("/p/{name}", name="page_detail", include_in_schema=False)
async def page_detail(request: Request, name: str):
    """Per-page detail with Preview / Source tabs."""
    if name not in PAGE_NAMES:
        raise HTTPException(status_code=404, detail=f"Unknown page: {name}")

    src_path = Path(ux_jinja.TEMPLATES_DIR) / "pages" / f"{name}.jinja"
    source = src_path.read_text(encoding="utf-8") if src_path.exists() else ""

    templates = request.app.state.templates
    return templates.TemplateResponse(
        request,
        "pages/detail.html",
        {
            **nav_context(),
            **context_for(name),
            "name": name,
            "description": PAGE_DESCRIPTIONS.get(name, ""),
            "page_template": f"pages/{name}.jinja",
            "source": source,
            "active_route": f"/p/{name}",
        },
    )
