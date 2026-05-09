"""Settings previews."""

from __future__ import annotations

from fastapi import APIRouter, HTTPException, Request

from uxsite.context import nav_context


router = APIRouter()


PAGES: dict[str, str] = {
    "backup": "Backup",
    "compliance": "Compliance",
    "devices": "Devices",
    "file-browser": "File Browser",
    "files": "Files",
    "help": "Help",
    "hub-config": "Hub Config",
    "hub": "Hub",
    "preferences": "Preferences",
    "printers": "Printers",
    "scheduled-tasks": "Scheduled Tasks",
    "tax-classes": "Tax Classes",
}


@router.get("/preview/settings", name="settings_index", include_in_schema=False)
async def settings_index(request: Request):
    return request.app.state.templates.TemplateResponse(
        request,
        "preview_index.html",
        {
            **nav_context(request),
            "category": "settings",
            "pages": PAGES,
            "active_route": "/preview/settings",
        },
    )


@router.get("/preview/settings/{name}", name="settings_detail", include_in_schema=False)
async def settings_detail(request: Request, name: str):
    if name not in PAGES:
        raise HTTPException(status_code=404, detail=f"Unknown settings preview: {name}")
    return request.app.state.templates.TemplateResponse(
        request,
        f"settings/{name}.jinja",
        {
            **nav_context(request),
            "active_route": f"/preview/settings/{name}",
        },
    )
