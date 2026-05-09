"""Hubs previews."""

from __future__ import annotations

from fastapi import APIRouter, HTTPException, Request

from uxsite.context import nav_context


router = APIRouter()


PAGES: dict[str, str] = {
    "active": "Active",
    "create": "Create",
    "inactive": "Inactive",
    "modules": "Modules",
    "qr": "Qr",
    "settings": "Settings",
    "users": "Users",
}


@router.get("/preview/hubs", name="hubs_index", include_in_schema=False)
async def hubs_index(request: Request):
    return request.app.state.templates.TemplateResponse(
        request,
        "preview_index.html",
        {
            **nav_context(request),
            "category": "hubs",
            "pages": PAGES,
            "active_route": "/preview/hubs",
        },
    )


@router.get("/preview/hubs/{name}", name="hubs_detail", include_in_schema=False)
async def hubs_detail(request: Request, name: str):
    if name not in PAGES:
        raise HTTPException(status_code=404, detail=f"Unknown hubs preview: {name}")
    return request.app.state.templates.TemplateResponse(
        request,
        f"hubs/{name}.jinja",
        {
            **nav_context(request),
            "active_route": f"/preview/hubs/{name}",
        },
    )
