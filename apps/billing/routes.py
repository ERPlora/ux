"""Billing previews."""

from __future__ import annotations

from fastapi import APIRouter, HTTPException, Request

from uxsite.context import nav_context


router = APIRouter()


PAGES: dict[str, str] = {
    "hub": "Hub",
    "invoice-detail": "Invoice detail",
    "invoices": "Invoices",
    "payment-history": "Payment history",
    "payout-detail": "Payout detail",
    "payouts": "Payouts",
    "purchases": "Purchases",
    "stripe-connect": "Stripe connect",
    "subscriptions": "Subscriptions",
    "vendor-dashboard": "Vendor dashboard",
    "vendor-earnings": "Vendor earnings",
}


@router.get("/preview/billing", name="billing_index", include_in_schema=False)
async def billing_index(request: Request):
    return request.app.state.templates.TemplateResponse(
        request,
        "preview_index.html",
        {
            **nav_context(request),
            "category": "billing",
            "pages": PAGES,
            "active_route": "/preview/billing",
        },
    )


@router.get("/preview/billing/{name}", name="billing_detail", include_in_schema=False)
async def billing_detail(request: Request, name: str):
    if name not in PAGES:
        raise HTTPException(status_code=404, detail=f"Unknown billing preview: {name}")
    return request.app.state.templates.TemplateResponse(
        request,
        f"billing/{name}.jinja",
        {
            **nav_context(request),
            "active_route": f"/preview/billing/{name}",
        },
    )
