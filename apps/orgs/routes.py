"""Orgs previews."""

from __future__ import annotations

from fastapi import APIRouter, HTTPException, Request

from uxsite.context import nav_context


router = APIRouter()


PAGES: dict[str, str] = {
    "billing": "Billing",
    "create": "Create",
    "detail": "Detail",
    "invite": "Invite",
    "list": "List",
    "payment-methods": "Payment methods",
    "shipping": "Shipping",
}


@router.get("/preview/orgs", name="orgs_index", include_in_schema=False)
async def orgs_index(request: Request):
    return request.app.state.templates.TemplateResponse(
        request,
        "preview_index.html",
        {
            **nav_context(),
            "category": "orgs",
            "pages": PAGES,
            "active_route": "/preview/orgs",
        },
    )


@router.get("/preview/orgs/{name}", name="orgs_detail", include_in_schema=False)
async def orgs_detail(request: Request, name: str):
    if name not in PAGES:
        raise HTTPException(status_code=404, detail=f"Unknown orgs preview: {name}")
    return request.app.state.templates.TemplateResponse(
        request,
        f"orgs/{name}.jinja",
        {
            **nav_context(),
            "active_route": f"/preview/orgs/{name}",
        },
    )
