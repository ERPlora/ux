"""Auth previews — login, 2fa, password, sessions, trusted devices."""

from __future__ import annotations

from fastapi import APIRouter, HTTPException, Request

from uxsite.context import nav_context


router = APIRouter()


PAGES: dict[str, str] = {
    "login-saas": "Cloud login",
    "login-hub": "Hub login (PIN + email)",
    "2fa-setup": "Setup 2FA",
    "2fa-profile": "2FA profile state",
    "2fa-disable": "Disable 2FA",
    "change-password": "Change password",
    "delete-account": "Delete account",
    "sessions": "Active sessions",
    "trusted-devices": "Trusted devices",
}


@router.get("/preview/auth", name="auth_index", include_in_schema=False)
async def auth_index(request: Request):
    return request.app.state.templates.TemplateResponse(
        request,
        "preview_index.html",
        {
            **nav_context(request),
            "category": "auth",
            "pages": PAGES,
            "active_route": "/preview/auth",
        },
    )


@router.get("/preview/auth/{name}", name="auth_detail", include_in_schema=False)
async def auth_detail(request: Request, name: str):
    if name not in PAGES:
        raise HTTPException(status_code=404, detail=f"Unknown auth preview: {name}")
    return request.app.state.templates.TemplateResponse(
        request,
        f"auth/{name}.jinja",
        {
            **nav_context(request),
            "active_route": f"/preview/auth/{name}",
        },
    )
