"""System previews."""

from __future__ import annotations

from fastapi import APIRouter, HTTPException, Request

from uxsite.context import nav_context


router = APIRouter()


PAGES: dict[str, str] = {
    "bridge-setup": "Bridge Setup",
    "index": "Index",
}


@router.get("/preview/system", name="system_index", include_in_schema=False)
async def system_index(request: Request):
    return request.app.state.templates.TemplateResponse(
        request,
        "preview_index.html",
        {
            **nav_context(),
            "category": "system",
            "pages": PAGES,
            "active_route": "/preview/system",
        },
    )


@router.get("/preview/system/{name}", name="system_detail", include_in_schema=False)
async def system_detail(request: Request, name: str):
    if name not in PAGES:
        raise HTTPException(status_code=404, detail=f"Unknown system preview: {name}")
    return request.app.state.templates.TemplateResponse(
        request,
        f"system/{name}.jinja",
        {
            **nav_context(),
            "active_route": f"/preview/system/{name}",
        },
    )
