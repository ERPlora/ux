"""Errors previews — 403, 404, 405, 500, bootstrap, unauthorized."""

from __future__ import annotations

from fastapi import APIRouter, HTTPException, Request

from uxsite.context import nav_context


router = APIRouter()


PAGES: dict[str, str] = {
    "404": "404 — Not found",
    "500": "500 — Server error",
    "403": "403 — Forbidden",
    "405": "405 — Method not allowed",
    "unauthorized": "401 — Unauthorized",
    "bootstrap": "Bootstrap loading",
    "bootstrap-detail": "Bootstrap detail",
}


@router.get("/preview/errors", name="errors_index", include_in_schema=False)
async def errors_index(request: Request):
    return request.app.state.templates.TemplateResponse(
        request,
        "preview_index.html",
        {
            **nav_context(),
            "category": "errors",
            "pages": PAGES,
            "active_route": "/preview/errors",
        },
    )


@router.get("/preview/errors/{name}", name="errors_detail", include_in_schema=False)
async def errors_detail(request: Request, name: str):
    if name not in PAGES:
        raise HTTPException(status_code=404, detail=f"Unknown errors preview: {name}")
    return request.app.state.templates.TemplateResponse(
        request,
        f"errors/{name}.jinja",
        {
            **nav_context(),
            "active_route": f"/preview/errors/{name}",
        },
    )
