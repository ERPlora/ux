"""Components app — gallery index + per-component detail pages."""

from __future__ import annotations

from fastapi import APIRouter, HTTPException, Request

from uxsite.context import COMPONENT_DESCRIPTIONS, COMPONENT_NAMES, nav_context

from .fixtures import (
    EXAMPLES,
    macro_source,
    render_examples_for,
    render_first_for,
    usage_for,
)


router = APIRouter()


@router.get("/c", name="components_index", include_in_schema=False)
async def components_index(request: Request):
    """Gallery of every component as a card with a live thumbnail preview."""
    templates = request.app.state.templates
    cards = [
        {
            "name": name,
            "description": COMPONENT_DESCRIPTIONS.get(name, ""),
            "thumb_html": render_first_for(name),
            "href": f"/c/{name}",
        }
        for name in COMPONENT_NAMES
    ]
    return templates.TemplateResponse(
        request,
        "components/index.html",
        {**nav_context(), "cards": cards, "active_route": "/c"},
    )


@router.get("/c/{name}", name="component_detail", include_in_schema=False)
async def component_detail(request: Request, name: str):
    """Per-component detail with Preview / Source / Usage tabs."""
    if name not in EXAMPLES:
        raise HTTPException(status_code=404, detail=f"Unknown component: {name}")
    templates = request.app.state.templates
    return templates.TemplateResponse(
        request,
        "components/detail.html",
        {
            **nav_context(),
            "name": name,
            "description": COMPONENT_DESCRIPTIONS.get(name, ""),
            "examples": render_examples_for(name),
            "source": macro_source(name),
            "usage": usage_for(name),
            "active_route": f"/c/{name}",
        },
    )
