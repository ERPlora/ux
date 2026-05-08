"""Dashboard previews."""

from __future__ import annotations

from fastapi import APIRouter, HTTPException, Request

from uxsite.context import nav_context


router = APIRouter()


PAGES: dict[str, str] = {
    "hub": "Hub",
    "saas": "Saas",
}


@router.get("/preview/dashboard", name="dashboard_index", include_in_schema=False)
async def dashboard_index(request: Request):
    return request.app.state.templates.TemplateResponse(
        request,
        "preview_index.html",
        {
            **nav_context(),
            "category": "dashboard",
            "pages": PAGES,
            "active_route": "/preview/dashboard",
        },
    )


@router.get("/preview/dashboard/{name}", name="dashboard_detail", include_in_schema=False)
async def dashboard_detail(request: Request, name: str):
    if name not in PAGES:
        raise HTTPException(status_code=404, detail=f"Unknown dashboard preview: {name}")
    return request.app.state.templates.TemplateResponse(
        request,
        f"dashboard/{name}.jinja",
        {
            **nav_context(),
            "active_route": f"/preview/dashboard/{name}",
        },
    )
