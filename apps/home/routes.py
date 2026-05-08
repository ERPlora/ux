"""Home — landing + install pages for the public docs site."""

from __future__ import annotations

from fastapi import APIRouter, Request

from uxsite.context import COMPONENT_NAMES, PAGE_NAMES, nav_context


router = APIRouter()


@router.get("/", name="home", include_in_schema=False)
async def home(request: Request):
    """Landing page with overview cards and quick links."""
    templates = request.app.state.templates
    return templates.TemplateResponse(
        request,
        "home/index.html",
        {
            **nav_context(),
            "component_count": len(COMPONENT_NAMES),
            "page_count": len(PAGE_NAMES),
            "active_route": "/",
        },
    )


@router.get("/install", name="install", include_in_schema=False)
async def install(request: Request):
    """Step-by-step install + first-use guide."""
    templates = request.app.state.templates
    return templates.TemplateResponse(
        request,
        "home/install.html",
        {**nav_context(), "active_route": "/install"},
    )


@router.get("/design-system", name="design_system", include_in_schema=False)
async def design_system(request: Request):
    """Design system tokens — palette, typography, radii, shadows, spacing."""
    templates = request.app.state.templates
    return templates.TemplateResponse(
        request,
        "home/design_system.html",
        {**nav_context(), "active_route": "/design-system"},
    )
