"""Marketplace previews."""

from __future__ import annotations

from fastapi import APIRouter, HTTPException, Request

from uxsite.context import nav_context


router = APIRouter()


PAGES: dict[str, str] = {
    "hub-business-types": "Hub business types",
    "hub-catalog": "Hub catalog",
    "hub-checkout": "Hub checkout",
    "hub-compliance": "Hub compliance",
    "hub-detail": "Hub detail",
    "hub-index": "Hub index",
    "hub-my-purchases": "Hub my purchases",
    "hub-readme": "Hub readme",
    "hub-solutions": "Hub solutions",
    "saas-cart": "Saas cart",
    "saas-checkout": "Saas checkout",
    "saas-shop": "Saas shop",
    "saas-success": "Saas success",
}


@router.get("/preview/marketplace", name="marketplace_index", include_in_schema=False)
async def marketplace_index(request: Request):
    return request.app.state.templates.TemplateResponse(
        request,
        "preview_index.html",
        {
            **nav_context(request),
            "category": "marketplace",
            "pages": PAGES,
            "active_route": "/preview/marketplace",
        },
    )


@router.get("/preview/marketplace/{name}", name="marketplace_detail", include_in_schema=False)
async def marketplace_detail(request: Request, name: str):
    if name not in PAGES:
        raise HTTPException(status_code=404, detail=f"Unknown marketplace preview: {name}")
    return request.app.state.templates.TemplateResponse(
        request,
        f"marketplace/{name}.jinja",
        {
            **nav_context(request),
            "active_route": f"/preview/marketplace/{name}",
        },
    )
