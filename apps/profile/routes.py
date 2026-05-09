"""Profile previews — hub and SaaS variants."""

from __future__ import annotations

from fastapi import APIRouter, HTTPException, Request

from uxsite.context import nav_context


router = APIRouter()


PAGES: dict[str, str] = {
    "hub": "Hub profile",
    "saas": "SaaS profile",
}


@router.get("/preview/profile", name="profile_index", include_in_schema=False)
async def profile_index(request: Request):
    return request.app.state.templates.TemplateResponse(
        request,
        "preview_index.html",
        {
            **nav_context(request),
            "category": "profile",
            "pages": PAGES,
            "active_route": "/preview/profile",
        },
    )


@router.get("/preview/profile/{name}", name="profile_detail", include_in_schema=False)
async def profile_detail(request: Request, name: str):
    if name not in PAGES:
        raise HTTPException(status_code=404, detail=f"Unknown profile preview: {name}")
    return request.app.state.templates.TemplateResponse(
        request,
        f"profile/{name}.jinja",
        {
            **nav_context(request),
            "active_route": f"/preview/profile/{name}",
        },
    )
