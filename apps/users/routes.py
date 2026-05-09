"""Users previews — list and invite."""

from __future__ import annotations

from fastapi import APIRouter, HTTPException, Request

from uxsite.context import nav_context


router = APIRouter()


PAGES: dict[str, str] = {
    "list": "Users list",
    "invite": "Invite user",
}


@router.get("/preview/users", name="users_index", include_in_schema=False)
async def users_index(request: Request):
    return request.app.state.templates.TemplateResponse(
        request,
        "preview_index.html",
        {
            **nav_context(request),
            "category": "users",
            "pages": PAGES,
            "active_route": "/preview/users",
        },
    )


@router.get("/preview/users/{name}", name="users_detail", include_in_schema=False)
async def users_detail(request: Request, name: str):
    if name not in PAGES:
        raise HTTPException(status_code=404, detail=f"Unknown users preview: {name}")
    return request.app.state.templates.TemplateResponse(
        request,
        f"users/{name}.jinja",
        {
            **nav_context(request),
            "active_route": f"/preview/users/{name}",
        },
    )
