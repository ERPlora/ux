"""Public previews."""

from __future__ import annotations

from fastapi import APIRouter, HTTPException, Request

from uxsite.context import nav_context


router = APIRouter()


PAGES: dict[str, str] = {
    "catalog": "Catalog",
    "index": "Index",
    "product": "Product",
}


@router.get("/preview/public", name="public_index", include_in_schema=False)
async def public_index(request: Request):
    return request.app.state.templates.TemplateResponse(
        request,
        "preview_index.html",
        {
            **nav_context(request),
            "category": "public",
            "pages": PAGES,
            "active_route": "/preview/public",
        },
    )


@router.get("/preview/public/{name}", name="public_detail", include_in_schema=False)
async def public_detail(request: Request, name: str):
    if name not in PAGES:
        raise HTTPException(status_code=404, detail=f"Unknown public preview: {name}")
    return request.app.state.templates.TemplateResponse(
        request,
        f"public/{name}.jinja",
        {
            **nav_context(request),
            "active_route": f"/preview/public/{name}",
        },
    )
