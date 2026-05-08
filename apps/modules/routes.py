"""Modules previews."""

from __future__ import annotations

from fastapi import APIRouter, HTTPException, Request

from uxsite.context import nav_context


router = APIRouter()


PAGES: dict[str, str] = {
    "add-from-git": "Add from git",
    "edit": "Edit",
    "hub-installed": "Hub installed",
    "members": "Members",
    "my": "My",
    "overview": "Overview",
    "repositories": "Repositories",
    "stats": "Stats",
    "upload": "Upload",
}


@router.get("/preview/modules", name="modules_index", include_in_schema=False)
async def modules_index(request: Request):
    return request.app.state.templates.TemplateResponse(
        request,
        "preview_index.html",
        {
            **nav_context(),
            "category": "modules",
            "pages": PAGES,
            "active_route": "/preview/modules",
        },
    )


@router.get("/preview/modules/{name}", name="modules_detail", include_in_schema=False)
async def modules_detail(request: Request, name: str):
    if name not in PAGES:
        raise HTTPException(status_code=404, detail=f"Unknown modules preview: {name}")
    return request.app.state.templates.TemplateResponse(
        request,
        f"modules/{name}.jinja",
        {
            **nav_context(),
            "active_route": f"/preview/modules/{name}",
        },
    )
