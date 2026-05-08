"""Components app — index + per-component detail pages."""

from __future__ import annotations

from fastapi import APIRouter, HTTPException, Request

from uxsite.context import COMPONENT_NAMES, nav_context

from .fixtures import EXAMPLES, macro_source, render_examples_for


router = APIRouter()


@router.get("/c", name="components_index", include_in_schema=False)
async def components_index(request: Request):
    templates = request.app.state.templates
    return templates.TemplateResponse(
        request,
        "components/index.html",
        {**nav_context(), "components": COMPONENT_NAMES},
    )


@router.get("/c/{name}", name="component_detail", include_in_schema=False)
async def component_detail(request: Request, name: str):
    if name not in EXAMPLES:
        raise HTTPException(status_code=404, detail=f"Unknown component: {name}")
    templates = request.app.state.templates
    return templates.TemplateResponse(
        request,
        "components/detail.html",
        {
            **nav_context(),
            "name": name,
            "examples": render_examples_for(name),
            "source": macro_source(name),
        },
    )
