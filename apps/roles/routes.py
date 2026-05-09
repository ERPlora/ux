"""Roles previews."""

from __future__ import annotations

from fastapi import APIRouter, HTTPException, Request

from uxsite.context import nav_context


router = APIRouter()


PAGES: dict[str, str] = {
    "confirm-delete": "Confirm Delete",
    "detail": "Detail",
    "form": "Form",
    "list": "List",
}


@router.get("/preview/roles", name="roles_index", include_in_schema=False)
async def roles_index(request: Request):
    return request.app.state.templates.TemplateResponse(
        request,
        "preview_index.html",
        {
            **nav_context(request),
            "category": "roles",
            "pages": PAGES,
            "active_route": "/preview/roles",
        },
    )


@router.get("/preview/roles/{name}", name="roles_detail", include_in_schema=False)
async def roles_detail(request: Request, name: str):
    if name not in PAGES:
        raise HTTPException(status_code=404, detail=f"Unknown roles preview: {name}")
    return request.app.state.templates.TemplateResponse(
        request,
        f"roles/{name}.jinja",
        {
            **nav_context(request),
            "active_route": f"/preview/roles/{name}",
        },
    )
